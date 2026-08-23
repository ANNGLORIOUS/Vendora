from rest_framework import serializers
from .models import Payment


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'business', 'order', 'customer', 'amount', 'method', 'reference', 'created_at']
