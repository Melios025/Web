from rest_framework.generics import ListAPIView, CreateAPIView
from .models import Games, Category, GamePicture
from .serializers import GamesSerializer, CategorySerializer, PictureSerializer

class GamesAPI(ListAPIView):
     queryset = Games.objects.all()
     serializer_class = GamesSerializer
class GetGameById(ListAPIView):
    serializer_class = GamesSerializer
    def get_queryset(self):
        id = self.kwargs['id']
        return Games.objects.filter(game_id = id)
class GetPicturesByGameId(ListAPIView):
    serializer_class = PictureSerializer
    def get_queryset(self):
        game_id = self.kwargs['game_id']
        return GamePicture.objects.filter(game_id=game_id)
