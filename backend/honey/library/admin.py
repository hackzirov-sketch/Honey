from django.contrib import admin
from .models import BookModel, GenreModel, UserBookModel, CategoryModel

admin.site.register(BookModel)
admin.site.register(GenreModel)
admin.site.register(CategoryModel)
admin.site.register(UserBookModel)
