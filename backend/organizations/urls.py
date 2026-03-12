from rest_framework.routers import DefaultRouter
from .views import OrganizationViewSet

router = DefaultRouter()

router.register("organizations", OrganizationViewSet)

urlpatterns = router.urls