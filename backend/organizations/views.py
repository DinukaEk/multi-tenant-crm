from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Organization
from .serializers import OrganizationSerializer


class OrganizationViewSet(ModelViewSet):

    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):

        if request.user.role != "ADMIN":
            return Response(
                {"error": "Only admin can create organizations"},
                status=status.HTTP_403_FORBIDDEN
            )

        return super().create(request, *args, **kwargs)