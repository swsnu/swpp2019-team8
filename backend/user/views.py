from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, HttpResponseNotFound, JsonResponse

from django.core.exceptions import ObjectDoesNotExist
from django.views.decorators.csrf import ensure_csrf_cookie

import json
import string
import random

from .models import User
from django.contrib.auth import authenticate, login, logout
from django.forms.models import model_to_dict
from django.core.mail import EmailMessage, send_mail
# Create your views here.


def sign_up(request):
    if request.method == 'POST':
        try:
            body = request.body.decode()
            new_email = json.loads(body)['email']
            new_password = json.loads(body)['password']
            new_nickname = json.loads(body)['nickname']
            new_gender = json.loads(body)['gender']
            new_status = json.loads(body)['status']
            new_student_id = json.loads(body)['student_id']
            new_department = json.loads(body)['department']
            new_major = json.loads(body)['major']
            new_student_status = json.loads(body)['student_status']
        except (KeyError, json.JSONDecodeError) as e:
            return HttpResponseBadRequest()
        new_user = {
            'password': new_password,
            'nickname': new_nickname,
            'gender': new_gender,
            'status': new_status,
            'studentId': new_student_id,
            'department': new_department,
            'major': new_major,
            'studentStatus': new_student_status
        }
        User.objects.create_user(email=new_email, new_user=new_user)
        return HttpResponse(status=201)
    else:
        return HttpResponseNotAllowed(['POST'])


def sign_in(request):
    if request.method == 'POST':
        try:
            body = request.body.decode()
            user_email = json.loads(body)['email']
            user_password = json.loads(body)['password']
        except (KeyError, json.JSONDecodeError) as e:
            return HttpResponseBadRequest()
        user = authenticate(email=user_email, password=user_password)
        if user is None:
            return HttpResponse(status=401)
        else:
            login(request, user)
            selected_user = User.objects.get(email=user_email)
            user_to_return = {
                'selectedUser': model_to_dict(selected_user)
            }
            return JsonResponse(user_to_return, status=201, safe=False)
    else:
        return HttpResponseNotAllowed(['POST'])


def sign_out(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    if request.method == 'GET':
        logout(request)
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])


def get_verify_code(request, email):
    if request.method == 'GET':
        verify_code = ""
        for i in range(1, 6):
            verify_code += str(random.randint(0, 9))
            i = i + 1
        send_mail(
            "hi",
            verify_code,
            "dkwanm1@snu.ac.kr",
            [email],
            fail_silently=False)
        email = EmailMessage(
            '인증 메일입니다.',
            '인증 번호는 ' + verify_code + ' 입니다.',
            to=[email]
        )
        verify_code_to_return = {
            'verifyCode': verify_code
        }
        return JsonResponse(verify_code_to_return, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])


def user_to_mod(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    if request.method == 'GET':
        dict_to_return = {
            'id': request.user.id,
            'email': request.user.email,
            'nickname': request.user.nickname,
            'gender': request.user.gender,
            'status': request.user.status,
            'studentId': request.user.studentId,
            'department': request.user.department,
            'major' : request.user.major,
            'studentStatus': request.user.studentStatus
        }
        return JsonResponse(dict_to_return, status=200, safe=False)
    elif request.method == 'PUT':
        try:
            body = request.body.decode()
            user_email = json.loads(body)['email']
            user_password = json.loads(body)['password']
            user_status = json.loads(body)['status']
            user_student_status = json.loads(body)['studentStatus']
            user_student_id = json.loads(body)['studentId']
            user_departmet = json.loads(body)['department']
            user_major = json.loads(body)['major']
        except (KeyError, json.JSONDecodeError):
            return HttpResponseBadRequest()
        edit_user = User.objects.get(id=request.user.id)
        if not user_password == '':
            edit_user.set_password(user_password)
        edit_user.status = user_status
        edit_user.department = user_departmet
        edit_user.major = user_major
        edit_user.studentStatus = user_student_status
        edit_user.studentId = user_student_id
        edit_user.save()
        request.user.password = edit_user.password
        user = authenticate(email=user_email, password=user_password)
        login(request, user)
        return HttpResponse(status=200)
    else:
        return HttpResponseNotAllowed(['GET','PUT'])


def get_user_by_email(request, email):
    if request.method == 'GET':
        try:
            selected_user = User.objects.get(email=email)
        except ObjectDoesNotExist:
            return HttpResponseNotFound()
        user = model_to_dict(selected_user)
        user_to_return = {
            'selectedUser': user
        }
        return JsonResponse(user_to_return, status=200, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])


def get_user_by_user_id(request, user_id):
    if request.method == 'GET':
        try:
            selected_user = User.objects.get(id=user_id)
        except ObjectDoesNotExist:
            return HttpResponseNotFound()
        user = model_to_dict(selected_user)
        user_to_return = {
            'selectedUser': user
        }
        return JsonResponse(user_to_return, status=200, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])


def get_user_by_student_id(request, student_id):
    if request.method == 'GET':
        try:
            selected_user = User.objects.get(studentId=student_id)
        except ObjectDoesNotExist:
            return HttpResponseNotFound()
        user = model_to_dict(selected_user)
        user_to_return = {
            'selectedUser': user
        }
        return JsonResponse(user_to_return, status=200, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])


def get_user_by_nickname(request, nickname):
    if request.method == 'GET':
        try:
            selected_user = User.objects.get(nickname=nickname)
        except ObjectDoesNotExist:
            return HttpResponseNotFound()
        user = model_to_dict(selected_user)
        user_to_return = {
            'selectedUser': user
        }
        return JsonResponse(user_to_return, status=200, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])


def check_email_duplicate(request, email):
    if request.method == 'GET':
        selected_user = User.objects.filter(email=email).exists()
        if selected_user == False:
            dict_to_return = {
                'emailDuplicate': False
            }
            return JsonResponse(dict_to_return, safe=False)
        else:
            dict_to_return = {
                'emailDuplicate': True
            }
            return JsonResponse(dict_to_return, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])


def check_nickname_duplicate(request, nickname):
    if request.method == 'GET':
        selected_user = User.objects.filter(nickname=nickname).exists()
        if selected_user == False:
            dict_to_return = {
                'nicknameDuplicate': False
            }
            return JsonResponse(dict_to_return, safe=False)
        else:
            dict_to_return = {
                'nicknameDuplicate': True
            }
            return JsonResponse(dict_to_return, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])


def check_student_id_duplicate(request, student_id):
    if request.method == 'GET':
        selected_user = User.objects.filter(studentId=student_id).exists()
        if selected_user == False:
            dict_to_return = {
                'studentIdDuplicate': False
            }
            return JsonResponse(dict_to_return, safe=False)
        else:
            dict_to_return = {
                'studentIdDuplicate': True
            }
            return JsonResponse(dict_to_return, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])


@ensure_csrf_cookie
def check_signin(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            json_to_return = {
                'selectedUser': {
                    'id': request.user.id,
                    'nickname': request.user.nickname
                },
                'signIn': True
            }
            return JsonResponse(json_to_return, safe=False)
        else:
            json_to_return = {
                'selectedUser': '',
                'signIn': False
            }
            return JsonResponse(json_to_return, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])
