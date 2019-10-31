from django.db import models
from django.contrib.auth.models import (BaseUserManager, AbstractBaseUser)

# Create your models here.


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, nickname=None, gender=None, status=None,
                    studentId=None, department=None, major=None, studentStatus=None):
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
            nickname=nickname,
            gender=gender,
            status=status,
            studentId=studentId,
            department=department,
            major=major,
            studentStatus=studentStatus
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, nickname=None, gender=None, status=None,
                         studentId=None, department=None, major=None, studentStatus=None):
        user = self.create_user(
            email,
            password=password,
            nickname=nickname,
            gender=gender,
            status=status,
            studentId=studentId,
            department=department,
            major=major,
            studentStatus=studentStatus
        )

        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    email = models.EmailField(max_length=64, unique=True)
    nickname = models.CharField(max_length=32, unique=True)
    gender = models.CharField(max_length=16)
    status = models.CharField(max_length=16)
    studentId = models.CharField(max_length=16, unique=True)
    department = models.CharField(max_length=64)
    major = models.CharField(max_length=64)
    studentStatus = models.CharField(max_length=16)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nickname', 'gender', 'status', 'studentId',
                       'department', 'major', 'studentStatus']

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_lable):
        return True

    @property
    def is_staff(self):
        return self.is_admin
