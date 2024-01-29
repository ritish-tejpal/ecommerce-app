from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from accounts.models import User

class UserSerializer(serializers.ModelSerializer):
    
    ''' Serializer for User model '''

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'phone_number', 'password']
        read_only_fields = ['id']
        # extra_kwargs = {
        #     'password': {'write_only': True}
        # }

        def create(self, validated_data):
            validated_data['password'] = make_password(validated_data.get('password'))
            return super().create(validated_data)


    def update(self, instance, validated_data):
        ''' Update and return an existing user instance, given the validated data. '''
        instance.username = validated_data.get('username', instance.username)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.email = validated_data.get('email', instance.email)
        instance.password = validated_data.get('password', instance.password)
        instance.save()
        return instance


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):

        username = data.get('username', None)
        password = data.get('password', None)

        if username is None:
            raise serializers.ValidationError('Username is required to login.')

        if password is None:
            raise serializers.ValidationError('Password is required to login.')

        user = authenticate(username=username, password=password)

        if user is None:
            raise serializers.ValidationError('A user with this username and password was not found.')

        return user
