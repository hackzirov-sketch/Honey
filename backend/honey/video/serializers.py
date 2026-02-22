from rest_framework import serializers
from .models import VideoModel, VideoLikeModel, VideoCategoryModel, VideoCommentModel
from authentication.serializers import UserSerializer

class VideoCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoCategoryModel
        fields = ['id', 'name']


class VideoCommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = VideoCommentModel
        fields = ['id', 'user', 'text', 'created_at']


class VideoSerializer(serializers.ModelSerializer):
    video_embed = serializers.SerializerMethodField()
    likes_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()
    category_name = serializers.CharField(source='category.name', read_only=True)
    comments = VideoCommentSerializer(many=True, read_only=True)
    uploader = UserSerializer(read_only=True)

    class Meta:
        model = VideoModel
        fields = [
            'id', 'title', 'description', 'video', 'video_embed', 
            'file', 'cover', 'views', 'created_at', 'likes_count', 
            'is_liked', 'category', 'category_name', 'comments', 'uploader'
        ]

    def get_video_embed(self, obj):
        if obj.video:
            return obj.video.url
        return None

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_is_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return VideoLikeModel.objects.filter(user=request.user, video=obj).exists()
        return False
