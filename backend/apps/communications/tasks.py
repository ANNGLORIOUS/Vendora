from celery import shared_task
from django.utils import timezone
from apps.customers.models import Customer
from .services import send_sms


@shared_task(bind=True)
def send_payment_reminder(self, customer_id, message):
    try:
        customer = Customer.objects.get(pk=customer_id)
    except Customer.DoesNotExist:
        return {'error': 'customer_not_found'}

    history, result = send_sms(customer, message)
    return {'history_id': history.id, 'result': result}


@shared_task(bind=True)
def find_and_remind_overdue_customers(self):
    # For simplicity: find orders older than 7 days with status PENDING or PARTIALLY_PAID and send reminders
    from apps.orders.models import Order
    cutoff = timezone.now() - timezone.timedelta(days=7)
    overdue = Order.objects.filter(created_at__lte=cutoff).filter(status__in=[Order.STATUS_PENDING, Order.STATUS_PARTIALLY_PAID])
    results = []
    for order in overdue:
        customer = order.customer
        message = f"Reminder: Your order #{order.id} is overdue. Balance: {order.total}. Please pay."
        history, result = send_sms(customer, message)
        results.append({'order': order.id, 'history': history.id, 'result': result})
    return {'count': len(results), 'details': results}
