from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse, HttpResponseForbidden, HttpResponseBadRequest
from django.contrib.auth import authenticate

import json
from json import JSONDecodeError
import datetime

from user.models import User
from .models import Document, Photo, Debate, DebateComment


def document(request):
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            document_title = req_data['title']
            document_content = req_data['content']
            if len(req_data) != 2:
                return HttpResponseBadRequest()
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()
        document = Document(title=document_title, content=document_content)
        document.save()
        response_dict = {'id': document.id,
                         'title': document.title, 'content': document.content}
        return JsonResponse(response_dict, status=201)
    else:
        return HttpResponseNotAllowed(['POST'])


def document_title(request, document_title):
    if request.method == 'GET':
        try:
            document_specific = Document.objects.get(title=document_title)
        except Document.DoesNotExist:
            return HttpResponse(status=404)
        response_dict = {'title': document_specific.title,
                         'content': document_specific.content}
        return JsonResponse(response_dict)
    else:
        return HttpResponseNotAllowed(['GET'])


def debates_by_document(request, document_title):
    try:
        debate_document = Document.objects.get(title=document_title)
    except Document.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        debate_list_by_document = [debate for debate in Debate.objects.filter(document=debate_document).values()]
        return JsonResponse(debate_list_by_document, safe=False, status=200)

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

        return HttpResponse(status=201)

    else:
        return HttpResponseNotAllowed(['GET', 'POST'])


def debate_get(request, document_title, debate_id):
    if request.method=='GET':
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
            comment for comment in DebateComment.objects.filter(debate=debate_id).values()]
            
        response = {
            'debateDocumentTitle' : debate.document.title,
            'debateTitle' : debate.title,
            'commentList' : debate_comment_list
        }
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
