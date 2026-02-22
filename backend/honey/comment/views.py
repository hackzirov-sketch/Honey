from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from comment.models import BookRatingModel, BookReviewModel, BookLikeModel
from comment.serializers import (
    BookRatingSerializer, BookReviewSerializer,
    CreateBookRatingSerializer, CreateBookReviewSerializer, ToggleBookLikeSerializer, BookLikeSerializer,
    ToggleBookLikeResponseSerializer
)


class BookRatingViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Create book rating",
        request_body=CreateBookRatingSerializer,
        responses={201: BookRatingSerializer(), 400: "Bad Request"},
        tags=["Reviews"],
    )
    def create(self, request):
        serializer = CreateBookRatingSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        book = serializer.validated_data["book"]

        if BookRatingModel.objects.filter(user=request.user, book=book).exists():
            return Response(
                {"message": "You have already rated this book"},
                status=status.HTTP_400_BAD_REQUEST
            )

        rating = BookRatingModel.objects.create(
            user=request.user,
            book=book,
            rating=serializer.validated_data["rating"]
        )

        out_serializer = BookRatingSerializer(rating, context={"request": request})
        return Response(out_serializer.data, status=status.HTTP_201_CREATED)


class BookCommentViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Create book review",
        request_body=CreateBookReviewSerializer,
        responses={201: BookReviewSerializer(), 400: "Bad Request"},
        tags=["Reviews"],
    )
    def create(self, request):
        serializer = CreateBookReviewSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        review = BookReviewModel.objects.create(
            user=request.user,
            book=serializer.validated_data["book"],
            comment=serializer.validated_data["comment"]
        )
        serializer = BookReviewSerializer(review, context={"request": request})
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class BookLikeViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Toggle like/unlike for a book",
        request_body=ToggleBookLikeSerializer,
        responses={200: ToggleBookLikeResponseSerializer()},
        tags=["Likes"],
    )
    def create(self, request):
        serializer = ToggleBookLikeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        book_id = serializer.validated_data["book_id"]
        user = request.user
        like = BookLikeModel.objects.filter(user=user, book_id=book_id)
        if like.exists():
            like.delete()
            return Response(
                {"liked": False, "message": "Book unliked"},
                status=status.HTTP_200_OK
            )

        BookLikeModel.objects.create(user=user, book_id=book_id)

        return Response(
            {"liked": True, "message": "Book liked"},
            status=status.HTTP_200_OK
        )

    @swagger_auto_schema(
        operation_summary="Get all liked books of the authenticated user",
        responses={200: BookLikeSerializer(many=True)},
        tags=["Likes"],
    )
    def list(self, request):
        likes = BookLikeModel.objects.filter(user=request.user).select_related("book", "user")
        serializer = BookLikeSerializer(likes, many=True, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)
