from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed


import json

from .models import User
from django.contrib.auth import authenticate, login, logout
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
            return HttpResponse(status=204)


def sign_out(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    if request.method == 'GET':
        logout(request)
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])
