from rest_framework import viewsets, permissions
from .models import InventoryItem, InventoryMovement
from .serializers import InventoryItemSerializer, InventoryMovementSerializer


class InventoryItemViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = InventoryItemSerializer

    def get_queryset(self):
        user = self.request.user
        return InventoryItem.objects.filter(business=user.business)


class InventoryMovementViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = InventoryMovementSerializer

    def get_queryset(self):
        user = self.request.user
        return InventoryMovement.objects.filter(item__business=user.business)
