from django.contrib import admin

from GOODS.models import Categories, SparePart, SubCategory, AdditionalСategory, Car, CarBrand, CarModel

admin.site.register(Categories)
admin.site.register(SubCategory)
admin.site.register(AdditionalСategory)
admin.site.register(SparePart)
admin.site.register(CarBrand)
admin.site.register(CarModel)
admin.site.register(Car)


