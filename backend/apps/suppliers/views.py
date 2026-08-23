from rest_framework import viewsets, permissions
from .models import Supplier
from .serializers import SupplierSerializer


class SupplierViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = SupplierSerializer

    def get_queryset(self):
        user = self.request.user
        return Supplier.objects.filter(business=user.business)
