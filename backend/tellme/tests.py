from django.test import TestCase, Client

import json

from .models import Debate, DebateComment
from user.models import User

# Create your tests here.
class DebateTestCase(TestCase):
    def test_debates_by_document(self):
        client = Client()
        User.objects.create_user(username='swpp', password='iluvswpp')

        response = client.get()
        self.assertEqual(response.status_code,)

        response = client.post()
        self.assertEqual(response.status_code,)

    def test_debate_get(self):
        client = Client()
        User.objects.create_user(username='swpp', password='iluvswpp')

        response = client.get()
        self.assertEqual(response.status_code,)

    def test_debate_comments(self):
        client = Client()
        User.objects.create_user(username='swpp', password='iluvswpp')

        response = client.get()
        self.assertEqual(response.status_code,)
        
        response = client.post()
        self.assertEqual(response.status_code,)