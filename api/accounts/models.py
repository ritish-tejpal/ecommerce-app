from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings

class Timestamped(models.Model):
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name='Added By',
                                on_delete=models.SET_NULL, blank=True, null=True,
                                related_name = 'added_%(class)ss_by')
    is_deleted = models.BooleanField(verbose_name='Is Deleted', default=False)
    modified_by = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name='Modified By',
                                    on_delete=models.SET_NULL, blank=True, null=True,
                                    related_name = 'updated_%(class)ss_by')
    class Meta:
        abstract = True

class User(AbstractUser):
    
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15)
    password = models.CharField(max_length=128)

    def __str__(self):
        return self.username

    def save(self, *args, **kwargs):
        if not self.id:  
            self.is_active = True
        super().save(*args, **kwargs)
