from django.urls import path
from .views import *

urlpatterns = [
    path('signup/', CreateUserView.as_view(), name='signup'),
    path('otp/', CreateOTPView.as_view(), name='otp'),
    path('verify/', VerifyOTPView.as_view(), name='verify'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('get-token/', GetPublicAccessTokenView.as_view(), name='get-token'),
    path('refresh-token/', RefreshTokenView.as_view(), name='refresh-token'),
    path('profile/', UserDetailView.as_view(), name='user-detail'),
]
