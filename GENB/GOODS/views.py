from tkinter import S
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.template.loader import render_to_string
from django.contrib import messages
from GOODS.models import SparePart, Car

from django.core.paginator import Paginator


 

def catalog(request):
    # Отримання списку товарів
    goods = SparePart.objects.all()
    
    # Пагінація
    try:
        page_number = int(request.GET.get('page', 1))
    except ValueError:
        page_number = 1

    paginator = Paginator(goods, 8)  # 8 товарів на сторінку
    try:
        goods = paginator.page(page_number)
    except PageNotAnInteger:
        goods = paginator.page(1)
    except EmptyPage:
        goods = paginator.page(paginator.num_pages)

    # Перевірка наявності товарів
    if not goods.object_list:
        messages.info(request, "Товари не знайдено.")


    cars = Car.objects.all()
    
    # Пагінація
    try:
        page_number_car = int(request.GET.get('page', 1))
    except ValueError:
        page_number_car = 1

    paginator_car = Paginator(goods, 8)  # 8 товарів на сторінку
    try:
        cars = paginator_car.page(page_number_car)
    except PageNotAnInteger:
        cars = paginator_car.page(1)
    except EmptyPage:
        cars = paginator_car.page(paginator_car.num_pages)

    # Перевірка наявності товарів
    if not cars.object_list:
        messages.info(request, "Товари не знайдено.")

    context = {
        'goods': goods,
         'cars': cars,


        }
    return render(request, 'goods/catalog.html', context)


def product(request, product_slug):

    product= SparePart.objects.get(slug=product_slug)

    context = {
        'product': product
    }

    return render(request, 'goods/product.html', context=context)


def car(request, car_slug):

    car= Car.objects.get(slug=car_slug)

    context = {
        'car': car
    }

    return render(request, 'goods/car-page.html', context=context)

