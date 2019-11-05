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
            newEmail = json.loads(body)['email']
            newPassowrd = json.loads(body)['password']
            newNickname = json.loads(body)['nickname']
            newGender = json.loads(body)['gender']
            newStatus = json.loads(body)['status']
            newStudentId = json.loads(body)['student_id']
            newDepartment = json.loads(body)['department']
            newMajor = json.loads(body)['major']
            newStudentStatus = json.loads(body)['student_status']
        except (KeyError, json.JSONDecodeError) as e:
            return HttpResponseBadRequest()
        User.objects.create_user(email=newEmail, password=newPassowrd, nickname=newNickname, gender=newGender, status=newStatus,
                                 studentId=newStudentId, department=newDepartment, major=newMajor, studentStatus=newStudentStatus)
        return HttpResponse(status=201)
    else:
        return HttpResponseNotAllowed(['POST'])


def sign_in(request):
    if request.method == 'POST':
        try:
            body = request.body.decode()
            userEmail = json.loads(body)['email']
            userPassword = json.loads(body)['password']
        except (KeyError, json.JSONDecodeError) as e:
            return HttpResponseBadRequest()
        user = authenticate(email=userEmail, password=userPassword)
        if user is None:
            return HttpResponse(status=401)
        else:
            login(request, user)
            selectedUser = User.objects.get(email=userEmail)
            user_to_return = {
                'selectedUser': model_to_dict(selectedUser)
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


def get_user_by_email(request, email):
    if request.method == 'GET':
        selectedUser = User.objects.filter(email=email)
        if selectedUser.count() == 0:
            verifyCode = ""
            for i in range(1, 6):
                verifyCode += random.choice(string.digits)
            email = EmailMessage(
                '인증 메일입니다.',
                '인증 번호는 ' + verifyCode + ' 입니다.',
                to=['dkwanm1@snu.ac.kr']
            )
            email.send()

            user_to_return = {
                'selectedUser': '',
                'verifyCode': verifyCode
            }
            return JsonResponse(user_to_return, status=200)
        else:
            user = model_to_dict(selectedUser[0])
            user_to_return = {
                'selectedUser': user,
                'verifyCode': ''
            }
            return JsonResponse(user_to_return, status=200, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])


def get_user_by_user_id(request, user_id):
    if request.method == 'GET':
        selectedUser = User.objects.filter(id=user_id)
        if selectedUser.count() == 0:
            user_to_return = {
                'selectedUser': ''
            }
            return JsonResponse(user_to_return, status=200, safe=False)
        else:
            user = model_to_dict(selectedUser[0])
            user_to_return = {
                'selectedUser': user
            }
            return JsonResponse(user_to_return, status=200, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])


def get_user_by_student_id(request, student_id):
    if request.method == 'GET':
        selectedUser = User.objects.filter(studentId=student_id)
        if selectedUser.count() == 0:
            user_to_return = {
                'selectedUser': ''
            }
            return JsonResponse(user_to_return, status=200, safe=False)
        else:
            user = model_to_dict(selectedUser[0])
            user_to_return = {
                'selectedUser': user
            }
            return JsonResponse(user_to_return, status=200, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])


def get_user_by_nickname(request, nickname):
    if request.method == 'GET':
        selectedUser = User.objects.filter(nickname=nickname)
        if selectedUser.count() == 0:
            user_to_return = {
                'selectedUser': ''
            }
            return JsonResponse(user_to_return, status=200, safe=False)
        else:
            user = model_to_dict(selectedUser[0])
            user_to_return = {
                'selectedUser': user
            }
            return JsonResponse(user_to_return, status=200, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])
