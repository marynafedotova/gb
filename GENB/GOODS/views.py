from django.shortcuts import render
from django.http import HttpResponse
from GOODS.models import SparePart

 
def catalog(request):

    sparepart = SparePart.objects.all()

    context = {
        'sparepart': sparepart,
    }

    return render(request, 'goods/catalog.html', context)


def product(request):
    return render(request, 'goods/product.html')
