from tkinter import S
from unicodedata import category
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse, HttpResponseNotFound, JsonResponse
from django.template.loader import render_to_string
from django.contrib import messages
from GOODS.models import SparePart, Car, Categories
from GOODS.forms_for_filters import CarPartFilterForm
from GOODS.utils import q_search
from django.core.paginator import Paginator


 

from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage

def catalog(request):
    # Фільтрація товарів
    form = CarPartFilterForm(request.GET)
    parts = SparePart.objects.all()
    query = request.GET.get('q', None)  # Правильне отримання значення 'q'

    if query:
    # Логіка пошуку за текстовим запитом (залежить від реалізації q_search)
        parts = parts.filter(name__icontains=query)  
    else:
    # Використання фільтрів з форми
        if form.is_valid():  
            if form.cleaned_data['brand_car']:
                parts = parts.filter(car__brand_car=form.cleaned_data['brand_car'])
            if form.cleaned_data['model_car']:
                parts = parts.filter(car__model_car=form.cleaned_data['model_car'])
            if form.cleaned_data['category']:
                parts = parts.filter(category__name=form.cleaned_data['category'])
            if form.cleaned_data['sub_category']:
                parts = parts.filter(sub_category__name=form.cleaned_data['sub_category'])
            if form.cleaned_data['car_spare']:
                parts = parts.filter(car__model_car=form.cleaned_data['car_spare'])
            if form.cleaned_data['oem_code']:
                parts = parts.filter(oem_code=form.cleaned_data['oem_code'])    

    # Пагінація для товарів
    page_number_goods = request.GET.get('goods_page', 1)
    goods_paginator = Paginator(parts, 8)
    try:
        goods = goods_paginator.page(page_number_goods)
    except PageNotAnInteger:
        goods = goods_paginator.page(1)
    except EmptyPage:
        goods = goods_paginator.page(goods_paginator.num_pages)

    # Пагінація для авто
    cars_list = Car.objects.all()
    page_number_cars = request.GET.get('cars_page', 1)
    cars_paginator = Paginator(cars_list, 12)
    try:
        cars = cars_paginator.page(page_number_cars)
    except PageNotAnInteger:
        cars = cars_paginator.page(1)
    except EmptyPage:
        cars = cars_paginator.page(cars_paginator.num_pages)

    # Отримання брендів, моделей та років
    brand_models = {}
    for car in cars_list:
        if car.brand_car not in brand_models:
            brand_models[car.brand_car] = {}
        if car.model_car not in brand_models[car.brand_car]:
            brand_models[car.brand_car][car.model_car] = []
        brand_models[car.brand_car][car.model_car].append(car.year)

    # Формування контексту
    context = {
        'goods': goods,
        'cars': cars,
        'form': form,
        'brands': cars_list.values_list('brand_car', flat=True).distinct(),
        'parts': parts,
        'brand_models': brand_models,
        'cars_list': cars_list,
    }
    return render(request, 'goods/catalog.html', context)



def get_models(request):
    brand = request.GET.get('brand_car')
    models = Car.objects.filter(brand_car=brand).values_list('model_car', flat=True).distinct()
    return JsonResponse({'models': list(models)})




def get_years(request):
    brand = request.GET.get('brand_car')
    model = request.GET.get('model_car')
    years = Car.objects.filter(brand_car=brand, model_car=model).values_list('year', flat=True).distinct()
    return JsonResponse({'years': list(years)})




def product(request, product_slug):

    product = get_object_or_404(SparePart, slug=product_slug)

    context = {
        'product': product
    }

    return render(request, 'goods/product.html', context)


def car(request, car_slug):
    car = get_object_or_404(Car, slug=car_slug)
    
    context = {
        'car': car,
    }
    return render(request, 'goods/car-page.html', context)


