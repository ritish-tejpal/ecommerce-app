from django.urls import path
from .views import CreateUserView, VerifyOTPView

urlpatterns = [
    path('signup/', CreateUserView.as_view(), name='signup'),
    path('verify/', VerifyOTPView.as_view(), name='verify'),
    # path('login/', LoginView.as_view(), name='login'),
]
