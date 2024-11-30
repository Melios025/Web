# Generated by Django 5.1.2 on 2024-10-16 13:00

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Cartergory',
            fields=[
                ('catergory_id', models.AutoField(primary_key=True, serialize=False)),
                ('catergory_name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Games',
            fields=[
                ('game_id', models.AutoField(primary_key=True, serialize=False)),
                ('game_name', models.CharField(max_length=50)),
                ('game_price', models.IntegerField()),
                ('game_img_name', models.URLField()),
                ('game_catergory', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='games.cartergory')),
            ],
        ),
    ]