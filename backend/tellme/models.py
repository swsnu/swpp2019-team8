from django.db import models
from user.models import User

# Create your models here.
class Document(models.Model):
    title = models.CharField(max_length=64, unique=True)
    content = models.TextField()

class Photo(models.Model):
    photo = models.ImageField(upload_to="media/%Y/%m/%d")
    title = models.CharField(max_length=64)
    content = models.TextField()

class Debate(models.Model):
    document = models.ForeignKey(
        Document,
        on_delete=models.CASCADE,
    )
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
    )
    title = models.CharField(max_length=64)
    content = models.TextField()

class DebateComment(models.Model):
    debate = models.ForeignKey(
        Debate,
        on_delete=models.CASCADE,
    )
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
    )
    comment = models.TextField()
    date = models.DateTimeField() 