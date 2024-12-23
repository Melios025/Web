from django.contrib import admin
from django.urls import path, include

from rest_framework import routers
from rest_framework.routers import DefaultRouter

from .api import UsersView, RegisterView, LoginView, CartView, CartUpdateView

userRouter = DefaultRouter()
userRouter.register('userslist/', UsersView)
# userRouter.register('cart/<int:id>/', CartUpdateView)

urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("login/", LoginView.as_view()),
    # path("cart/", CartView.as_view(), name="cart"),
    
    # test cart with id
    path("cart/<int:username>", CartView.as_view(), name="cart"), 
    path("cart/<int:username>", CartUpdateView.as_view({'put': 'update'}), name="updateCart"),
]

urlpatterns += userRouter.urls