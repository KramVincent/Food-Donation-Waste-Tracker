from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Count, Sum, Avg, F, Q
from donations.models import Organization, Donation
from donations.serializers import OrganizationSerializer
from django.utils import timezone
from datetime import timedelta
import math

class NearbyOrganizationsView(APIView):
    """View for finding nearby organizations."""
    
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        # Get latitude, longitude and distance (in km)
        lat = self.request.query_params.get('lat')
        lng = self.request.query_params.get('lng')
        distance = self.request.query_params.get('distance', '10') # default 10km
        
        try:
            lat = float(lat)
            lng = float(lng)
            distance = float(distance)
        except (TypeError, ValueError):
            return Response(
                {'detail': 'Invalid latitude, longitude, or distance.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Basic haversine formula to filter organizations within distance
        # This is a simplified approach for demonstration purposes
        earth_radius = 6371  # km
        
        # Get all verified organizations
        organizations = Organization.objects.filter(is_verified=True)
        
        nearby_orgs = []
        for org in organizations:
            if org.latitude is None or org.longitude is None:
                continue
                
            # Calculate distance using haversine formula
            dlat = math.radians(org.latitude - lat)
            dlng = math.radians(org.longitude - lng)
            a = (math.sin(dlat/2) * math.sin(dlat/2) +
                 math.cos(math.radians(lat)) * math.cos(math.radians(org.latitude)) *
                 math.sin(dlng/2) * math.sin(dlng/2))
            c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
            org_distance = earth_radius * c
            
            if org_distance <= distance:
                org_data = OrganizationSerializer(org).data
                org_data['distance'] = round(org_distance, 2)
                nearby_orgs.append(org_data)
        
        # Sort by distance
        nearby_orgs.sort(key=lambda x: x['distance'])
        
        return Response(nearby_orgs)

class OrganizationAnalyticsView(APIView):
    """View for getting analytics about an organization."""
    
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request, organization_id):
        try:
            organization = Organization.objects.get(id=organization_id)
        except Organization.DoesNotExist:
            return Response(
                {'detail': 'Organization not found.'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Check permissions
        is_org_user = organization.user == request.user
        if not (is_org_user or request.user.is_staff):
            # Only show basic metrics for non-org users
            return Response({
                'name': organization.name,
                'total_donations_received': Donation.objects.filter(
                    organization=organization,
                    status='completed'
                ).count()
            })
        
        # Get time period for analytics
        time_period = request.query_params.get('period', 'month')
        if time_period == 'week':
            start_date = timezone.now().date() - timedelta(days=7)
        elif time_period == 'month':
            start_date = timezone.now().date() - timedelta(days=30)
        elif time_period == 'quarter':
            start_date = timezone.now().date() - timedelta(days=90)
        elif time_period == 'year':
            start_date = timezone.now().date() - timedelta(days=365)
        else:
            start_date = timezone.now().date() - timedelta(days=30)  # Default to month
        
        # Get completed donations in time period
        completed_donations = Donation.objects.filter(
            organization=organization,
            status='completed',
            donation_date__gte=start_date
        )
        
        # Calculate metrics
        total_completed = completed_donations.count()
        
        # Calculate average rating from feedback
        average_rating = Donation.objects.filter(
            organization=organization,
            status='completed',
            feedback__isnull=False
        ).aggregate(avg_rating=Avg('feedback__rating'))['avg_rating'] or 0
        
        # Top donors
        top_donors = Donation.objects.filter(
            organization=organization,
            status='completed'
        ).values('donor__email').annotate(
            donation_count=Count('id')
        ).order_by('-donation_count')[:5]
        
        # Return analytics data
        analytics = {
            'name': organization.name,
            'total_donations_all_time': Donation.objects.filter(
                organization=organization,
                status='completed'
            ).count(),
            'total_donations_period': total_completed,
            'average_rating': round(average_rating, 1),
            'top_donors': list(top_donors),
            'donation_status_breakdown': list(Donation.objects.filter(
                organization=organization
            ).values('status').annotate(count=Count('id')).order_by('status')),
            'period': time_period
        }
        
        return Response(analytics)