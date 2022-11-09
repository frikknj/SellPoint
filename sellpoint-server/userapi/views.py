from django.contrib.auth.models import User, Group
from django.core import exceptions
from .models import Account, Advertiser
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from userapi import serializers
from userapi.serializers import AccountSerializer, AccountRegistrationSerializer, AdvertiserRegistrationSerializer
from userapi.permissions import UserPermission, AdvertiserPermission
from rest_framework.authtoken.models import Token
from django.core.exceptions import ObjectDoesNotExist


@api_view(['GET'])
@permission_classes([UserPermission])
def user_list(request):
    if request.method == 'GET':
        all = Account.objects.all()
        serializer = AccountSerializer(all, many=True)
        return JsonResponse(serializer.data, safe=False)


@api_view(['GET'])
@permission_classes([UserPermission])
def other_user_detail(request, user_id):
    try:
        user = Account.objects.get(id=user_id)
        if (user.is_advertiser):
            user = Advertiser.objects.get(id=user_id)
        
    except ObjectDoesNotExist:
        return HttpResponse("User not found.", status=404)
    if (user.is_advertiser):
        serializer = AdvertiserRegistrationSerializer(user)
        return JsonResponse(serializer.data)
    serializer = AccountSerializer(user)
    return JsonResponse(serializer.data)

@api_view(['GET', 'DELETE', 'PUT'])
@permission_classes([UserPermission])
def user_detail(request):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        user = request.user
    except Account.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        if (user.is_advertiser):
            user = Advertiser.objects.get(id=user.id)
            serializer = AdvertiserRegistrationSerializer(user)
        else:
            serializer = AccountSerializer(user)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = AccountSerializer(user, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        user.delete()
        return HttpResponse(status=204)


@api_view(['POST'])
def user_registration_view(request):

    serializer = AccountRegistrationSerializer(data=request.data)
    data = {}
    status = 201
    if serializer.is_valid():
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        data['response'] = "Registration success."
        data['email'] = user.email
        data['token'] = token.key
    else:
        data = serializer.errors
        status = 400
    return Response(data, status)


@api_view(['POST'])
def advertiser_registration_view(request):
    serializer = AdvertiserRegistrationSerializer(data=request.data)
    data = {}
    if serializer.is_valid():
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        data['response'] = "Registration success."
        data['email'] = user.email
        data['company_name'] = user.company_name
        data['token'] = token.key
    else:
        data = serializer.errors
    return Response(data)
