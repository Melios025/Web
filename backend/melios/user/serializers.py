from rest_framework import serializers
from .models import User, Cart

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

        def create(self, validated_data):
            newUser = User (
                email=validated_data['email'],
                username=validated_data['username']
            )
            newUser.set_password(validated_data['password'])
            newUser.save()
            return newUser
        
class CartSerializer(serializers.ModelSerializer):

    game_name = serializers.CharField(source='PID.name')
    game_price = serializers.DecimalField(decimal_places=2, max_digits=6,source='PID.price')
    game_base_view = serializers.ImageField(source='PID.base_view')
    class Meta:
        model = Cart
        exclude = []

class CartQTYSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        exclude = []