from rest_framework import permissions

class UserPermission(permissions.BasePermission):
  
    def has_permission(self, request, view):
        return not request.user.is_anonymous
        
class AdvertiserPermission(permissions.BasePermission):
  
    def has_permission(self, request, view):
        if request.method == 'POST': 
            if not request.user.is_anonymous: 
                return request.user.is_advertiser
            else:
                return False
        else:
            return not request.user.is_anonymous
