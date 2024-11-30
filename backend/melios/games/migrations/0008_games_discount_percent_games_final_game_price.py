# Generated by Django 5.1.2 on 2024-11-30 07:29

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0007_games_description_games_stock_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='games',
            name='discount_percent',
            field=models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(100)]),
        ),
        migrations.AddField(
            model_name='games',
            name='final_game_price',
            field=models.IntegerField(default=0),
        ),
    ]
