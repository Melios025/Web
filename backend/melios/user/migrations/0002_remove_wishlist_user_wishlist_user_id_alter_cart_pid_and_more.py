# Generated by Django 5.1.2 on 2024-11-30 09:54

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0008_games_discount_percent_games_final_game_price'),
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='wishlist',
            name='user',
        ),
        migrations.AddField(
            model_name='wishlist',
            name='user_id',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='user ID'),
        ),
        migrations.AlterField(
            model_name='cart',
            name='PID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='games.games', verbose_name='product ID'),
        ),
        migrations.AlterField(
            model_name='cart',
            name='UID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='user ID'),
        ),
        migrations.AlterField(
            model_name='wishlist',
            name='game',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='games.games', verbose_name='game ID'),
        ),
    ]
