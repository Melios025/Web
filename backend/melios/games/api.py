from rest_framework.generics import ListAPIView, CreateAPIView
from .models import Games, Category, GamePicture
from .serializers import GamesSerializer, CategorySerializer, PictureSerializer
from rest_framework.views import APIView


class GamesAPI(ListAPIView):
    queryset = Games.objects.all()
    serializer_class = GamesSerializer

class GetCategory(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class GetCategoryById(ListAPIView):
    serializer_class = CategorySerializer

    def get_queryset(self):
        id = self.kwargs["id"]
        return Category.objects.filter(id=id)
class GetGameById(ListAPIView):
    serializer_class = GamesSerializer

    def get_queryset(self):
        id = self.kwargs["id"]
        return Games.objects.filter(game_id=id)


class GetPicturesByGameId(ListAPIView):
    serializer_class = PictureSerializer

    def get_queryset(self):
        game_id = self.kwargs["game_id"]
        return GamePicture.objects.filter(game_id=game_id)


class GetGameByCatergory(ListAPIView):
    serializer_class = GamesSerializer

    def get_queryset(self):
        category_id = self.kwargs['category_id'] 
        category = Category.objects.get(id=category_id)
        subcategories = Category.objects.filter(catParent=category_id)
        related_category_ids = [category.id] + list(subcategories.values_list('id', flat=True))
        return Games.objects.filter(category_id__in=related_category_ids).distinct()
