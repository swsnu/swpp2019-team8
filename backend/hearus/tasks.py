from __future__ import absolute_import, unicode_literals
from celery import shared_task
from .models import Petition
from datetime import datetime, timedelta

@shared_task
def status_changer(petition_id):
    target_petition = Petition.objects.get(id=petition_id)
    check_fail.apply_async([petition_id], countdown=86400)
    check_end.apply_async([petition_id], countdown=1900800)

@shared_task
def check_fail(petition_id):
    print(petition_id)
    target_petition = Petition.objects.get(id = petition_id)
    if (target_petition.status == 'preliminary'):
        target_petition.status = 'fail'
        target_petition.save()

@shared_task
def check_end(petition_id):
    target_petition = Petition.objects.get(id = petition_id)
    if(target_petition.status == 'ongoing'):
        target_petition.status = 'end'
        target_petition.save()
