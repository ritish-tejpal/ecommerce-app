from django.urls import path
from .views import *

urlpatterns = [
    path('checkout/', CreateCheckoutSession.as_view(), name='checkout'),
    path('webhook/', StripeWebhook.as_view(), name='webhook'),
    path('invoice/', CreateInvoice.as_view(), name='invoice'),
]
