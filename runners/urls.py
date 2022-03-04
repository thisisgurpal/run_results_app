from django.urls import path
from .views import RunnerListView

urlpatterns = [
    path('', RunnerListView.as_view())
]
