from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework import filters

from django_filters.rest_framework import DjangoFilterBackend

from .models import Contact
from .serializers import ContactSerializer

from core.permissions import RoleBasedPermission
from core.services.activity_service import log_activity


class ContactViewSet(ModelViewSet):

    serializer_class = ContactSerializer
    permission_classes = [IsAuthenticated, RoleBasedPermission]

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter
    ]

    search_fields = ["full_name", "email"]
    filterset_fields = ["role"]
    ordering_fields = ["created_at"]

    def get_queryset(self):

        user = self.request.user

        # Admin sees all contacts
        if user.role == "ADMIN":
            return Contact.objects.filter(is_deleted=False)

        # Manager / Staff see only their organization
        return Contact.objects.filter(
            organization=user.organization,
            is_deleted=False
        )

    def perform_create(self, serializer):

        obj = serializer.save(
            organization=self.request.user.organization
        )

        log_activity(
            self.request.user,
            "CREATE",
            "Contact",
            obj.id
        )

    def perform_update(self, serializer):

        obj = serializer.save()

        log_activity(
            self.request.user,
            "UPDATE",
            "Contact",
            obj.id
        )

    def perform_destroy(self, instance):

        instance.is_deleted = True
        instance.save()

        log_activity(
            self.request.user,
            "DELETE",
            "Contact",
            instance.id
        )