from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseForbidden, HttpResponseBadRequest, JsonResponse
from django.contrib.auth import authenticate
from django.forms.models import model_to_dict
from django.utils import timezone


import json
import datetime
from json import JSONDecodeError
from django.forms.models import model_to_dict


from user.models import User
from .models import Document, Photo, Debate, DebateComment


def document(request):
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            document_title = req_data['title']
            document_content = req_data['content']
            document_date = timezone.now()
            if len(req_data) != 2:
                return HttpResponseBadRequest()
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()
        # unique check
        exist_document = [document for document in Document.objects.filter(
            title__istartswith=document_title, title__iendswith=document_title).values()]
        unique = False
        for i in exist_document:
            if(len(document_title) == len(i['title'])):
                unique = True
        if unique == True:
            response_dict = {
                'documentDuplicate': True
            }
            return JsonResponse(response_dict, safe=False)
        else:
            document = Document(title=document_title, content=document_content, edit_date = document_date)
            document.save()
            response_dict = {'documentDuplicate': False, 'id': document.id,
                             'title': document.title, 'content': document.content}
            return JsonResponse(response_dict, status=201)
    else:
        return HttpResponseNotAllowed(['POST'])


def document_title(request, document_title):
    if request.method == 'GET':
        selected_document = [document for document in Document.objects.filter(
            title__istartswith=document_title, title__iendswith=document_title).values()]
        unique = False
        for i in selected_document:
            if len(document_title) == len(i['title']):
                unique = True
        if unique == True:
            response_dict = {
                'selectedDocument': selected_document[0],
                'unique': True
            }
            return JsonResponse(response_dict, safe=False)
        else:
            selected_document = [document for document in Document.objects.filter(
                title__icontains=document_title).values()]
            content_list = [document for document in Document.objects.filter(
                content__icontains=document_title).values()]
            response_dict = {
                'unique': False,
                'titleDocuments': selected_document,
                'contentDocuments': content_list
            }
            return JsonResponse(response_dict, safe=False)
    elif request.method == 'PUT':
        try:
            req_data = json.loads(request.body.decode())
            document_target = req_data['target']
            document_content = req_data['content']
            document_version = req_data['version']
            document_date = timezone.now()
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()
        try:
            document = Document.objects.get(title=document_target)
        except Document.DoesNotExist:
            return HttpResponse(status=404)

        if document_version == document.version:
            document.content = document_content
            document.version = document.version+1
            document.edit_date = document_date
            document.save()
            response_dict = {
                'title': document.title,
                'content': document.content,
                'version': document.version,
                'conflict': False,
                            }
            return JsonResponse(response_dict, status=201)
        else:
            response_dict = {
                'title': document.title,
                'content': document.content,
                'version': document.version,
                'conflict': True,
                }
            return JsonResponse(response_dict, status=201)
    else:
        return HttpResponseNotAllowed(['GET', 'PUT'])

def document_recent(request):
    if request.method == 'GET':
        document_list = [ document for document in
                            Document.objects.all().values('title', 'edit_date').order_by('-edit_date')]
        list_to_return = document_list[:10]
        return JsonResponse(list_to_return, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])

def photo(request):
    if request.method == 'POST':
        photo = Photo(
            photo=request.FILES['file'], title=request.POST['title'], content=request.POST['content'])
        photo.save()
        return HttpResponse(status=201)
    else:
        return HttpResponseNotAllowed(['POST'])


def photo_title(request, photo_title):
    if request.method == 'GET':
        try:
            photo = Photo.objects.get(title=photo_title)
        except Photo.DoesNotExist:
            return HttpResponse(status=404)
        dict_to_return = {
            'photo': str(photo.photo),
            'title': photo.title,
            'content': photo.content
        }
        return JsonResponse(dict_to_return, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])


def debates_by_document(request, document_title):
    try:
        debate_document = Document.objects.get(title=document_title)
    except Document.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        debate_list_by_document = [debate for debate in Debate.objects.select_related('author').filter(
            document=debate_document)]
        response = []
        for i in debate_list_by_document:
            res_dict = {
                'id': i.id,
                'author': i.author.nickname,
                'title': i.title
            }
            response.append(res_dict)
        return JsonResponse(response, safe=False, status=200)

    elif request.method == 'POST':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        try:
            req_data = json.loads(request.body.decode())
            debate_title = req_data['title']
            debate_content = req_data['content']
            debate_author = request.user

        except (KeyError, json.JSONDecodeError) as e:
            return HttpResponseBadRequest(400)

        new_debate = Debate(document=debate_document, author=debate_author,
                            title=debate_title, content=debate_content)
        new_debate.save()

        return JsonResponse(model_to_dict(new_debate), status=201)

    else:
        return HttpResponseNotAllowed(['GET', 'POST'])


def debate_get(request, document_title, debate_id):
    if request.method == 'GET':
        try:
            debate = Debate.objects.get(id=debate_id)
        except Debate.DoesNotExist:
            return HttpResponse(status=404)

        response_dict = {'title': debate.title, 'content': debate.content}
        return JsonResponse(response_dict, safe=False, status=200)

    else:
        return HttpResponseNotAllowed(['GET'])


def debate_comments(request, debate_id):
    try:
        debate = Debate.objects.get(id=debate_id)
    except Debate.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        debate_comment_list = [
            comment for comment in DebateComment.objects.select_related('author').filter(debate_id=debate.id)]
        response = []
        for i in debate_comment_list:
            response_dict = {
                'author': i.author.nickname,
                'comment': i.comment,
                'date': i.date
            }
            response.append(response_dict)
        return JsonResponse(response, safe=False, status=200)

    elif request.method == 'POST':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)

        try:
            req_data = json.loads(request.body.decode())
            comment_debate = Debate.objects.get(id=debate_id)
            comment_author = request.user
            comment_content = req_data['comment']
            comment_date = datetime.datetime.now()
        except (KeyError, json.JSONDecodeError) as e:
            return HttpResponseBadRequest(400)

        new_debate_comment = DebateComment(
            debate=comment_debate, author=comment_author, comment=comment_content, date=comment_date)
        new_debate_comment.save()
        return HttpResponse(status=201)

    else:
        return HttpResponseNotAllowed(['GET', 'POST'])
