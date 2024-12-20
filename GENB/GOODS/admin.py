from dataclasses import fields
from os import name
from pyexpat import model
from django.contrib import admin

from GOODS.models import Categories, SparePart, SubCategory, AdditionalСategory, Car, CarImage, SparePartImage
from django.forms import ModelForm


#admin.site.register(Categories)
#admin.site.register(SubCategory)
#admin.site.register(AdditionalСategory)
#admin.site.register(SparePart)
#admin.site.register(Car)


class SparePartForm(ModelForm):
    class Meta:
        model = SparePart
        fields = '__all__'


@admin.register(Categories)
class CategoriesAdmin(admin.ModelAdmin):
    fieldsets = (
        ('Інформація', {'fields': ('name', 'slug'),}),  # Додано 'slug'
    )
    prepopulated_fields = {'slug': ('name',)}

    

@admin.register(SubCategory)
class SubCategoryAdmin(admin.ModelAdmin):
    fieldsets = (
        ('Інформація', {'fields': ('name', 'category', 'slug'),}),  # Додано 'slug'
    )
    prepopulated_fields = {'slug': ('name',)}


@admin.register(AdditionalСategory)
class AdditionalСategoryAdmin(admin.ModelAdmin):
    fieldsets = (
        ('Інформація', {'fields': ('name', 'sub_category', 'slug'),}),  # Додано 'slug'
    )
    prepopulated_fields = {'slug': ('name',)}




class CarImageInline(admin.TabularInline):
    model = CarImage
    extra = 4


@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('vin_code',)}
    inlines = [CarImageInline]


class SparePartsImageInline(admin.TabularInline):
    model = SparePartImage
    extra = 4


@admin.register(SparePart)
class SparePartAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}
    inlines = [SparePartsImageInline]

    form = SparePartForm
    class Media:
        js = ('assets/js/dynamic_choices.js',)
