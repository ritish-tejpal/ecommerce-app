import random
import json

from django.conf import settings
from django.template.loader import render_to_string
from django.utils import timezone
from django.utils.html import strip_tags
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import EmailMultiAlternatives
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpRequest
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

import oauth2_provider.views
from oauth2_provider.models import AccessToken, RefreshToken

from rest_framework_simplejwt.views import TokenObtainPairView

from project.permissions import PrivateTokenAccessPermission, PublicTokenAccessPermission

from .models import *
from .serializers import *
from rest_framework import serializers


class CreateUserView(generics.CreateAPIView):

    '''
    - View to handle user creation 
    '''

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def post(self, request):
        data = request.data
        user_serializer = UserSerializer(data=data)
        
        try:
            user_serializer.is_valid(raise_exception=True)
            user_serializer.save()
            return CreateOTPView().send_otp_mail(data.get('email'))
        except serializers.ValidationError as e:
            return Response({'message': 'User already exists'}, status=status.HTTP_400_BAD_REQUEST)
  

class CreateOTPView(generics.GenericAPIView):

    '''
    - View to handle sending OTP to user email 
    - Supports POST method to send OTP to existing user emails 
    - Improve functionality: verification via button click in email? 
    '''

    serializer_class = UserSerializer

    def send_otp_mail(self, email):

        otp = random.randint(1000, 9999)
        user = User.objects.get(email=email)
        user.otp = otp
        user.otp_expiry = timezone.now() + timezone.timedelta(minutes=5)
        user.save()
        
        subject = "OTP for Email Verification"
        from_email = settings.EMAIL_HOST_USER
        html_content = render_to_string("otpmail.html", {'otp': otp})
        text_content = strip_tags(html_content)

        try:
            email = EmailMultiAlternatives(subject, text_content, from_email, [email])
            email.attach_alternative(html_content, "text/html")
            email.send()

        except Exception as e:
            return Response({'message': 'Error sending OTP'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'message': 'OTP sent'}, status=status.HTTP_200_OK)

    def post(self, request):
        email = request.data.get('email')
        user = User.objects.filter(email=email)
        if user.exists():
            self.send_otp_mail(email)
            return Response({'message': 'OTP sent'}, status=status.HTTP_200_OK)
        return Response({'message': 'User not found'}, status=status.HTTP_400_BAD_REQUEST)


