from django.urls import path
from .views import listings, categorie_list, single_advertisement, single_listing, user_listings, own_listings, category_listings, advertisements, random_advertisement, own_advertisements

# Endpoints for listings from /listings/...
urlpatterns = [
    path("", listings),
    path("categories", categorie_list),
    path("<int:listing_id>/", single_listing),
    path("user/<int:user_id>/", user_listings),
    path("own/", own_listings),
    path("category/<str:category>", category_listings),
    path("advertisements", advertisements),
    path("advertisements/<int:advertisement_id>", single_advertisement),
    path("advertisements/random", random_advertisement),
    path("advertisements/own", own_advertisements)
]
