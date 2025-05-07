from django.contrib import admin
from .models import Organization, OrganizationNeed, Donation, DonationItem, DonationFeedback

class OrganizationNeedInline(admin.TabularInline):
    model = OrganizationNeed
    extra = 1

@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'city', 'state', 'is_verified', 'created_at')
    list_filter = ('is_verified', 'state', 'city')
    search_fields = ('name', 'description', 'user__email')
    inlines = [OrganizationNeedInline]

class DonationItemInline(admin.TabularInline):
    model = DonationItem
    extra = 1

class DonationFeedbackInline(admin.StackedInline):
    model = DonationFeedback
    extra = 0
    max_num = 1

@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    list_display = ('id', 'donor', 'organization', 'status', 'donation_date', 'created_at')
    list_filter = ('status', 'donation_date')
    search_fields = ('donor__email', 'organization__name', 'notes')
    date_hierarchy = 'donation_date'
    inlines = [DonationItemInline, DonationFeedbackInline]

@admin.register(DonationFeedback)
class DonationFeedbackAdmin(admin.ModelAdmin):
    list_display = ('donation', 'rating', 'created_by', 'created_at')
    list_filter = ('rating',)
    search_fields = ('donation__donor__email', 'donation__organization__name', 'comments')