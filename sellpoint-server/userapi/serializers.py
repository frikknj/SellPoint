from django.db.models import fields
from rest_framework import serializers
from .models import Account, Advertiser


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'first_name', 'last_name', 'email', 'password', 'is_advertiser']
        extra_kwargs = {
            'password': {'write_only': True, 'required': False}
        }

    def save(self):
        user = self.instance
        user.email = self.validated_data['email']
        user.first_name = self.validated_data['first_name']
        user.last_name = self.validated_data['last_name']
        if password := self.validated_data.get('password', None):
            user.set_password(password)
        user.save()
        return user


class AccountRegistrationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Account
        fields = ['first_name', 'last_name', 'email', 'password', 'is_advertiser']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def save(self):
        user = Account(email=self.validated_data['email'],
                       first_name=self.validated_data['first_name'],
                       last_name=self.validated_data['last_name'])
        password = self.validated_data['password']
        user.set_password(password)
        user.save()
        return user


class AdvertiserRegistrationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Advertiser
        fields = ['email', 'first_name',
                  'last_name', 'company_name', 'password', 'is_advertiser']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def save(self):
        user = Advertiser(email=self.validated_data['email'],
                          first_name=self.validated_data['first_name'],
                          last_name=self.validated_data['last_name'],
                          company_name=self.validated_data['company_name'])
        password = self.validated_data['password']
        user.set_password(password)
        user.save()
        return user
