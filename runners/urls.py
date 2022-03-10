from django.urls import path
from .views import RunnerListView, RunnerDetailView

urlpatterns = [
    path('', RunnerListView.as_view()),
    path('<int:pk>/', RunnerDetailView.as_view())
]
