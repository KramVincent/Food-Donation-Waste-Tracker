from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import FoodCategory, FoodItem, WasteLog
from .serializers import FoodCategorySerializer, FoodItemSerializer, WasteLogSerializer

class FoodCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for viewing food categories."""
    
    queryset = FoodCategory.objects.all()
    serializer_class = FoodCategorySerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'shelf_life_days']

class FoodItemViewSet(viewsets.ModelViewSet):
    """ViewSet for managing food items."""
    
    serializer_class = FoodItemSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'is_available', 'is_donated']
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'expiry_date', 'created_at']
    
    def get_queryset(self):
        """Return only the current user's food items."""
        user = self.request.user
        if user.is_staff:
            return FoodItem.objects.all()
        return FoodItem.objects.filter(user=user)

class WasteLogViewSet(viewsets.ModelViewSet):
    """ViewSet for managing waste logs."""
    
    serializer_class = WasteLogSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'reason', 'waste_date']
    search_fields = ['food_name', 'notes']
    ordering_fields = ['waste_date', 'created_at']
    
    def get_queryset(self):
        """Return only the current user's waste logs."""
        user = self.request.user
        if user.is_staff:
            return WasteLog.objects.all()
        return WasteLog.objects.filter(user=user)