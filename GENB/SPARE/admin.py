from django.contrib import admin
from django.forms import ModelForm
from django.utils.html import format_html


from .models import Categories, SubCategory, AdditionalСategory, SparePart, SparePartImage
from CAR.models import Car  # Підключення моделі автомобіля, якщо знадобиться
from django import forms

# Форма для багатооб'єктного редагування
class BulkEditForm(forms.Form):
    availability = forms.ChoiceField(
        choices=SparePart._meta.get_field('availability').choices,
        required=False,
        label='Статус',
    )
    warehouse = forms.ChoiceField(
        choices=SparePart._meta.get_field('warehouse').choices,
        required=False,
        label='Склад',
    )
    condition = forms.ChoiceField(
        choices=SparePart._meta.get_field('condition').choices,
        required=False,
        label='Стан',
    )

# Дія для багатооб'єктного редагування
@admin.action(description="Редагувати")
def bulk_edit_spare_parts(modeladmin, request, queryset):
    form = None

    if 'apply' in request.POST:
        form = BulkEditForm(request.POST)
        if form.is_valid():
            # Застосування змін до вибраних об'єктів
            availability = form.cleaned_data.get('availability')
            warehouse = form.cleaned_data.get('warehouse')
            condition = form.cleaned_data.get('condition')

            for obj in queryset:
                if availability:
                    obj.availability = availability
                if warehouse:
                    obj.warehouse = warehouse
                if condition:
                    obj.condition = condition
                obj.save()
            modeladmin.message_user(request, "Зміни успішно застосовані.")
            return

    if not form:
        form = BulkEditForm()

    # Відображення форми для редагування
    return admin.helpers.render_action_form(
        request=request,
        queryset=queryset,
        action="bulk_edit_spare_parts",
        form=form,
        title="Багатооб'єктне редагування запчастин"
    )


class SparePartForm(ModelForm):
    class Meta:
        model = SparePart
        fields = '__all__'



@admin.register(Categories)
class CategoriesAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name',)
    list_filter = ('name',)


@admin.register(SubCategory)
class SubCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'slug')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name', 'category__name')
    list_filter = ('category',)


@admin.register(AdditionalСategory)
class AdditionalCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'sub_category', 'slug')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name', 'sub_category__name')
    list_filter = ('sub_category',)


class SparePartImageInline(admin.TabularInline):
    model = SparePartImage
    extra = 1
    fields = ('photo',)
    verbose_name = "зображення"
    verbose_name_plural = "Зображення"


@admin.register(SparePart)
class SparePartAdmin(admin.ModelAdmin):
    list_display = ('name', 'sku', 'oem_code', 'availability', 'condition', 'price','warehouse', 'cell', 'category', 'sub_category', 'additional_category', 'car', 'thumbnail')
    list_filter = ('category', 'sub_category', 'availability', 'condition', 'oem_code', 'warehouse', 'cell', 'price', 'additional_category', 'sku')
    search_fields = ('name', 'oem_code', 'sku', 'car__brand__name', 'car__model__name', 'warehouse', 'cell', 'condition', 'availability', 'price', 'sku')
    actions = [bulk_edit_spare_parts]
    inlines = [SparePartImageInline]
    prepopulated_fields = {'slug': ('name',)}
    #readonly_fields = ('sku',)
    fieldsets = (
        ('Основна інформація', {
            'fields': ('car','name', 'oem_code','price', 'slug', 'sku')
        }),
        ('Категорії', {
            'fields': ('category', 'sub_category', 'additional_category')
        }),
        ('Склад та умови', {
            'fields': ('warehouse', 'cell', 'condition', 'additional_condition', 'availability')
        }),
    )

    def thumbnail(self, obj):
        if obj.images.exists():
            image = obj.images.first()
            if image and image.photo:
                return format_html('<img src="{}" style="width: 70px; height: auto;">', image.photo.url)
        return "Немає зображення"
    thumbnail.short_description = "Зображення"


    form = SparePartForm
    class Media:
        js = ('assets/js/dynamic_choices.js',)








