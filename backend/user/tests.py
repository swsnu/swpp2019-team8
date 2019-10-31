from django.test import TestCase, Client

# Create your tests here.
from .models import User

import json


class UserTestCase(TestCase):

    def test_sign_in(self):
        User.objects.create_user(email="dkwanm1@naver.com", password="1", nickname="!", gender="MALE", status="1",
                                 studentId="2018-15722", department="ENGINEERING", major="CSE", studentStatus="student")
        client = Client(enforce_csrf_checks=False)

        response = client.post('/api/user/signin/', json.dumps({'email': "dkwanm1@naver.com", "password" : "1"}),
                    content_type = 'application/json')
        self.assertEqual(response.status_code, 204)
        

