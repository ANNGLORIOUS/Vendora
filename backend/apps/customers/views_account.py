from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from apps.customers.models import Customer
from apps.orders.models import Order
from apps.payments.models import Payment


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def account_summary(request, customer_id):
    user = request.user
    try:
        customer = Customer.objects.get(id=customer_id, business=user.business)
    except Customer.DoesNotExist:
        return Response({'detail': 'Not found'}, status=404)

    orders = Order.objects.filter(customer=customer, business=user.business)
    payments = Payment.objects.filter(customer=customer, business=user.business)

    total_orders = sum([o.total for o in orders])
    total_payments = sum([p.amount for p in payments])
    outstanding = total_orders - total_payments

    return Response({
        'customer': customer.name,
        'total_orders': total_orders,
        'total_payments': total_payments,
        'outstanding': outstanding,
        'orders_count': orders.count(),
        'payments_count': payments.count(),
    })
