from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, HttpResponseNotFound,  JsonResponse

from django.core.exceptions import ObjectDoesNotExist
from json import JSONDecodeError

from .models import Petition, PetitionComment
from user.models import User
from .tasks import status_changer, plot_graph
from secrets import token_urlsafe


from django.forms.models import model_to_dict
from django.utils import timezone
from django.db import transaction
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

# urlparsing
import urllib.parse


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
            petition_end_date = petition_start_date + timedelta(days=21)
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()
        petition_url = token_urlsafe(10)
        petition = Petition(author=request.user,
                            title=petition_title,
                            content=petition_content,
                            category=petition_category,
                            link=petition_link,
                            tag='',  # tag
                            start_date=petition_start_date,
                            end_date=petition_end_date,
                            votes=0,
                            status='preliminary',
                            url=petition_url)
        petition.save()
        status_changer(petition.id)
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
        petition_to_exclude = ['preliminary', 'fail']
        petition_list = [
            petition for petition in Petition.objects.exclude(status__in=petition_to_exclude).values().order_by('-start_date')]
        return JsonResponse(petition_list, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])


def petition_serach_by_title(request, petition_title):
    if request.method == 'GET':
        petition_to_exclude = ['preliminary', 'fail']
        petition_list = [petition for petition in Petition.objects.exclude(status__in=petition_to_exclude).filter(
            title__icontains=petition_title).values().order_by('start_date')]
        return JsonResponse(petition_list, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])


def petition_petitionurl(request, petition_url):
    if request.method == 'GET':
        try:
            petition = Petition.objects.get(url=petition_url)
        except Petition.DoesNotExist:
            return HttpResponse(status=404)
        ret_petition = model_to_dict(petition)
        return JsonResponse(ret_petition, safe=False)
    # put: 1.votes++ 2.change status
    elif request.method == 'PUT':
        with transaction.atomic():
            try:
                petition = Petition.objects.get(url=petition_url)
            except Petition.DoesNotExist:
                return HttpResponse(status=404)

            duplicate_chk = PetitionComment.objects.filter(
                author=request.user, petition=petition)
            if duplicate_chk.exists():
                return HttpResponse(status=200)

            petition.votes = petition.votes + 1
            petition.save()
            ret_petition = model_to_dict(petition)
            return JsonResponse(ret_petition, status=200)
    else:
        return HttpResponseNotAllowed(['GET', 'PUT'])


def petition_userid(request, user_id):
    if request.method == 'GET':
        ret_petition = [
            petition for petition in Petition.objects.filter(author_id=user_id).values('id', 'status', 'title', 'votes', 'category', 'end_date', 'url')]
        return JsonResponse(ret_petition, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])


def petition_comment_user(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    if request.method == 'GET':
        petitions = [
            comment for comment in PetitionComment.objects.select_related('petition').filter(author_id=request.user.id)
        ]
        ret_petition = reversed(petitions)
        dict_to_return = []
        for comment in ret_petition:
            temp = {
                'status': comment.petition.status,
                'title': comment.petition.title,
                'category': comment.petition.category,
                'end_date': comment.petition.end_date,
                'votes': comment.petition.votes,
                'url': comment.petition.url
            }
            dict_to_return.append(temp)
        return JsonResponse(dict_to_return, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])


def petition_comment(request, petition_url):
    if request.method == 'GET':
        comment_petition = Petition.objects.get(url=petition_url)
        comment_list = [comment for comment in PetitionComment.objects.filter(
            petition=comment_petition.id).values().order_by('-date')]
        return JsonResponse(comment_list, safe=False)
    elif request.method == 'POST':
        with transaction.atomic():
            if not request.user.is_authenticated:
                return HttpResponse(status=401)
            try:
                body = request.body.decode()
                comment_comment = json.loads(body)['comment']
                comment_date = timezone.now()
            except (KeyError, JSONDecodeError):
                return HttpResponseBadRequest()
            comment_petition = Petition.objects.get(url=petition_url)

            duplicate_chk = PetitionComment.objects.filter(
                author=request.user, petition=comment_petition)
            if duplicate_chk.exists():
                return HttpResponse(status=201)

            comment = PetitionComment(
                author=request.user, petition=comment_petition, comment=comment_comment, date=comment_date)
            comment.save()
            if(comment_petition.votes >= 4 and comment_petition.status == "preliminary"):
                comment_petition.status = "ongoing"
                comment_petition.save()
                if not(os.path.isdir('./media/graph/'+str(comment_petition.id))):
                    os.makedirs(os.path.join(
                        './media/graph/'+str(comment_petition.id)))
                plot_graph(comment_petition.id)
            student_id = request.user.studentId[0:4]
            file_location = './stat/' + str(comment_petition.id) + '.csv'
            stat = pd.read_csv(file_location)
            df = pd.DataFrame({
                'voteDate': [str(comment_date.year) + '-' + str(comment_date.month) + '-' + str(comment_date.day)],
                'status': [request.user.status],
                'degree': [request.user.studentStatus],
                'studentId': [student_id],
                'gender': [request.user.gender],
                'department': [request.user.department],
                'major': [request.user.major]
            })
            index = ['voteDate', 'status', 'degree',
                     'studentId', 'gender', 'department', 'major']
            df = stat.append(df, sort=False, ignore_index=True)
            df.to_csv(file_location, encoding="utf-8",
                      columns=index)
            response_dict = model_to_dict(comment)
            return JsonResponse(response_dict, status=201)
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])


def petition_by_document_title(request, document_title):
    if request.method == 'GET':
        encoded_title = document_title.replace(' ', '%20')
        encoded_title = encoded_title.replace('^', '%5E')
        encoded_title = encoded_title.replace('|', '%7C')
        encoded_title = encoded_title.replace('{', '%7B')
        encoded_title = encoded_title.replace('}', '%7D')
        encoded_title = encoded_title.replace('`','%60')
        petition_to_exclude = ['preliminary', 'fail']
        petition_list = [petition for petition in
                         Petition.objects.exclude(status__in=petition_to_exclude).filter(
                             link__icontains='/tell_me/documents/' + encoded_title)
                         .values('id', 'url', 'title')
                         ]
        return JsonResponse(petition_list, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])


def downlaod_csv(request, petition_url):
    if request.method == 'GET':
        petition = Petition.objects.filter(url=petition_url).exists()
        if petition == False:
            return HttpResponseNotFound()
        else:
            csvpet = Petition.objects.get(url=petition_url)
            filename = "./stat/" + str(csvpet.id) + '.csv'
            dowanload_name = str(csvpet.id) + ".csv"
            wrapper = FileWrapper(open(filename, encoding='utf-8'))
            content_type = mimetypes.guess_type(filename)[0]
            response = HttpResponse(wrapper, content_type=content_type)
            del response['content-length']
            response['content-disposition'] = "attachment; filename=%s" % dowanload_name
            return response
    else:
        return HttpResponseNotAllowed(['GET'])


# Create your views here.
