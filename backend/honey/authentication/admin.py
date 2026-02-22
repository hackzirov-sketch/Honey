from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import UserModel, EmailVerificationModel, BlacklistedAccessTokenModel


@admin.register(UserModel)
class UserAdmin(BaseUserAdmin):
    list_display = (
        "id",
        "username",
        "email",
        "phone",
        "is_verified",
        "is_staff",
        "is_active",
        "is_superuser",
    )
    list_filter = ("is_staff", "is_superuser", "is_active", "is_verified", "groups")
    search_fields = ("username", "email", "phone", "first_name", "last_name")
    ordering = ("-date_joined",)
    readonly_fields = ("last_login", "date_joined")

    fieldsets = (
        (None, {"fields": ("username", "email", "password")}),
        ("Personal info", {"fields": ("first_name", "last_name", "phone")}),
        (
            "Permissions",
            {
                "fields": (
                    "is_verified",
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "username",
                    "email",
                    "phone",
                    "password1",
                    "password2",
                    "first_name",
                    "last_name",
                    "is_verified",
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
    )


admin.site.register(EmailVerificationModel)
admin.site.register(BlacklistedAccessTokenModel)
