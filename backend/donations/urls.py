from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OrganizationViewSet, OrganizationNeedViewSet, DonationViewSet

router = DefaultRouter()
router.register(r'organizations', OrganizationViewSet, basename='organization')
router.register(r'organization-needs', OrganizationNeedViewSet, basename='organizationneed')
router.register(r'', DonationViewSet, basename='donation')

urlpatterns = [
    path('', include(router.urls)),
]