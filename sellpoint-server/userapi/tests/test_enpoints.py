import json
from userapi.serializers import AccountSerializer

from django.http import request, response
from userapi.models import Account
from django.test.testcases import TestCase
from rest_framework.test import APIClient, APIRequestFactory
from rest_framework.authtoken.models import Token
from ..views import user_registration_view, user_detail


class AccountRegistrationTestCase(TestCase):

    def setUp(self) -> None:
        self.client = APIClient()
        self.user_data = {
            "first_name":"Jhonny",
            "last_name":"Test",
            "email":"gmail@gmail.com",
            "password":"testtesttest",
        }
        self.user = Account.objects.create(
            **self.user_data
            )
        self.token = Token.objects.get_or_create(user=self.user)[0]

    def test_user_registration_endpoint(self):
        # Create and post new user
        user_data = self.user_data
        user_data["email"] = "otheremail@gmail.com"

        request = self.client.post('/users/register/user', json.dumps(user_data), content_type='application/json')

        # Test for right code, the created user and that the token is sent.
        self.assertEqual(request.status_code, 201)
        self.assertIsNotNone(Account.objects.get(email=user_data["email"]))
        self.assertIsNotNone(request.data["token"])
    
    def test_endpoint_errors(self):
        """
        Test error handling for the user reg endpoint.
        """
        requests = []

        # No fields request
        requests.append(self.client.post('/users/register/user', json.dumps({}), content_type='application/json'))

        # Existing user request
        requests.append(self.client.post('/users/register/user', json.dumps(self.user_data), content_type='application/json'))

        # Missing field request
        self.user_data.pop("password", None)
        requests.append(self.client.post('/users/register/user', json.dumps(self.user_data), content_type='application/json'))
        
        # Check all wrong request for 400 status response
        map(lambda response: self.assertEqual(response.status_code, 400), requests)

    def test_user_change(self):
        """
        Test the user editing endpoint
        """
        # Create the data to change to.
        user_data = self.user_data
        user_data["first_name"] = "Changed"

        # Try to change unauthenticated.
        request = self.client.put('/users/loggedin', json.dumps(self.user_data), content_type='application/json')
        self.assertEqual(request.status_code, 401)

        # Add authentication and assert the change.
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        request = self.client.put('/users/loggedin', json.dumps(self.user_data), content_type='application/json')
        self.assertEqual(request.status_code, 200)
        self.assertEqual(Account.objects.get(email="gmail@gmail.com").first_name, "Changed")
    
    def test_user_delete(self):
        """
        Test the deletion of an user.
        """
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        request = self.client.delete("/users/loggedin")
        try:
            user = Account.objects.get(email="gmail@gmail.com")
        except Account.DoesNotExist:
            user = None
        self.assertIsNone(user)
    
    def test_user_get(self):
        """
        Test for a logged in user to get itself.
        """

        # Set the user
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        # Get the user details
        request = self.client.get("/users/loggedin")
        
        # Compare details
        self.assertEqual(AccountSerializer(self.user).data, json.loads(request.content))
