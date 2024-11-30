# Generated by Django 5.1.2 on 2024-11-27 05:03

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0004_alter_games_game_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='games',
            name='game_catergory',
        ),
        migrations.RemoveField(
            model_name='games',
            name='game_img_url',
        ),
        migrations.AddField(
            model_name='games',
            name='base_view',
            field=models.ImageField(blank=True, null=True, upload_to='', verbose_name='Game Image'),
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30, verbose_name='Name of Category')),
                ('image', models.ImageField(upload_to='category/', verbose_name='Image')),
                ('catParent', models.ForeignKey(blank=True, limit_choices_to={'catParent__isnull': True}, null=True, on_delete=django.db.models.deletion.CASCADE, to='games.category', verbose_name='Category Parent')),
            ],
        ),
        migrations.AddField(
            model_name='games',
            name='category_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='games.category', verbose_name='Category ID'),
        ),
        migrations.CreateModel(
            name='ProductPicture',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('game_img', models.ImageField(upload_to='', verbose_name='Game image')),
                ('game_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='games.games', verbose_name='Product ID')),
            ],
        ),
        migrations.DeleteModel(
            name='Cartergory',
        ),
    ]