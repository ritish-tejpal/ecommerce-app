from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15)
    password = models.CharField(max_length=128)

    def __str__(self):
        return self.username

    def save(self, *args, **kwargs):
        if not self.id:  
            self.is_active = True
        super().save(*args, **kwargs)
