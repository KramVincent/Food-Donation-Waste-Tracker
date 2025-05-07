from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import NearbyOrganizationsView, OrganizationAnalyticsView

urlpatterns = [
    path('nearby/', NearbyOrganizationsView.as_view(), name='nearby-organizations'),
    path('analytics/<int:organization_id>/', OrganizationAnalyticsView.as_view(), name='organization-analytics'),
]