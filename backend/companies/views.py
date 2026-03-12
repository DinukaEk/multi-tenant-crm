from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework import filters

from django_filters.rest_framework import DjangoFilterBackend

from .models import Company
from .serializers import CompanySerializer

from core.permissions import RoleBasedPermission
from core.services.activity_service import log_activity


class CompanyViewSet(ModelViewSet):

    serializer_class = CompanySerializer

    # Authentication + Role permissions
    permission_classes = [IsAuthenticated, RoleBasedPermission]

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter
    ]

    search_fields = ["name", "industry", "country"]
    filterset_fields = ["industry", "country"]
    ordering_fields = ["created_at"]

    def get_queryset(self):

        user = self.request.user

        if user.role == "ADMIN":
            return Company.objects.filter(is_deleted=False)

        return Company.objects.filter(
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
            "Company",
            obj.id
        )

    def perform_update(self, serializer):

        obj = serializer.save()

        log_activity(
            self.request.user,
            "UPDATE",
            "Company",
            obj.id
        )

    def perform_destroy(self, instance):

        # Soft delete
        instance.is_deleted = True
        instance.save()

        log_activity(
            self.request.user,
            "DELETE",
            "Company",
            instance.id
        )