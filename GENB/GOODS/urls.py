
import django
from django.conf.urls import include
from django.contrib import admin
from django.urls import path
from django.conf.urls.i18n import set_language
from GOODS import views

app_name='goods'

urlpatterns = [
    path('', views.catalog, name='catalog'),
    path('car/<slug:car_slug>/', views.car, name='car'),
    path('product/<slug:product_slug>/', views.product, name='product'),
    

    
]
