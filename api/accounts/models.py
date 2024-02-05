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

    # USERNAME_FIELD = 'email'          # Use email as the username 

    def __str__(self):
        return self.username

    def save(self, *args, **kwargs):
        if not self.id:  
            self.is_active = True
        super().save(*args, **kwargs)


# class Timestamped(models.Model):
#     created_date = models.DateTimeField(auto_now_add=True)
#     modified_date = models.DateTimeField(auto_now=True)
#     created_by = models.ForeignKey(User, verbose_name='Added By',
#                                 on_delete=models.SET_NULL, blank=True, null=True,
#                                 related_name = 'added_%(class)ss_by')
#     is_deleted = models.BooleanField(verbose_name='Is Deleted', default=False)
#     modified_by = models.ForeignKey(User, verbose_name='Modified By',
#                                     on_delete=models.SET_NULL, blank=True, null=True,
#                                     related_name = 'updated_%(class)ss_by')
#     class Meta:
#         abstract = True


# class OAuthToken(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     access_token = models.OneToOneField(AccessToken, 
#                                         on_delete=models.CASCADE,
#                                         related_name='oauth_token')
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"OAuth Token for {self.user.username}"