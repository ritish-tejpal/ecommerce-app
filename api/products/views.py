from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny

from project.permissions import PublicTokenAccessPermission

from .models import *
from .serializers import *

import stripe
from django.conf import settings
stripe.api_key = settings.STRIPE_SECRET_KEY


class ProductList(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [PublicTokenAccessPermission]

    def get(self, request):
        products = Product.objects.all()
        images = Image.objects.filter(product_id__in=products)
        products_serializer = ProductSerializer(products, many=True)
        images_serializer = ImageSerializer(images, many=True)
        return Response({'products': products_serializer.data, 'images': images_serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        serializer = ProductSerializer(data=data)
        if serializer.is_valid():
            try:                
                serializer.save(created_by=self.request.user)

                stripe_product = stripe.Product.create(
                    name=serializer.data['name'],
                    description=serializer.data['description'],
                    metadata={'product_id': serializer.data['id']}
                )
                
                stripe_price = stripe.Price.create(
                    currency='inr',
                    unit_amount_decimal=(serializer.validated_data['price']),
                    product=stripe_product['id']
                )
                
                serializer.update(serializer.instance, {'stripe_price_id': stripe_price['id']})
                
                return Response(serializer.data, status=status.HTTP_201_CREATED)
                        
            except Exception as e:
                print(e)
                return Response({'message': 'error creating product'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def get(self, request, name):
        try:
            product = Product.objects.get(name=name)
            serializer = ProductSerializer(product)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Product.DoesNotExist:
            return Response({'message': 'product does not exist', 'product': name}, status=status.HTTP_404_NOT_FOUND)


    def perform_update(self, serializer):
        try:
            serializer.save(modified_by=self.request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReviewList(generics.ListCreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [AllowAny]

    def get(self, request, name):
        try:
            product = Product.objects.get(name=name)
            reviews = Review.objects.filter(product_id=product)
            serializer = ReviewSerializer(reviews, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        
class ReviewDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [AllowAny]                    # AllowAny is used for testing purposes only

    def get(self, request, *args, **kwargs):
        try:
            products = Product.objects.filter(id=kwargs['pk'])
            reviews = Review.objects.filter(product_id=products[0])
            serializer = ReviewSerializer(reviews, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


class CategoryList(generics.ListCreateAPIView):
    queryset = [Category, ProductCategory]
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]
    
class SearchProduct(generics.ListAPIView):
    queryset = Product.objects.all()

    def get(self, request):
        try:
            name = self.request.query_params.get('name')
            products = Product.objects.filter(name__startswith=name).values_list('name', flat=True)
            return Response(products, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({}, status=status.HTTP_400_BAD_REQUEST)
        
