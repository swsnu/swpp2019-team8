from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse, HttpResponseForbidden, HttpResponseBadRequest

import json

from .models import Debate, DebateComment


# Create your views here.

def debates_by_document(request, document_id):
    if request.method=='GET':
        #TODO
        return HttpResponse(status=200)
    elif request.method=='POST':
        #TODO
        return HttpResponse(status=201)
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])

def debate_get(request, document_id, debate_id):
    if request.method=='GET':
        #TODO
        return HttpResponse(status=200)
    else:
        return HttpResponseNotAllowed(['GET'])

def debate_comments(request, debate_id):
    if request.method=='GET':
        #TODO
        return HttpResponse(status=200)
    elif request.method=='POST':
        #TODO
        return HttpResponse(status=201)
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])
