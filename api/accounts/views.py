import random

from django.conf import settings
from django.template.loader import render_to_string
from django.utils import timezone
from django.utils.html import strip_tags
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import EmailMultiAlternatives

from rest_framework import generics, status
from rest_framework.response import Response

import oauth2_provider.views

from project.permissions import PrivateTokenAccessPermission, PublicTokenAccessPermission

from .models import User
from .serializers import UserSerializer
from rest_framework import serializers              # baad mein dekhna

class CreateUserView(generics.CreateAPIView):

    serializer_class = UserSerializer

    def post(self, request):
        data = request.data
        user_serializer = UserSerializer(data=data)
        if not user_serializer.exists():
            print(234)
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        else:
            if user_serializer.exists():
                return Response({'message': 'User already exists'}, status=status.HTTP_400_BAD_REQUEST)
            user_serializer.save() 
            return CreateOTPView().send_otp_mail(data.get('email'))
        

class CreateOTPView(generics.GenericAPIView):

    ''' Create OTP View '''

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

    ''' Verify OTP View '''

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

    serializer_class = UserSerializer

    def post(self, request):

        data = request.data
        email = data.get('email')
        password = data.get('password')

        user = User.objects.get(email=email)
        
        if not user:
            return Response({'message':'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        if not user.is_app_user:
            return Response({'message':'User not verified'}, status=status.HTTP_401_UNAUTHORIZED)
        
        if user.check_password(password):
            
            return Response({'message':'User logged in'}, status=status.HTTP_200_OK)
        
        return Response({'message':'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
    

class LogoutView(generics.GenericAPIView):

    def post(self, request):
        return Response({'message':'User logged out'}, status=status.HTTP_200_OK)


class GetPublicAccessTokenView(oauth2_provider.views.TokenView):
    
        ''' Get Public Access Token View '''
    
        permission_classes = [PublicTokenAccessPermission,]
    
        @method_decorator(csrf_exempt)
        def dispatch(self, request, *args, **kwargs):
            request.POST = request.POST.copy()
            # request.POST['username'] = settings.APPLICATION_USERNAME
            # request.POST['password'] = settings.APPLICATION_PASSWORD
            request.POST['grant_type'] = 'password'
            request.POST['client_id'] = settings.CLIENT_ID   
            request.POST['client_secret'] = settings.CLIENT_SECRET
            return super(GetPublicAccessTokenView, self).dispatch(request, *args, **kwargs)

        def post(self, request, *args, **kwargs):
            return super(GetPublicAccessTokenView, self).post(request, *args, **kwargs)

        
class UserDetailView(generics.RetrieveAPIView):

    serializer_class = UserSerializer

    def get(self, request, id):
        try:
            user = User.objects.get(id=id)
            user_serializer = UserSerializer(user)
            return Response(user_serializer.data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)