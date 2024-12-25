
import django
from django.conf.urls import include
from django.contrib import admin
from django.urls import path
from django.conf.urls.i18n import set_language
from CONTENT import views

app_name='content'

urlpatterns = [
    path('news/', views.news, name='news'),
    path('pre-order/', views.pre_order, name='pre_order'),
    

]