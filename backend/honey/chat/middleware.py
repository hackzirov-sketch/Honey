from django.contrib.auth.models import AnonymousUser
from channels.db import database_sync_to_async
from rest_framework_simplejwt.tokens import AccessToken
from authentication.models import UserModel


@database_sync_to_async
def get_user(user_id):
    try:
        return UserModel.objects.get(id=user_id)
    except UserModel.DoesNotExist:
        return AnonymousUser()


class JWTHeaderAuthMiddleware:
    def __init__(self, inner):
        self.inner = inner

    async def __call__(self, scope, receive, send):
        scope = dict(scope)

        token = None
        headers = {
            k.decode().lower(): v.decode()
            for k, v in scope.get("headers", [])
        }
        auth_header = headers.get("authorization")

        if auth_header and auth_header.lower().startswith("bearer "):
            token = auth_header.split(" ", 1)[1].strip()

        if token:
            try:
                access = AccessToken(token)
                user = await get_user(access["user_id"])
                scope["user"] = user
            except Exception:
                scope["user"] = AnonymousUser()
        else:
            print("JWTHeaderAuthMiddleware: no valid Authorization header found")
            scope["user"] = AnonymousUser()

        return await self.inner(scope, receive, send)
