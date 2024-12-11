from django.shortcuts import render
from django.http import HttpResponse
from GOODS.models import SparePart, Car

 
def catalog(request):

    

    context = {

    }

    return render(request, 'goods/catalog.html', context)


def product(request):
    return render(request, 'goods/product.html')
