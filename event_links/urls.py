from django.urls import path
from .views import Event_LinkListView

urlpatterns = [
    path('', Event_LinkListView.as_view()),
]
