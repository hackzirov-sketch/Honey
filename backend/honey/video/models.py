from django.db import models
from core.base import BaseModel
from embed_video.fields import EmbedVideoField
from authentication.models import UserModel


class VideoCategoryModel(BaseModel):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        db_table = "video_category"
        verbose_name = "Video Category"
        verbose_name_plural = "Video Categories"

    def __str__(self):
        return self.name


class VideoModel(BaseModel):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    category = models.ForeignKey(VideoCategoryModel, on_delete=models.SET_NULL, null=True, blank=True, related_name="videos")
    video = EmbedVideoField(blank=True, null=True)
    file = models.FileField(upload_to="videos/direct/", blank=True, null=True)
    cover = models.ImageField(upload_to="videos/covers/", blank=True, null=True)
    views = models.PositiveIntegerField(default=0)
    uploader = models.ForeignKey(UserModel, on_delete=models.SET_NULL, null=True, blank=True, related_name="uploaded_videos")

    def __str__(self):
        return self.title

    class Meta:
        db_table = "video"
        verbose_name = "Video"
        verbose_name_plural = "Videos"


class VideoLikeModel(BaseModel):
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name="video_likes")
    video = models.ForeignKey(VideoModel, on_delete=models.CASCADE, related_name="likes")

    class Meta:
        db_table = "video_like"
        verbose_name = "Video Like"
        verbose_name_plural = "Video Likes"
        unique_together = ('user', 'video')

    def __str__(self):
        return f"{self.user.username} - {self.video.title}"


class VideoCommentModel(BaseModel):
    video = models.ForeignKey(VideoModel, on_delete=models.CASCADE, related_name="comments")
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name="video_comments")
    text = models.TextField()

    class Meta:
        db_table = "video_comment"
        verbose_name = "Video Comment"
        verbose_name_plural = "Video Comments"

    def __str__(self):
        return f"{self.user.username} - {self.video.title}"
