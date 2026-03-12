from rest_framework.viewsets import ReadOnlyModelViewSet
from .models import ActivityLog
from .serializers import ActivityLogSerializer


class ActivityLogViewSet(ReadOnlyModelViewSet):

    serializer_class = ActivityLogSerializer

    def get_queryset(self):

        user = self.request.user

        return ActivityLog.objects.filter(
            user__organization=user.organization
        )