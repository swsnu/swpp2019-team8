from django.db import models
from user.models import User

# Create your models here.
class Petition(models.Model):
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
    )
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
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
    )
    comment = models.TextField()
    date = models.DateTimeField()