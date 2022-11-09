from django.test import TestCase
from userapi.models import Account, Advertiser
from userapi.serializers import AccountSerializer, AdvertiserRegistrationSerializer, AccountRegistrationSerializer


class AccountTestCase(TestCase):

    def setUp(self):
        Account.objects.create(email="test@email.com",
                               first_name="Ola", last_name="Nordmann")
        Advertiser.objects.create(
            email="adver@tiser.com", first_name="Kari", last_name="Nordmann", company_name="TestComp")

    def test_serialize_account(self):
        """
        Testing serializing accounts from the database.
        """
        serializer = AccountSerializer(Account.objects.get(email="test@email.com"))
        account_data = serializer.data
        self.assertEqual(account_data["first_name"], "Ola")
        self.assertEqual(account_data["last_name"], "Nordmann")
        self.assertEqual(account_data["email"], "test@email.com")

    def test_serialize_advertiser(self):
        """
        Testing serializing advertizers from the database.
        """
        serializer = AdvertiserRegistrationSerializer(Advertiser.objects.get(email="adver@tiser.com"))
        account_data = serializer.data
        self.assertEqual(account_data["first_name"], "Kari")
        self.assertEqual(account_data["last_name"], "Nordmann")
        self.assertEqual(account_data["email"], "adver@tiser.com")
        self.assertEqual(account_data["company_name"], "TestComp")
    
    def test_save_account(self):
        """
        Testing account saving with the serializer.
        """
        # Create testdata
        data = {
            "email":"new@gmail.com",
            "first_name":"New",
            "last_name":"Name",
            "password":"NewPassword"
        }
        # Validate and save the testuser
        serializer = AccountRegistrationSerializer(data=data)
        serializer.is_valid()
        user = serializer.save()

        # Create find the created user and compare with the saved user.
        self.assertIsNotNone(database_user := Account.objects.get(email="new@gmail.com"))
        self.assertEqual(user, database_user)

        # Serialize the created user and compare with the testdata.
        serialized_data = AccountSerializer(database_user).data
        data.pop("password", None)
        serialized_data.pop("id", None)
        serialized_data.pop("is_advertiser", None)
        self.assertEqual(serialized_data, data, "Data for user before and after should be equal.")
