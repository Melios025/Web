from django.contrib import admin
from django.urls import path, include

from rest_framework import routers
from rest_framework.routers import DefaultRouter

from .api import SendEmailView, UsersView, RegisterView, LoginView, CartView, CartUpdateView,AddCartView,DeleteCart

userRouter = DefaultRouter()
userRouter.register('userslist/', UsersView)
# userRouter.register('cart/<int:id>/', CartUpdateView)

urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("login/", LoginView.as_view()),
    # path("cart/", CartView.as_view(), name="cart"),
    
    # test cart with id
    path("cart/<int:username>", CartView.as_view(), name="cart"), 
    path("cart/add/",AddCartView.as_view()),
    path("cart/delete/<cart_id>", DeleteCart.as_view(), name="DeleteCart"),
    path("cart/<int:username>", CartUpdateView.as_view({'put': 'update'}), name="updateCart"),

    path("sendmail/", SendEmailView.as_view(), name='SendEmail')
]

urlpatterns += userRouter.urls