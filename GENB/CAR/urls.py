
import django
from django.conf.urls import include
from django.contrib import admin
from django.urls import path
from django.conf.urls.i18n import set_language
from CAR import views



app_name='car'

urlpatterns = [
    path('car/<slug:car_slug>/', views.car_s, name='car'),
]




    