from django.contrib import admin
from .models import CustomUser
from django.utils.translation import gettext_lazy as _

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('user_name', 'user_last_name', 'user_phone_number', 'email', 'user_car_marka', 'user_car_model', 'comment')
    search_fields = ('user_name', 'user_last_name', 'user_phone_number', 'email')
    list_filter = ('user_car_marka', 'user_car_model', 'user_car_marka', 'user_car_model')
    fieldsets = (
        (_("Персональна інформація"), {
            'fields': ('user_name', 'user_last_name', 'user_phone_number', 'email')
        }),
        (_("Інформація про автомобіль"), {
            'fields': ('user_car_marka', 'user_car_model')
        }),
        (_("Додатково"), {
            'fields': ('comment',)
        }),
    )
    ordering = ('user_name', 'user_last_name')
