from django.db import models


class InventoryItem(models.Model):
    business = models.ForeignKey('businesses.Business', on_delete=models.CASCADE, related_name='inventory_items')
    product = models.ForeignKey('products.Product', on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.product.name} - {self.quantity} ({self.business.name})"


class InventoryMovement(models.Model):
    IN = 'IN'
    OUT = 'OUT'
    MOVEMENT_CHOICES = [(IN, 'In'), (OUT, 'Out')]

    item = models.ForeignKey(InventoryItem, on_delete=models.CASCADE, related_name='movements')
    movement_type = models.CharField(max_length=3, choices=MOVEMENT_CHOICES)
    qty = models.IntegerField()
    reference = models.CharField(max_length=255, blank=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.movement_type == self.IN:
            self.item.quantity += self.qty
        else:
            self.item.quantity -= self.qty
        self.item.save()

    def __str__(self):
        return f"{self.movement_type} {self.qty} for {self.item.product.name}"
