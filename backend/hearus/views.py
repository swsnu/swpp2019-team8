from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest, HttpResponseNotAllowed
from json import JSONDecodeError
from django.forms.models import model_to_dict
from user.models import User
from .models import Petition, PetitionComment
from datetime import datetime
import json

def petition(request):
    if request.method == 'POST':
        try:
            body = request.body.decode()
            petition_title = json.loads(body)['title']
            petition_content = json.loads(body)['content']
            petition_category = json.loads(body)['category'] #array?
            petition_link = json.loads(body)['link'] #array?
            petition_tag = json.loads(body)['tag']
            petition_start_date = datetime.now()
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()
        petition = Petition(author=request.user, title=petition_title, content=petition_content, category=petition_category, link=petition_link, tag=petition_tag, start_date=petition_start_date, votes=0, status=0)
        petition.save()
        response_dict = model_to_dict(petition)
        return JsonResponse(response_dict,status=201)
    else:
        return HttpResponseNotAllowed(['POST'])

def petition_vote(request,catetory):
    if request.method == 'GET':
        petition_list = Petition.objects.order_by('votes')
        model_to_dict(petition_list)
        return JsonResponse(petition_list,safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])

def petition_latest(request,catetory):
    if request.method == 'GET':
        petition_list = Petition.objects.order_by('start_date')
        model_to_dict(petition_list)
        return JsonResponse(petition_list,safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])

def petition_petitionid(request,petition_id):
    if request.method == 'GET':
        try:
            petition = Petition.objects.get(id=petition_id)
        except Petition.DoesNotExist:
            return HttpResponse(status=404)
        ret_petition=model_to_dict(petition)
        return JsonResponse(ret_petition, safe=False)
    #put: 1.votes++ 2.change status
    else:
        return HttpResponseNotAllowed(['GET'])

def petition_userid(request,user_id):
    if request.method == 'GET':
        try:
            petition = Petition.objects.get(id=user_id)
        except Petition.DoesNotExist:
            return HttpResponse(status=404)
        ret_petition=model_to_dict(petition)
        return JsonResponse(ret_petition, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])

def petition_comment(request,petition_id):
    if request.method == 'GET':
        comment_list = [comment for comment in PetitionComment.objects.filter(petition=petition_id).values()]
        return JsonResponse(comment_list, safe=False)
    elif request.method == 'POST':
        try:
            body = request.body.decode()
            comment_comment = json.loads(body)['comment']
            comment_date = datetime.now()
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()
        comment_petition = Petition.objects.get(id=petition_id)
        comment = PetitionComment(author=request.user, petition=comment_petition, comment=comment_comment, date=comment_date)
        comment.save()
        response_dict = model_to_dict(comment)
        return JsonResponse(response_dict, status=201)
    else:
        return HttpResponseNotAllowed(['GET','POST'])

# Create your views here.
