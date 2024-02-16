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

from .models import *
from .serializers import *
from rest_framework import serializers

# ---------------------------------------------------------------------------------------------------------
# View to handle creation of user
# ---------------------------------------------------------------------------------------------------------
class CreateUserView(generics.CreateAPIView):

    serializer_class = UserSerializer

    def post(self, request):
        data = request.data
        user_serializer = UserSerializer(data=data)
        if not user_serializer.exists():
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        else:
            if user_serializer.exists():
                return Response({'message': 'User already exists'}, status=status.HTTP_400_BAD_REQUEST)
            user_serializer.save() 
            return CreateOTPView().send_otp_mail(data.get('email'))
        

# ---------------------------------------------------------------------------------------------------------
# View to handle sending OTP to specified user email
# Supports POST method to send OTP to existing user emails
# Improve functionality: verification via button click in email?
# ---------------------------------------------------------------------------------------------------------
class CreateOTPView(generics.GenericAPIView):

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


# ---------------------------------------------------------------------------------------------------------
# View to handle verification of OTP
# ---------------------------------------------------------------------------------------------------------
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
    

# ---------------------------------------------------------------------------------------------------------
# View to handle user login 
# Login can only be done after user has been verified
# ---------------------------------------------------------------------------------------------------------
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
    

# ---------------------------------------------------------------------------------------------------------
# View to handle user logout
# Functionality to be implemented
# ---------------------------------------------------------------------------------------------------------
class LogoutView(generics.GenericAPIView):

    def post(self, request):
        return Response({'message':'User logged out'}, status=status.HTTP_200_OK)


# ---------------------------------------------------------------------------------------------------------
# View to create and send a public access token using client credentials
# Requires 'username' and 'password'
# Evaluate need for PublicTokenAccessPermission?
# ---------------------------------------------------------------------------------------------------------
class GetPublicAccessTokenView(oauth2_provider.views.TokenView):
    
        ''' Get Public Access Token View '''
    
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


# ---------------------------------------------------------------------------------------------------------
# View to get all user details: User, UserProfile, PurchaseHistory
# Currently requires user id; to be updated to use username (required?)
# ---------------------------------------------------------------------------------------------------------
class UserDetailView(generics.RetrieveAPIView):

    ''' View to return all user details '''

    serializer_class = UserSerializer

    def get(self, request, id):
        try:
            user = User.objects.get(id=id)
            user_profile = UserProfile.objects.get(user=user)

            # purchase_history = PurchaseHistory.objects.filter(user=user_profile)
            serializer = UserDetailSerializer({'user': user, 'user_profile': user_profile}, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        
        except User.DoesNotExist:
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)



# ---------------------------------------------------------------------------------------------------------
# View to create user profile after user has been verified
# Supports:
#   POST method to create a user profile for first time users
#   PATCH method to update user profile details except for "email" and "phone_number" fields
# User profile will only be deleted if the user is deleted
# ---------------------------------------------------------------------------------------------------------
class UserProfileView(generics.CreateAPIView,
                      generics.RetrieveUpdateAPIView):

    serializer_class = UserProfileSerializer
    permission_classes = []

    def post(self, request):
        data = request.data
        user = User.objects.get(email=data.get('email'))
        user_profile = UserProfile.objects.filter(user=user)
        if user_profile.exists():
            return Response({'message': 'User profile already exists'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = UserProfileSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User profile created'}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request):
        data = request.data
        user = User.objects.get(id=data.get('user'))
        user_profile = UserProfile.objects.get(user=user)
        serializer = UserProfileSerializer(user_profile, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User profile updated'}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)