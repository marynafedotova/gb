from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import OrderItem

@receiver(post_save, sender=OrderItem)
def update_order_total(sender, instance, **kwargs):
    if instance.order:  # Перевіряємо, чи пов'язаний OrderItem із замовленням
        instance.order.calculate_total_amount()
        instance.order.save()
