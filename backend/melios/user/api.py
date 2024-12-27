from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework import authentication
from rest_framework import exceptions
from rest_framework import generics

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .serializers import UserSerializer, RegisterSerializer, CartSerializer, AddCartSerializer
from .models import User , Cart

class UsersView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer

class AddCartView(generics.CreateAPIView):
    serializer_class= AddCartSerializer
class LoginView(APIView):
    def post(self, request,):
        username = request.data.get("username")
        password = request.data.get("password")

        try:
            user = User.objects.get(username=username)
            if user:
                if user.password == password:
                    return Response({"user": {
                                        "id": user.id ,
                                        "username" : user.username, }
                                    })
                else:
                    return Response({"error": "Wrong Password" }) 

        except User.DoesNotExist:
            raise exceptions.AuthenticationFailed('No such user')

class CartView(generics.ListAPIView):
    serializer_class = CartSerializer

    
    def get_queryset(self):
        """
        return a list of all records for
        the user as determined by the userID portion of the URL.
        """
        userID = self.kwargs['username']
        return Cart.objects.filter(UID=userID)

class DeleteCart(APIView):
    serializer_class = CartSerializer
    def delete(self, request, cart_id):
        try:
            cart_item = Cart.objects.get(id=cart_id)
            cart_item.delete()
            return Response({"message": "Cart item deleted successfully."})
        except:
           return Response({"message": "Cart item deleted unsuccessfully."})

class CartUpdateView(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    queryset = Cart.objects.all()
    
    def update(self, request, *args, **kwargs):
        cartID = self.kwargs['pk']
        serializer = Cart.objects.filter(id=cartID)
        return Response(serializer.data)