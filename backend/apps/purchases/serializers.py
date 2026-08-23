from rest_framework import serializers
from .models import CowPurchase


class CowPurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = CowPurchase
        fields = '__all__'
