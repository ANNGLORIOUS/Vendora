from django.contrib import admin
from .models import InventoryItem, InventoryMovement


@admin.register(InventoryItem)
class InventoryItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'product', 'quantity', 'business')
    search_fields = ('product__name',)


@admin.register(InventoryMovement)
class InventoryMovementAdmin(admin.ModelAdmin):
    list_display = ('id', 'item', 'movement_type', 'qty', 'created_at')
    list_filter = ('movement_type',)
