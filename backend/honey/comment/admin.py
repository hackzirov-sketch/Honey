from django.contrib import admin
from .models import BookRatingModel, BookLikeModel, BookReviewModel

admin.site.register(BookLikeModel)
admin.site.register(BookRatingModel)
admin.site.register(BookReviewModel)
