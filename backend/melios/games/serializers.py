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
        model = GameCode
        exclude =[]
