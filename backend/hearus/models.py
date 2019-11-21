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
        threading.Timer(1814400, self.check_end).start()

    def check_ongoing(self):
        if (self.status == 'preliminary'):
            if (self.votes >= 5):
                self.status = 'ongoing'
                #petition visible하게 만듬
            else:
                self.status = 'fail'
        else:
            pass
    
    def check_end(self):
        if(self.status == 'ongoing'):
            self.status = 'end'


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
