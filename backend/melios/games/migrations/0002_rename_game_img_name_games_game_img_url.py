# Generated by Django 5.1.2 on 2024-10-16 13:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='games',
            old_name='game_img_name',
            new_name='game_img_url',
        ),
    ]
