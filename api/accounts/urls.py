from django.urls import path
from .views import UserListCreateView, UserRetrieveUpdateDestroyView, LoginView

urlpatterns = [
    path('users/', UserListCreateView.as_view(), name='user-list-create'),
    path('users/<int:pk>/', UserRetrieveUpdateDestroyView.as_view(), name='user-retrieve-update-destroy'),
    path('login/', LoginView.as_view(), name='login'),
]
