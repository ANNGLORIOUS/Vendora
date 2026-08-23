from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    # Link user to a business optionally
    business = models.ForeignKey('businesses.Business', null=True, blank=True, on_delete=models.CASCADE, related_name='users')

    def __str__(self):
        return self.username
