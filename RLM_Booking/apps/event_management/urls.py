from django.urls import path
from . import views
from .. import base_view

urlpatterns = [
    path('api/save-event/', views.save_event, name='save_event'),
    path('api/get-events/', views.get_events, name='get_events'),
    path('api/delete-event/<int:event_id>/', views.delete_event, name='delete_event'),

    path('', base_view.home.as_view(), name='home'),
]
