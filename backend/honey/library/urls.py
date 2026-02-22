from django.urls import path
from .views import BookViewSet, UserBookViewSet, CategoryViewSet, GenreViewSet

app_name = "library"

urlpatterns = [
    path("books/", BookViewSet.as_view({"get": "list", "post": "create"}), name="book-list"),
    path("books/<uuid:pk>/", BookViewSet.as_view({"get": "retrieve"}), name="book-detail"),
    path("user-books/", UserBookViewSet.as_view({"get": "list"}), name="user-book-list"),
    path("user-books/download/", UserBookViewSet.as_view({"post": "download_book"}), name="user-book-download"),
    path("user-books/<uuid:pk>/", UserBookViewSet.as_view({"delete": "destroy"}), name="user-book-destroy"),
    path("categories/", CategoryViewSet.as_view({"get": "list"}), name="category-list"),
    path("genres/", GenreViewSet.as_view({"get": "list"}), name="genre-list"),
]
