from django.contrib import admin
from .models import CowPurchase


@admin.register(CowPurchase)
class CowPurchaseAdmin(admin.ModelAdmin):
    list_display = ('id', 'business', 'supplier', 'date', 'qty', 'total_cost')
    list_filter = ('date',)
    search_fields = ('supplier__name',)
