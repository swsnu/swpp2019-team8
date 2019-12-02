from django.test import TestCase, Client
from django.utils import timezone

import json

from .models import Debate, DebateComment, Document, Photo
from user.models import User


# For copy-paste purposes
# client = Client()
# user1 = User.objects.create_user(email='user@snu.ac.kr', password='iluvswpp', nickname='user1', gender='male', status='student', studentId='2018-12345', department='engineering', major='cse', studentStatus='undergrad')
# doc1 = Document.objects.create(title='title', content='content')
# debate1 = Debate.objects.create(document=doc1, author=user1, title='title', content='content')
# comment1 = DebateComment.objects.create(debate=debate1, author=user1, comment='comment', date=datetime.datetime.now())
# response = client.post('/api/.../', json.dumps({}), content_type='application/json')

# Create your tests here.
class DebateTestCase(TestCase):

    def test_photo_get(self):
        client = Client(enforce_csrf_checks=False)

        new_user = {
            'password': "iluvswpp",
            'nickname': "user1",
            'gender': "male",
            'status': "student",
            'studentId': "2018-12345",
            'department': "engineering",
            'major': "cses",
            'studentStatus': "undergrad"
        }

        user1 = User.objects.create_user(
            email='user@snu.ac.kr',
            new_user=new_user
        )
        photo = Photo.objects.create(photo="1", title="!", content="2")


        response = client.post('/api/user/signin/', json.dumps({'email': 'user@snu.ac.kr', 'password': 'iluvswpp'}),
                               content_type='application/json')

        expected = {
            'photo': '1',
            'title': '!',
            'content': '2'
        }
        response = client.get('/api/tellme/photo/!/')
        self.assertEqual(response.status_code, 200)

        response = client.get('/api/tellme/photo/123/')
        self.assertEqual(response.status_code, 404)

        response = client.delete('/api/tellme/photo/!/')
        self.assertEqual(response.status_code, 405)

    def test_document_post(self):
        client = Client(enforce_csrf_checks=False)

        new_user = {
            'password': "iluvswpp",
            'nickname': "user1",
            'gender': "male",
            'status': "student",
            'studentId': "2018-12345",
            'department': "engineering",
            'major': "cses",
            'studentStatus': "undergrad"
        }

        user1 = User.objects.create_user(
            email='user@snu.ac.kr',
            new_user=new_user
        )

        response = client.post('/api/user/signin/', json.dumps({'email': 'user@snu.ac.kr', 'password': 'iluvswpp'}),
                               content_type='application/json')

        # succesfull post
        response = client.post('/api/tellme/document/', json.dumps({"title": "1", "content": "1"}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 201)

        # bad request
        response = client.post('/api/tellme/document/', json.dumps({"tile": "1", "content": "1"}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 400)

        response = client.post('/api/tellme/document/', json.dumps({"title": "1", "content": "1", "!@3": "!@"}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 400)

        # not allowed request
        response = client.get('/api/tellme/document/')
        self.assertEqual(response.status_code, 405)

    def test_document_put(self):
        client = Client(enforce_csrf_checks=False)

        new_user = {
            'password': "iluvswpp",
            'nickname': "user1",
            'gender': "male",
            'status': "student",
            'studentId': "2018-12345",
            'department': "engineering",
            'major': "cses",
            'studentStatus': "undergrad"
        }

        user1 = User.objects.create_user(
            email='user@snu.ac.kr',
            new_user=new_user
        )
        doc1 = Document.objects.create(title='title', content='content')

        response = client.post('/api/user/signin/', json.dumps({'email': 'user@snu.ac.kr', 'password': 'iluvswpp'}),
                               content_type='application/json')

        response = client.put('/api/tellme/document/title/', json.dumps({'target': 'title', 'content': '123'}),
                              content_type='application/json')
        self.assertEqual(response.status_code, 201)

        response = client.put('/api/tellme/document/title/', json.dumps({'target': 'TI', 'content': '123'}),
                              content_type='application/json')
        self.assertEqual(response.status_code, 404)

        response = client.put('/api/tellme/document/title/', json.dumps({'tar': 'title', 'content': '123'}),
                              content_type='application/json')
        self.assertEqual(response.status_code, 400)

        response = client.post('/api/tellme/document/title/', json.dumps({'tar': 'title', 'content': '123'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 405)

    def test_doucment_get(self):
        client = Client(enforce_csrf_checks=False)

        new_user = {
            'password': "iluvswpp",
            'nickname': "user1",
            'gender': "male",
            'status': "student",
            'studentId': "2018-12345",
            'department': "engineering",
            'major': "cses",
            'studentStatus': "undergrad"
        }

        user1 = User.objects.create_user(
            email='user@snu.ac.kr',
            new_user=new_user
        )
        doc1 = Document.objects.create(title='title', content='content')
        Document.objects.create(title='Titles', content='content, title')
        Document.objects.create(title='contentUpper', content='Content, title')
        Document.objects.create(
            title='Titsadaes', content='find fucking Contents!!!')

        response = client.post('/api/user/signin/', json.dumps({'email': 'user@snu.ac.kr', 'password': 'iluvswpp'}),
                               content_type='application/json')

        response = client.get('/api/tellme/document/Title/')
        self.assertIn('true', response.content.decode())

        response = client.get('/api/tellme/document/content/')
        self.assertIn('false', response.content.decode())

        response = client.get('/api/tellme/document/wtf/')
        self.assertIn('false', response.content.decode())

    def test_debates_by_document(self):
        client = Client(enforce_csrf_checks=False)

        new_user = {
            'password': "iluvswpp",
            'nickname': "user1",
            'gender': "male",
            'status': "student",
            'studentId': "2018-12345",
            'department': "engineering",
            'major': "cses",
            'studentStatus': "undergrad"

        }

        user1 = User.objects.create_user(
            email='user@snu.ac.kr',
            new_user=new_user
        )
        doc1 = Document.objects.create(title='title', content='content')
        debate1 = Debate.objects.create(
            document=doc1, author=user1, title='title', content='content')

        # post without login
        response = client.post('/api/tellme/document/title/debate/', json.dumps(
            {'title': 'First debate', 'content': 'Content'}), content_type='application/json')
        self.assertEqual(response.status_code, 401)

        # login
        response = client.post('/api/user/signin/', json.dumps({'email': 'user@snu.ac.kr', 'password': 'iluvswpp'}),
                               content_type='application/json')

        # successful post
        response = client.post('/api/tellme/document/title/debate/', json.dumps(
            {'title': 'First debate', 'content': 'testcontent'}), content_type='application/json')
        self.assertEqual(response.status_code, 201)

        # KeyError
        response = client.post('/api/tellme/document/title/debate/',
                               json.dumps({'mama': 'baba'}), content_type='application/json')
        self.assertEqual(response.status_code, 400)

        # successful get
        response = client.get('/api/tellme/document/title/debate/')
        self.assertEqual(response.status_code, 200)

        # unsuccessful get - get non-existing document's debates
        response = client.get('/api/tellme/document/wrong/debate/')
        self.assertEqual(response.status_code, 404)

        response = client.delete('/api/tellme/document/title/debate/')
        self.assertEqual(response.status_code, 405)

    def test_debate_get(self):
        client = Client(enforce_csrf_checks=False)

        new_user = {
            'password': "luvswpp",
            'nickname': "user1",
            'gender': "male",
            'status': "student",
            'studentId': "2018-12345",
            'department': "engineering",
            'major': "cses",
            'studentStatus': "undergrad"

        }

        user1 = User.objects.create_user(
            email='user@snu.ac.kr',
            new_user=new_user
        )
        doc1 = Document.objects.create(title='title', content='content')
        debate1 = Debate.objects.create(
            document=doc1, author=user1, title='title', content='content')

        # attempt to get non-existing debate
        response = client.get('/api/tellme/document/title/debate/12341234/')
        self.assertEqual(response.status_code, 404)

        # successful get
        response = client.get(
            '/api/tellme/document/title/debate/' + str(debate1.id) + '/')
        self.assertEqual(response.status_code, 200)

        # wrong request
        response = client.delete('/api/tellme/document/title/debate/1/')
        self.assertEqual(response.status_code, 405)

    def test_debate_comments(self):
        client = Client(enforce_csrf_checks=False)

        new_user2 = {
            'password': "iluvswpp",
            'nickname': "user1",
            'gender': "male",
            'status': "student",
            'studentId': "2018-12345",
            'department': "engineering",
            'major': "cse",
            'studentStatus': "undergrad"
        }

        user1 = User.objects.create_user(
            email='user@snu.ac.kr',
            new_user=new_user2
        )
        doc1 = Document.objects.create(title='title', content='content')
        debate1 = Debate.objects.create(
            document=doc1, author=user1, title='title', content='content')
        comment1 = DebateComment.objects.create(
            debate=debate1, author=user1, comment='content', date=timezone.now())

        # Get has no error when there are no comments
        response = client.get('/api/tellme/debate/1/')
        self.assertEqual(response.status_code, 200)

        # No debate
        response = client.get('/api/tellme/debate/112341234/')
        self.assertEqual(response.status_code, 404)

        # post without login
        response = client.post(
            '/api/tellme/debate/1/', json.dumps({'comment': 'Wow!'}), content_type='application/json')
        self.assertEqual(response.status_code, 401)

        # login
        response = client.post('/api/user/signin/', json.dumps({'email': 'user@snu.ac.kr', 'password': 'iluvswpp'}),
                               content_type='application/json')

        # successful post
        response = client.post(
            '/api/tellme/debate/1/', json.dumps({'comment': 'Wow!'}), content_type='application/json')
        self.assertEqual(response.status_code, 201)

        # KeyError
        response = client.post(
            '/api/tellme/debate/1/', json.dumps({'mama': 'baba'}), content_type='application/json')
        self.assertEqual(response.status_code, 400)

        # wrong request
        response = client.delete('/api/tellme/debate/1/')
        self.assertEqual(response.status_code, 405)
