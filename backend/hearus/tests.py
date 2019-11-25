from django.test import TestCase, Client
from .models import Petition, PetitionComment
from .tasks import status_changer,check_fail,check_end
from unittest.mock import patch
from user.models import User
from django.utils import timezone
from datetime import timedelta
import json

# Create your tests here.


class HearusTestCase(TestCase):

    def setUp(self):
        new_use = {
            'password': "1",
            'nickname': "!",
            'gender': "MALE",
            'status': "1",
            'studentId': "2018-15722",
            'department': "ENGINEERING",
            'major': "CSE",
            'studentStatus': "student"
        }
        new_user = User.objects.create_user(
            email="dkwanm1@naver.com", new_user=new_use)
        new_petition = Petition.objects.create(author=new_user, title="title", content="content", category="category", link="link", tag="tag",
                                 start_date=timezone.now(), end_date=timezone.now()+timedelta(days=30), votes=2, status="preliminary", url="1")
        new_petition2 = Petition.objects.create(author=new_user, title="title2", content="content2", category="category", link="link2", tag="tag2",
                                 start_date=timezone.now(), end_date=timezone.now()+timedelta(days=30),votes=1, status="ongoing", url="2")
        new_comment = PetitionComment.objects.create(author=new_user, petition=new_petition, comment="comment", date=timezone.now())
        
    @patch('hearus.tasks.status_changer')
    def test_status_changer(self,petition_id):
        status_changer(petition_id=1)

    @patch('hearus.tasks.check_fail')
    def test_fail(self,petition_id):
        check_fail(petition_id=1)
        petition = Petition.objects.get(id=1)
        self.assertEqual(petition.status, 'fail')

    @patch('hearus.tasks.check_end')
    def test_end(self,petition_id):
        check_end(petition_id=2)
        petition = Petition.objects.get(id=2)
        self.assertEqual(petition.status, 'end')

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

    def test_petition_list(self):
        client = Client(enforce_csrf_checks=False)
        response = client.get('/api/hearus/petition/petitions/')
        self.assertEqual(250, len(response.content.decode()))
        response = client.put('/api/hearus/petition/petitions/')
        self.assertEqual(response.status_code, 405)

    def test_petition_search_by_title(self):
        client = Client(enforce_csrf_checks=False)
        response = client.get('/api/hearus/petition/petition_title/title2/')
        self.assertEqual(250,len(response.content.decode()))
        response = client.delete('/api/hearus/petition/petition_title/title2/')
        self.assertEqual(response.status_code, 405)

    def test_petition_petitionurl(self):
        client = Client(enforce_csrf_checks=False)
        response = client.get('/api/hearus/petition/1/')
        self.assertEqual(245,len(response.content.decode()))
        response = client.get('/api/hearus/petition/3/')
        self.assertEqual(response.status_code, 404)
        response = client.delete('/api/hearus/petition/1/')
        self.assertEqual(response.status_code, 405)

    def test_petition_userid(self):
        client = Client(enforce_csrf_checks=False)
        response = client.get('/api/hearus/petition/user/1/')
        self.assertEqual(250,len(response.content.decode()))
        response = client.put('/api/hearus/petition/user/1/')
        self.assertEqual(response.status_code, 405)

    def test_petition_comment(self):
        client = Client(enforce_csrf_checks=False)
        response = client.get('/api/hearus/petition/1/comment/')

        self.assertEqual(102, len(response.content.decode()))
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

    def test_download_csv(self):
        client = Client(enforce_csrf_checks=False)

        response = client.post('/api/user/signin/', json.dumps({'email': "dkwanm1@naver.com", "password": "1"}),
                               content_type='application/json')

        petition = Petition.objects.get(title="title")

        response = client.get('/api/hearus/petition/' + str(petition.id) + '/download/')
        self.assertEqual(response.status_code, 200)

        response = client.get('/api/hearus/petition/123124/download/')
        self.assertEqual(response.status_code, 404)

        response = client.delete('/api/hearus/petition/' + str(petition.id) + '/download/')
        self.assertEqual(response.status_code, 405)
