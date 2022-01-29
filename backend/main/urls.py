from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('search', views.search_templates),
    path('movie', views.search_templates_by_hashtag),
    path("signup", views.create_user),
    path("login", views.login_user),
    path("toptemplates", views.get_random_templates)
]
