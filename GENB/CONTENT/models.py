from django.db import models
from CAR.models import Car


class NewAndBlog(models.Model):
    title = models.CharField(max_length=150, verbose_name="Заголовок")
    year = models.PositiveIntegerField(
        choices=[(year, str(year)) for year in range(2010, 3001)],
        verbose_name='Рік випуску'
    )
    vincode = models.CharField(max_length=17, unique=True, blank=True, verbose_name='Він код')
    engine_car = models.CharField(max_length=150, verbose_name="Двигун")    
    gearbox = models.CharField(max_length=150, verbose_name="Коробка передач")
    color_body = models.CharField(max_length=150, verbose_name="Колір кузова")
    occasion = models.CharField(max_length=150, verbose_name="Привід")
    slug = models.SlugField(max_length=200, unique=True, blank=True, null=True, verbose_name='URL')


    class Meta:
        db_table = 'news'
        verbose_name = 'Новину'
        verbose_name_plural = 'Новини'

    def __str__(self) -> str:
        return f'{self.title}'
   
   

class NewsImage(models.Model):

    news = models.ForeignKey(NewAndBlog, on_delete=models.CASCADE, related_name='images')
    photo = models.ImageField(upload_to='news_image/')

    class Meta:
        db_table = 'news_image'
        verbose_name = 'Фото авто'
        verbose_name_plural = 'фото авто'


    

    
class CarОnTheRoad(models.Model):
    title = models.CharField(max_length=150, verbose_name="Заголовок")
    year = models.PositiveIntegerField(
        choices=[(year, str(year)) for year in range(2010, 3001)],
        verbose_name='Рік випуску'
    )
    auction = models.CharField(max_length=150, verbose_name="Аукціон")
    date = models.CharField(max_length=150, verbose_name="Дата продажу")
    vincode = models.CharField(max_length=17, unique=True, blank=True, verbose_name='Він код')
    state = models.CharField(max_length=150, verbose_name="Стан")
    engine_car = models.CharField(max_length=150, verbose_name="Двигун")
    probig = models.CharField(max_length=150, verbose_name="Пробіг")
    seller = models.CharField(max_length=150, verbose_name="Продавець")
    location_seller = models.CharField(max_length=150, verbose_name="Місце продажу")
    main_damage = models.CharField(max_length=150, verbose_name="Основне ушкодження")
    secondary_damage = models.CharField(max_length=150, verbose_name="Другорядне ушкодження")
    Estimated_cost =  models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Оціночна вартість')
    price_repair = models.CharField(max_length=150, verbose_name="Ціна ремонту")
    gearbox = models.CharField(max_length=150, verbose_name="Коробка передач")
    color_body = models.CharField(max_length=150, verbose_name="Колір кузова")
    occasion = models.CharField(max_length=150, verbose_name="Привід")
    slug = models.SlugField(max_length=200, unique=True, blank=True, null=True, verbose_name='URL')
    
    



    class Meta:
        db_table = 'carontheroad'
        verbose_name = 'Авто в дорозі'
        verbose_name_plural = 'Авто в дорозі'

    def __str__(self) -> str:
        return f'{self.title}'
   
   

class CarОnTheRoadImage(models.Model):
    news = models.ForeignKey(CarОnTheRoad, on_delete=models.CASCADE, related_name='imagess')
    photo = models.ImageField(upload_to='carontheroad_image/')

    class Meta:
        db_table = 'carontheroad_image'
        verbose_name = 'Фото авто'
        verbose_name_plural = 'фото авто'