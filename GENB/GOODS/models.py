from asyncio.windows_events import NULL
from email.policy import default
from hmac import new
from os import name
from random import choices
from tabnanny import verbose
from unicodedata import category
from django.db import models

import csv

#Categoris
class Categories(models.Model):
    name = models.CharField(max_length=150, unique=True, verbose_name='Назва')
    slug = models.SlugField(max_length=200, unique=True, blank=True, verbose_name='URL')

    class Meta:
        db_table = 'category'
        verbose_name = 'Категорію'
        verbose_name_plural = 'Категорії'

    def __str__(self) -> str:
        return self.name


class SubCategory(models.Model):
    name = models.CharField(max_length=150, unique=True, verbose_name='Підкатегорія')
    slug = models.SlugField(max_length=200, unique=True, blank=True, verbose_name='URL')
    category = models.ForeignKey(to=Categories, on_delete=models.SET_NULL, null=True, verbose_name='Категорія')


    class Meta:
        db_table = 'sub_category'
        verbose_name = 'Підкатегорію'
        verbose_name_plural = 'Підкатегорії'

    def __str__(self) -> str:
        return self.name


class AdditionalСategory(models.Model):
    name = models.CharField(max_length=150, unique=True, verbose_name='Назва')
    slug = models.SlugField(max_length=200, unique=True, blank=True, verbose_name='URL')
    sub_category = models.ForeignKey(to=SubCategory, on_delete=models.SET_NULL, null=True, verbose_name='Підкатегорія')
    

    class Meta:
        db_table = 'addit_category'
        verbose_name = 'Додаткову категорію'
        verbose_name_plural = 'Додаткові категорії'

    def __str__(self) -> str:
        return self.name

    
#Added car

def get_model_choices():
    choices = []
    with open('static/assets/data/dropdownlist.csv', newline='', encoding='utf-8') as csvfile:
        reader = csv.reader(csvfile)
        next(reader)
        for row in reader:
            if row:
                choices.append((row[0], row[0]))
        return choices


class Car(models.Model):
    vin_code = models.CharField(max_length=17, unique=True, blank=True, verbose_name='Він код')
    slug = models.SlugField(max_length=200, unique=True, blank=True, null=True, verbose_name='URL')
    brand_car = models.CharField(
        max_length=150,
        choices=[
            ('Jaguar', 'Jaguar'),
            ('Volkswagen', 'Volkswagen'),
            ('Jeep', 'Jeep'),
            ('Lincoln', 'Lincoln'),
            ('Dodge', 'Dodge'),
            ('Infiniti', 'Infiniti'),
            ('Kia', 'Kia'),
            ('Hyundai', 'Hyundai'),
            ('Acura', 'Acura'),
            ('Chrysler', 'Chrysler'),
            ('Nissan', 'Nissan'),
            ('Bmw', 'BMW'),
            ('Land_rover', 'Land Rover'),
            ('Audi', 'Audi'),
            ('Honda', 'Honda'),
        ], verbose_name='Марка авто')
    model_car = models.CharField(
        max_length=150,
        choices= get_model_choices(),
        verbose_name='Модель авто')
    year = models.PositiveIntegerField(
        choices=[
            (2013, '2013'),
            (2012, '2012'),
            (2014, '2014'),
            (2017, '2017'),
            (2015, '2015'),
            (2008, '2008'),
            (2016, '2016'),
            (2019, '2019'),
            (2018, '2018'),
            (2020, '2020'),
            (2011, '2011'),
            (2005, '2005'),
            (2010, '2010'),
            (2002, '2002'),
            ],
        verbose_name='Рік випуску')
    engine_volume = models.PositiveIntegerField(
        choices=[
            (3, '3'),
            (24, '2.4'),
            (36, '3.6'),
            (37, '3.7'),
            (2, '2'),
            (35, '3.5'),
            (18, '1.8'),
            (25, '2.5'),
            (22, '2.2'),
            (57, '5.7'),
            (14, '1.4'),
        ],
        verbose_name='Об\'єм двигуна')
    fueld_type = models.CharField(
        max_length=100,
        choices=[
            ('gasoline', 'Бензин'),
            ('diesel', 'Дизель'),
            ('electric', 'Електро'),
            ],
        verbose_name='Вид топлива')
    transmission  = models.CharField(
        max_length=50,
        choices=[
            ('8akpp', '8 АКПП'),
            ('akpp', 'АКПП'),
            ('varaable', 'Варіатор'),
        ],
        verbose_name='КПП')
    body_type = models.CharField(
        max_length=100, 
        choices=[
            ('sedan', 'Седан'),
            ('svu', 'Позашляховик'),
            ('station_wagon', 'Універсал'),
        ],
        verbose_name='Кузов')
    features = models.TextField(  
        max_length=50,      
        choices=[
            ('tdi', 'TDI'),
            ('turbo_gasoline', 'Турбобензин'),
            ('gasoline', 'Бензин'),
            ('turbo_diesel', 'Турбодизель'),
            ('fsi', 'FSI'),
            ('tfsi', 'TFSI'),
            ('tsi', 'TSI'),
        ], verbose_name='Особливості')
    color = models.CharField(
        max_length=50,
        choices=[
            ('grey', 'Сірий'),
            ('black', 'Чорний'),
            ('shinee_grey', 'Срібний'),
            ('white', 'Білий'),
            ('red', 'Червоний'),
            ('orange', 'Помаранчовий'),
            ('brown', 'Коричневий'),
            ('blue', 'Синій'),
            ('gold', 'Золотий'),
            ('bordo', 'Бордовий'),
            ('green', 'Зелений'),
        ],
        verbose_name='Колір')
    photo = models.ImageField(upload_to='car_image', blank=True, null=True, verbose_name='Фото авто')
    


    class Meta:
        db_table = 'car'
        verbose_name = 'Автомомбіль'
        verbose_name_plural = 'Автомобілі'
        ordering = ("id",)

    def __str__(self) -> str:
        return f'{self.brand_car} {self.model_car} {self.year} | {self.vin_code}'


