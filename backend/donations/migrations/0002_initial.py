# Generated by Django 4.2.16 on 2025-05-06 02:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('food', '0001_initial'),
        ('donations', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='organizationneed',
            name='food_category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='food.foodcategory'),
        ),
        migrations.AddField(
            model_name='organizationneed',
            name='organization',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='needs', to='donations.organization'),
        ),
    ]
