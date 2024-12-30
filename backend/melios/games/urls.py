from django.urls import re_path, path
from games import views
from django.conf.urls.static import static
from django.conf import settings
from .api import GamesAPI,GetGameById,GetPicturesByGameId, GetGameByCatergory, GetCategory

urlpatterns = [
    path("games/",GamesAPI.as_view()),
    path('games/<int:id>/',GetGameById.as_view()),
    path('<int:game_id>/pictures/',GetPicturesByGameId.as_view()),
    path('category/<int:category_id>/', GetGameByCatergory.as_view()),
    path('category/',GetCategory.as_view())
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
