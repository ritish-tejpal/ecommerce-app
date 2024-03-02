from django.urls import path
from django.conf.urls import  include
from .views import *

urlpatterns = [
    path('', ProductList.as_view(), name='product-list'),
    path('<str:name>/', ProductDetail.as_view(), name='product-detail'),
    path('reviews/<str:name>/', ReviewList.as_view(), name='review-list'),
    path('reviews/<int:pk>/', ReviewDetail.as_view(), name='review-detail'),
    path('categories/', CategoryList.as_view(), name='category-list'),
    
]
