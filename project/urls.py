"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from .views import index

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/events/', include('events.urls')),
    path('api/distances/', include('distances.urls')),
    path('api/requirements/', include('requirements.urls')),
    path('api/auth/', include('jwt_auth.urls')),
    path('api/runners/', include('runners.urls')),
    path('api/runs/', include('runs.urls')),
    path('api/user_runners/', include('user_runners.urls')),
    path('api/comments/', include('comments.urls')),
    path('api/training/', include('training.urls')),
    path('api/fav_training/', include('fav_training.urls')),
    path('api/event_links/', include('event_links.urls')),
    re_path(r'^.*$', index)
]
