from django.db import models
from django.conf  import settings


# Create your models here.
class Category(models.Model):
    name=models.CharField(max_length=30,verbose_name=("Name of Category"))
    image= models.ImageField(upload_to='category/',verbose_name=("Image"))
    catParent=models.ForeignKey('self',limit_choices_to={'catParent__isnull':True}, on_delete=models.CASCADE,blank=True,null=True,verbose_name=("Category Parent"))
    def __str__(self):
        return self.name


class Games(models.Model):
    game_id = models.AutoField(primary_key=True)
    game_name = models.CharField(max_length=50, unique=True)
    category_id=models.ForeignKey(Category,null=True,blank=True, on_delete=models.CASCADE, verbose_name=("Category ID"))
    game_price = models.IntegerField(null=True, blank=True)
    base_view = models.ImageField(verbose_name=("Game Image"), blank=True , null=True, upload_to='./media/games')
    def __str__(self):
        return str(self.game_name)
    
class GamePicture(models.Model):
    game_id = models.ForeignKey(Games, null=True, on_delete=models.CASCADE, verbose_name="Game ID")
    game_img = models.ImageField(verbose_name='Game image',upload_to="./media/games")
