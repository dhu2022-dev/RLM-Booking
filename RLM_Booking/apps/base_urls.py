from django.shortcuts import render
from django.urls import path, include
from . import base_view

urlpatterns = [
    path('', base_view.home.as_view(), name='home'),
]
