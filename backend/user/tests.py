from django.test import TestCase, Client

# Create your tests here.
from .models import User

import json


class UserTestCase(TestCase):
    def setUp(self):
        new_user = {
            'password': "1",
            'nickname': "!",
            'gender': "MALE",
            'status': "1",
            'studentId': "2018-15722",
            'department': "ENGINEERING",
            'major': "CSE",
            'studentStatus': "student"
        }
        User.objects.create_user(email="dkwanm1@naver.com", new_user=new_user)

    def test_sign_up(self):
        client = Client(enforce_csrf_checks=False)

        response = client.post('/api/user/signup/', json.dumps({'email': "dkwanm1@daum.net", "password": "1", 'nickname': '123', 'gender': 'MALE',
                                                                'status': '1', 'student_id': '2018-11912', 'department': 'Engineering', 'major': 'CSE', 'student_status': 'student'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(User.objects.count(), 2)

    def test_sign_up_bad_request(self):
        client = Client(enforce_csrf_checks=False)

        response = client.post('/api/user/signup/', json.dumps({'ema': "dkwanm1@daum.net", "password": "1", 'nickname': '123', 'gender': 'MALE',
                                                                'status': '1', 'student_id': '2018-11912', 'department': 'Engineering', 'major': 'CSE', 'student_status': 'student'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 400)

    def test_sign_up_not_allowed(self):
        client = Client(enforce_csrf_checks=False)

        response = client.put('/api/user/signup/', json.dumps({'ema': "dkwanm1@daum.net", "password": "1", 'nickname': '123', 'gender': 'MALE',
                                                               'status': '1', 'student_id': '2018-11912', 'department': 'Engineering', 'major': 'CSE', 'student_status': 'student'}),
                              content_type='application/json')
        self.assertEqual(response.status_code, 405)

    def test_sign_in(self):
        client = Client(enforce_csrf_checks=False)

        response = client.post('/api/user/signin/', json.dumps({'email': "dkwanm1@naver.com", "password": "1"}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 201)

    def test_sign_in_none_user(self):
        client = Client(enforce_csrf_checks=False)

        response = client.post('/api/user/signin/', json.dumps({'email': "dkwanm@naver.com", "password": "1"}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 401)

    def test_sign_in_bad_request(self):
        client = Client(enforce_csrf_checks=False)

        response = client.post('/api/user/signin/', json.dumps({'emai': "dkwanm1@naver.com", "password": "1"}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 400)

    def test_sign_in_not_allowed(self):
        client = Client(enforce_csrf_checks=False)

        response = client.put('/api/user/signin/', json.dumps({'emai': "dkwanm1@naver.com", "password": "1"}),
                              content_type='application/json')
        self.assertEqual(response.status_code, 405)

    def test_sign_out(self):
        client = Client(enforce_csrf_checks=False)

        response = client.post('/api/user/signin/', json.dumps({'email': "dkwanm1@naver.com", "password": "1"}),
                               content_type='application/json')

        response = client.get('/api/user/signout/')
        self.assertEqual(response.status_code, 204)

    def test_sign_out_not_authenticated(self):
        client = Client(enforce_csrf_checks=False)

        response = client.get('/api/user/signout/')
        self.assertEqual(response.status_code, 401)

    def test_sign_out_not_allowed(self):
        client = Client(enforce_csrf_checks=False)

        response = client.post('/api/user/signin/', json.dumps({'email': "dkwanm1@naver.com", "password": "1"}),
                               content_type='application/json')

        response = client.put('/api/user/signout/', json.dumps({'email': "dkwanm@naver.com", "password": "1"}),
                              content_type='application/json')
        self.assertEqual(response.status_code, 405)

    def test_get_user_by_email(self):
        client = Client(enforce_csrf_checks=False)

        response = client.get('/api/user/email/dkwanm1@snu.ac.kr/')
        self.assertEqual(response.status_code, 404)

    def test_get_user_by_email_existing_user(self):
        client = Client(enforce_csrf_checks=False)

        response = client.get('/api/user/email/dkwanm1@naver.com/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('dkwanm1@naver.com', response.content.decode())

    def test_get_user_by_email_not_allowed(self):
        client = Client(enforce_csrf_checks=False)

        response = client.delete('/api/user/email/dkwanm1@naver.com/')
        self.assertEqual(response.status_code, 405)

    def test_get_user_by_student_id(self):
        client = Client(enforce_csrf_checks=False)

        response = client.get('/api/user/studentId/2018-11912/')
        self.assertEqual(response.status_code, 404)

    def test_get_user_by_studentId_existing_user(self):
        client = Client(enforce_csrf_checks=False)

        response = client.get('/api/user/studentId/2018-15722/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('2018-15722', response.content.decode())

    def test_get_user_by_student_id_not_allowed(self):
        client = Client(enforce_csrf_checks=False)

        response = client.delete('/api/user/studentId/dkwanm1@naver.com/')
        self.assertEqual(response.status_code, 405)

    def test_get_user_by_nickname(self):
        client = Client(enforce_csrf_checks=False)

        response = client.get('/api/user/nickname/hia/')
        self.assertEqual(response.status_code, 404)

    def test_get_user_by_nickname_existing_user(self):
        client = Client(enforce_csrf_checks=False)

        response = client.get('/api/user/nickname/!/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('2018-15722', response.content.decode())

    def test_get_user_by_nickname_not_allowed(self):
        client = Client(enforce_csrf_checks=False)

        response = client.delete('/api/user/nickname/dkwanm1@naver.com/')
        self.assertEqual(response.status_code, 405)

    def test_check_email_duplicate(self):
        client = Client(enforce_csrf_checks=False)

        response = client.get('/api/user/check/email/dkwanm1@naver.com/')
        self.assertIn('true', response.content.decode())

        response = client.get('/api/user/check/email/dkwanm1@nave/')
        self.assertIn('false', response.content.decode())

        response = client.delete('/api/user/check/email/dkwanm1@naver.com/')
        self.assertEqual(response.status_code, 405)

    def test_check_nickname_duplicate(self):
        client = Client(enforce_csrf_checks=False)

        response = client.get('/api/user/check/nickname/!/')
        self.assertIn('true', response.content.decode())

        response = client.get('/api/user/check/nickname/dkwanm1@nave/')
        self.assertIn('false', response.content.decode())

        response = client.delete('/api/user/check/nickname/dkwanm1@naver.com/')
        self.assertEqual(response.status_code, 405)

    def test_check_student_id_duplicate(self):
        client = Client(enforce_csrf_checks=False)

        response = client.get('/api/user/check/studentId/2018-15722/')
        self.assertIn('true', response.content.decode())

        response = client.get('/api/user/check/studentId/dkwanm1@nave/')
        self.assertIn('false', response.content.decode())

        response = client.delete(
            '/api/user/check/studentId/dkwanm1@naver.com/')
        self.assertEqual(response.status_code, 405)

    def test_get_verifiy_code(self):
        client = Client(enforce_csrf_checks=False)

        response = client.get('/api/user/verifyCode/dkwanm1@naver.com/')
        self.assertEqual(response.status_code, 200)

        response = client.delete('/api/user/verifyCode/1123/')
        self.assertEqual(response.status_code, 405)

    def test_get_user_by_id(self):
        client = Client(enforce_csrf_checks=False)

        new_users = {
            'password': "1",
            'nickname': "123",
            'gender': "MALE",
            'status': "1",
            'studentId': "2018-15721",
            'department': "ENGINEERING",
            'major': "CSE",
            'studentStatus': "student"
        }

        user1 = User.objects.create_user(
            email="dkwanm@naver.com", new_user=new_users)

        response = client.get('/api/user/userId/' + str(user1.id) + '/')
        self.assertEqual(response.status_code, 200)

        response = client.get('/api/user/userId/123141/')
        self.assertEqual(response.status_code, 404)

        response = client.delete('/api/user/userId/123141/')
        self.assertEqual(response.status_code, 405)

    def test_check_sign(self):
        client = Client(enforce_csrf_checks=False)

        response = client.get('/api/user/check/signin/')
        self.assertIn('false', response.content.decode())

        response = client.post('/api/user/signin/', json.dumps({'email': "dkwanm1@naver.com", "password": "1"}),
                               content_type='application/json')

        response = client.get('/api/user/check/signin/')
        self.assertIn('true', response.content.decode())

        response = client.delete('/api/user/check/signin/')
        self.assertEqual(response.status_code, 405)
