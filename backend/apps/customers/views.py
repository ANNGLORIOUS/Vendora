from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Customer
from .serializers import CustomerSerializer


class CustomerViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = CustomerSerializer

    def get_queryset(self):
        user = self.request.user
        # If user has a business, scope to that business
        if hasattr(user, 'business') and user.business:
            return Customer.objects.filter(business=user.business)
        return Customer.objects.none()

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(business=user.business if user.business else None)
