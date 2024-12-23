from django.db import models
from django.conf  import settings
from django.core.validators import MinValueValidator, MaxValueValidator


# Create your models here.
class Category(models.Model):
    name=models.CharField(max_length=30,verbose_name=("Name of Category"))
    image= models.ImageField(null= True, blank= True, upload_to='category/',verbose_name=("Image"))
    catParent=models.ForeignKey('self',limit_choices_to={'catParent__isnull':True}, on_delete=models.CASCADE,blank=True,null=True,verbose_name=("Category Parent"))
    def __str__(self):
        return self.name


class Games(models.Model):
    game_id = models.AutoField(primary_key=True)
    game_name = models.CharField(max_length=50, unique=True)
    category_id=models.ManyToManyField(Category,null=True,blank=True, verbose_name=("Category ID"))
    game_price = models.IntegerField(null=True, blank=True)
    base_view = models.ImageField(verbose_name=("Game Image"), blank=True , null=True, upload_to='./media/games')
    description = models.TextField(null= True, blank= True)
    stock = models.IntegerField(default=1)
    discount_percent = models.IntegerField(default= 0, validators=[MinValueValidator(0), MaxValueValidator(100)])
    final_game_price = models.IntegerField(default= 0)
    def __str__(self):
        return str(self.game_name)
    def save(self, *args, **kwargs):
        if self.game_price is not None and self.discount_percent is not None:
            # Tính giá cuối cùng
            self.final_game_price = self.game_price * (1 - self.discount_percent / 100)
        
        # Gọi phương thức save() của lớp cha
        super().save(*args, **kwargs)
    
class GamePicture(models.Model):
    game_id = models.ForeignKey(Games, null=True, on_delete=models.CASCADE, verbose_name="Game ID")
    game_img = models.ImageField(verbose_name='Game image',upload_to="./media/games")
