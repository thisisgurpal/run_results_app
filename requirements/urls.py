from django.urls import path
from .views import RequirementListView

urlpatterns = [
    path('', RequirementListView.as_view())
]
