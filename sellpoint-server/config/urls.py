from django.urls import include, path
from rest_framework import routers
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('users/', include('userapi.urls')),
    path('admin/', admin.site.urls),
    path('listings/', include('listingapi.urls')),
]
urlpatterns += static(settings.MEDIA_URL,
                              document_root=settings.MEDIA_ROOT)
