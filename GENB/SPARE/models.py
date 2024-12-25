from django.db import models
from CAR.models import Car


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



class SparePart(models.Model):

    car = models.ForeignKey('CAR.Car', on_delete=models.SET_NULL, null=True, related_name='cars', verbose_name='Автомобіль')
    oem_code = models.CharField(max_length=50, verbose_name='Оригінальний номер запчастини')
    name = models.CharField(max_length=150, verbose_name='Назва запчастини')
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
        default='living',
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
    slug = models.SlugField(max_length=200, unique=True, blank=True, null=True, verbose_name='URL')
    sku = models.CharField(max_length=50, unique=True, verbose_name='Артикул', blank=True)
    #photo = models.ImageField(upload_to='spare_parts', blank=True, null=True, verbose_name='Фото')


    class Meta:
        db_table = 'spare_part'
        verbose_name = 'Запчастина'
        verbose_name_plural = 'Запчастини'


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


class SparePartImage(models.Model):
    spareparts = models.ForeignKey(SparePart, on_delete=models.CASCADE, related_name='images')
    photo = models.ImageField(upload_to='spare_parts/')

    def __str__(self):
        if self.spareparts and self.spareparts.car:
            car = self.spareparts.car
            return f"Зображення для {car.brand} {car.model}"
        return "Зображення без прив'язки до автомобіля"

