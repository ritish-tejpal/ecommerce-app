from rest_framework import mixins, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User
from .serializers import UserSerializer, LoginSerializer
from oauth2_provider.views.generic import ProtectedResourceView
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope


class UserListCreateView(mixins.ListModelMixin,
                         mixins.CreateModelMixin,
                         generics.GenericAPIView,
                         ProtectedResourceView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [TokenHasReadWriteScope]

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
    def perform_create(self, serializer):
        user = serializer.save()
        password = serializer.validated_data['password']
        user.set_password(password)
        user.save()



class UserRetrieveUpdateDestroyView(mixins.RetrieveModelMixin,
                                    mixins.UpdateModelMixin,
                                    mixins.DestroyModelMixin,
                                    generics.GenericAPIView,
                                    ProtectedResourceView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [TokenHasReadWriteScope]

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token = user.auth_token
        return Response({'token': token.key}, status=status.HTTP_200_OK)


class SingupView(APIView):
    def post(self, request):
        pass
    

class GenerateTokenView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token = user.auth_token
        return Response({'token': token.key}, status=status.HTTP_200_OK)