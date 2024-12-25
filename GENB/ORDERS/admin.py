from django.contrib import admin
from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 1
    readonly_fields = ('total_price',)
    fields = ('part', 'quantity', 'price', 'total_price')
    autocomplete_fields = ('part',)  # Грапеллі підтримує autocomplete для ForeignKey

    def total_price(self, obj):
        return obj.quantity * obj.price if obj.quantity and obj.price else 0
    total_price.short_description = "Загальна ціна"


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_number', 'customer', 'total_amount', 'status', 'created_at', 'updated_at')
    list_filter = ('status', 'created_at')
    search_fields = ('order_number', 'customer__user_name', 'customer__user_last_name', 'customer__user_phone_number')
    date_hierarchy = 'created_at'
    readonly_fields = ('order_number', 'total_amount', 'created_at', 'updated_at')
    autocomplete_fields = ('customer',)  # Для зв'язку з клієнтом
    inlines = [OrderItemInline]
    # fieldsets = (
    #     (None, {
    #         'fields': ('order_number', 'customer', 'status')
    #     }),
    #     ('Деталі замовлення', {
    #         'fields': ('shipping_details', 'comment', 'total_amount'),
    #         'classes': ('grp-collapse grp-closed',)  # Для згорнутої секції
    #     }),
    #     ('Час', {
    #         'fields': ('created_at', 'updated_at'),
    #         'classes': ('grp-collapse grp-closed',)  # Для згорнутої секції
    #     }),
    # )

    def save_model(self, request, obj, form, change):
        if not obj.order_number:
            # Генерація унікального номера замовлення
            obj.order_number = f"ORD-{obj.pk or '0000'}-{obj.created_at.strftime('%Y%m%d')}"
        obj.total_amount = sum(
            item.quantity * item.price for item in obj.order_items.all()
        )
        super().save_model(request, obj, form, change)

    class Media:
        css = {
            'all': ('grappelli/css/custom.css',)  # Можна додати власні стилі
        }
        js = ('grappelli/js/custom.js',)  # Можна додати власні скрипти
