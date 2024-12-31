from django.db import models
from django.contrib.auth.models import AbstractUser
from games.models import Category


class User(AbstractUser):
    bought_category = models.ManyToManyField(Category,blank=True, verbose_name=("Bough Category"))

class Wishlist(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='user ID', null=True, blank= True)
    game = models.ForeignKey('games.Games', on_delete=models.CASCADE, verbose_name='game ID')

class Cart(models.Model):
    id = models.AutoField(primary_key=True)
    PID = models.ForeignKey('games.Games', on_delete=models.CASCADE , verbose_name='product ID')
    UID = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='user ID')
    quantity = models.IntegerField(default=1)
