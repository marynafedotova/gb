from django.shortcuts import render
from django.http import HttpResponse

 
def catalog(request):
    return render(request, 'goods/catalog.html')


def product(request):
    return render(request, 'goods/product.html')
