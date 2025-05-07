from rest_framework import serializers
from .models import FoodCategory, FoodItem, WasteLog

class FoodCategorySerializer(serializers.ModelSerializer):
    """Serializer for food categories."""
    
    class Meta:
        model = FoodCategory
        fields = ['id', 'name', 'description', 'shelf_life_days', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

class FoodItemSerializer(serializers.ModelSerializer):
    """Serializer for food items."""
    
    category_name = serializers.ReadOnlyField(source='category.name')
    user_email = serializers.ReadOnlyField(source='user.email')
    
    class Meta:
        model = FoodItem
        fields = [
            'id', 'user', 'user_email', 'name', 'category', 'category_name', 
            'quantity', 'unit', 'expiry_date', 'description', 
            'is_available', 'is_donated', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'user', 'user_email', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

class WasteLogSerializer(serializers.ModelSerializer):
    """Serializer for waste logs."""
    
    category_name = serializers.ReadOnlyField(source='category.name')
    user_email = serializers.ReadOnlyField(source='user.email')
    reason_display = serializers.ReadOnlyField(source='get_reason_display')
    
    class Meta:
        model = WasteLog
        fields = [
            'id', 'user', 'user_email', 'food_item', 'food_name', 
            'category', 'category_name', 'quantity', 'unit', 
            'waste_date', 'reason', 'reason_display', 'notes', 'created_at'
        ]
        read_only_fields = ['id', 'user', 'user_email', 'reason_display', 'created_at']
    
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)