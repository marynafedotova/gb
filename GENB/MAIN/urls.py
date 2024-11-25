
import django
from django.conf.urls import include
from django.contrib import admin
from django.urls import path
from django.conf.urls.i18n import set_language
from MAIN import views

app_name='main'

urlpatterns = [
    path('', views.index, name='index'),
    path('about/', views.about, name='about_us'),
    path('contacts/', views.contact, name='contacts'),
    path('i18n/set_language/', set_language, name='set_language'),

    
]
