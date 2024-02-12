from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from django.conf import settings
from accounts.models import User
from oauth2_provider.models import AbstractAccessToken

class UserSerializer(serializers.ModelSerializer):
    
    ''' Serializer for User model '''

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'phone_number', 'password', 'otp_expiry']
        read_only_fields = ['id']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data.get('password'))
        return super().create(validated_data)


class AccessTokenSerializer(serializers.ModelSerializer):

    '''Serializer for AbstractAccessToken Model'''

    class Meta:
        model = AbstractAccessToken
        fields = '__all__'



