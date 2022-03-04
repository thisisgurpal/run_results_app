from django.urls import path
from .views import User_RunnerListView

urlpatterns = [
    path('', User_RunnerListView.as_view())
]
