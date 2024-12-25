from django import forms
from SPARE.models import SparePart, Categories, SubCategory
from CAR.models import Car


class CarPartFilterForm(forms.Form):
    brand_car = forms.ChoiceField(choices=[], required=False)
    model_car = forms.ChoiceField(choices=[], required=False)
    category = forms.ChoiceField(choices=[], required=False)
    sub_category = forms.ChoiceField(choices=[], required=False)
    car_spare = forms.ChoiceField(choices=[], required=False)
    oem_code = forms.ChoiceField(choices=[], required=False)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['brand_car'].choices = [('', 'Марка')] + list(
            Car.objects.values_list('brand_car', 'brand_car').distinct()
        )
        self.fields['model_car'].choices = [('', 'Модель')] + list(
            Car.objects.values_list('model_car', 'model_car').distinct()
        )
        self.fields['category'].choices = [('', 'Розділ')] + list(
            Categories.objects.values_list('name', 'name').distinct()
        )
        self.fields['sub_category'].choices = [('', 'Підрозділ')] + list(
            SubCategory.objects.values_list('name', 'name').distinct()
        )
        self.fields['car_spare'].choices = [('', 'Запчастини')] + list(
            SparePart.objects.values_list('name', 'name').distinct()
        )
        self.fields['oem_code'].choices = [('', 'OEM')] + list(
            SparePart.objects.values_list('oem_code', 'oem_code').distinct()
        )
