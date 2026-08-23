from django.urls import include, path
from rest_framework import routers
from apps.businesses.views import BusinessViewSet
from apps.customers.views import CustomerViewSet
from apps.products.views import ProductViewSet
from apps.orders.views import OrderViewSet
from apps.payments.views import PaymentViewSet
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from apps.customers.views_account import account_summary
from apps.suppliers.views import SupplierViewSet
from apps.purchases.views import CowPurchaseViewSet
from apps.expenses.views import ExpenseViewSet
from apps.inventory.views import InventoryItemViewSet, InventoryMovementViewSet

router = routers.DefaultRouter()
router.register(r'businesses', BusinessViewSet)
router.register(r'customers', CustomerViewSet, basename='customer')
router.register(r'products', ProductViewSet, basename='product')
router.register(r'orders', OrderViewSet, basename='order')
router.register(r'payments', PaymentViewSet, basename='payment')
router.register(r'suppliers', SupplierViewSet, basename='supplier')
router.register(r'purchases', CowPurchaseViewSet, basename='purchase')
router.register(r'expenses', ExpenseViewSet, basename='expense')
router.register(r'inventory/items', InventoryItemViewSet, basename='inventoryitem')
router.register(r'inventory/movements', InventoryMovementViewSet, basename='inventorymovement')

urlpatterns = [
    path('', include(router.urls)),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('customers/<int:customer_id>/account/', account_summary, name='customer-account'),
]
