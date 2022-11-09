from rest_framework.parsers import JSONParser
from userapi import serializers
from django.http.response import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from userapi.permissions import UserPermission, AdvertiserPermission
from listingapi.models import Listing, Advertisement
from .serializers import ListingSerializer, AdvertisementSerializer
from django.core.exceptions import ObjectDoesNotExist
from userapi.models import Advertiser
import random

@api_view(["GET"])
@permission_classes([UserPermission])
def own_listings(request):
    # Get all listings from the logged in user
    if request.method == "GET":
        try:
            listings = Listing.objects.filter(seller=request.user.id).all()
        except ObjectDoesNotExist:
            return JsonResponse({})
        serializer = ListingSerializer(listings, many=True)
        return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})

@api_view(["GET"])
@permission_classes([UserPermission])
def user_listings(request, user_id=0):
    # Get all listings from specific user
    if request.method == "GET":
        try:
            listings = Listing.objects.filter(seller=user_id).all()
        except ObjectDoesNotExist:
            return JsonResponse({})
        serializer = ListingSerializer(listings, many=True)
        return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})

@api_view(["GET", "POST"])
@permission_classes([UserPermission])
def listings(request):
    # Get all listings
    if request.method == "GET":
        all = Listing.objects.all()
        serializer = ListingSerializer(all, many=True)
        return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})
    
    # Create a new listing
    elif request.method == "POST":
        # Initial listing with the logged in user as the seller
        serializer = ListingSerializer(Listing(seller=request.user), data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@api_view(["GET"])
@permission_classes([UserPermission])
def category_listings(request, category=""):
    # Get all listings within a certain category
    if request.method == "GET":
        try:
            listings = Listing.objects.filter(categorie = category).all()
        except ObjectDoesNotExist:
            return JsonResponse({})
        serializer = ListingSerializer(listings, many=True)
        return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})


    
@api_view(["GET", "PUT", "DELETE"])
@permission_classes([UserPermission])
def single_listing(request, listing_id=0):
    # Fetch the requested Listing
    try:
        listing = Listing.objects.get(id=listing_id)
    except ObjectDoesNotExist:
        return JsonResponse("Listing does not exist", safe=False)
    
    # Return the requested listing
    if request.method == "GET":
        serializer = ListingSerializer(listing)
        return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})

    # Change the requested listing
    if request.method == 'PUT':
        # Check if the logged in user is the seller
        if listing.seller == request.user:
            serializer = ListingSerializer(listing, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data)
            return JsonResponse(serializer.errors, status=400)
        return HttpResponse("Not your post!", status=403)
    
    # Delete the requested listing
    if request.method == "DELETE":
        if listing.seller == request.user:
            listing.delete()
            return HttpResponse(status=200)
        else:
            return HttpResponse(status=403)


@api_view(["GET"])
def categorie_list(request):
    # Fetch the all categories for listings
    if request.method == "GET":
        return JsonResponse(Listing.CATEGORIES, safe=False, json_dumps_params={'ensure_ascii': False})



        
@api_view(["GET", "POST"])
@permission_classes([AdvertiserPermission])
def advertisements(request):
    # Get all listings
    if request.method == "GET":
        all = Advertisement.objects.all()
        serializer = AdvertisementSerializer(all, many=True)
        return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})
    
    # Create a new Advertisement
    elif request.method == "POST":
        # Initial Advertisement with the logged in user as the seller
        advertiser = Advertiser.objects.get(id=request.user.id)
        
        serializer = AdvertisementSerializer(Advertisement(owner=advertiser), data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@api_view(["GET", "DELETE"])
@permission_classes([UserPermission])
def single_advertisement(request, advertisement_id=0):
    # Fetch the requested Advertisement
    try:
        advertisement = Advertisement.objects.get(id=advertisement_id)
    except ObjectDoesNotExist:
        return JsonResponse("Advertisement does not exist", safe=False)
    
    # Return the requested listing
    if request.method == "GET":
        serializer = AdvertisementSerializer(advertisement)
        return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})

    if request.method == "DELETE":
        if advertisement.owner.id == request.user.id:
            advertisement.delete()
            return HttpResponse(status=200, content="Successfully deleted")
        else:
            return HttpResponse(status=403, content="Incorrect user")
    





@api_view(["GET"])
@permission_classes([UserPermission])
def random_advertisement(request):
    # Fetch the requested Advertisement
    try:
        advertisements = Advertisement.objects.all()
        advertisement = random.choice(advertisements)
    except ObjectDoesNotExist:
        return JsonResponse("Advertisement does not exist", safe=False)
    
    # Return the requested listing
    if request.method == "GET":
        serializer = AdvertisementSerializer(advertisement)
        return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})

@api_view(["GET"])
@permission_classes([AdvertiserPermission])
def own_advertisements(request):
    # Get all advertisements from the logged in user
    if request.method == "GET":
        try:
            advertisements = Advertisement.objects.filter(owner=request.user.id).all()
        except ObjectDoesNotExist:
            return JsonResponse({})
        serializer = AdvertisementSerializer(advertisements, many=True)
        return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})
