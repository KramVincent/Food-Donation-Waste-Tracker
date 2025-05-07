from rest_framework import viewsets, permissions, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

from .models import Organization, OrganizationNeed, Donation, DonationFeedback
from .serializers import (
    OrganizationSerializer, OrganizationNeedSerializer,
    DonationSerializer, DonationFeedbackSerializer
)

User = get_user_model()

class IsOrganizationUser(permissions.BasePermission):
    """
    Custom permission to only allow organization users to access/modify their data.
    """
    def has_object_permission(self, request, view, obj):
        # Check if the user is associated with the organization
        return obj.user == request.user or request.user.is_staff

class OrganizationViewSet(viewsets.ModelViewSet):
    """ViewSet for managing organizations."""
    
    serializer_class = OrganizationSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['city', 'state', 'is_verified']
    search_fields = ['name', 'description', 'city', 'state']
    ordering_fields = ['name', 'created_at']
    
    def get_queryset(self):
        """Return all verified organizations or the user's own organization."""
        user = self.request.user
        if user.is_staff:
            return Organization.objects.all()
        return Organization.objects.filter(Q(is_verified=True) | Q(user=user))
    
    def get_permissions(self):
        """
        Override to set custom permissions for different actions.
        """
        if self.action == 'create':
            # Only allow users with organization user_type to create organizations
            return [permissions.IsAuthenticated()]
        if self.action in ['update', 'partial_update', 'destroy']:
            # Only allow org owners or admins to update/delete orgs
            return [permissions.IsAuthenticated(), IsOrganizationUser()]
        return super().get_permissions()
    
    def perform_create(self, serializer):
        """Set the user field to the current user."""
        serializer.save(user=self.request.user)

class OrganizationNeedViewSet(viewsets.ModelViewSet):
    """ViewSet for managing organization needs."""
    
    serializer_class = OrganizationNeedSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        """Return needs for all verified organizations or the user's own organization."""
        user = self.request.user
        if user.is_staff:
            return OrganizationNeed.objects.all()
        return OrganizationNeed.objects.filter(
            Q(organization__is_verified=True) | Q(organization__user=user)
        )
    
    def get_permissions(self):
        """
        Override to set custom permissions for different actions.
        """
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            # Only allow org owners or admins to create/update/delete needs
            organization_id = self.request.data.get('organization')
            if organization_id:
                organization = get_object_or_404(Organization, id=organization_id)
                if organization.user != self.request.user and not self.request.user.is_staff:
                    return [permissions.IsAdminUser()]
        return super().get_permissions()

class DonationViewSet(viewsets.ModelViewSet):
    """ViewSet for managing donations."""
    
    serializer_class = DonationSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'organization', 'donation_date']
    search_fields = ['notes', 'organization__name']
    ordering_fields = ['donation_date', 'created_at', 'status']
    
    def get_queryset(self):
        """Return donations relevant to the current user."""
        user = self.request.user
        if user.is_staff:
            return Donation.objects.all()
        if user.user_type == 'donor':
            return Donation.objects.filter(donor=user)
        elif user.user_type == 'organization':
            try:
                org = Organization.objects.get(user=user)
                return Donation.objects.filter(organization=org)
            except Organization.DoesNotExist:
                return Donation.objects.none()
        return Donation.objects.none()
    
    @action(detail=True, methods=['post'])
    def add_feedback(self, request, pk=None):
        """Add feedback to a donation."""
        donation = self.get_object()
        serializer = DonationFeedbackSerializer(data=request.data)
        
        if serializer.is_valid():
            # Check if feedback already exists
            if hasattr(donation, 'feedback'):
                return Response(
                    {'detail': 'Feedback already exists for this donation.'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Check if user is allowed to add feedback
            is_donor = donation.donor == request.user
            is_org_user = request.user.user_type == 'organization' and donation.organization.user == request.user
            
            if not (is_donor or is_org_user or request.user.is_staff):
                return Response(
                    {'detail': 'You do not have permission to add feedback to this donation.'},
                    status=status.HTTP_403_FORBIDDEN
                )
            
            serializer.save(donation=donation, created_by=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)