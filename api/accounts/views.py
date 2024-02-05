from django.conf import settings
from rest_framework import generics, status
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer
from project.permissions import PrivateTokenAccessPermission, PublicTokenAccessPermission


class CreateUserView(generics.CreateAPIView):

    serializer_class = UserSerializer
    permission_classes = [PublicTokenAccessPermission,]

    def send_otp_mail(self, email):
        import smtplib, random

        otp = random.randint(1000, 9999)
        user = User.objects.get(email=email)
        user.otp = otp
        user.save()
        
        try:
            server = smtplib.SMTP('smtp.gmail.com', 587)
            server.ehlo()
            server.starttls()
            server.login(settings.EMAIL_HOST_USER, settings.EMAIL_HOST_PASSWORD)
            server.sendmail(
                settings.EMAIL_HOST_USER, 
                email, 
                f'Your OTP is {otp}'
            )
            server.close()
        
        except Exception as e:
            print(e)
            return Response({'message': 'Error sending OTP'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'message': 'OTP sent'}, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        user_serializer = UserSerializer(data=data)
        if not user_serializer.is_valid():
            print("not goooooood")
            print(user_serializer.errors)
        else:
            user = user_serializer.save()
            self.send_otp_mail(user.email)

            return Response(user_serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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