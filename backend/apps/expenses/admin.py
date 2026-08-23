from django.contrib import admin
from .models import Expense


@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('id', 'business', 'category', 'amount', 'date')
    list_filter = ('date', 'category')
    search_fields = ('category', 'notes')
