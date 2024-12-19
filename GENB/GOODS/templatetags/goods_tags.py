from atexit import register
from GOODS.models import SparePart, Car
from django import template

register = template.Library()


@register.simple_tag()
def tag_sparepart():
    return SparePart.objects.all()


@register.simple_tag()
def tag_car():
    return Car.objects.all()

@register.filter
def first_car_for_year(cars, year):
    """Фільтр повертає перший автомобіль для вказаного року."""
    return next((car for car in cars if car.year == year), None)


