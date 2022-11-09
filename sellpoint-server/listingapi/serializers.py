from rest_framework import serializers
from listingapi.models import Listing, Advertisement


class ListingSerializer(serializers.ModelSerializer):
    """
    Serializer for listings
    """

    class Meta:

        # Serialize all fields
        model = Listing
        fields = [
            "id",
            "title",
            "price",
            "advert_location",
            "type",
            "advert_description",
            "seller",
            "date_created",
            "categorie",
            "image",
            "phone_number"
        ]

        extra_kwargs = {
            "date_created": {"read_only": True},
            "image": {"required": False},
            "id": {"read_only": True},
            "seller": {"read_only": True},
        }



class AdvertisementSerializer(serializers.ModelSerializer):
    """
    Serializer for Advertisement
    """

    class Meta:

        # Serialize all fields
        model = Advertisement
        fields = [
            "company_name",
            "title",
            "published",
            "image",
            "advertisement_description",
            "owner"
            
        ]

        extra_kwargs = {
            "published": {"read_only": True},
            "owner": {"read_only": True},
        }

""" test """
