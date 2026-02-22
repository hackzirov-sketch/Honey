from django.contrib.auth.models import AbstractUser
from django.db import models
from authentication.managers import UserManager
from core.base import BaseModel
from .utils import generate_code
from .validators import validate_phone_number
import uuid
from django.utils import timezone

VerificationTypes = (
    (1, "REGISTER"),
    (2, "RESEND"),
    (3, "PASSWORD_RESET"),
)


class UserModel(AbstractUser, BaseModel):
    username = models.CharField(max_length=150, unique=True, blank=False, null=False)
    email = models.EmailField(unique=True, blank=False, null=False)
    phone = models.CharField(max_length=20, validators=[validate_phone_number], unique=True)
    google = models.CharField(max_length=255, blank=True, null=True)
    avatar = models.ImageField(upload_to='users/avatars/', null=True, blank=True)
    bio = models.TextField(null=True, blank=True)

    is_verified = models.BooleanField(default=False)
    online = models.BooleanField(default=False)
    last_seen = models.DateTimeField(default=timezone.now)
    deleted_at = models.DateTimeField(null=True, blank=True)

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email", "phone"]

    objects = UserManager()

    def __str__(self):
        return self.email


class EmailVerificationModel(BaseModel):
    user = models.ForeignKey(UserModel, models.SET_NULL, null=True, related_name="email_verifications")
    key = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    code = models.PositiveIntegerField(default=generate_code)
    type = models.IntegerField(choices=VerificationTypes, default=1)
    attempts = models.IntegerField(default=0)
    expires_at = models.DateTimeField(null=True, blank=True)
    block_until = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.email if self.user else 'Unknown'} - {self.code}"

    class Meta:
        db_table = 'email_verification'
        verbose_name = 'Email Verification'
        verbose_name_plural = 'Email Verifications'


class BlacklistedAccessTokenModel(BaseModel):
    token = models.CharField(max_length=1000, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id)

    class Meta:
        db_table = 'blacklisted_access_token'
        verbose_name = 'Blacklisted Access Token'
        verbose_name_plural = 'Blacklisted Access Tokens'
