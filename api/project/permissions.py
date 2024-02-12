from rest_framework import permissions
from django.utils.translation import gettext_lazy  as _



class PrivateTokenAccessPermission(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """
    class_error = None
    message = _('You dont have permission to perform this action!')

    def has_permission(self, request, view):
        """
        Return `True` if permission is granted, `False` otherwise.
        """
        _ = self.class_error
        if request.user.is_anonymous:
            return False

        if request.user.is_app_user:
            return False
        return True
    

class PublicTokenAccessPermission(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """
    message = _('You dont have permission to perform this action.')
    class_error = None
    def has_permission(self, request, view):
        """
        Return `True` if permission is granted, `False` otherwise.
        """
        _ = self.class_error
        if request.user.is_anonymous:
            return False
        return request.user.is_app_user

