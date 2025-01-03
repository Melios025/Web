from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework import authentication
from rest_framework import exceptions
from rest_framework import generics
from rest_framework.generics import ListAPIView
from django.contrib.auth.hashers import check_password


from rest_framework import status, viewsets
from rest_framework.decorators import action


from games.serializers import GamesSerializer
from .sendmail import send_email_SMTP
from games.models import GameCode
from .serializers import (
    UserSerializer,
    RegisterSerializer,
    CartSerializer,
    AddCartSerializer,
)
from .models import User, Cart
from games.models import Games


class UsersView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer


class AddCartView(generics.CreateAPIView):
    serializer_class = AddCartSerializer


class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        try:
            user = User.objects.get(username=username)
            
            # So sánh mật khẩu đã hash
            if check_password(password, user.password):  # Sử dụng check_password để so sánh mật khẩu
                return Response(
                    {
                        "user": {
                            "id": user.id,
                            "username": user.username,
                        }
                    }
                )
            else:
                return Response({"error": "Wrong Password"})
        
        except User.DoesNotExist:
            raise exceptions.AuthenticationFailed("No such user")


class CartView(generics.ListAPIView):
    serializer_class = CartSerializer

    def get_queryset(self):
        """
        return a list of all records for
        the user as determined by the userID portion of the URL.
        """
        userID = self.kwargs["username"]
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
        cartID = self.kwargs["pk"]
        serializer = Cart.objects.filter(id=cartID)
        return Response(serializer.data)


class RecommendationView(ListAPIView):
    serializer_class = GamesSerializer

    def get_queryset(self):
        userId = self.kwargs["userId"]
        user = User.objects.get(id=userId)

        # Lấy danh sách các category_id
        category_ids = user.bought_category.values_list('id', flat=True)

        # Truy vấn tất cả các Game liên quan đến danh sách category_id
        return Games.objects.filter(category_id__in=category_ids)


class SendEmailView(APIView):
    def post(self, request):
        data = request.data
        recipient = data.get("recipient")
        game_ids = data.get("game_id")  # ID của GameCode

        if not recipient or not game_ids:
            return Response(
                {"Message": "Missing required fields: recipient or game_id."},
                status=status.HTTP_404_NOT_FOUND,
            )
        if recipient is None:
            return Response(
                {"message": "Recipient is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if isinstance(recipient, str):
            recipient = [recipient]  # Chuyển recipient thành list nếu là string
        elif not isinstance(recipient, list):
            return Response(
                {"message": "Recipient must be a list or a string."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not recipient:  # Kiểm tra nếu danh sách recipient trống
            return Response(
                {"message": "Recipient list cannot be empty."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            message = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>body {font-family: Arial, sans-serif;background-color: #f4f4f4;margin: 0;padding: 0;}.email-container {background-color: #ffffff;max-width: 600px;margin: 20px auto;padding: 20px;border-radius: 8px;box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);}.email-header {text-align: center;padding: 10px 0;border-bottom: 1px solid #eaeaea;}.email-header h1 {font-size: 24px;margin: 0;color: #333333;}.email-body {padding: 20px;}.email-body p {font-size: 16px;color: #555555;margin: 0 0 10px;}.email-body ul {list-style: none;padding: 0;margin: 10px 0;}.email-body ul li {background-color: #f9f9f9;padding: 10px;border: 1px solid #eaeaea;border-radius: 5px;margin-bottom: 8px;font-size: 14px;}.email-body ul li strong {color: #333333;}.email-footer {text-align: center;padding: 10px 0;border-top: 1px solid #eaeaea;margin-top: 20px;}.email-footer p {font-size: 12px;color: #aaaaaa;}</style></head><body><div class="email-container"><div class="email-header"><h1>Your Game Codes</h1></div><div class="email-body"><p>Dear User,</p><p>Below are your game codes:</p><ul>'
            count = 1
            for id in game_ids:
                game = GameCode.objects.filter(game_id=id, is_used=False).first()
                game_name = Games.objects.get(game_id=id)
                game_code = game.code
                message += (
                    f"<li>Game {count}: <strong>{game_name.game_name}</strong> - Code: <code>{game_code}</code></li>"
                )
                count = count + 1
                game.is_used = True
                game.save()

            message+='</ul> <p>Thank you for choosing our service. Enjoy your games!</p></div><div class="email-footer"><p>&copy; 2025 Melios. All rights reserved.</p></div></div></body></html>'
            subject = "Your game code"
            response = send_email_SMTP(subject, "Your game codes:", recipient, html_message=message)

            return Response(
                {"Message": "Email sent succesfully", "response": response},
                status=status.HTTP_200_OK,
            )
        except GameCode.DoesNotExist:
            return Response(
                {"message": "Invalid game_code_id or the code is already used."},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception as e:
            return Response(
                {"message": f"Failed to send email: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

class AddCategoriesToUserView(APIView):
    def post(self, request):
        # Lấy game_id và user_id từ request
        game_id = request.data.get("game_id")
        user_id = request.data.get("user_id")

        # Kiểm tra xem game_id và user_id có được cung cấp không
        if not game_id or not user_id:
            return Response(
                {"message": "Missing required fields: game_id or user_id."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            # Tìm game và user trong cơ sở dữ liệu
            game = Games.objects.get(game_id=game_id)
            user = User.objects.get(id=user_id)
            
            # Lấy tất cả các category của game
            categories = game.category_id.all()
            
            # Loại bỏ các category đã tồn tại trong bought_category của user
            existing_categories = user.bought_category.all()
            categories_to_add = [category for category in categories if category not in existing_categories]
            
            if categories_to_add:
                # Thêm các category vào bought_category của người dùng
                user.bought_category.add(*categories_to_add)
                user.save()
                return Response(
                    {"message": "Categories added to user successfully"},
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {"message": "User already has all these categories."},
                    status=status.HTTP_200_OK,
                )
        
        except Games.DoesNotExist:
            return Response(
                {"message": "Game not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
        except User.DoesNotExist:
            return Response(
                {"message": "User not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception as e:
            return Response(
                {"message": f"An error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
