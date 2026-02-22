from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LiveSessionViewSet

router = DefaultRouter()
router.register(r'sessions', LiveSessionViewSet, basename='live-session')

urlpatterns = [
    path('', include(router.urls)),
]
