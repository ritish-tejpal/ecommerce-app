from django.db import models
from accounts.models import User


class Product(models.Model):
    name = models.CharField(max_length=50)
    category_id = models.ForeignKey('Category', on_delete=models.CASCADE, null=True, blank=True)
    description = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField()
    tags = models.CharField(max_length=100, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, verbose_name='Added By',
                                   on_delete=models.SET_NULL, blank=True, null=True)
    

    def __str__(self):
        return self.name
    

class Review(models.Model):
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    stars = models.IntegerField()
    title = models.CharField(max_length=100)
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review for {self.product_id.name}"
    

class Category(models.Model):
    parent_category = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class ProductCategory(models.Model):
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    category_id = models.ForeignKey(Category, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.product_id.name} in {self.category_id.name}"


def productFile(instance, filename):
    return '/'.join(['products/assets', str(instance.name), filename])

class Image(models.Model):
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=productFile)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Image for {self.product_id.name}"
    