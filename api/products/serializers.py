from rest_framework import serializers
from .models import *

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'category_id', 'description', 'price', 'quantity', 'tags', 'created_at', 'modified_at', 'created_by']
        read_only_fields = ['id']


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'product_id', 'user_id', 'stars', 'title', 'comment', 'created_at']
        read_only_fields = ['id']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = [Category, ProductCategory]
        fields = ['id', 'parent_category', 'name', 'product_id', 'category_id', 'created_at', 'modified_at']
        read_only_fields = ['id']


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['id', 'product_id', 'image', 'created_at', 'modified_at']
        read_only_fields = ['id']