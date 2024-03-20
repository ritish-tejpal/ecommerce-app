from datetime import datetime

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response

from django.conf import settings
import stripe
stripe.api_key = settings.STRIPE_SECRET_KEY

from .models import *
from .serializers import *


class CreateCheckoutSession(generics.CreateAPIView):
    def post(self, request):
        '''
        - Create a stripe checkout session
        - Receives an array of products and their quantities
        - Create a new order for each product
        '''

        data = request.data
        try:
            checkout_session = stripe.checkout.Session.create(
                line_items=data,
                mode='payment',
                payment_method_types=['card'],
                expires_at=int(datetime.now().timestamp()) + 60 * 40,
                billing_address_collection='required',
                shipping_address_collection={
                    'allowed_countries': ['IN'],
                },
                customer_email=User.objects.get(id=request.user.id).email,
                success_url='http://localhost:3000/user/checkout/success?session_id={CHECKOUT_SESSION_ID}',
                cancel_url='http://localhost:3000/user/cart',
            )
            return Response(checkout_session.url, status=status.HTTP_201_CREATED)
        except stripe.error.InvalidRequestError as e:
            return Response('Could not create session', status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)


class StripeWebhook(APIView):
    '''
    - Receive stripe payment success webhook
    - Trigger CreateOrder API
    '''
    authentication_classes = []

    def post(self, request):
        payload = request.body
        header = request.headers.get('Stripe-Signature')

        try:
            event = stripe.Webhook.construct_event(
                payload, header, 'whsec_9b8cabcf4f6d8bd7153d6d1d4c40a367aaf683f17c8e9d85312cadf89c96dd58'
            )
        except ValueError as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
        except stripe.error.SignatureVerificationError as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
                
        if event['type'] == 'checkout.session.completed':
            return CreateOrder.post(self, request)
        return Response(status=status.HTTP_202_ACCEPTED)


class CreateOrder(generics.CreateAPIView):
    '''
    - Create a new order upon successful payment
    - Receives the stripe session id
    - Internal end point, triggered by StripeWebhook API
    '''

    def post(self, request):
        event = request.data

        try:
            session = stripe.checkout.Session.retrieve(event['data']['object']['id'])
            session_items = stripe.checkout.Session.list_line_items(event['data']['object']['id'])

            user = User.objects.get(email=session.customer_details.email)
            
            order = Order.objects.create(
                user=user,
                total=session.amount_total / 100,
            )

            OrderPayment.objects.create(
                order=order,
                payment_type='CARD',
                stripe_payment_id=session.payment_intent,
            )

            OrderStatus.objects.create(
                order=order,
                status='CONFIRMED',
            )
            
            for item in session_items.data:
                stripe_price = item.price.id
                product = Product.objects.get(stripe_price_id=stripe_price)
                OrderItem.objects.create(
                    order=order,
                    product=product,
                    quantity=item.quantity,
                )

            return Response(status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class CreateInvoice(generics.CreateAPIView):
    '''
    - Send order details to frontend
    - Receives the session id
    '''

    def post(self, request):
        session_id = request.data['session_id']
        session = stripe.checkout.Session.retrieve(session_id)

        order = Order.objects.get(orderpayment__stripe_payment_id=session.payment_intent)
        order_items = OrderItem.objects.filter(order=order)
        order_status = OrderStatus.objects.get(order=order)
        order_payment = OrderPayment.objects.get(order=order)

        order_serializer = OrderSerializer(order)
        order_items_serializer = OrderItemSerializer(order_items, many=True)
        order_status_serializer = OrderStatusSerializer(order_status)
        order_payment_serializer = OrderPaymentSerializer(order_payment)

        return Response({
            'order': order_serializer.data,
            'order_items': order_items_serializer.data,
            'order_status': order_status_serializer.data,
            'order_payment': order_payment_serializer.data,
        })