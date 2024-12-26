from django.contrib import admin
from django.utils.html import format_html

from .models import NewAndBlog, NewsImage, CarОnTheRoad, CarОnTheRoadImage

# Inline для зображень NewAndBlog
class NewsImageInline(admin.TabularInline):
    model = NewsImage
    extra = 1  # Кількість порожніх полів для додавання
    fields = ['photo']
    verbose_name = "фото"
    verbose_name_plural = "Фото авто"
    

# Адмінка для NewAndBlog
@admin.register(NewAndBlog)
class NewAndBlogAdmin(admin.ModelAdmin):
    list_display = ('title', 'year', 'vincode', 'engine_car', 'gearbox', 'color_body', 'occasion', 'thumbnail')
    list_filter = ('year', 'gearbox', 'color_body', 'occasion')
    search_fields = ('title', 'vincode', 'engine_car', 'gearbox', 'color_body', 'occasion')
    prepopulated_fields = {'slug': ('title',)}
    inlines = [NewsImageInline]


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



# Inline для зображень CarОnTheRoad
class CarOnTheRoadImageInline(admin.TabularInline):
    model = CarОnTheRoadImage
    extra = 1
    fields = ['photo']
    verbose_name = "фото"
    verbose_name_plural = "Фото авто"

# Адмінка для CarОnTheRoad
@admin.register(CarОnTheRoad)
class CarOnTheRoadAdmin(admin.ModelAdmin):
    list_display = ('title', 'year', 'auction', 'date', 'vincode', 'state', 'engine_car', 'probig', 'seller', 'location_seller', 'thumbnail')
    list_filter = ('year', 'state', 'engine_car', 'gearbox', 'color_body', 'occasion')
    search_fields = ('title', 'vincode', 'engine_car', 'probig', 'seller', 'location_seller', 'main_damage', 'secondary_damage')
    prepopulated_fields = {'slug': ('title',)}
    inlines = [CarOnTheRoadImageInline]


    def thumbnail(self, obj):
        if obj.imagess.exists():
            image = obj.imagess.first()
            if image and image.photo:
                return format_html('<img src="{}" style="width: 70px; height: auto;">', image.photo.url)
        return "Немає зображення"
    thumbnail.short_description = "Зображення"

    def full_name(self, obj):
        brand_name = obj.brand.name if obj.brand else "Бренд не вказаний" 
        return f"{brand_name} {obj.model}"
    full_name.short_description = "Повна назва"

