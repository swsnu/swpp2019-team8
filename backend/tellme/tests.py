from django.test import TestCase, Client

import json

from .models import Debate, DebateComment
from user.models import User

# Create your tests here.
class DebateTestCase(TestCase):
    def test_debates_by_document(self):
        client = Client()
        user1 = User.objects.create_user(username='swpp', password='iluvswpp')

        response = client.get()
        self.assertEqual(response.status_code, 200)

        #successful post
        response = client.post()
        self.assertEqual(response.status_code, 201)

        #KeyError
        response = client.post()
        self.assertEqual(response.status_code, 400)

        response = client.delete()
        self.assertEqual(response.status_code, 405)

    def test_debate_get(self):
        client = Client()
        user1 = User.objects.create_user(username='swpp', password='iluvswpp')

        #successful get
        response = client.get()
        self.assertEqual(response.status_code, 200)
        
        #attempt to get non-existing debate
        response = client.get()
        self.assertEqual(response.status_code, 404)

        response = client.delete()
        self.assertEqual(response.status_code, 405)

    def test_debate_comments(self):
        client = Client()
        user1 = User.objects.create_user(username='swpp', password='iluvswpp')

        response = client.get()
        self.assertEqual(response.status_code, 200)
        
        #successful post
        response = client.post()
        self.assertEqual(response.status_code, 201)

        #KeyError
        response = client.post()
        self.assertEqual(response.status_code, 400)
        
        response = client.delete()
        self.assertEqual(response.status_code, 405)