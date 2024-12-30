from django.contrib import admin
from games.models import Games, GamePicture, Category,GameCode
# Register your models here.
admin.site.register(Games)
admin.site.register(GamePicture)
admin.site.register(Category)
admin.site.register(GameCode)
