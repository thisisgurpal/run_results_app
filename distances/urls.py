from django.urls import path
from .views import DistanceListView

urlpatterns = [
    path('', DistanceListView.as_view())
]
