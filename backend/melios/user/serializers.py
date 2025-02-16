from rest_framework import serializers
from .models import User, Cart

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ['password']

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Tạo mới người dùng với email và username
        newUser = User(
            email=validated_data['email'],
            username=validated_data['username']
        )
        # Mã hóa mật khẩu và lưu
        newUser.set_password(validated_data['password'])
        newUser.save()
        return newUser
class AddCartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ('PID', 'UID')
        def create(self, data):
            newCart = Cart(
                PID = data['PID'],
                UID = data['UID']
            )  
            newCart.save()
            return newCart    
class CartSerializer(serializers.ModelSerializer):

    game_name = serializers.CharField(source='PID.game_name')
    game_price = serializers.IntegerField(source='PID.game_price')
    game_base_view = serializers.ImageField(source='PID.base_view')
    game_final_price = serializers.IntegerField(source='PID.final_game_price')
    class Meta:
        model = Cart
        exclude = []

class CartQTYSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        exclude = []