from django.shortcuts import get_object_or_404, render

from CAR.models import Car

def car_s(request, car_slug, car_id=None):
    car = get_object_or_404(Car, slug=car_slug)

    total_parts = car.cars.count()
    
    context = {
        'car': car,
        'total_parts': total_parts,
    }
    return render(request, 'car/car-page.html', context)
