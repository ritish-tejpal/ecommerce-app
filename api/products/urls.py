from django.urls import path
from django.conf.urls import  include
from .views import ProductViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', ProductViewSet, basename='product')


urlpatterns = [
    path(r'', include(router.urls)),
]
