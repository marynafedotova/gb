from django.contrib import admin
from .models import CustomUser
from django.utils.translation import gettext_lazy as _

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('user_name', 'user_last_name', 'user_phone_number', 'email', 'user_car', 'comment')
    search_fields = ('user_name', 'user_last_name', 'user_phone_number', 'email')
    list_filter = ('user_car',)
    fieldsets = (
        (_("Персональна інформація"), {
            'fields': ('user_name', 'user_last_name', 'user_phone_number', 'email')
        }),
        (_("Інформація про автомобіль"), {
            'fields': ('user_car',)
        }),
        (_("Додатково"), {
            'fields': ('comment',)
        }),
    )
    ordering = ('user_name', 'user_last_name')
