from rest_framework import serializers
from django.conf import settings
from comment.serializers import BookRatingSerializer, BookReviewSerializer
from .models import GenreModel, BookModel, UserBookModel, CategoryModel


def get_lang_from_request(request):
    default_lang = getattr(settings, "MODELTRANSLATION_DEFAULT_LANGUAGE", "en")
    lang_options = getattr(settings, "MODELTRANSLATION_LANGUAGES",
                           [code for code, _ in getattr(settings, "LANGUAGES", [])])
    lang = default_lang
    if not request:
        return lang, lang_options
    query_lang = getattr(request, "query_params", {}).get("lang")
    if query_lang and query_lang in lang_options:
        return query_lang, lang_options
    header_lang = request.headers.get("Accept-Language")
    if header_lang and header_lang in lang_options:
        return header_lang, lang_options
    return lang, lang_options


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = GenreModel
        fields = ["id", "name"]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        request = self.context.get("request")
        lang, _ = get_lang_from_request(request)
        translated = getattr(instance, f"name_{lang}", None)
        if translated:
            data["name"] = translated
        return data


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryModel
        fields = ["id", "name"]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        request = self.context.get("request")
        lang, _ = get_lang_from_request(request)
        translated = getattr(instance, f"name_{lang}", None)
        if translated:
            data["name"] = translated
        return data


class BookSerializer(serializers.ModelSerializer):
    genre = GenreSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    avg_rating = serializers.FloatField(read_only=True)

    class Meta:
        model = BookModel
        fields = ["id", "author", "title", "description", "genre", "category", "year", "language", "pages", "image",
                  "file", "youtube_url", "library_url", "store_url", "is_premium", "avg_rating"]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        request = self.context.get("request")
        lang, _ = get_lang_from_request(request)
        title_translated = getattr(instance, f"title_{lang}", None)
        author_translated = getattr(instance, f"author_{lang}", None)
        description_translated = getattr(instance, f"description_{lang}", None)
        if title_translated:
            data["title"] = title_translated
        if author_translated:
            data["author"] = author_translated
        if description_translated:
            data["description"] = description_translated
        return data


class BookDetailSerializer(BookSerializer):
    ratings = BookRatingSerializer(source="rating_book", many=True, read_only=True)
    reviews = BookReviewSerializer(source="review_book", many=True, read_only=True)

    class Meta(BookSerializer.Meta):
        fields = BookSerializer.Meta.fields + ["ratings", "reviews"]


class UserBookSerializer(serializers.ModelSerializer):
    book = BookSerializer(read_only=True)

    class Meta:
        model = UserBookModel
        fields = ["id", "book", "downloaded_at", "is_read"]


class DownloadBookSerializer(serializers.Serializer):
    book_id = serializers.IntegerField()