class VerifyOTPView(generics.GenericAPIView):

    '''
    - View to handle verification of OTP 
    '''

    serializer_class = UserSerializer

    def post(self, request):
        email = request.data.get('email')
        otp = request.data.get('otp')

        user = User.objects.get(email=email)
        
        if user.otp == otp:
            if user.otp_expiry > timezone.now():
                user.otp = None
                user.otp_expiry = None
                user.is_app_user = True
                user.save()
                return Response({'message': 'OTP Verified'}, status=status.HTTP_200_OK)
            else:
                user.otp = None
                user.otp_expiry = None
                user.save()
                return Response({'message': 'OTP Expired'}, status=status.HTTP_400_BAD_REQUEST)
            
        return Response({'message': 'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)
    

class LoginView(generics.CreateAPIView):

    '''
    - View to handle user login 
    - Login can only be done after user has been verified 
    '''

    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        
        data = request.data
        username = data.get('username')
        password = data.get('password')

        user = User.objects.get(username=username)
        
        if not user:
            return Response({'message':'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        if not user.is_app_user:
            return Response({'message':'User not verified'}, status=status.HTTP_401_UNAUTHORIZED)
        
        if user.check_password(password):
            try:
                token_request = HttpRequest()
                token_request.method = 'POST'
                token_request.POST = request.data

                token_response = GetPublicAccessTokenView().dispatch(token_request, *args, **kwargs)
                token_data = json.loads(token_response.content)

                return Response({'message':'User logged in', 'data': token_data}, status=status.HTTP_200_OK)

            except Exception as e:
                print(f'Error: {e}')
                return Response({'message':'Error logging in'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'message':'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
    

class LogoutView(generics.GenericAPIView):
    
    '''
    - View to handle user logout
    - Request will contain access token in 'Authorization' header
    - Fetch access token from table and delete it
    '''

    def post(self, request):
        try:
            authorization_header = request.headers.get('Authorization')
            if authorization_header:
                _, token = authorization_header.split()

                access_token = AccessToken.objects.get(token=token)
                refresh_token = RefreshToken.objects.filter(access_token=access_token).first()
                
                access_token.delete()

                if refresh_token:
                    refresh_token.delete()
                return Response({'message': 'User logged out successfully'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Authorization header is missing'}, status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist:
            return Response({'error': 'Invalid access token'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetPublicAccessTokenView(oauth2_provider.views.TokenView):
    
        '''
        - View to get public access token using client credentials
        - Requires 'username' and 'password'
        '''
    
        permission_classes = [PublicTokenAccessPermission,]
    
        @method_decorator(csrf_exempt)
        def dispatch(self, request, *args, **kwargs):
            request.POST = request.POST.copy()
            request.POST['grant_type'] = 'password'
            request.POST['client_id'] = settings.CLIENT_ID
            request.POST['client_secret'] = settings.CLIENT_SECRET
            return super(GetPublicAccessTokenView, self).dispatch(request, *args, **kwargs)

        def post(self, request, *args, **kwargs):
            return super(GetPublicAccessTokenView, self).post(request, *args, **kwargs)


class RefreshTokenView(oauth2_provider.views.TokenView):
        
        '''
        - View to refresh access token using refresh token
        - Requires 'refresh_token' in request body
        '''
    
        permission_classes = [PrivateTokenAccessPermission,]
    
        @method_decorator(csrf_exempt)
        def dispatch(self, request, *args, **kwargs):
            request.POST = request.POST.copy()
            request.POST['grant_type'] = 'refresh_token'
            request.POST['client_id'] = settings.CLIENT_ID
            request.POST['client_secret'] = settings.CLIENT_SECRET
            return super(RefreshTokenView, self).dispatch(request, *args, **kwargs)
    
        def post(self, request, *args, **kwargs):
            return super(RefreshTokenView, self).post(request, *args, **kwargs)


class UserDetailView(generics.CreateAPIView,
                    generics.RetrieveUpdateAPIView):

    '''
    - View to get all user details: User, UserProfile, PurchaseHistory (to be implemented)
    - Supports GET, POST, PATCH methods
    - Requires 'Authorization' header with access token
    '''

    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [PublicTokenAccessPermission]

    def get(self, request):
        try:
            token = request.headers['Authorization']
            access_token = AccessToken.objects.get(token=token.split(' ')[1])
            username = access_token.user.username
            user = User.objects.get(username=username)
            user_serializer = UserSerializer(user)

            try:
            
                user_profile = UserProfile.objects.get(user=user)
                user_profile_serializer = UserProfileSerializer(user_profile)
                return Response({'user': user_serializer.data, 'user_profile': user_profile_serializer.data}, status=status.HTTP_200_OK)
            
            except UserProfile.DoesNotExist:
                return Response({'message': 'You have not completed your profile yet.', 'data': user_serializer.data}, status=status.HTTP_200_OK)
        
        except User.DoesNotExist:
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        token = request.headers['Authorization']
        access_token = AccessToken.objects.get(token=token.split(' ')[1])
        username = access_token.user.username
        user = User.objects.get(username=username)
        try:
            UserProfile.objects.get(user=user)
            return Response({'message': 'User profile already exists'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except UserProfile.DoesNotExist:
            data = request.data.copy()
            data['user'] = user.id
            serializer = UserProfileSerializer(data=data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
            return Response({'message': 'User profile created'}, status=status.HTTP_201_CREATED)

    
    def patch(self, request):
        token = request.headers['Authorization']
        access_token = AccessToken.objects.get(token=token.split(' ')[1])
        username = access_token.user.username
        
        user = User.objects.get(username=username)
        data = request.data

        try:
            user_profile = UserProfile.objects.get(user=user)
        except UserProfile.DoesNotExist:
            return Response({'message': 'User profile does not exist'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
        
        serializer = UserProfileSerializer(user_profile, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User profile updated'}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
