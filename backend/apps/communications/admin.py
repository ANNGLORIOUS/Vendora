from django.contrib import admin
from .models import SMSHistory


@admin.register(SMSHistory)
class SMSHistoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer', 'sent_at', 'status', 'provider_reference')
    list_filter = ('status', 'sent_at')
    search_fields = ('customer__name', 'provider_reference')
