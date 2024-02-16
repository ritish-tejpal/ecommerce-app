from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from django.conf import settings
from accounts.models import *


class UserSerializer(serializers.ModelSerializer):
    
    ''' Serializer for User model '''

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'phone_number', 'password', 'otp_expiry']
        read_only_fields = ['id']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data.get('password'))
        return super().create(validated_data)


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'


class UserDetailSerializer(serializers.Serializer):
    class Meta:
        model = [User, UserProfile, PurchaseHistory]
        fields = '__all__'