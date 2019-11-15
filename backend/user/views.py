from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, HttpResponseNotFound, JsonResponse

from django.core.exceptions import ObjectDoesNotExist

import json
import string
import random

from .models import User
from django.contrib.auth import authenticate, login, logout
from django.forms.models import model_to_dict
from django.core.mail import EmailMessage
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
        User.objects.create_user(email=new_email, password=new_password, nickname=new_nickname, gender=new_gender, status=new_status,
                                 studentId=new_student_id, department=new_department, major=new_major, studentStatus=new_student_status)
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
            verify_code += str(random.randint(0,9))
        email = EmailMessage(
            '인증 메일입니다.',
            '인증 번호는 ' + verify_code + ' 입니다.',
            to=[email]
        )
        email.send()
        verify_code_to_return = {
            'verifyCode': verify_code
        }
        return JsonResponse(verify_code_to_return, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])


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
        selected_user = User.objects.filter(email=email)
        if (selected_user.count() == 0):
            dict_to_return = {
                'emailDuplicate' : False
            }
            return JsonResponse(dict_to_return, safe=False)
        else:
            dict_to_return = {
                'emailDuplicate' : True
            }
            return JsonResponse(dict_to_return, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])

def check_nickname_duplicate(request, nickname):
    if request.method == 'GET':
        selected_user = User.objects.filter(nickname=nickname)
        if (selected_user.count() == 0):
            dict_to_return = {
                'nicknameDuplicate' : False
            }
            return JsonResponse(dict_to_return, safe=False)
        else:
            dict_to_return = {
                'nicknameDuplicate' : True
            }
            return JsonResponse(dict_to_return, safe=False)
    else:
        return HttpResponseNotAllowed(['GET']) 

def check_student_id_duplicate(request, student_id):
    if request.method == 'GET':
        selected_user = User.objects.filter(studentId=student_id)
        if (selected_user.count() == 0):
            dict_to_return = {
                'studentIdDuplicate' : False
            }
            return JsonResponse(dict_to_return, safe=False)
        else:
            dict_to_return = {
                'studentIdDuplicate' : True
            }
            return JsonResponse(dict_to_return, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])  

def check_signin(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            json_to_return = {
                'signIn' : True
            }
            return JsonResponse(json_to_return, safe=False)
        else:
            json_to_return = {
                'signIn' : False
            }
            return JsonResponse(json_to_return, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])

