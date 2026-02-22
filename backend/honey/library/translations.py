from modeltranslation.translator import register, TranslationOptions
from .models import BookModel, GenreModel, CategoryModel


@register(CategoryModel)
class CategoryTranslationOptions(TranslationOptions):
    fields = ("name",)


@register(GenreModel)
class GenreTranslationOptions(TranslationOptions):
    fields = ("name",)


@register(BookModel)
class BookTranslationOptions(TranslationOptions):
    fields = ("title", "author", "description")
