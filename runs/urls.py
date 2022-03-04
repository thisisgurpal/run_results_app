from django.urls import path
from .views import RunListView

urlpatterns = [
    path('', RunListView.as_view())
]
