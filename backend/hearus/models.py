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


    def state_changer(self):
        fail_date = self.start_date + timedelta(days=1)
        self.check_fail.apply_async((self), eta=fail_date)
        end_date = self.start_date + timedelta(days=21)
        self.check_end.apply_async((self), eta=end_date)


    def check_fail(self):
        petition = Petition.objects.get(id = self.id)
        if (petition.status == 'preliminary'):
            petition.status = 'fail'
            petition.save()
        else:
            pass
        print(petition.status)

    def check_end(self):
        petition = Petition.objects.get(id = self.id)
        if(petition.status == 'ongoing'):
            petition.status = 'end'
            petition.save()
        else:
            pass


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
