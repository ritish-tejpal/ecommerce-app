from django.urls import path
from .views import *

urlpatterns = [
    path('signup/', CreateUserView.as_view(), name='signup'),
    path('otp/', CreateOTPView.as_view(), name='otp'),
    path('verify/', VerifyOTPView.as_view(), name='verify'),
    path('login/', LoginView.as_view(), name='login'),
    path('get-token/', GetPublicAccessTokenView.as_view(), name='test'),
    path('<int:id>/', UserDetailView.as_view(), name='user-detail'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('profile/<int:id>/', UserDetailView.as_view(), name='user-detail'),
]
