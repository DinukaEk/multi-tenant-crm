from rest_framework.routers import DefaultRouter
from .views import ActivityLogViewSet

router = DefaultRouter()

router.register("activity-logs", ActivityLogViewSet, basename="activity-logs")

urlpatterns = router.urls