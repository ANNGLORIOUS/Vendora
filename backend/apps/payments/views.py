from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Payment
from .serializers import PaymentSerializer


class PaymentViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = PaymentSerializer

    def get_queryset(self):
        user = self.request.user
        if hasattr(user, 'business') and user.business:
            return Payment.objects.filter(business=user.business)
        return Payment.objects.none()

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(business=user.business if user.business else None)
