from django.urls import path
from .views import *

urlpatterns = [
    path('cart/', UserCartView.as_view(), name='user-cart'),
    path('cart/items/', UserCartItemView.as_view(), name='user-cart-item'),
]
