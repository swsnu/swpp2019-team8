from django.urls import path
from . import views

urlpatterns = [
    path('petition/', views.petition),
    path('petition/petitions/', views.petition_list),
    path('petition/petition_title/<str:petition_title>/', views.petition_serach_by_title),
    path('petition/<str:petition_url>/', views.petition_petitionurl),
    path('petition/user/<int:user_id>/', views.petition_userid),
    path('petition/<str:petition_url>/comment/', views.petition_comment),
    path('petition/<str:petition_url>/download/', views.downlaod_csv),
    path('petition/document_title/<str:document_title>/', views.petition_by_document_title)
]