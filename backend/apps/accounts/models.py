from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    ROLE_OWNER = 'OWNER'
    ROLE_STAFF = 'STAFF'
    ROLE_CUSTOMER = 'CUSTOMER'

    ROLE_CHOICES = [
        (ROLE_OWNER, 'Owner'),
        (ROLE_STAFF, 'Staff'),
        (ROLE_CUSTOMER, 'Customer'),
    ]

    # Link user to a business optionally
    business = models.ForeignKey('businesses.Business', null=True, blank=True, on_delete=models.CASCADE, related_name='users')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default=ROLE_STAFF)

    def __str__(self):
        return self.username
