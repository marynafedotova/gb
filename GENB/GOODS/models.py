from email.policy import default
from os import name
from tabnanny import verbose
from unicodedata import category
from django.db import models


class Categories(models.Model):
    name = models.CharField(max_length=150, unique=True, verbose_name='Назва')
    slug = models.SlugField(max_length=200, unique=True, blank=True, null=True, verbose_name='URL')
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='subcategories', verbose_name='Категорія')

    class Meta:
        db_table = 'category'
        verbose_name = 'Категорію'
        verbose_name_plural = 'Категорії'

    def __str__(self) -> str:
        return self.name


class SubCategory(models.Model):
    name = models.CharField(max_length=150, unique=True, verbose_name='Підкатегорія')
    slug = models.SlugField(max_length=200, unique=True, blank=True, null=True, verbose_name='URL')
    category = models.ForeignKey(to=Categories, on_delete=models.CASCADE, verbose_name='Категорія')


    class Meta:
        db_table = 'sub_category'
        verbose_name = 'Підкатегорію'
        verbose_name_plural = 'Підкатегорії'

    def __str__(self) -> str:
        return self.name


class AdditionalСategory(models.Model):
    name = models.CharField(max_length=150, unique=True, verbose_name='Назва')
    slug = models.SlugField(max_length=200, unique=True, blank=True, null=True, verbose_name='URL')
    sub_category = models.ForeignKey(to=SubCategory, on_delete=models.CASCADE, verbose_name='Підкатегорія')

    class Meta:
        db_table = 'addit_category'
        verbose_name = 'Додаткову категорію'
        verbose_name_plural = 'Додаткові категорії'

    def __str__(self) -> str:
        return self.name


class CarBrand(models.Model):
    name = models.CharField(max_length=100, unique=True, verbose_name='Марка авто')

    class Meta:
        db_table = 'car_brand'
        verbose_name = 'Бренд авто'
        verbose_name_plural = 'Бренди авто'

    def __str__(self) -> str:
        return self.name


class CarModel(models.Model):
    car_brand = models.ForeignKey(CarBrand, on_delete=models.CASCADE, verbose_name='Марка авто')
    name = models.CharField(max_length=100, unique=True, verbose_name='Модель авто')
    year = models.PositiveIntegerField(verbose_name='Рік випуску')

    class Meta:
        db_table = 'car_model'
        verbose_name = 'Модель авто'
        verbose_name_plural = 'Моделі авто'

    def __str__(self) -> str:
        return self.name


class Car(models.Model):
    vin_code = models.CharField(max_length=17, unique=True, verbose_name='Він коде')
    brand = models.ForeignKey(CarBrand, on_delete=models.CASCADE,verbose_name='Марка авто')
    model = models.ForeignKey(CarModel, on_delete=models.CASCADE, related_name='cars_by_model',  verbose_name='Модель авто')
    year = models.ForeignKey(CarModel, on_delete=models.CASCADE, related_name='cars_by_year',  verbose_name='Рік випуску')
    body_type = models.CharField(max_length=100, verbose_name='Кузов')
    engine_volume = models.DecimalField(max_digits=4, decimal_places=1, verbose_name='Об\'єм двигуна')
    fueld_type = models.CharField(max_length=100, verbose_name='Вид топлива')
    features = models.TextField(blank=True, verbose_name='Особливосты')
    transmission  = models.CharField(max_length=50, verbose_name='КПП')
    color = models.CharField(max_length=50, verbose_name='Колір')
    country_of_origin = models.CharField(max_length=100, verbose_name='Країна походження')
    photo = models.ImageField(upload_to='car_image', blank=True, null=True, verbose_name='Фото авто')


    class Meta:
        db_table = 'car'
        verbose_name = 'Автомомбіль'
        verbose_name_plural = 'Автомобілі'

    def __str__(self) -> str:
        return f'{self.brand.name} - {self.model.name} {self.model.year}'


class SparePart(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE, verbose_name='Автомобіль')
    oem_code = models.CharField(max_length=50, unique=True, verbose_name='Оригінальний номер запчастини')
    name = models.CharField(max_length=150, verbose_name='Назва запчастини')
    category = models.ForeignKey(Categories, on_delete=models.SET_NULL, null=True, verbose_name='Категорія')
    sub_category = models.ForeignKey(SubCategory, on_delete=models.SET_NULL, null=True, verbose_name='Підкатегорія')
    additional_category = models.ForeignKey(AdditionalСategory, on_delete=models.SET_NULL, null=True, verbose_name='Дод.категорія')
    condition = models.CharField(
        max_length=50,
        choices=[
            ('good', 'Хороший'),
            ('satisfactory', 'Задовільний'),
            ('defective', 'З дефектом'),
            ('repaired', 'Зі слідами ремонту'),
        ],
        verbose_name='Стан')
    
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

    def __str__(self) -> str:
        return f'{self.name} | Стан - {self.get_condition_display()} | Статус - {self.get_availability_display()}'

