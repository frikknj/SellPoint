from django.test import TestCase
from listingapi.models import Listing
from userapi.models import Account


class ListingTestCase(TestCase):

    """
    Testing simple creation and querying.
    """

    def setUp(self) -> None:
        # Add test user
        acc = Account.objects.create(
            email="test@email.com", first_name="Ola", last_name="Nordmann"
        )
        # Create test listing
        self.listing = Listing.objects.create(
            title="Test ting",
            price=200,
            advert_location="Et eller annet sted",
            type="Selge",
            advert_description="Dette er en ting jeg skal prøve å selle",
            categorie="Antikviteter",
            seller=acc,
            phone_number=12345678
        )

    # Test if the listing could be created and is the same
    def test_get_listing(self):
        listing = Listing.objects.last()
        self.assertIsNotNone(listing)
        self.assertEqual(self.listing, listing)