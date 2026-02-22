from tokenize import TokenError
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.utils.timezone import now
from django.db.models import Q
from django.http import HttpResponseRedirect
from django.utils.timezone import now as timezone_now
from .models import UserModel, EmailVerificationModel, BlacklistedAccessTokenModel
from library.models import UserBookModel
from chat.models import MessageModel, ChatModel
from .oauth import oauth
from .serializers import UserRegistrationSerializer, LoginSerializer, LogoutSerializer, EmailVerifySerializer, \
    GoogleAuthResponseSerializer, UserSerializer, UserProfileSerializer, ChangePasswordSerializer
from datetime import timedelta
from rest_framework_simplejwt.tokens import RefreshToken
from django.urls import reverse
from rest_framework.parsers import MultiPartParser, FormParser
from django.utils import timezone


class UserRegisterViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        operation_summary="Register a new user",
        operation_description="Creates a new user with username, email, phone and password",
        request_body=UserRegistrationSerializer,
        responses={
            201: openapi.Response(description="User successfully registered"),
            400: openapi.Response(description="Invalid input data")
        },
        tags=['Authentication']
    )
    def register(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(
                {
                    "message": "User registered successfully. A verification code has been sent to your email.",
                    "email": user.email,
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_summary="Verify email with code",
        operation_description="Verifies the user's email using the verification code sent to their email.",
        request_body=EmailVerifySerializer,
        responses={
            200: openapi.Response(description="Email verified successfully"),
            400: openapi.Response(description="Invalid or expired code")
        },
        tags=["Authentication"]
    )
    def verify_register(self, request):
        email = request.data.get("email")
        code = request.data.get("code")

        user = UserModel.objects.filter(email=email).first()
        if not user:
            return Response(data={"message": "User not found."}, status=status.HTTP_400_BAD_REQUEST)

        verification = EmailVerificationModel.objects.filter(user=user).order_by("-created_at").first()
        if not verification:
            return Response(data={"message": "Verification code not found."}, status=status.HTTP_400_BAD_REQUEST)

        if verification.block_until and verification.block_until > now():
            remaining_minutes = int((verification.block_until - now()).total_seconds() // 60)
            return Response(
                data={
                    "message": f"You have exceeded the maximum attempts. Try again after {remaining_minutes} minutes."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if verification.expires_at and verification.expires_at < now():
            return Response(data={"message": "The verification code has expired."}, status=status.HTTP_400_BAD_REQUEST)

        if verification.code != int(code):
            verification.attempts += 1
            if verification.attempts >= 3:
                verification.block_until = now() + timedelta(minutes=30)
                verification.attempts = 0
            verification.save(update_fields=["attempts", "block_until"])
            return Response({"message": "The verification code is incorrect."}, status=status.HTTP_400_BAD_REQUEST)

        user.is_verified = True
        user.save(update_fields=["is_verified"])
        verification.delete()

        refresh = RefreshToken.for_user(user)

        return Response({
            "message": "Email verified successfully.",
            "refresh": str(refresh),
            "access": str(refresh.access_token)
        }, status=status.HTTP_200_OK)


class LoginViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        operation_summary="User login",
        operation_description="Authenticate a user using username and password and return JWT tokens.",
        request_body=LoginSerializer,
        responses={
            200: openapi.Response(description="Login successful. JWT tokens are returned.", ),
            401: "Invalid username or password.",
        },
        tags=["Authentication"]
    )
    def login(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        if not user.is_active:
            return Response(
                {"detail": "This account has been deactivated."},
                status=status.HTTP_403_FORBIDDEN
            )

        refresh = RefreshToken.for_user(user)

        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": {
                "username": user.username,
                "is_verified": user.is_verified,
                "is_superuser": user.is_superuser,
                "is_staff": user.is_staff
            }
        }, status=status.HTTP_200_OK)


class LogoutViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="User logout",
        operation_description="Logout the user by blacklisting both refresh and access tokens.",
        request_body=LogoutSerializer,
        responses={
            205: "Successfully logged out.",
            400: "Invalid or expired token."
        },
        tags=["Authentication"]
    )
    def logout(self, request):
        serializer = LogoutSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                data={"message": serializer.errors, "ok": False},
                status=status.HTTP_400_BAD_REQUEST,
            )

        refresh_token = serializer.validated_data["refresh_token"]
        access_token = serializer.validated_data["access_token"]

        try:
            refresh = RefreshToken(refresh_token)
            refresh.blacklist()

            BlacklistedAccessTokenModel.objects.create(token=access_token)

            return Response(
                data={"message": "Logged out successfully", "ok": True},
                status=status.HTTP_205_RESET_CONTENT,
            )

        except TokenError:
            return Response(
                data={"error": "Invalid or expired token", "ok": False},
                status=status.HTTP_400_BAD_REQUEST,
            )


class GoogleAuthViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        operation_summary="Google OAuth login",
        operation_description="Redirects the user to Google OAuth login page.",
        tags=["Authentication"]
    )
    def login(self, request):
        redirect_uri = request.build_absolute_uri(reverse("authentication:google-callback"))
        return oauth.google.authorize_redirect(request._request, redirect_uri)

    @swagger_auto_schema(
        operation_summary="Google OAuth callback",
        operation_description=(
                "Handles the callback from Google OAuth, creates or retrieves the user, "
                "then returns a JWT token together with user information."
        ),
        responses={
            200: GoogleAuthResponseSerializer,
            400: openapi.Response(description="Auth error / invalid request"),
        },
        tags=["Authentication"]
    )
    def callback(self, request):
        django_request = request._request

        # Frontend URL — Django settings.py dan o'qiladi (FRONTEND_URL env var)
        FRONTEND_URL = getattr(settings, "FRONTEND_URL", "http://localhost:5173") + "/#/auth"

        try:
            token = oauth.google.authorize_access_token(django_request)
            user_info = token.get("userinfo") or oauth.google.parse_id_token(django_request, token)

            if not user_info:
                return HttpResponseRedirect(f"{FRONTEND_URL}?error=no_user_info")

            email = user_info.get("email")
            if not email:
                return HttpResponseRedirect(f"{FRONTEND_URL}?error=no_email")

            google_sub = user_info.get("sub")
            first_name = user_info.get("given_name", "")
            last_name = user_info.get("family_name", "")
            picture = user_info.get("picture", "")

            user = UserModel.objects.filter(email=email).first()

            if user:
                if not user.is_active:
                    return HttpResponseRedirect(f"{FRONTEND_URL}?error=account_deactivated")
                if not user.google and google_sub:
                    user.google = google_sub
                    user.is_verified = True
                    user.save(update_fields=["google", "is_verified"])
            else:
                user = UserModel.objects.create(
                    email=email,
                    google=google_sub,
                    first_name=first_name,
                    last_name=last_name,
                    is_verified=True,
                    username=email.split("@")[0],
                )

            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            import urllib.parse, json
            user_data = {
                "name": user.username or email.split("@")[0],
                "email": email,
                "picture": picture,
            }
            user_json = urllib.parse.quote(json.dumps(user_data))

            redirect_url = (
                f"{FRONTEND_URL}"
                f"?access={access_token}"
                f"&refresh={refresh_token}"
                f"&user={user_json}"
            )
            return HttpResponseRedirect(redirect_url)

        except Exception as e:
            import urllib.parse
            return HttpResponseRedirect(f"{FRONTEND_URL}?error={urllib.parse.quote(str(e))}")


class UserProfileViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    @swagger_auto_schema(
        operation_summary="Get current user's profile",
        operation_description=(
                "Returns the profile information of the currently authenticated user."
        ),
        responses={200: UserProfileSerializer()},
        tags=['Profile']
    )
    def retrieve(self, request):
        serializer = UserProfileSerializer(request.user, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_summary="Partially update current user's profile",
        operation_description=(
                "Partially updates selected fields of the user's profile."
        ),
        request_body=UserProfileSerializer,
        responses={200: UserProfileSerializer()},
        tags=['Profile']
    )
    def partial_update(self, request):
        serializer = UserProfileSerializer(request.user, data=request.data, partial=True, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_summary="Soft delete user (deactivate profile)",
        operation_description=(
                "Soft-deletes the user by setting `is_active=False` and `deleted_at` timestamp."
        ),
        responses={204: "User deactivated"},
        tags=['Profile']
    )
    def delete(self, request):
        user = request.user
        user.is_active = False
        user.deleted_at = timezone.now()
        user.save(update_fields=["is_active", "deleted_at"])

        return Response(
            {"message": "User account deactivated"},
            status=status.HTTP_204_NO_CONTENT
        )

    @swagger_auto_schema(
        operation_summary="Get user stats",
        operation_description="Returns user statistics (books read, chats, messages).",
        responses={200: "Stats object"},
        tags=['Profile']
    )
    def stats(self, request):
        user = request.user
        books_read = UserBookModel.objects.filter(user=user, is_read=True).count()
        books_downloaded = UserBookModel.objects.filter(user=user).count()
        
        chats_count = ChatModel.objects.filter(
            Q(user1=user) | Q(user2=user)
        ).count()
        
        messages_sent = MessageModel.objects.filter(sender=user).count()
        
        return Response({
            "books_read": books_read,
            "books_downloaded": books_downloaded,
            "chats_count": chats_count,
            "messages_sent": messages_sent
        }, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_summary="Change user password",
        operation_description="Changes the authenticated user's password. Requires old password verification.",
        request_body=ChangePasswordSerializer,
        responses={
            200: openapi.Response(description="Password changed successfully"),
            400: openapi.Response(description="Invalid old password or validation error"),
        },
        tags=['Profile']
    )
    def change_password(self, request):
        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = request.user
        user.set_password(serializer.validated_data['new_password'])
        user.save(update_fields=['password'])
        return Response(
            {"message": "Password changed successfully."},
            status=status.HTTP_200_OK
        )
