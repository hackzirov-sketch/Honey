from django.db import models
from authentication.models import UserModel
from core.base import BaseModel
from library.models import BookModel


class RatingChoices(models.IntegerChoices):
    ZERO = 0, "0"
    ONE = 1, "1"
    TWO = 2, "2"
    THREE = 3, "3"
    FOUR = 4, "4"
    FIVE = 5, "5"


class BookRatingModel(BaseModel):
    book = models.ForeignKey(BookModel, on_delete=models.CASCADE, related_name="rating_book")
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name="rating_user")
    rating = models.PositiveSmallIntegerField(choices=RatingChoices.choices, default=RatingChoices.ZERO)

    class Meta:
        db_table = "book_rating"
        verbose_name = "Book Rating"
        verbose_name_plural = "Book Ratings"
        unique_together = ('book', 'user')

    def __str__(self):
        return f"{self.user.username} - {self.book.title} ({self.rating})"


class BookReviewModel(BaseModel):
    book = models.ForeignKey(BookModel, on_delete=models.CASCADE, related_name="review_book")
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name="review_user")
    comment = models.TextField()

    class Meta:
        db_table = "book_review"
        verbose_name = "Book Review"
        verbose_name_plural = "Book Reviews"

    def __str__(self):
        return f"{self.user.username} - {self.book.title}"


class BookLikeModel(BaseModel):
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name="like_user")
    book = models.ForeignKey(BookModel, on_delete=models.CASCADE, related_name="like_book")

    class Meta:
        db_table = "book_like"
        verbose_name = "Book Like"
        verbose_name_plural = "Book Likes"

        constraints = [models.UniqueConstraint(fields=["user", "book"], name="unique_user_book_like")]

    def __str__(self):
        return f"{self.user.username} - {self.book.title}"
