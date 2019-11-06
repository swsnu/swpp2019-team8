from django.urls import path
from . import views

urlpatterns = [
    path('petition/', views.petition),
    path('petition/petitions/', views.petition_list),
    path('petition/petition_title/<str:petition_title>/', views.petition_serach_by_title),
    path('petition/<int:petition_id>/', views.petition_petitionid),
    path('petition/user/<int:user_id>/', views.petition_userid),
    path('petition/<int:petition_id>/comment/', views.petition_comment)
]