class SparePart(models.Model):

    car = models.ForeignKey(Car, on_delete=models.SET_NULL, null=True, verbose_name='Автомобіль')
    oem_code = models.CharField(max_length=50, unique=True, verbose_name='Оригінальний номер запчастини')
    name = models.CharField(max_length=150, verbose_name='Назва запчастини')
    slug = models.SlugField(max_length=200, unique=True, blank=True, null=True, verbose_name='URL')
    sku = models.CharField(max_length=50, unique=True, verbose_name='Артикул', blank=True)
    category = models.ForeignKey(Categories, on_delete=models.SET_NULL, null=True, verbose_name='Категорія')
    sub_category = models.ForeignKey(SubCategory, on_delete=models.SET_NULL, null=True, verbose_name='Підкатегорія')
    additional_category = models.ForeignKey(AdditionalСategory, on_delete=models.SET_NULL, null=True, verbose_name='Дод.категорія')
    warehouse = models.CharField(
        max_length=100,
        choices=[
            ('swarehouse_korea', 'Склад Корея'),
            ('swarehouse_wag', 'Склад Wag'),
            ('swarehouse_return', 'Повернення'),
             ('swarehouse_reserv', 'В резерві'),
            ],
        verbose_name='Склад')
    cell = models.PositiveIntegerField(null=True, verbose_name='Ячейка')
    
    condition = models.CharField(
        max_length=50,
        choices=[
            ('new', 'Нова'),
            ('living', 'Вживана')
        ],
        verbose_name='Стан'
    )
    additional_condition = models.CharField(
        max_length=50,
        choices=[
            ('good','Хороший' ),
            ('satisfactory', 'Задовільний'),
            ('defective', 'З дефектом'),
            ('repaired', 'Зі слідами ремонту'),
        ], 
        blank=True,
        null=True,
        verbose_name='Додаткова умова'
    )

    
    availability = models.CharField(
        max_length=50,
        choices=[
            ('in_stock', 'В наявності'),
            ('shipped', 'Відправлено'),
            ('returned', 'Повернення'),
            ('defective', 'Брак'),
            ('written_off', 'Списано'),
        ],
        default='in_stock',
        verbose_name='Статус'
    )
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Ціна')
    photo = models.ImageField(upload_to='spare_parts', blank=True, null=True, verbose_name='Фото')


    class Meta:
        db_table = 'spare_part'
        verbose_name = 'Запчастина'
        verbose_name_plural = 'Запчастини'
        ordering = ("id",)


    def __str__(self) -> str:
        if self.additional_condition:
            return f'{self.name} | Стан - {self.get_condition_display()} ({self.get_additional_condition_display()}) | Статус - {self.get_availability_display()}'
        return f'{self.name} | Стан - {self.get_condition_display()} | Статус - {self.get_availability_display()}'
    

    def save(self, *args, **kwargs):
        if not self.sku and self.car:  # Автоматичне формування артикула, якщо його немає
            vin_last_digits = self.car.vin_code[-4:]  # Останні 4 цифри VIN-коду
            self.sku = f"{vin_last_digits}0000"  # Попереднє значення артикула (замість id)
            super().save(*args, **kwargs)  # Зберегти об'єкт

        # Після збереження оновити SKU до значення "вин_last_digits + id"
            self.sku = f"{vin_last_digits}-{self.id}"
        super().save(*args, **kwargs)  # Повторне збереження з оновленим sku
 # Зберегти об'єкт вдруге з оновленим sku
