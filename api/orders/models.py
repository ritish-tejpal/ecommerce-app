from django.db import models

from accounts.models import User
from products.models import Product


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user} - {self.total}'


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f'{self.order} - {self.product} - {self.quantity}'
    
    def save(self, *args, **kwargs):
        self.price = self.product.price * self.quantity
        super().save(*args, **kwargs)


class OrderStatus(models.Model):
    ORDER_STATUS_TYPE = [
        ('PENDING', 'PENDING'),
        ('CONFIRMED', 'CONFIRMED'),
        ('SHIPPED', 'SHIPPED'),
        ('DELIVERED', 'DELIVERED'),
    ]

    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=ORDER_STATUS_TYPE, default='PENDING')
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.order} - {self.status}'


class OrderPayment(models.Model):
    ORDER_PAYMENT_TYPE = [
        ('CASH', 'CASH'),
        ('CARD', 'CARD'),
    ]

    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    payment_type = models.CharField(max_length=10, choices=ORDER_PAYMENT_TYPE, default='CASH')
    date = models.DateTimeField(auto_now_add=True)
    stripe_payment_id = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return f'{self.order} - {self.payment_type}'



