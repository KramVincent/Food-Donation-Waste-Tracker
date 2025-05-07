from rest_framework import serializers
from .models import Organization, OrganizationNeed, Donation, DonationItem, DonationFeedback
from food.serializers import FoodItemSerializer
from food.models import FoodItem

class OrganizationNeedSerializer(serializers.ModelSerializer):
    """Serializer for organization needs."""
    
    food_category_name = serializers.ReadOnlyField(source='food_category.name')
    
    class Meta:
        model = OrganizationNeed
        fields = ['id', 'organization', 'food_category', 'food_category_name', 'priority', 'notes']
        read_only_fields = ['id']

class OrganizationSerializer(serializers.ModelSerializer):
    """Serializer for organizations."""
    
    needs = OrganizationNeedSerializer(many=True, read_only=True)
    user_email = serializers.ReadOnlyField(source='user.email')
    
    class Meta:
        model = Organization
        fields = [
            'id', 'name', 'description', 'user', 'user_email', 'address', 
            'city', 'state', 'zip_code', 'latitude', 'longitude', 
            'phone_number', 'email', 'website', 'hours_of_operation', 
            'is_verified', 'created_at', 'updated_at', 'needs'
        ]
        read_only_fields = ['id', 'user', 'user_email', 'is_verified', 'created_at', 'updated_at']

class DonationItemSerializer(serializers.ModelSerializer):
    """Serializer for donation items."""
    
    food_item_name = serializers.ReadOnlyField(source='food_item.name')
    
    class Meta:
        model = DonationItem
        fields = ['id', 'donation', 'food_item', 'food_item_name', 'quantity', 'unit', 'notes']
        read_only_fields = ['id', 'donation']

class DonationFeedbackSerializer(serializers.ModelSerializer):
    """Serializer for donation feedback."""
    
    created_by_email = serializers.ReadOnlyField(source='created_by.email')
    
    class Meta:
        model = DonationFeedback
        fields = ['id', 'donation', 'rating', 'comments', 'created_by', 'created_by_email', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_by', 'created_by_email', 'created_at', 'updated_at']

class DonationSerializer(serializers.ModelSerializer):
    """Serializer for donations."""
    
    donor_email = serializers.ReadOnlyField(source='donor.email')
    organization_name = serializers.ReadOnlyField(source='organization.name')
    donation_items = DonationItemSerializer(many=True, read_only=True, source='donation_items')
    feedback = DonationFeedbackSerializer(read_only=True)
    food_items_data = serializers.ListField(child=serializers.DictField(), write_only=True, required=False)
    
    class Meta:
        model = Donation
        fields = [
            'id', 'donor', 'donor_email', 'organization', 'organization_name', 
            'status', 'pickup_time', 'donation_date', 'notes', 
            'created_at', 'updated_at', 'donation_items', 'feedback',
            'food_items_data'
        ]
        read_only_fields = ['id', 'donor', 'donor_email', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        food_items_data = validated_data.pop('food_items_data', None)
        validated_data['donor'] = self.context['request'].user
        donation = Donation.objects.create(**validated_data)
        
        if food_items_data:
            for item_data in food_items_data:
                food_item_id = item_data.get('food_item')
                try:
                    food_item = FoodItem.objects.get(id=food_item_id, user=donation.donor)
                    DonationItem.objects.create(
                        donation=donation,
                        food_item=food_item,
                        quantity=item_data.get('quantity', food_item.quantity),
                        unit=item_data.get('unit', food_item.unit),
                        notes=item_data.get('notes', '')
                    )
                    food_item.is_donated = True
                    food_item.save()
                except FoodItem.DoesNotExist:
                    pass
                
        return donation