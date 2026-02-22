from authentication.serializers import UserSerializer
from comment.models import BookRatingModel, BookReviewModel, BookLikeModel
from rest_framework import serializers


class CreateBookRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookRatingModel
        fields = ["book", "rating"]


class CreateBookReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookReviewModel
        fields = ["book", "comment"]


class BookRatingSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = BookRatingModel
        fields = ["id", "user", "rating"]


class BookReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = BookReviewModel
        fields = ["id", "user", "comment"]


class BookLikeSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = BookLikeModel
        fields = ["id", "user", "book"]


class ToggleBookLikeSerializer(serializers.Serializer):
    book_id = serializers.IntegerField()


class ToggleBookLikeResponseSerializer(serializers.Serializer):
    liked = serializers.BooleanField()
    message = serializers.CharField()
