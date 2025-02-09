from django.urls import path
from . import views
from .. import base_view

urlpatterns = [
    path('api/search-artist/', views.search_artist_route, name='search_artist_route'),
    path('api/get-events/', views.get_events_route, name='get_events_route'),

    path('', base_view.home.as_view(), name='artist_recommendation')
]
