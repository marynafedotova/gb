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



class Part(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name


class Order(models.Model):
    order_number = models.CharField(max_length=50, unique=True, verbose_name="Номер замовлення")
    customer = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="orders", verbose_name="Клієнт")
    parts = models.ManyToManyField(
        SparePart,
        through="OrderItem",
        related_name="orders",
        verbose_name="Запчастини"
    )
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0, verbose_name="Загальна сума замовлення")
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



    def calculate_total_amount(self):
        if not self.pk:  # Перевіряємо, чи об'єкт вже збережений
            return 0
        total = self.order_items.aggregate(
            total=models.Sum(models.F('quantity') * models.F('part__price'), output_field=models.DecimalField())
        )['total']
        self.total_amount = total or 0
        return self.total_amount



    def save(self, *args, **kwargs):
        is_new = not self.pk  # Перевірка, чи це новий об'єкт
        super().save(*args, **kwargs)  # Перше збереження для отримання pk
        if not is_new:  # Якщо це не новий об'єкт
            self.calculate_total_amount()
            super().save(*args, **kwargs)


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
    quantity = models.PositiveIntegerField(default=1, verbose_name="Кількість")

    class Meta:
        db_table = "order_item"
        verbose_name = "позицію замовлення"
        verbose_name_plural = "Позиції замовлення"

    def __str__(self):
        return f"{self.part.name if self.part else '0.00'} (x{self.quantity})"
    

    @property
    def price(self):
        return self.part.price if self.part else 0  

    @property
    def total_price(self):
        if self.part and self.quantity:
            return self.quantity * self.price
        return 0
    

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)  # Зберігаємо позицію замовлення
        if self.order and self.order.pk:  # Якщо є пов'язане замовлення
            self.order.calculate_total_amount()
            self.order.save()
