from django.db import models


class Expense(models.Model):
    business = models.ForeignKey('businesses.Business', on_delete=models.CASCADE, related_name='expenses')
    category = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    date = models.DateField()
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.category} - {self.amount} ({self.business.name})"
