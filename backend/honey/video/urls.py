from django.urls import path
from .views import VideoViewSet, VideoCategoryViewSet

app_name = "video"

urlpatterns = [
    path("videos/", VideoViewSet.as_view({"get": "list", "post": "create"}), name="video-list"),
    path("videos/<uuid:pk>/", VideoViewSet.as_view({"delete": "destroy"}), name="video-detail"),
    path("videos/<uuid:pk>/like/", VideoViewSet.as_view({"post": "like"}), name="video-like"),
    path("videos/<uuid:pk>/comment/", VideoViewSet.as_view({"post": "comment"}), name="video-comment"),
    path("categories/", VideoCategoryViewSet.as_view({"get": "list", "post": "create"}), name="video-category-list"),
]
