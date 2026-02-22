from django.contrib.auth.hashers import make_password
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from authentication.models import UserModel, BlacklistedAccessTokenModel, EmailVerificationModel
from authentication.utils import send_verification_email, generate_expiry_time
from authentication.validators import validate_tokens, validate_password_uppercase
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ("id", "username", "email", "phone", "is_verified", "avatar", "is_superuser", "is_staff")


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        min_length=8,
        validators=[validate_password, validate_password_uppercase],
        style={"input_type": "password"},
        help_text="Password must be at least 8 characters with at least one uppercase letter",
    )
    password_confirm = serializers.CharField(
        write_only=True,
        style={"input_type": "password"},
        help_text="Must match the password field",
    )

    class Meta:
        model = UserModel
        fields = ['username', 'email', 'phone', 'password', 'password_confirm']

    def validate(self, attrs):
        if attrs.get('password') != attrs.get('password_confirm'):
            raise serializers.ValidationError({
                "password_confirm": "Passwords do not match."
            })
        return attrs

    def create(self, validated_data):
        validated_data.pop("password_confirm", None)
        raw_password = validated_data.pop("password")
        validated_data["password"] = make_password(raw_password)
        user = super().create(validated_data)
        verification = EmailVerificationModel.objects.create(
            user=user,
            type=1,
            expires_at=generate_expiry_time()
        )
        send_verification_email(user, verification.code)
        return user

    def validate_email(self, value):
        existing_user = UserModel.objects.filter(email__iexact=value).first()
        if existing_user:
            if not existing_user.is_active:
                raise serializers.ValidationError(
                    "A user with this email was deactivated. Please contact support."
                )
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def validate_username(self, value):
        existing_user = UserModel.objects.filter(username__iexact=value).first()
        if existing_user:
            if not existing_user.is_active:
                raise serializers.ValidationError(
                    "A user with this username was deactivated. Please contact support."
                )
            raise serializers.ValidationError("A user with this username already exists.")
        return value

    def validate_phone(self, value):
        existing_user = UserModel.objects.filter(phone__iexact=value).first()
        if existing_user:
            if not existing_user.is_active:
                raise serializers.ValidationError(
                    "A user with this phone number was deactivated. Please contact support."
                )
            raise serializers.ValidationError("A user with this phone number already exists.")
        return value


class EmailVerifySerializer(serializers.Serializer):
    email = serializers.EmailField(required=True, help_text="User email address")
    code = serializers.IntegerField(required=True, help_text="Verification code")


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if username and '@' in username:
            try:
                user_obj = UserModel.objects.get(email=username)
                username = user_obj.username
            except UserModel.DoesNotExist:
                pass  # AuthenticationFailed will be raised later

        user = authenticate(username=username, password=password)
        if not user:
            raise AuthenticationFailed("Invalid username or password.")

        if not user.is_superuser and not user.is_verified:
            raise AuthenticationFailed("Email is not verified.")

        data['user'] = user
        return data


class LogoutSerializer(serializers.Serializer):
    refresh_token = serializers.CharField(required=True)
    access_token = serializers.CharField(required=True)

    def validate(self, data):
        refresh_token = data.get('refresh_token')
        access_token = data.get('access_token')

        if not validate_tokens(refresh_token, access_token):
            raise serializers.ValidationError(
                'Access token or Refresh token is invalid or expired'
            )

        refresh_blacklisted = BlacklistedToken.objects.filter(token__token=refresh_token).exists()

        access_blacklisted = BlacklistedAccessTokenModel.objects.filter(token=access_token).exists()

        if refresh_blacklisted or access_blacklisted:
            raise serializers.ValidationError('Tokens are already blacklisted')

        return data


class GoogleAuthResponseSerializer(serializers.Serializer):
    message = serializers.CharField()
    refresh_token = serializers.CharField()
    access_token = serializers.CharField()
    user = UserSerializer()


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['username', 'email', 'phone', 'avatar', 'bio', 'is_active', 'deleted_at']
        read_only_fields = ['email', 'is_active', 'deleted_at']


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True, write_only=True)
    new_password = serializers.CharField(
        required=True,
        write_only=True,
        min_length=8,
        validators=[validate_password, validate_password_uppercase],
    )
    confirm_password = serializers.CharField(required=True, write_only=True)

    def validate(self, attrs):
        if attrs['new_password'] != attrs['confirm_password']:
            raise serializers.ValidationError({'confirm_password': 'Passwords do not match.'})
        return attrs

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError('Current password is incorrect.')
        return value
