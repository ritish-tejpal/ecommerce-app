from django.urls import path
from .views import UserListCreateView, UserRetrieveUpdateDestroyView, LoginView, ProtectedResourceView

urlpatterns = [
    path('users/', UserListCreateView.as_view(), name='user-list-create'),
    path('users/<int:pk>/', UserRetrieveUpdateDestroyView.as_view(), name='user-retrieve-update-destroy'),
    path('login/', LoginView.as_view(), name='login'),

    path('api/protected-resource/', ProtectedResourceView.as_view(), name='hello_world'),

]
