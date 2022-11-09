from django.urls import include, path
from userapi import views
from django.contrib import admin
from rest_framework.authtoken import views as authviews

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', views.user_list),
    path('loggedin', views.user_detail),
    path('register/user', views.user_registration_view),
    path('register/advertiser', views.advertiser_registration_view),
    path('api-token-auth/', authviews.obtain_auth_token),
    path('<int:user_id>', views.other_user_detail),
]
