from rest_framework import serializers
from .models import SMSHistory


class SMSHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SMSHistory
        fields = '__all__'
