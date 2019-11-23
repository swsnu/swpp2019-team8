from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, HttpResponseNotFound,  JsonResponse

from django.core.exceptions import ObjectDoesNotExist
from json import JSONDecodeError

from .models import Petition, PetitionComment
from user.models import User


from django.forms.models import model_to_dict
from django.utils import timezone
from datetime import timedelta
import json

# file dowonload
import os
import tempfile
import zipfile
from wsgiref.util import FileWrapper
from django.conf import settings
import mimetypes
import chardet
import codecs
import io

# handling csv file
import pandas as pd
import numpy as np


def petition(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    if request.method == 'POST':
        try:
            body = request.body.decode()
            petition_title = json.loads(body)['title']
            petition_content = json.loads(body)['content']
            petition_category = json.loads(body)['category']
            petition_link = json.loads(body)['link']  # array?
            petition_start_date = timezone.now()
            petition_end_date = petition_start_date + timedelta(days=30)
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()
        petition = Petition(author=request.user,
                            title=petition_title,
                            content=petition_content,
                            category=petition_category,
                            link=petition_link,
                            tag='',  # tag
                            start_date=petition_start_date,
                            end_date=petition_end_date,
                            votes=0,
                            status='ongoing')
        petition.save()
        df = pd.DataFrame({
            'voteDate': [],
            'status': [],
            'degree': [],
            'studentId': [],
            'gender': [],
            'department': [],
            'major': []
        })
        df.to_csv('./stat/' + str(petition.id) + '.csv', encoding="utf-8")
        response_dict = model_to_dict(petition)
        return JsonResponse(response_dict, status=201)
    else:
        return HttpResponseNotAllowed(['POST'])


def petition_list(request):
    if request.method == 'GET':
        petition_list = [
            petition for petition in Petition.objects.exclude(status="preliminary").values().order_by('-start_date')]
        return JsonResponse(petition_list, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])


def petition_serach_by_title(request, petition_title):
    if request.method == 'GET':
        petition_list = [petition for petition in Petition.objects.exclude(status="preliminary").filter(
            title__icontains=petition_title).values().order_by('start_date')]
        return JsonResponse(petition_list, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])


def petition_petitionid(request, petition_id):
    if request.method == 'GET':
        try:
            petition = Petition.objects.get(id=petition_id)
        except Petition.DoesNotExist:
            return HttpResponse(status=404)
        ret_petition = model_to_dict(petition)
        return JsonResponse(ret_petition, safe=False)
    # put: 1.votes++ 2.change status
    elif request.method == 'PUT':
        try:
            petition = Petition.objects.get(id=petition_id)
        except Petition.DoesNotExist:
            return HttpResponse(status=404)
        petition.votes = petition.votes + 1
        petition.save()
        ret_petition = model_to_dict(petition)
        return JsonResponse(ret_petition, status=200)
    else:
        return HttpResponseNotAllowed(['GET', 'PUT'])


def petition_userid(request, user_id):
    if request.method == 'GET':
        ret_petition = [
            petition for petition in Petition.objects.filter(id=user_id).values()]
        return JsonResponse(ret_petition, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])


def petition_comment(request, petition_id):
    if request.method == 'GET':
        comment_list = [comment for comment in PetitionComment.objects.filter(
            petition=petition_id).values()]
        return JsonResponse(comment_list, safe=False)
    elif request.method == 'POST':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        try:
            body = request.body.decode()
            comment_comment = json.loads(body)['comment']
            comment_date = timezone.now()
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()
        comment_petition = Petition.objects.get(id=petition_id)
        comment = PetitionComment(
            author=request.user, petition=comment_petition, comment=comment_comment, date=comment_date)
        comment.save()
        student_id = request.user.studentId[0:4]
        stat = pd.read_csv('./stat/' + str(petition_id) + '.csv')
        df = pd.DataFrame({
            'voteDate': [str(comment_date.year) + '-' + str(comment_date.month) + '-' + str(comment_date.day)],
            'status': [request.user.status],
            'degree': [request.user.studentStatus],
            'studentId': [student_id],
            'gender': [request.user.gender],
            'department': [request.user.department],
            'major': [request.user.major]
        })
        index = ['voteDate', 'status', 'degree', 'studentId', 'gender', 'department', 'major']
        df = stat.append(df, sort=False, ignore_index=True)
        df.to_csv('./stat/' + str(petition_id) + '.csv', encoding="utf-8", 
                    columns=index)
        response_dict = model_to_dict(comment)
        return JsonResponse(response_dict, status=201)
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])

def downlaod_csv(request, petition_id):
    if request.method == 'GET':
        petition = Petition.objects.filter(id=petition_id).exists()
        if petition == False:
            return HttpResponseNotFound()
        else:
            filename = "./stat/" + str(petition_id) + '.csv'
            dowanload_name = str(petition_id) + ".csv"
            wrapper = FileWrapper(open(filename, encoding='utf-8'))
            content_type = mimetypes.guess_type(filename)[0]
            response = HttpResponse(wrapper, content_type=content_type)
            del response['content-length']
            response['content-disposition'] = "attachment; filename=%s" % dowanload_name
            return response
    else:
        return HttpResponseNotAllowed(['GET'])


# Create your views here.
