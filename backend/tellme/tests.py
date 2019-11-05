from django.test import TestCase, Client
from django.utils import timezone

import json

from .models import Debate, DebateComment, Document
from user.models import User


#For copy-paste purposes 
#client = Client()
#user1 = User.objects.create_user(email='user@snu.ac.kr', password='iluvswpp', nickname='user1', gender='male', status='student', studentId='2018-12345', department='engineering', major='cse', studentStatus='undergrad')
#doc1 = Document.objects.create(title='title', content='content')
#debate1 = Debate.objects.create(document=doc1, author=user1, title='title', content='content')
#comment1 = DebateComment.objects.create(debate=debate1, author=user1, comment='comment', date=datetime.datetime.now())
#response = client.post('/api/.../', json.dumps({}), content_type='application/json')

# Create your tests here.
class DebateTestCase(TestCase):
    # def setUp(self):
    #     user1 = User.objects.create_user(email='user@snu.ac.kr', password='iluvswpp', nickname='user1', gender='male', status='student', studentId='2018-12345', department='engineering', major='cse', studentStatus='undergrad')
    #     doc1 = Document.objects.create(title='title', content='content')
    #     debate1 = Debate.objects.create(document=doc1, author=user1, title='title', content='content')
    #     comment1 = DebateComment.objects.create(debate=debate1, author=user1, comment='content', date=timezone.now())
    
    def test_debates_by_document(self):
        client = Client(enforce_csrf_checks=False)        
   
        user1 = User.objects.create_user(email='user@snu.ac.kr', password='iluvswpp', nickname='user1', gender='male', status='student', studentId='2018-12345', department='engineering', major='cse', studentStatus='undergrad')
        doc1 = Document.objects.create(title='title', content='content')
        debate1 = Debate.objects.create(document=doc1, author=user1, title='title', content='content')
        comment1 = DebateComment.objects.create(debate=debate1, author=user1, comment='content', date=timezone.now())
   

        #post without login
        response = client.post('/api/tellme/document/title/debate/', json.dumps({'title':'First debate', 'content':'Content'}), content_type='application/json')
        self.assertEqual(response.status_code, 401)

        #login
        response = client.post('/api/user/signin/', json.dumps({'email': 'user@snu.ac.kr', 'password': 'iluvswpp'}),
                                content_type='application/json')

        #successful post
        response = client.post('/api/tellme/document/title/debate/', json.dumps({'title':'First debate', 'content':'testcontent'}), content_type='application/json')
        self.assertEqual(response.status_code, 201)

        #KeyError
        response = client.post('/api/tellme/document/title/debate/', json.dumps({'mama':'baba'}), content_type='application/json')
        self.assertEqual(response.status_code, 400)

        #successful get
        response = client.get('/api/tellme/document/title/debate/')
        self.assertEqual(response.status_code, 200)

        #unsuccessful get - get non-existing document's debates
        response = client.get('/api/tellme/document/wrong/debate/')
        self.assertEqual(response.status_code, 404)

        response = client.delete('/api/tellme/document/title/debate/')
        self.assertEqual(response.status_code, 405)


    def test_debate_get(self):
        client = Client(enforce_csrf_checks=False)    
        
        user1 = User.objects.create_user(email='user@snu.ac.kr', password='iluvswpp', nickname='user1', gender='male', status='student', studentId='2018-12345', department='engineering', major='cse', studentStatus='undergrad')
        doc1 = Document.objects.create(title='title', content='content')
        debate1 = Debate.objects.create(document=doc1, author=user1, title='title', content='content')

        #attempt to get non-existing debate
        response = client.get('/api/tellme/document/title/debate/12341234/')
        self.assertEqual(response.status_code, 404)

        #successful get
        response = client.get('/api/tellme/document/title/debate/1/')
        self.assertEqual(response.status_code, 200)

        response = client.delete('/api/tellme/document/title/debate/1/')
        self.assertEqual(response.status_code, 405)

    def test_debate_comments(self):
        client = Client(enforce_csrf_checks=False)        

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
