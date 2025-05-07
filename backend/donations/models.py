from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from food.models import FoodItem

class Organization(models.Model):
    """Model representing organizations that can receive donations."""
    
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='organization')
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=20)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    phone_number = models.CharField(max_length=20)
    email = models.EmailField()
    website = models.URLField(blank=True, null=True)
    hours_of_operation = models.TextField(blank=True, null=True)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = _('organization')
        verbose_name_plural = _('organizations')
        ordering = ['name']
    
    def __str__(self):
        return self.name

class OrganizationNeed(models.Model):
    """Model representing the types of food an organization needs."""
    
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='needs')
    food_category = models.ForeignKey('food.FoodCategory', on_delete=models.CASCADE)
    priority = models.PositiveIntegerField(default=0, help_text=_("Higher number means higher priority"))
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = _('organization need')
        verbose_name_plural = _('organization needs')
        ordering = ['-priority']
        unique_together = ('organization', 'food_category')
    
    def __str__(self):
        return f"{self.organization.name} - {self.food_category.name}"

class Donation(models.Model):
    """Model for food donations."""
    
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('in_transit', 'In Transit'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    )
    
    donor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='donations')
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='donations')
    food_items = models.ManyToManyField(FoodItem, related_name='donations', through='DonationItem')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    pickup_time = models.DateTimeField(blank=True, null=True)
    donation_date = models.DateField()
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = _('donation')
        verbose_name_plural = _('donations')
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Donation {self.id} - {self.donor.email} to {self.organization.name}"

class DonationItem(models.Model):
    """Model for individual items in a donation."""
    
    donation = models.ForeignKey(Donation, on_delete=models.CASCADE, related_name='donation_items')
    food_item = models.ForeignKey(FoodItem, on_delete=models.CASCADE)
    quantity = models.DecimalField(max_digits=10, decimal_places=2)
    unit = models.CharField(max_length=20)
    notes = models.TextField(blank=True, null=True)
    
    class Meta:
        verbose_name = _('donation item')
        verbose_name_plural = _('donation items')
    
    def __str__(self):
        return f"{self.food_item.name} - {self.quantity} {self.unit}"

class DonationFeedback(models.Model):
    """Model for feedback on donations."""
    
    RATING_CHOICES = [(i, str(i)) for i in range(1, 6)]
    
    donation = models.OneToOneField(Donation, on_delete=models.CASCADE, related_name='feedback')
    rating = models.PositiveSmallIntegerField(choices=RATING_CHOICES)
    comments = models.TextField(blank=True, null=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='given_feedback')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = _('donation feedback')
        verbose_name_plural = _('donation feedback')
    
    def __str__(self):
        return f"Feedback for Donation {self.donation.id} - {self.rating}/5"