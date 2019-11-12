from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.sign_up),
    path('signin/', views.sign_in),
    path('signout/', views.sign_out),
    path('verifyCode/<str:email>/', views.get_verify_code),
    path('userId/<int:user_id>/', views.get_user_by_user_id),
    path('email/<str:email>/', views.get_user_by_email),
    path('studentId/<str:student_id>/', views.get_user_by_student_id),
    path('check/signin/',views.check_signin),
    path('nickname/<str:nickname>/', views.get_user_by_nickname),
    path('check/email/<str:email>/', views.check_email_duplicate),
    path('check/studentId/<str:student_id>/',views.check_student_id_duplicate),
    path('check/nickname/<str:nickname>/', views.check_nickname_duplicate),
]
