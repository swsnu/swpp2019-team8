# Generated by Django 2.2.6 on 2019-11-06 04:30

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hearus', '0004_auto_20191106_0422'),
    ]

    operations = [
        migrations.AlterField(
            model_name='petition',
            name='end_date',
            field=models.DateTimeField(default=datetime.datetime(2019, 12, 6, 4, 30, 51, 97552)),
        ),
    ]