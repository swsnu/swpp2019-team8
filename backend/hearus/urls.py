from django.urls import path
from . import views

urlpatterns = [
    path('petition/', views.petition),
    path('petition/<str:category>/vote/', views.petition_vote),
    path('petition/<str:category>/latest/', views.petition_latest),
    path('petition/<int:petition_id>/', views.petition_petitionid),
    path('petition/user/<int:user_id>/', views.petition_userid),
    path('petition/<int:petition_id>/comment/', views.petition_comment)
]