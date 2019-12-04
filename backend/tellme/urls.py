from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('document/', views.document),
    path('document/<str:document_title>/', views.document_title),
    path('document/list/latest/', views.document_recent),
    path('photo/', views.photo),
    path('photo/<str:photo_title>/', views.photo_title),
    path('document/<str:document_title>/debate/', views.debates_by_document),
    path('document/<str:document_title>/debate/<int:debate_id>/', views.debate_get),
    path('debate/<int:debate_id>/', views.debate_comments),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)