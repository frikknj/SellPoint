import json
from listingapi.serializers import ListingSerializer
from userapi.serializers import AccountSerializer

from django.http import request, response
from userapi.models import Account
from listingapi.models import Listing
from django.test.testcases import TestCase
from rest_framework.test import APIClient, APIRequestFactory
from rest_framework.authtoken.models import Token


class ListingsEndpointsTestCase(TestCase):
    def setUp(self) -> None:
        # Init api client and test user with token
        self.client = APIClient()
        self.acc = Account.objects.create(
            email="test@email.com", first_name="Ola", last_name="Nordmann"
        )
        self.token = Token.objects.get_or_create(user=self.acc)[0]

        # Test data with only primitive fields
        self.listing_data = {
            "title": "Test ting",
            "price": 200,
            "advert_location": "Et eller annet sted",
            "type": "Selge",
            "advert_description": "Dette er en ting jeg skal prøve å selle",
            "categorie": "Antikviteter",
            "phone_number": 12345678
        }

        # Create test listing and get the created id
        self.listing = Listing.objects.create(**self.listing_data, seller=self.acc)
        self.listing_id = self.listing.id

    def test_listing_registration_endpoint(self):
        """
        Test listing registration
        """

        # Authenticate the user
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)

        # Post the listing data
        request = self.client.post(
            "/listings/", json.dumps(self.listing_data), content_type="application/json"
        )

        # Test for right code
        self.assertEqual(request.status_code, 201)

        # Check for new listing
        self.assertEqual(len(Listing.objects.all()), 2)

    def test_endpoint_errors(self):
        """
        Test error handling for the user reg endpoint.
        """
        requests = []

        # No fields request
        requests.append(
            self.client.post(
                "/listings/", json.dumps({}), content_type="application/json"
            )
        )

        # No seller request
        requests.append(
            self.client.post(
                "/listings/",
                json.dumps(self.listing_data),
                content_type="application/json",
            )
        )

        # Missing field request
        self.listing_data.pop("title", None)
        requests.append(
            self.client.post(
                "/listings/",
                json.dumps(self.listing_data),
                content_type="application/json",
            )
        )

        # Check all wrong request for 400 status response
        map(lambda response: self.assertEqual(response.status_code, 400), requests)

    def test_user_change(self):
        """
        Test the user editing endpoint
        """
        # Create the data to change to.
        listing_data = self.listing_data
        listing_data["title"] = "Changed"
        listing_data["advert_description"] = "Changed"

        # Try to change unauthenticated.
        request = self.client.put(
            f"/listings/{str(self.listing_id)}/",
            json.dumps(self.listing_data),
            content_type="application/json",
        )
        self.assertEqual(request.status_code, 401)

        # Authenticate the user
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)

        # Add authentication and assert the change.
        request = self.client.put(
            f"/listings/{str(self.listing_id)}/",
            json.dumps(self.listing_data),
            content_type="application/json",
        )
        self.assertEqual(request.status_code, 200)
        changed_listing = Listing.objects.get(id=self.listing_id)
        self.assertEqual(changed_listing.title, "Changed")
        self.assertEqual(changed_listing.advert_description, "Changed")

    def test_listing_delete(self):
        """
        Test deletion of a listing
        """
        # Authenticate the user
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)
        request = self.client.delete(f"/listings/{str(self.listing_id)}/")
        self.assertEqual(request.status_code, 200)
        try:
            listing = Listing.objects.get(id=self.listing_id)
        except Listing.DoesNotExist:
            listing = None
        self.assertIsNone(listing)

    def test_listing_get(self):
        """
        Test for getting a specific listing
        """

        # Authenticate the user
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)

        # Get the user details
        request = self.client.get(f"/listings/{str(self.listing_id)}/")

        # Compare details
        self.assertEqual(
            ListingSerializer(self.listing).data, json.loads(request.content)
        )
