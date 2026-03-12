from django.contrib import admin
from django.urls import path, include

urlpatterns = [

    path("admin/", admin.site.urls),

    # authentication
    path("api/v1/auth/", include("users.urls")),

    # core APIs
    path("api/v1/", include("companies.urls")),
    path("api/v1/", include("contacts.urls")),
    path("api/v1/", include("activity_logs.urls")),
    path("api/v1/", include("organizations.urls")),

]