# Generated by Django 5.1.4 on 2024-12-25 12:00

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('SPARE', '0001_initial'),
        ('USERS', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order_number', models.CharField(max_length=50, unique=True, verbose_name='Номер замовлення')),
                ('total_amount', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='Загальна сума замовлення')),
                ('shipping_details', models.TextField(verbose_name='Дані по відправці')),
                ('comment', models.TextField(blank=True, null=True, verbose_name='Коментар')),
                ('status', models.CharField(choices=[('new', 'Новий'), ('in_progress', 'В роботі'), ('awaiting_payment', 'Очікуємо оплату'), ('shipped', 'Відправлено'), ('returned', 'Повернення'), ('sold', 'Продано')], default='new', max_length=20, verbose_name='Статус замовлення')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Дата створення')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Дата оновлення')),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='orders', to='USERS.customuser', verbose_name='Клієнт')),
            ],
            options={
                'verbose_name': 'Замовлення',
                'verbose_name_plural': 'Замовлення',
                'db_table': 'order',
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.PositiveIntegerField(verbose_name='Кількість')),
                ('price', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='Ціна за одиницю')),
                ('total_price', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='Загальна ціна')),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='order_items', to='ORDERS.order', verbose_name='Замовлення')),
                ('part', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='order_items', to='SPARE.sparepart', verbose_name='Запчастина')),
            ],
            options={
                'verbose_name': 'Позиція замовлення',
                'verbose_name_plural': 'Позиції замовлення',
                'db_table': 'order_item',
            },
        ),
        migrations.AddField(
            model_name='order',
            name='parts',
            field=models.ManyToManyField(related_name='orders', through='ORDERS.OrderItem', to='SPARE.sparepart', verbose_name='Запчастини'),
        ),
    ]
