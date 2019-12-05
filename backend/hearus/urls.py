from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('petition/', views.petition),
    path('petition/petitions/', views.petition_list),
    path('petition/petition_title/<str:petition_title>/', views.petition_serach_by_title),
    path('petition/<str:petition_url>/', views.petition_petitionurl),
    path('petition/user/<int:user_id>/', views.petition_userid),
    path('petition/comment/related/', views.petition_comment_user),
    path('petition/<str:petition_url>/comment/', views.petition_comment),
    path('petition/<str:petition_url>/download/', views.downlaod_csv),
    path('petition/document_title/<str:document_title>/', views.petition_by_document_title)
]

if settings.DEBUG:
    urlpatterns += static(settings.GRAPH_URL,
                          document_root=settings.MEDIA_ROOT)

