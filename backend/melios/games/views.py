# from django.shortcuts import render
# from django.views.decorators.csrf import csrf_exempt
# from rest_framework.parsers import JSONParser
# from django.http.response import JsonResponse, HttpResponse
# from games.models import Category, Games
# from games.serializers import CategorySerializer, GamesSerializer


# # Create your views here.


# @csrf_exempt
# def GamesApi(request, id=""):
#     if request.method == "GET" and id != "":
#         games = Games.objects.get(game_id=id)
#         games_serializer = GamesSerializer(games)
#         return JsonResponse(games_serializer.data, safe=False)
#     elif request.method == "GET":
#         games = Games.objects.all()
#         games_serializer = GamesSerializer(games, many=True)
#         return JsonResponse(games_serializer.data, safe=False)
#     elif request.method == "POST":
#         games_data = JSONParser().parse(request)
#         games_serializer = GamesSerializer(data=games_data)
#         if games_serializer.is_valid():
#             games_serializer.save()
#             return JsonResponse("Add successful", safe=False)
#         return JsonResponse("Add failed", safe=False)
#     elif request.method == "PUT":
#         games_data = JSONParser().parse(request)
#         games = Games.objects.get(game_id=games_data["games_id"])
#         games_serializer = GamesSerializer(games, data=games_data)
#         if games_serializer.is_valid():
#             games_serializer.save()
#             return JsonResponse("Update successful", safe=False)
#         return JsonResponse("Update failed", safe=False)
#     elif request.method == "DELETE":
#         game = Games.objects.get(game_id=id)
#         game.delete()
#         return JsonResponse("Deleted successful", safe=False)
