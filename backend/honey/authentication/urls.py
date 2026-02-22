from django.urls import path
from authentication.views import UserRegisterViewSet, LoginViewSet, LogoutViewSet, GoogleAuthViewSet, UserProfileViewSet
from rest_framework_simplejwt.views import TokenRefreshView

app_name = "authentication"

urlpatterns = [
    path("register/", UserRegisterViewSet.as_view({"post": "register"}), name="register"),
    path("verify-email/", UserRegisterViewSet.as_view({"post": "verify_register"}), name="verify-register"),
    path("login/", LoginViewSet.as_view({"post": "login"}), name="login"),
    path("logout/", LogoutViewSet.as_view({"post": "logout"}), name="logout"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    # Google
    path("google/", GoogleAuthViewSet.as_view({'get': 'login'}), name="google_login"),
    path("google/callback/", GoogleAuthViewSet.as_view({'get': 'callback'}), name="google-callback"),
    # Profile
    path("profile/", UserProfileViewSet.as_view({"get": "retrieve"}), name="user-profile"),
    path("profile/stats/", UserProfileViewSet.as_view({"get": "stats"}), name="user-stats"),
    path("profile/update/", UserProfileViewSet.as_view({"patch": "partial_update"}), name="user-profile-update"),
    path("profile/delete/", UserProfileViewSet.as_view({"delete": "delete"}), name="user-delete"),
    path("profile/change-password/", UserProfileViewSet.as_view({"post": "change_password"}), name="user-change-password"),
]
