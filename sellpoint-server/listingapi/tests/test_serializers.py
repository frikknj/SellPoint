from django.test import TestCase
from rest_framework import serializers
from listingapi.models import Listing
from userapi.models import Account
from listingapi.serializers import ListingSerializer


class ListingSerializerTestCase(TestCase):
    """
    Tests for serialization of Listings
    """

    def setUp(self) -> None:
        # Create seller
        self.acc = Account.objects.create(
            email="test@email.com", first_name="Ola", last_name="Nordmann"
        )

        # Test-data without non primitive fields
        self.listing_data = {
            "title": "Test ting",
            "price": 200,
            "advert_location": "Et eller annet sted",
            "type": "Selge",
            "advert_description": "Dette er en ting jeg skal prøve å selle",
            "categorie": "Antikviteter",
            "phone_number": 12345678
        }

        # Create listing
        Listing.objects.create(**self.listing_data, seller=self.acc)

    def test_serialize_listing(self):
        """
        Testing serializing listings from the database.
        """

        # Get the created Listing
        last_listing = Listing.objects.last()
        serializer = ListingSerializer(last_listing)

        # Ckeck trough all testfields
        for key, value in self.listing_data.items():
            self.assertEqual(serializer.data[key], value)

        # Check last two non primitive modelfields
        self.assertEqual(serializer.data["seller"], self.acc.id)
        self.assertEqual(
            serializer.data["date_created"], str(last_listing.date_created)
        )

    def test_save_listing(self):
        """
        Testing saving with serializer
        """

        # Delete all entries
        Listing.objects.all().delete()

        # Init serializer with seller and save
        serializer = ListingSerializer(Listing(seller=self.acc), data=self.listing_data)
        serializer.is_valid()
        serializer.save()

        # Look if the new listing is created
        self.assertIsNotNone(db_listing := Listing.objects.last())

        # Check for all matching fields
        for field, value in self.listing_data.items():
            self.assertEqual(value, getattr(db_listing, field))

        # And the seller
        self.assertEqual(self.acc, db_listing.seller)