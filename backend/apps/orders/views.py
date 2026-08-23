from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Order
from .serializers import OrderSerializer


class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderSerializer

    def get_queryset(self):
        user = self.request.user
        if hasattr(user, 'business') and user.business:
            return Order.objects.filter(business=user.business)
        return Order.objects.none()

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(business=user.business if user.business else None)
