from django.db import models
from user.models import User
from datetime import datetime, timedelta
import threading

# Create your models here.


class Petition(models.Model):
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        db_index=True
    )
    title = models.CharField(max_length=128, db_index=True)
    content = models.TextField()
    category = models.TextField()
    link = models.TextField(db_index=True)
    tag = models.TextField()
    start_date = models.DateTimeField(db_index=True)
    end_date = models.DateTimeField(db_index=True)
    votes = models.IntegerField(db_index=True)
    status = models.TextField()
    url = models.URLField(unique=True, db_index=True)


class PetitionComment(models.Model):
    petition = models.ForeignKey(
        Petition,
        on_delete=models.CASCADE,
        db_index=True
    )
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
    )
    comment = models.TextField()
    date = models.DateTimeField(db_index=True)
