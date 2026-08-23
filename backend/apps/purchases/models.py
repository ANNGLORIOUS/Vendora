from django.db import models


class CowPurchase(models.Model):
    business = models.ForeignKey('businesses.Business', on_delete=models.CASCADE, related_name='purchases')
    supplier = models.ForeignKey('suppliers.Supplier', on_delete=models.SET_NULL, null=True, blank=True)
    date = models.DateField()
    qty = models.IntegerField(default=1)
    unit_price = models.DecimalField(max_digits=12, decimal_places=2)
    total_cost = models.DecimalField(max_digits=12, decimal_places=2)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        self.total_cost = (self.unit_price or 0) * (self.qty or 0)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Purchase #{self.id} - {self.business.name}"
