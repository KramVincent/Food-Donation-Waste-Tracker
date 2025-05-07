from django.contrib import admin
from .models import FoodCategory, FoodItem, WasteLog

@admin.register(FoodCategory)
class FoodCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'shelf_life_days', 'created_at')
    search_fields = ('name',)

@admin.register(FoodItem)
class FoodItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'category', 'quantity', 'unit', 'expiry_date', 'is_available', 'is_donated')
    list_filter = ('category', 'is_available', 'is_donated', 'expiry_date')
    search_fields = ('name', 'user__email', 'description')
    date_hierarchy = 'created_at'

@admin.register(WasteLog)
class WasteLogAdmin(admin.ModelAdmin):
    list_display = ('food_name', 'user', 'category', 'quantity', 'unit', 'waste_date', 'reason')
    list_filter = ('category', 'reason', 'waste_date')
    search_fields = ('food_name', 'user__email', 'notes')
    date_hierarchy = 'waste_date'