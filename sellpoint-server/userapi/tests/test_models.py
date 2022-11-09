from django.test import TestCase
from userapi.models import Account, Advertiser


class AccountTestCase(TestCase):

    def setUp(self):
        Account.objects.create(email="test@email.com",
                               first_name="Ola", last_name="Nordmann")
        Advertiser.objects.create(
            email="adver@tiser.com", first_name="Kari", last_name="Nordmann", company_name="TestComp")

    def test_get_account(self):
        acc = Account.objects.get(email="test@email.com")
        self.assertIsNotNone(acc)
        self.assertEqual(acc.first_name, "Ola")
        self.assertEqual(acc.last_name, "Nordmann")

    def test_get_advertiser(self):
        adv = Advertiser.objects.get(email='adver@tiser.com')
        self.assertIsNotNone(adv)
        self.assertEqual(adv.first_name, "Kari")
        self.assertEqual(adv.last_name, "Nordmann")
        self.assertEqual(adv.company_name, "TestComp")
        self.assertTrue(adv.is_advertiser)
