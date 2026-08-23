from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'business', 'name', 'sku', 'price', 'inventory', 'created_at']
