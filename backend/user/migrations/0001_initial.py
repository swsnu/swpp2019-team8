# Generated by Django 2.2.6 on 2019-10-29 11:25

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('email', models.EmailField(max_length=64, unique=True)),
                ('nickname', models.CharField(max_length=20)),
                ('gender', models.CharField(max_length=16)),
                ('status', models.CharField(max_length=16)),
                ('studentId', models.CharField(max_length=16)),
                ('department', models.CharField(max_length=64)),
                ('major', models.CharField(max_length=64)),
                ('studentStatus', models.CharField(max_length=16)),
                ('is_active', models.BooleanField(default=True)),
                ('is_admin', models.BooleanField(default=False)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
