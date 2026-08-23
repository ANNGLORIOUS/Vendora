from django.urls import include, path
from rest_framework import routers
from apps.businesses.views import BusinessViewSet
from apps.customers.views import CustomerViewSet
from apps.products.views import ProductViewSet
from apps.orders.views import OrderViewSet
from apps.payments.views import PaymentViewSet

router = routers.DefaultRouter()
router.register(r'businesses', BusinessViewSet)
router.register(r'customers', CustomerViewSet)
router.register(r'products', ProductViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'payments', PaymentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
