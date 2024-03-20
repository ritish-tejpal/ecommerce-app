from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    path('products/', include('products.urls')),
    path('shop/', include('shop.urls')),
    path('orders/', include('orders.urls')),
]
