from django.db import models

# Create your models here.
class Petition(models.Model):
    #author user import 해야함
    title = models.CharField(max_length=64)
    content = models.TextField()
    category = models.TextField()
    link = models.URLField()
    tag = models.TextField()
    start_date = models.DateTimeField()
    votes = models.IntegerField()
    status = models.TextField()

class PetitionComment(models.Model):
    petition = models.ForeignKey(
        Petition,
        on_delete=models.CASCADE,
    )
    #author user import 해야함
    comment = models.TextField()
    date = models.DateTimeField()