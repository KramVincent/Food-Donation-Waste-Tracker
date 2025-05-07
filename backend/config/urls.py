"""
URL configuration for the Food Donation & Waste Tracker project.
"""

from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def health_check(request):
    return JsonResponse({"status": "ok"})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/health/', health_check, name='health_check'),
    path('api/users/', include('users.urls')),
    path('api/food/', include('food.urls')),
    path('api/donations/', include('donations.urls')),
    path('api/organizations/', include('organizations.urls')),
]