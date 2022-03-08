from django.urls import path
from .views import Fav_TrainingListView, Fav_TrainingDetailView

urlpatterns = [
    path('', Fav_TrainingListView.as_view()),
    path('<int:pk>/', Fav_TrainingDetailView.as_view())
]
