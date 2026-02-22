from django.db import models
from django.db.models import Avg

from authentication.models import UserModel
from core.base import BaseModel


class BookLanguageChoices(models.TextChoices):
    EN = "en", "English"
    RU = "ru", "Russian"
    UZ = "uz", "Uzbek"


class GenreModel(BaseModel):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "genre"
        verbose_name_plural = "Genres"
        verbose_name = "Genre"

class CategoryModel(BaseModel):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "category"
        verbose_name_plural = "Categories"
        verbose_name = "Category"

class BookModel(BaseModel):
    author = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    description = models.TextField()
    genre = models.ForeignKey(GenreModel, on_delete=models.CASCADE, related_name="book_genre")
    category = models.ForeignKey(CategoryModel, on_delete=models.CASCADE, related_name="book_category")
    year = models.PositiveIntegerField()
    language = models.CharField(max_length=20, choices=BookLanguageChoices.choices, default=BookLanguageChoices.EN)
    pages = models.PositiveIntegerField()
    image = models.ImageField(upload_to="book/image")
    file = models.FileField(upload_to="book/files/", blank=True, null=True) # Mana bu PDF uchun
    youtube_url = models.URLField(blank=True, null=True)
    library_url = models.URLField(blank=True, null=True)
    store_url = models.URLField(blank=True, null=True)
    is_premium = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.title} ({self.author})"

    @property
    def average_rating(self):
        agg = self.rating_book.aggregate(avg=Avg('rating'))
        return agg['avg'] or 0.0

    class Meta:
        db_table = "book"
        verbose_name_plural = "Books"
        verbose_name = "Book"


class UserBookModel(BaseModel):
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name="user_books")
    book = models.ForeignKey(BookModel, on_delete=models.CASCADE, related_name="downloaded_by")
    downloaded_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        db_table = "user_book"
        verbose_name_plural = "User Books"
        verbose_name = "User Book"
        unique_together = ['user', 'book']

    def __str__(self):
        return f"{self.user.username} - {self.book.title}"
