from django.db import models





class Brand(models.Model):
    name = models.CharField(max_length=255, unique=True, verbose_name="Марка")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Марка"
        verbose_name_plural = "Марки"


class Model_car(models.Model):
    name = models.CharField(max_length=255, unique=True, verbose_name="Модель")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Модель"
        verbose_name_plural = "Модель"


class BodyType(models.Model):
    name = models.CharField(max_length=255, unique=True, verbose_name="Кузов")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Кузов"
        verbose_name_plural = "Кузови"


class Feature(models.Model):
    name = models.CharField(max_length=255, unique=True, verbose_name="Особливість")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Особливість"
        verbose_name_plural = "Особливості"


class Color(models.Model):
    name = models.CharField(max_length=255, unique=True, verbose_name="Колір")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Колір"
        verbose_name_plural = "Колір"


class Transmission(models.Model):
    name = models.CharField(max_length=255, unique=True, verbose_name="КПП")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "КПП"
        verbose_name_plural = "КПП"


class FueldType(models.Model):
    name = models.CharField(max_length=255, unique=True, verbose_name="Вид топлива")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Вид топлива"
        verbose_name_plural = "Вид топлива"



class EngineVolume(models.Model):
    volume = models.DecimalField(
        max_digits=4, decimal_places=1, unique=True, verbose_name="Об'єм двигуна (л)"
    )

    def __str__(self):
        return f"{self.volume} л"

    class Meta:
        verbose_name = "Об'єм двигуна"
        verbose_name_plural = "Об'єми двигуна"



    def save_year(self, *args, **kwargs):
        # Ваша логіка збереження
        if not self.year:
            self.year = 2010  # Призначити 2010 рік, якщо він не заданий
        super().save(*args, **kwargs)



class Car(models.Model):
    vin_code = models.CharField(max_length=17, unique=True, blank=True, verbose_name='Він код')
    brand = models.ForeignKey(Brand, on_delete=models.SET_NULL, null=True, related_name='brands', verbose_name="Марка")
    model = models.ForeignKey(Model_car, on_delete=models.SET_NULL, null=True, related_name='models', verbose_name="Модель")
    body_type = models.ForeignKey(BodyType, on_delete=models.SET_NULL, null=True, blank=True, related_name='types', verbose_name="Кузов")
    fueld_type = models.ForeignKey(FueldType, on_delete=models.SET_NULL, null=True, blank=True, related_name='types_fields', verbose_name="Вид топлива")
    color = models.ForeignKey(Color, on_delete=models.SET_NULL, null=True, blank=True, related_name='colors', verbose_name="Колір")
    features = models.ForeignKey(Feature, on_delete=models.SET_NULL, null=True, blank=True, related_name='feature', verbose_name="Особливості")
    year = models.PositiveIntegerField(
        choices=[(2002, '2002')] + [(year, str(year)) for year in range(2010, 3001)],
        verbose_name='Рік випуску'
    )

    engine_volume = models.ForeignKey(
        EngineVolume, on_delete=models.SET_NULL, null=True, blank=True, related_name='engine_volumes', verbose_name="Об'єм двигуна")
    transmission  = models.ForeignKey(
        Transmission, on_delete=models.SET_NULL, null=True, blank=True, related_name='transmissions', verbose_name='КПП')
    description =models.CharField(
        max_length=300, null=True, blank=True, verbose_name='Опис')
    slug = models.SlugField(max_length=200, blank=True, null=True, verbose_name='URL')
   


    class Meta:
        db_table = 'car'
        verbose_name = 'Автомобіль'
        verbose_name_plural = 'Автомобілі'
        ordering = ("id",)

    def __str__(self) -> str:
        return f'{self.brand} {self.model} {self.year} | {self.vin_code}   {self.body_type}   {self.transmission}   {self.color}   {self.features}   {self.color}'
   
   

class CarImage(models.Model):
    cars = models.ForeignKey(Car, on_delete=models.CASCADE, related_name='images')
    photo = models.ImageField(upload_to='car_image/')


    def __str__(self):
        return f"для {self.cars.brand} {self.cars.model}"
