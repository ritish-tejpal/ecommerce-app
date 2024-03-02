from rest_framework import generics, status
from rest_framework.response import Response

from oauth2_provider.models import AccessToken

from .models import *
from .serializers import *

from products.models import Product
from products.serializers import ProductSerializer

from accounts.models import User
from project.permissions import PrivateTokenAccessPermission

class UserCartView(generics.ListAPIView):
    '''
    - View to create a new cart for a user in Cart model
    - Requires users to be logged in (valid access token required)
    - Supports POST method only
    '''
    
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [PrivateTokenAccessPermission]

    def get(self, request):
        '''
        - Method to get user cart id
        '''
        if 'Authorization' not in request.headers:
            return Response({'error': 'No token provided'}, status=status.HTTP_401_UNAUTHORIZED)
        
        bearer, token = request.headers.get('Authorization').split(' ')
        if bearer != 'Bearer':
            return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
        
        access_token = AccessToken.objects.get(token=token)
        user_id = access_token.user_id
        user = User.objects.get(id=user_id)
        try:
            cart = Cart.objects.get(user=user)
            serializer = CartSerializer(cart)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Cart.DoesNotExist:
            return UserCartView.create_cart(self, request, user=user)

    def create_cart(self, request, **kwargs):
        '''
        - Create a new cart for user
        - Internal endpoint; can only be accessed by get method
        '''
        
        user = kwargs.get('user')

        cart = Cart.objects.create(user=user)
        cart.save()
        serializer = CartSerializer(cart)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        

class UserCartItemView(generics.ListCreateAPIView):
    '''
    - View to retrieve all items in a user's cart
    - Requires users to be logged in
    '''

    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [PrivateTokenAccessPermission]

    def get(self, request):
        '''
        - Get all items in a users cart
        '''

        token = request.headers.get('Authorization').split(' ')[1]
        
        access_token = AccessToken.objects.get(token=token)
        user = access_token.user_id

        cart = Cart.objects.get(user=user)
        cart_items = CartItem.objects.filter(cart=cart)

        product_ids = [item.product.id for item in cart_items]
        products = Product.objects.filter(id__in=product_ids)

        item_details = [{
            'name': item.product.name,
            'quantity': item.quantity,
            'subtotal': item.subtotal
            
        } for item in cart_items]

        for i, product in enumerate(products):
            item_details[i]['price'] = product.price
            item_details[i]['description'] = product.description        

        return Response(item_details, status=status.HTTP_200_OK)
    
    def post(self, request):
        '''
        - Create a new cart item for user
        - Requires:
            - valid access token
            - product_id
            - quantity (default : 1)
        '''
        
        token = request.headers.get('Authorization').split(' ')[1]

        access_token = AccessToken.objects.get(token=token)
        user = access_token.user_id

        product = request.data.get('product')
        quantity = request.data.get('quantity', 1)

        cart = Cart.objects.get(user=user)

        try:
            cart_item = CartItem.objects.get(product=product, cart=cart)
            return Response({'message': 'cart item already exists', 'data': CartItemSerializer(cart_item).data}, status=status.HTTP_400_BAD_REQUEST)
        
        except CartItem.DoesNotExist:
            product = Product.objects.get(id=product)
            cart_item = CartItem.objects.create(cart=cart, product=product, quantity=quantity, subtotal=product.price*quantity)
            cart_item.save()
            serializer = CartItemSerializer(cart_item)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def patch(self, request):
        '''
        - Update quantity of cart item
        - Requires:
            - valid access token
            - cart_item_id
            - quantity
        '''
        
        id = request.data.get('cart')
        quantity = int(request.data.get('quantity'))

        cart_item = CartItem.objects.get(id=id)

        if quantity == 0:
            cart_item.delete()
            return Response({'message': 'cart item deleted'}, status=status.HTTP_200_OK)
        elif quantity < 0:
            return Response({'error': 'Invalid quantity'}, status=status.HTTP_400_BAD_REQUEST)
        
        cart_item.quantity = quantity
        cart_item.subtotal = cart_item.product.price * quantity
        cart_item.save()
        serializer = CartItemSerializer(cart_item)
        return Response({'message': f'{cart_item.product.name} updated', 'data': serializer.data}, status=status.HTTP_200_OK)

    def delete(self, request):
        '''
        - Delete cart item
        - Requires:
            - valid access token
            - product_id
        '''
        if 'Authorization' not in request.headers:
            return Response({'error': 'No token provided'}, status=status.HTTP_401_UNAUTHORIZED)
        
        bearer, token = request.headers.get('Authorization').split(' ')
        if bearer != 'Bearer':
            return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
        
        access_token = AccessToken.objects.get(token=token)
        user_id = access_token.user_id
        product_id = request.data.get('product')

        cart = Cart.objects.get(user=user_id)

        product = Product.objects.get(id=product_id)
        if cart.user.id != user_id:
            return Response({'error': 'Invalid cart id'}, status=status.HTTP_400_BAD_REQUEST)
        
        cart_item = CartItem.objects.get(cart=cart, product=product)
        cart_item.delete()
        return Response({'message': 'cart item deleted'}, status=status.HTTP_200_OK)
    