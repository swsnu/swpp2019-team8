from django.test import TestCase, Client
from .models import Petition, PetitionComment
from user.models import User
from django.utils import timezone
import json

# Create your tests here.

class HearusTestCase(TestCase):
    def setUp(self):
        new_user = User.objects.create_user(email="dkwanm1@naver.com", password="1", nickname="!", gender="MALE", status="1",
                                 studentId="2018-15722", department="ENGINEERING", major="CSE", studentStatus="student")
        new_petition = Petition.objects.create(author=new_user, title="title", content="content", category="category", link="link", tag="tag",
                                 start_date=timezone.now(), votes=2, status="1")
        new_petition2 = Petition.objects.create(author=new_user, title="title2", content="content2", category="category", link="link2", tag="tag2",
                                 start_date=timezone.now(), votes=1, status="1")
        new_comment = PetitionComment.objects.create(author=new_user, petition=new_petition, comment="comment", date=timezone.now())
    def test_petition(self):
        client = Client(enforce_csrf_checks=False)
        response = client.get('/api/hearus/petition/')
        self.assertEqual(response.status_code, 401)
        response = client.post('/api/user/signin/', json.dumps({'email': "dkwanm1@naver.com", "password": "1"}),
                                content_type='application/json')
        response = client.post('/api/hearus/petition/', json.dumps({'title': "testtitle", "content": "testcontent", "category": "testcategory", "link": "testlink",
                                "tag": "tag"}), content_type='application/json')
        self.assertEqual(response.status_code, 201)
        response = client.post('/api/hearus/petition/', json.dumps({'titl': "testtitle", "content": "testcontent", "category": "testcategory", "link": "testlink",
                                "tag": "tag"}), content_type='application/json')
        self.assertEqual(response.status_code, 400)
        response = client.put('/api/hearus/petition/')
        self.assertEqual(response.status_code, 405)

    def test_petition_votes(self):
        client = Client(enforce_csrf_checks=False)
        response = client.get('/api/hearus/petition/category/vote/')
        self.assertEqual(382, len(response.content.decode()))
        response = client.put('/api/hearus/petition/category/vote/')
        self.assertEqual(response.status_code, 405)

    def test_petition_latest(self):
        client = Client(enforce_csrf_checks=False)
        response = client.get('/api/hearus/petition/category/latest/')
        self.assertEqual(382, len(response.content.decode()))
        response = client.put('/api/hearus/petition/category/latest/')
        self.assertEqual(response.status_code, 405)

    def test_petition_petitionid(self):
        client = Client(enforce_csrf_checks=False)
        response = client.get('/api/hearus/petition/1/')
        self.assertEqual(184,len(response.content.decode()))
        response = client.get('/api/hearus/petition/3/')
        self.assertEqual(response.status_code, 404)
        response = client.put('/api/hearus/petition/1/')
        self.assertEqual(response.status_code, 405)

    def test_petition_userid(self):
        client = Client(enforce_csrf_checks=False)
        response = client.get('/api/hearus/petition/user/1/')
        self.assertEqual(189,len(response.content.decode()))
        response = client.put('/api/hearus/petition/user/1/')
        self.assertEqual(response.status_code, 405)

    def test_petition_comment(self):
        client = Client(enforce_csrf_checks=False)
        response = client.get('/api/hearus/petition/1/comment/')
        self.assertEqual(102,len(response.content.decode()))
        response = client.post('/api/hearus/petition/1/comment/', json.dumps({"comment": "testcomment"}),
                                content_type='application/json')
        self.assertEqual(response.status_code, 401)
        response = client.post('/api/user/signin/', json.dumps({'email': "dkwanm1@naver.com", "password": "1"}),
                                content_type='application/json')
        response = client.post('/api/hearus/petition/1/comment/', json.dumps({"comment": "testcomment"}),
                                content_type='application/json')
        self.assertEqual(response.status_code, 201)
        response = client.post('/api/hearus/petition/1/comment/', json.dumps({"commnt": "testcomment"}),
                                content_type='application/json')
        self.assertEqual(response.status_code, 400)
        response = client.put('/api/hearus/petition/1/comment/')
        self.assertEqual(response.status_code, 405)

