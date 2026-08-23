from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Product
from .serializers import ProductSerializer


class ProductViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = ProductSerializer

    def get_queryset(self):
        user = self.request.user
        if hasattr(user, 'business') and user.business:
            return Product.objects.filter(business=user.business)
        return Product.objects.none()

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(business=user.business if user.business else None)
