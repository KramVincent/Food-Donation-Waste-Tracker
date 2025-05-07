from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _

class FoodCategory(models.Model):
    """Model representing food categories."""
    
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    shelf_life_days = models.PositiveIntegerField(help_text=_("Average shelf life in days"))
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = _('food category')
        verbose_name_plural = _('food categories')
        ordering = ['name']
    
    def __str__(self):
        return self.name

class FoodItem(models.Model):
    """Model representing food items logged by users."""
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='food_items')
    name = models.CharField(max_length=255)
    category = models.ForeignKey(FoodCategory, on_delete=models.SET_NULL, null=True, related_name='food_items')
    quantity = models.DecimalField(max_digits=10, decimal_places=2)
    unit = models.CharField(max_length=20)
    expiry_date = models.DateField()
    description = models.TextField(blank=True, null=True)
    is_available = models.BooleanField(default=True)
    is_donated = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = _('food item')
        verbose_name_plural = _('food items')
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} ({self.quantity} {self.unit})"

class WasteLog(models.Model):
    """Model for tracking food waste."""
    
    WASTE_REASON_CHOICES = (
        ('expired', 'Expired'),
        ('spoiled', 'Spoiled'),
        ('damaged', 'Damaged'),
        ('excess', 'Excess'),
        ('other', 'Other'),
    )
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='waste_logs')
    food_item = models.ForeignKey(FoodItem, on_delete=models.SET_NULL, null=True, blank=True, related_name='waste_logs')
    food_name = models.CharField(max_length=255)
    category = models.ForeignKey(FoodCategory, on_delete=models.SET_NULL, null=True, related_name='waste_logs')
    quantity = models.DecimalField(max_digits=10, decimal_places=2)
    unit = models.CharField(max_length=20)
    waste_date = models.DateField()
    reason = models.CharField(max_length=20, choices=WASTE_REASON_CHOICES)
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = _('waste log')
        verbose_name_plural = _('waste logs')
        ordering = ['-waste_date']
    
    def __str__(self):
        return f"{self.food_name} - {self.quantity} {self.unit} - {self.get_reason_display()}"