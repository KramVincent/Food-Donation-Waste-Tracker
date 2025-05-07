from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FoodCategoryViewSet, FoodItemViewSet, WasteLogViewSet

router = DefaultRouter()
router.register(r'categories', FoodCategoryViewSet)
router.register(r'items', FoodItemViewSet, basename='fooditem')
router.register(r'waste', WasteLogViewSet, basename='wastelog')

urlpatterns = [
    path('', include(router.urls)),
]