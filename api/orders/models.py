from django.db import models
from enum import IntEnum

from accounts.models import User
from products.models import Product


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user} - {self.product}'



class OrderStatus(models.Model):
    ORDER_STATUS_TYPE = [
        'PENDING',          # when products in cart; to be implemented in cart
        'CONFIRMED',        # when payment is confirmed
        'CANCELLED',        # when payment declines
        'DELIVERED',        # when product is delivered
    ]

    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=ORDER_STATUS_TYPE, default='PENDING')
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.order} - {self.status}'
    

class OrderPaymentType(IntEnum):
    CASH = 1
    CARD = 2

    @classmethod
    def choices(self):
        return [(tag.value, tag.name) for tag in self]


class OrderPayment(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)


