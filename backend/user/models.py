from django.db import models
from django.contrib.auth.models import (BaseUserManager, AbstractBaseUser)

# Create your models here.


class UserManager(BaseUserManager):
    def create_user(self, email, new_user=None):
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
            nickname=new_user['nickname'],
            gender=new_user['gender'],
            status=new_user['status'],
            studentId=new_user['studentId'],
            department=new_user['department'],
            major=new_user['major'],
            studentStatus=new_user['studentStatus']
        )

        user.set_password(new_user['password'])
        user.save(using=self._db)
        return user

    def create_superuser(self, email, new_user=None):
        user = self.create_user(
            email,
            password=new_user['password'],
            nickname=new_user['nickname'],
            gender=new_user['gender'],
            status=new_user['status'],
            studentId=new_user['studentId'],
            department=new_user['department'],
            major=new_user['major'],
            studentStatus=new_user['studentStatus']
        )

        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    email = models.EmailField(max_length=64, unique=True, db_index=True)
    nickname = models.CharField(max_length=32, unique=True, db_index=True)
    gender = models.CharField(max_length=16)
    status = models.CharField(max_length=16)
    studentId = models.CharField(max_length=16, db_index=True)
    department = models.CharField(max_length=64)
    major = models.CharField(max_length=64)
    studentStatus = models.CharField(max_length=16)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_lable):
        return True

    @property
    def is_staff(self):
        return self.is_admin
