import uuid
from django.db import models



def productFile(instance, filename):
    return '/'.join(['products', str(instance.name), filename])

class Product(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField()
    category = models.CharField(max_length=50)
    image = models.ImageField(upload_to=productFile, null=True, blank=True)

    def __str__(self):
        return self.name
    

class Review(models.Model):
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    stars = models.IntegerField()
    title = models.CharField(max_length=100)
    comment = models.TextField()