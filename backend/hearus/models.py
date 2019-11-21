from django.db import models
from user.models import User
from datetime import datetime, timedelta
import threading

# Create your models here.


class Petition(models.Model):
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
    )
    title = models.CharField(max_length=128)
    content = models.TextField()
    category = models.TextField()
    link = models.TextField()
    tag = models.TextField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    votes = models.IntegerField()
    status = models.TextField()

    def temp(self):
        threading.Timer(86400, self.check_ongoing).start()
        threading.Timer(1900800, self.check_end).start()

    def check_ongoing(self):
        petition = Petition.objects.get(id = self.id)
        if (petition.status == 'preliminary'):
            if (petition.votes >= 5):
                petition.status = 'ongoing'
                #petition visible하게 만듬
            else:
                petition.status = 'fail'
        else:
            pass
        print(petition.status)
    
    def check_end(self):
        petition = Petition.objects.get(id = self.id)
        if(petition.status == 'ongoing'):
            petition.status = 'end'


class PetitionComment(models.Model):
    petition = models.ForeignKey(
        Petition,
        on_delete=models.CASCADE,
    )
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
    )
    comment = models.TextField()
    date = models.DateTimeField()
