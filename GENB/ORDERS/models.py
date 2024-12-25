from django.db import models
from django.utils.translation import gettext_lazy as _
from USERS.models import CustomUser
from SPARE.models import SparePart


class OrderStatus(models.TextChoices):
    NEW = 'new', _('Новий')
    IN_PROGRESS = 'in_progress', _('В роботі')
    AWAITING_PAYMENT = 'awaiting_payment', _('Очікуємо оплату')
    SHIPPED = 'shipped', _('Відправлено')
    RETURNED = 'returned', _('Повернення')
    SOLD = 'sold', _('Продано')


class Order(models.Model):
    order_number = models.CharField(max_length=50, unique=True, verbose_name="Номер замовлення")
    customer = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="orders", verbose_name="Клієнт")
    parts = models.ManyToManyField(
        SparePart,
        through="OrderItem",
        related_name="orders",
        verbose_name="Запчастини"
    )
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Загальна сума замовлення")
    shipping_details = models.TextField(verbose_name="Дані по відправці")
    comment = models.TextField(blank=True, null=True, verbose_name="Коментар")
    status = models.CharField(
        max_length=20,
        choices=OrderStatus.choices,
        default=OrderStatus.NEW,
        verbose_name="Статус замовлення"
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата створення")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Дата оновлення")

    class Meta:
        db_table = "order"
        verbose_name = "замовлення"
        verbose_name_plural = "Замовлення"
        ordering = ["-created_at"]

    def __str__(self):
        return f"Замовлення №{self.order_number} - {self.get_status_display()}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="order_items", verbose_name="Замовлення")
    part = models.ForeignKey(SparePart, on_delete=models.CASCADE, related_name="order_items", verbose_name="Запчастина")
    quantity = models.PositiveIntegerField(verbose_name="Кількість")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Ціна за одиницю")
    total_price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Загальна ціна")

    class Meta:
        db_table = "order_item"
        verbose_name = "позицію замовлення"
        verbose_name_plural = "Позиції замовлення"

    def __str__(self):
        return f"{self.part.name} (x{self.quantity})"
