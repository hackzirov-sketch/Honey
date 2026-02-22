from django.urls import path
from .views import BookCommentViewSet, BookRatingViewSet, BookLikeViewSet

app_name = "comment"

urlpatterns = [
    # Ratings
    path("books/rate/", BookRatingViewSet.as_view({"post": "create"}), name="book-rate"),
    # Reviews
    path("books/review/", BookCommentViewSet.as_view({"post": "create"}), name="book-review"),
    # Likes
    path("books/like/", BookLikeViewSet.as_view({"post": "create"}), name="book-like-toggle"),
    path("books/like/list/", BookLikeViewSet.as_view({"get": "list"}), name="user-liked-books")
]
