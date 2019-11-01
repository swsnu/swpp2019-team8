from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse, HttpResponseForbidden, HttpResponseBadRequest

import json
import datetime

from user.models import User
from .models import Debate, DebateComment


def debates_by_document(request, document_title):
    if request.method=='GET':
        debate_list_by_document = [debate for debate in Debate.objects.filter(document=document_title).values()]
        return JsonResponse(debate_list_by_document, safe=False, status=200)

    elif request.method=='POST':
        try:
            req_data = json.loads(request.body.decode())
            debate_title = req_data['title']
            debate_content = req_data['content']
            debate_document = document_title
            debate_author = request.user
        
        except (KeyError, json.JSONDecodeError) as e:
            return HttpResponseBadRequest(400)

        new_debate = Debate(document=document_title, author=debate_author, title=debate_title, content=debate_content)
        new_debate.save()

        return HttpResponse(status=201)

    else:
        return HttpResponseNotAllowed(['GET', 'POST'])

def debate_get(request, document_title, debate_id):
    if request.method=='GET':
        debate = Debate.objects.get(title=debate_id)
        return JsonResponse(debate, safe=False, status=200)

    else:
        return HttpResponseNotAllowed(['GET'])

def debate_comments(request, debate_id):
    if request.method=='GET':
        debate_comment_list = [comment for comment in DebateComment.objects.filter(debate=debate_id).values()]
        return JsonResponse(debate_comment_list, safe=False, status=200)

    elif request.method=='POST':
        try:
            req_data = json.loads(request.body.decode())
            comment_debate = debate_id
            comment_author = request.user
            comment_content = req_data['content']
            comment_date = datetime.datetime.now()
        
        except (KeyError, json.JSONDecodeError) as e:
            return HttpResponseBadRequest(400)
        
        new_debate_comment = DebateComment(debate=comment_debate, author=comment_author, comment=comment_content, date=comment_date)
        new_debate_comment.save()

        return HttpResponse(status=201)

    else:
        return HttpResponseNotAllowed(['GET', 'POST'])
