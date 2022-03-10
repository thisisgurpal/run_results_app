from django.urls import path
from .views import User_RunnerListView, User_RunnerDetailView

urlpatterns = [
    path('', User_RunnerListView.as_view()),
    path('<int:pk>/', User_RunnerDetailView.as_view())
]
