from django.contrib import admin
from user.models import Cart,User,Wishlist
from django.contrib.auth.admin import UserAdmin

# Register your models here.
admin.site.register(Cart)
admin.site.register(User,UserAdmin)
admin.site.register(Wishlist)
