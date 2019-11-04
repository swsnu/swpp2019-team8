from django.urls import path
from . import views

urlpatterns = [
    path('document/', views.document),
    path('document/<str:document_title>/', views.document_title),
    #path('photo/', views.photo),
    #path('photo/<str:photo_title>/', views.photo_title),
    path('document/<str:document_title>/debate', views.debates_by_document),
    path('document/<str:document_title>/debate/<int:debate_id>/', views.debate_get),
    path('debate/<int:debate_id>/', views.debate_comments),
]