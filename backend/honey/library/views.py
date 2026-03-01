from django.db.models import Q
from rest_framework import status, viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from .models import BookModel, UserBookModel, CategoryModel, GenreModel
from .serializers import BookSerializer, UserBookSerializer, DownloadBookSerializer, BookDetailSerializer, \
    CategorySerializer, GenreSerializer


class BookViewSet(viewsets.ViewSet):
    parser_classes = [MultiPartParser, FormParser]

    def get_permissions(self):
        if self.action == 'create':
            return [IsAuthenticated()]
        return [AllowAny()]

    @swagger_auto_schema(
        operation_summary="Create a book",
        operation_description="Upload a new book. Staff only.",
        responses={201: BookSerializer()},
        tags=["Books"],
    )
    def create(self, request):
        if not request.user.is_staff and not request.user.is_superuser:
            return Response({"detail": "Staff only"}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = BookSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_summary="List of books",
        operation_description="Returns a list of books matching the search query by title, author, genre, and year. Sorted by created_at if no search is provided.",
        manual_parameters=[
            openapi.Parameter(
                name="search",
                in_=openapi.IN_QUERY,
                type=openapi.TYPE_STRING,
                description="Full-text search across title_* and author_* fields.",
                required=False,
            )
        ],
        responses={200: BookSerializer(many=True)},
        tags=["Books"],
    )
    def list(self, request):
        queryset = BookModel.objects.select_related("genre", "category").all()
        search = request.query_params.get("search")
        category_id = request.query_params.get("category")

        # Category filter
        if category_id:
            queryset = queryset.filter(category_id=category_id)

        # Full-text search
        if search:
            tokens = [t.strip() for t in search.split() if t.strip()]
            token_q = None
            for token in tokens:
                q_per_token = (
                        Q(title_uz__icontains=token)
                        | Q(title_ru__icontains=token)
                        | Q(title_en__icontains=token)
                        | Q(author_uz__icontains=token)
                        | Q(author_ru__icontains=token)
                        | Q(author_en__icontains=token)
                        | Q(genre__name_uz__icontains=token)
                        | Q(genre__name_ru__icontains=token)
                        | Q(genre__name_en__icontains=token)
                        | Q(category__name_uz__icontains=token)
                        | Q(category__name_ru__icontains=token)
                        | Q(category__name_en__icontains=token)
                )
                if token.isdigit():
                    try:
                        q_per_token |= Q(year=int(token))
                    except ValueError:
                        pass

                if token_q is None:
                    token_q = q_per_token
                else:
                    token_q &= q_per_token

            if token_q is not None:
                queryset = queryset.filter(token_q)

        queryset = queryset.distinct()

        if not search:
            queryset = queryset.order_by("-created_at")

        serializer = BookSerializer(queryset, many=True, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_summary="Retrieve a book",
        operation_description="Get a single book by ID.",
        responses={
            200: BookDetailSerializer(),
            404: "Not Found",
        },
        tags=["Books"],
    )
    def retrieve(self, request, pk=None):
        book = BookModel.objects.filter(id=pk).first()
        if not book:
            return Response(
                data={"message": "Book not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = BookDetailSerializer(book, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserBookViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Get all downloaded books",
        operation_description="Retrieve all books downloaded by the authenticated user.",
        responses={200: UserBookSerializer(many=True)},
        tags=["User Books"],
    )
    def list(self, request):
        queryset = UserBookModel.objects.select_related("book", "book__genre", "book__category").filter(user=request.user)
        serializer = UserBookSerializer(queryset, many=True, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_summary="Download a book",
        operation_description="Download a book to user's library. If already downloaded, returns existing download.",
        request_body=DownloadBookSerializer,
        responses={
            201: UserBookSerializer(),
            200: UserBookSerializer(),
            400: "Bad Request",
            404: "Book not found",
        },
        tags=["User Books"],
    )
    def download_book(self, request):
        serializer = DownloadBookSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        book_id = serializer.validated_data['book_id']

        book = BookModel.objects.filter(id=book_id).first()
        if UserBookModel.objects.filter(user=request.user, book=book).exists():
            user_book = UserBookModel.objects.get(user=request.user, book=book)
            serializer = UserBookSerializer(user_book, context={"request": request})
            return Response(
                {"message": "Book already downloaded", "data": serializer.data},
                status=status.HTTP_200_OK,
            )
        user_book = UserBookModel.objects.create(user=request.user, book=book, is_read=False)
        serializer = UserBookSerializer(user_book, context={"request": request})
        return Response(
            {"message": "Kitob yuklab olindi", "data": serializer.data},
            status=status.HTTP_201_CREATED,
        )

    @swagger_auto_schema(
        operation_summary="Remove book from downloaded library",
        operation_description="Delete a book from the authenticated user's downloaded library.",
        responses={204: "No Content", 404: "User book not found"},
        tags=["User Books"],
    )
    def destroy(self, request, pk=None):
        user_book = UserBookModel.objects.select_related("book").filter(user=request.user, book_id=pk).first()
        if not user_book:
            return Response(data={"message": "User book not found"}, status=status.HTTP_404_NOT_FOUND)
        user_book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class CategoryViewSet(viewsets.ViewSet):

    @swagger_auto_schema(
        operation_summary="List of categories",
        operation_description="Returns a list of categories.",
        responses={200: CategorySerializer(many=True)},
        tags=["Categories"],
    )
    @method_decorator(cache_page(60 * 15)) # Cache for 15 minutes
    def list(self, request):
        queryset = CategoryModel.objects.all()
        serializer = CategorySerializer(queryset, many=True, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)

class GenreViewSet(viewsets.ViewSet):
    @swagger_auto_schema(
        operation_summary="List of genres",
        operation_description="Returns a list of genres.",
        responses={200: GenreSerializer(many=True)},
        tags=["Genres"],
    )
    @method_decorator(cache_page(60 * 15)) # Cache for 15 minutes
    def list(self, request):
        queryset = GenreModel.objects.all()
        serializer = GenreSerializer(queryset, many=True, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)
