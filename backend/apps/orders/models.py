from django.db import models


class Order(models.Model):
    business = models.ForeignKey('businesses.Business', on_delete=models.CASCADE, related_name='orders')
    customer = models.ForeignKey('customers.Customer', on_delete=models.CASCADE, related_name='orders')
    status = models.CharField(max_length=50, default='draft')
    total = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.id} - {self.business.name}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey('products.Product', on_delete=models.PROTECT)
    quantity = models.IntegerField(default=1)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)

    def line_total(self):
        return self.quantity * self.unit_price
