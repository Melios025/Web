from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import GameCode, Games

# Signal khi tạo GameCode mới
@receiver(post_save, sender=GameCode)
def update_stock_on_game_code_create(sender, instance, created, **kwargs):
    # Nếu là việc tạo mới GameCode, cập nhật lại stock của game
    if created:
        game = instance.game
        game.stock = GameCode.objects.filter(game=game).count()
        game.save()

# Signal khi cập nhật GameCode
@receiver(post_save, sender=GameCode)
def update_stock_on_game_code_update(sender, instance, **kwargs):
    # Cập nhật lại stock mỗi khi có sự thay đổi trong GameCode
    game = instance.game
    game.stock = GameCode.objects.filter(game=game).count()
    game.save()

# Signal khi xóa GameCode
@receiver(post_delete, sender=GameCode)
def update_stock_on_game_code_delete(sender, instance, **kwargs):
    # Khi xóa GameCode, giảm stock của game
    game = instance.game
    game.stock = GameCode.objects.filter(game=game).count()
    game.save()
