from django.contrib import admin
from .models import Order, OrderItem, Part



class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 1
    readonly_fields = ('price', 'total_price')  # Обчислювані властивості
    fields = ('part', 'quantity', 'total_price')  # Тільки існуючі поля
    autocomplete_fields = ('part',)  # Для автодоповнення

    # Відображення ціни за одиницю
    def price(self, obj):
        if obj and obj.part:
            return obj.part.price  # Отримання ціни із моделі SparePart
        return "—"  # Прочерк, якщо об'єкт не заповнений
    price.short_description = "Ціна за одиницю"  # Назва поля в адмінці

    # Відображення загальної ціни
    def total_price(self, obj):
        if obj and obj.part and obj.quantity:
            return obj.quantity * obj.part.price  # Розрахунок загальної ціни
        return "—"  # Прочерк, якщо дані неповні
    total_price.short_description = "Загальна ціна"



@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_number', 'customer', 'total_amount', 'status', 'created_at', 'updated_at')
    list_filter = ('status', 'created_at', 'updated_at', 'customer')
    search_fields = ('order_number', 'customer__user_name', 'customer__user_last_name', 'customer__user_phone_number')
    date_hierarchy = 'created_at'
    readonly_fields = ('created_at', 'updated_at', 'order_number', 'total_amount')
    autocomplete_fields = ('customer',)  # Для зв'язку з клієнтом
    inlines = [OrderItemInline]

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)  # Спочатку зберігаємо об'єкт
        obj.calculate_total_amount()  # Потім перераховуємо загальну суму
        obj.save()  # І ще раз зберігаємо із оновленою сумою



    class Media:
        css = {
            'all': ('grappelli/css/custom.css',)  # Можна додати власні стилі
        }
        js = ('grappelli/js/custom.js',)  # Можна додати власні скрипти


    def save_related(self, request, form, formsets, change):
        # Спершу зберігаємо головний об'єкт (Order)
        form.save()

        # Потім зберігаємо всі пов'язані об'єкти (OrderItem)
        for formset in formsets:
            formset.instance = form.instance  # Забезпечуємо, що Order збережений
            formset.save()
