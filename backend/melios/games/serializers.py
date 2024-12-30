from rest_framework import serializers
from games.models import Category, Games, GamePicture,GameCode


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        exclude = []


class GamesSerializer(serializers.ModelSerializer):
    class Meta:
        model=Games
        exclude = []
class PictureSerializer(serializers.ModelSerializer):
    class Meta:
        model=GamePicture
        exclude = []
class GameCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Games
        fields = ['game_id', 'game_name', 'category_id', 'game_price', 'final_game_price', 'base_view', 'description', 'stock', 'discount_percent']
