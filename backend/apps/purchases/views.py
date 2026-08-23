from rest_framework import viewsets, permissions
from .models import CowPurchase
from .serializers import CowPurchaseSerializer


class CowPurchaseViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CowPurchaseSerializer

    def get_queryset(self):
        user = self.request.user
        return CowPurchase.objects.filter(business=user.business)
