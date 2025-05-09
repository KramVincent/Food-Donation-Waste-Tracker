# Generated by Django 4.2.16 on 2025-05-06 02:02

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('donations', '0002_initial'),
        ('food', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='organization',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='organization', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='donationitem',
            name='donation',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='donation_items', to='donations.donation'),
        ),
        migrations.AddField(
            model_name='donationitem',
            name='food_item',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='food.fooditem'),
        ),
        migrations.AddField(
            model_name='donationfeedback',
            name='created_by',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='given_feedback', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='donationfeedback',
            name='donation',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='feedback', to='donations.donation'),
        ),
        migrations.AddField(
            model_name='donation',
            name='donor',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='donations', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='donation',
            name='food_items',
            field=models.ManyToManyField(related_name='donations', through='donations.DonationItem', to='food.fooditem'),
        ),
        migrations.AddField(
            model_name='donation',
            name='organization',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='donations', to='donations.organization'),
        ),
        migrations.AlterUniqueTogether(
            name='organizationneed',
            unique_together={('organization', 'food_category')},
        ),
    ]
