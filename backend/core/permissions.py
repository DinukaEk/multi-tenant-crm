from rest_framework.permissions import BasePermission


class RoleBasedPermission(BasePermission):

    def has_permission(self, request, view):

        user = request.user

        if not user or not user.is_authenticated:
            return False

        role = user.role

        # DELETE → Admin only
        if request.method == "DELETE":
            return role == "ADMIN"

        # UPDATE → Admin or Manager
        if request.method in ["PUT", "PATCH"]:
            return role in ["ADMIN", "MANAGER"]

        # CREATE → Admin or Manager
        if request.method == "POST":
            return role in ["ADMIN", "MANAGER"]

        # READ → all roles
        if request.method in ["GET", "HEAD", "OPTIONS"]:
            return True

        return False