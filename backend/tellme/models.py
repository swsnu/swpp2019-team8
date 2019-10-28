from django.db import models

# Create your models here.
class Document(models.Model):
    title = models.CharField(max_length=64)
    content = models.TextField()

class Photo(models.Model):
    # photo field 정해야함
    title = models.CharField(max_length=64)
    content = models.TextField()

class Debate(models.Model):
    document = models.ForeignKey(
        Document,
        on_delete=models.CASCADE,
    )
    # author user import 해야함
    title = models.CharField(max_length=64)
    content = models.TextField()

class DebateComment(models.Model):
    debate = models.ForeignKey(
        Debate,
        on_delete=models.CASCADE,
    )
    # author user import 해야함
    comment = models.TextField()
    date = models.DateTimeField() 