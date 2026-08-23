from django.db import models


class SMSHistory(models.Model):
    customer = models.ForeignKey('customers.Customer', on_delete=models.CASCADE, related_name='sms_history')
    message = models.TextField()
    amount = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    sent_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, default='pending')
    provider_reference = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"SMS to {self.customer.name} at {self.sent_at}"
