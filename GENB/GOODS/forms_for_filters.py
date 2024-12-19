from django import forms
from GOODS.models import SparePart, Car, Categories, SubCategory


class CarPartFilterForm(forms.Form):
    brand_car = forms.ChoiceField(
        choices=[('', 'Марка')] + list(Car.objects.values_list('brand_car', 'brand_car').distinct()),
        required=False
    )
    model_car = forms.ChoiceField(
        choices=[('', 'Модель')] + list(Car.objects.values_list('model_car', 'model_car').distinct()),
        required=False
    )
    category = forms.ChoiceField(
        choices=[('', 'Розділ')] + list(Categories.objects.values_list('name', 'name').distinct()),
        required=False
    )
    sub_category = forms.ChoiceField(
        choices=[('', 'Підрозділ')] + list(SubCategory.objects.values_list('name', 'name').distinct()),
        required=False
    )
    car_spare = forms.ChoiceField(
        choices=[('', 'Запчастини')] + list(SparePart.objects.values_list('name', 'name').distinct()),
        required=False
    )
    oem_code = forms.ChoiceField(
        choices=[('', 'OEM')] + list(SparePart.objects.values_list('oem_code', 'oem_code').distinct()),
        required=False
    )



