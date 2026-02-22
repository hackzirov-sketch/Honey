from django.contrib import admin
from .models import VideoModel


@admin.register(VideoModel)
class VideoAdmin(admin.ModelAdmin):
    list_display = ('title', 'video')
