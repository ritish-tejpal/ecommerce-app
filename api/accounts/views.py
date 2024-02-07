from django.conf import settings
from rest_framework import generics, status
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer
from project.permissions import PrivateTokenAccessPermission, PublicTokenAccessPermission


class CreateUserView(generics.CreateAPIView):

    serializer_class = UserSerializer
    permission_classes = [PublicTokenAccessPermission,]

    def post(self, request):
        data = request.data
        user_serializer = UserSerializer(data=data)
        if not user_serializer.is_valid():
            print(user_serializer.errors)
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        else:
            user_serializer.save()
            return Response(user_serializer.data, status=status.HTTP_201_CREATED)
        

class CreateOTPView(generics.GenericAPIView):

    ''' Create OTP View '''

    serializer_class = UserSerializer
    permission_classes = [PublicTokenAccessPermission,]

    def send_otp_mail(self, email):
        import random
        from django.conf import settings
        from django.template.loader import render_to_string
        from django.utils.html import strip_tags
        from django.core.mail import EmailMultiAlternatives

        otp = random.randint(1000, 9999)
        user = User.objects.get(email=email)
        user.otp = otp
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
            print(e)
            return Response({'message': 'Error sending OTP'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'message': 'OTP sent'}, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        user = User.objects.filter(email=email)
        if user.exists():
            self.send_otp_mail(email)
            return Response({'message': 'OTP sent'}, status=status.HTTP_200_OK)
        return Response({'message': 'User not found'}, status=status.HTTP_400_BAD_REQUEST)

class VerifyOTPView(generics.GenericAPIView):

    ''' Verify OTP View '''

    serializer_class = UserSerializer
    permission_classes = [PublicTokenAccessPermission,]

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        otp = request.data.get('otp')

        user = User.objects.get(email=email)
        if user.otp == otp:
            user.is_app_user = True
            user.save()
            return Response({'message': 'OTP Verified'}, status=status.HTTP_200_OK)
        return Response({'message': 'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)
    

class LoginUserView(generics.CreateAPIView):

    serializer_class = UserSerializer
    permission_classes = [PublicTokenAccessPermission]

    def post(self, request):
        from django.shortcuts import redirect

        data = request.data
        email = data.get('email')
        password = data.get('password')

        user = User.objects.get(email=email)
        
        if not user:
            return Response({'message':'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        if not user.is_app_user:
            return Response({'message':'User not verified'}, status=status.HTTP_400_BAD_REQUEST)
        
        if user.check_password(password):
            return Response({'message':'User logged in'}, status=status.HTTP_200_OK)
        
        return Response({'message':'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)