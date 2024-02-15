from django.db import models
from django.contrib.auth.models import AbstractUser
from oauth2_provider.models import AbstractAccessToken, AccessToken


class User(AbstractUser):
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15)
    password = models.CharField(max_length=128)
    is_app_user = models.BooleanField(default=False, null=True, blank=True)
    otp = models.CharField(max_length=6, null=True, blank=True)
    otp_expiry = models.DateTimeField(null=True, blank=True)
    last_login = models.DateTimeField(null=True, blank=True)
    is_deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)


    # USERNAME_FIELD = 'email'          # Use email as the username 

    def __str__(self):
        return self.username

    def save(self, *args, **kwargs):
        if not self.id:  
            self.is_active = True
        super().save(*args, **kwargs)


def userFile(instance, filename):
    return '/'.join(['users/assets', str(instance.username), filename])

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=100, null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    city = models.CharField(max_length=50, null=True, blank=True)
    state = models.CharField(max_length=50, null=True, blank=True)
    country = models.CharField(max_length=50, null=True, blank=True)
    pincode = models.CharField(max_length=10, null=True, blank=True)
    purchase_history = models.ManyToManyField('products.Product', through='PurchaseHistory')
    profile_pic = models.ImageField(upload_to=userFile, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    modified_at = models.DateTimeField(auto_now=True, null=True, blank=True)
        

    def __str__(self):
        return self.user.username
    

class PurchaseHistory(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    product_id = models.ForeignKey('products.Product', on_delete=models.CASCADE)
    quantity = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    shipping_address = models.TextField(null=True, blank=True)
    is_delivered = models.BooleanField(default=False)
    delivered_at = models.DateTimeField(null=True, blank=True)
    is_cancelled = models.BooleanField(default=False)
    cancelled_at = models.DateTimeField(null=True, blank=True)
    is_returned = models.BooleanField(default=False)
    returned_at = models.DateTimeField(null=True, blank=True)
    is_deleted = models.BooleanField(default=False)
    created_by = models.ForeignKey(User, verbose_name='Added By',
                                on_delete=models.SET_NULL, blank=True, null=True,
                                related_name = 'added_%(class)ss_by')
    modified_by = models.ForeignKey(User, verbose_name='Modified By',
                                on_delete=models.SET_NULL, blank=True, null=True,
                                related_name = 'modified_%(class)ss_by')
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} purchased {self.product_id.name} at {self.created_at}"



# --------------------------------------------------------------------------------------------    
# Custom Access Token Model; makemigrations error:-
# AttributeError: 'Settings' object has no attribute 'OAUTH2_PROVIDER_APPLICATION_MODEL'
# --------------------------------------------------------------------------------------------    
# class OnlineUserToken(AbstractAccessToken):
    # user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='access_token_user')
    # id_token = models.CharField(max_length=255, null=True, blank=True)
    # source_refresh_token = models.CharField(max_length=255, null=True, blank=True)
    # last_activity = models.DateTimeField(auto_now=True)
    # is_deleted = models.BooleanField(default=False)
    # created_by = models.ForeignKey(User, verbose_name='Added By',
                                # on_delete=models.SET_NULL, blank=True, null=True,
                                # related_name = 'added_%(class)ss_by')
    # modified_by = models.ForeignKey(User, verbose_name='Modified By',
                                # on_delete=models.SET_NULL, blank=True, null=True,
                                # related_name = 'modified_%(class)ss_by')
    # created_date = models.DateTimeField(auto_now_add=True)
    # modified_date = models.DateTimeField(auto_now=True)

    # def __str__(self):
        # return self.user.username