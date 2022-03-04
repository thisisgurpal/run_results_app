from django.urls import path
from .views import LoginView, RegisterView, LoggedInProfileView, EditLoggedInProfileView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('profile/', LoggedInProfileView.as_view()),
    path('profile/<int:pk>/', EditLoggedInProfileView.as_view())
]