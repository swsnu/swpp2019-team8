from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.sign_up),
    path('signin/', views.sign_in),
    path('signout/', views.sign_out),
    path('email/<str:email>/', views.get_user_by_email),
    path('studentId/<str:student_id>/', views.get_user_by_student_id),
    path('nickname/<str:nickname>/', views.get_user_by_nickname)
]
