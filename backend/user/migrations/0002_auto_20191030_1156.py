# Generated by Django 2.2.6 on 2019-10-30 02:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='nickname',
            field=models.CharField(max_length=32, unique=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='studentId',
            field=models.CharField(max_length=16, unique=True),
        ),
    ]