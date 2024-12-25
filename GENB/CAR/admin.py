from django.utils.html import format_html
from django.contrib import admin
from .models import Brand, BodyType, Feature, Color, EngineVolume, Car, CarImage, Model_car, Transmission, FueldType

from django.contrib import admin


@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)
    ordering = ('name',)


@admin.register(Model_car)
class ModelCarAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)
    ordering = ('name',)


@admin.register(BodyType)
class BodyTypeAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)
    ordering = ('name',)


@admin.register(Feature)
class FeatureAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)
    ordering = ('name',)


@admin.register(Color)
class ColorAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)
    ordering = ('name',)


@admin.register(FueldType)
class FueldTypeAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)
    ordering = ('name',)


@admin.register(EngineVolume)
class EngineVolumeAdmin(admin.ModelAdmin):
    list_display = ('id', 'volume')
    search_fields = ('volume',)
    ordering = ('volume',)



@admin.register(Transmission)
class TransmissionAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)
    ordering = ('name',)


class CarImageInline(admin.TabularInline):
    model = CarImage
    extra = 1
    verbose_name = "зображення"
    verbose_name_plural = "Зображення"


@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    fieldsets = (
        ('Основна інформація', {
            'fields': ('brand', 'model', 'year', 'vin_code', 'transmission', 'engine_volume', 'color', 'body_type', 'features', 'fueld_type' ,'slug', 'description')
        }),
    )
    list_display = ('full_name', 'year', 'vin_code', 'transmission', 'thumbnail', 'engine_volume', 'color', 'body_type', 'features', 'fueld_type', 'description')
    search_fields = ('brand__name', 'model__name', 'vin_code', 'year')
    #readonly_fields = ('slug',)
    list_filter = ('brand', 'model', 'year', 'vin_code', 'transmission', 'engine_volume', 'color', 'body_type', 'features', 'fueld_type')
    inlines = [CarImageInline]
    prepopulated_fields = {'slug': ('vin_code', 'model')}
    ordering = ('brand__name', 'model', 'year')

    def thumbnail(self, obj):
        if obj.images.exists():
            image = obj.images.first()
            if image and image.photo:
                return format_html('<img src="{}" style="width: 70px; height: auto;">', image.photo.url)
        return "Немає зображення"
    thumbnail.short_description = "Зображення"

    def full_name(self, obj):
        brand_name = obj.brand.name if obj.brand else "Бренд не вказаний" 
        return f"{brand_name} {obj.model}"
    full_name.short_description = "Повна назва"



