from django.db.models import Q
from rest_framework import viewsets, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .models import VideoModel, VideoLikeModel, VideoCategoryModel, VideoCommentModel
from .serializers import VideoSerializer, VideoCategorySerializer, VideoCommentSerializer


class VideoCategoryViewSet(viewsets.ModelViewSet):
    queryset = VideoCategoryModel.objects.all()
    serializer_class = VideoCategorySerializer
    permission_classes = [AllowAny]


class VideoViewSet(viewsets.ViewSet):
    parser_classes = [MultiPartParser, FormParser]

    def get_permissions(self):
        if self.action in ['like', 'comment', 'create', 'destroy']:
            return [IsAuthenticated()]
        return [AllowAny()]

    @swagger_auto_schema(
        operation_summary="Create a video",
        operation_description="Upload a new video. Staff only.",
        responses={201: VideoSerializer()},
        tags=["Videos"],
    )
    def create(self, request):
        if not request.user.is_staff and not request.user.is_superuser:
            return Response({"detail": "Staff only"}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = VideoSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save(uploader=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_summary="List of videos",
        operation_description="Returns a list of videos. Supports optional ?search= and ?category= filters.",
        manual_parameters=[
            openapi.Parameter('search', openapi.IN_QUERY, type=openapi.TYPE_STRING, required=False),
            openapi.Parameter('category', openapi.IN_QUERY, type=openapi.TYPE_STRING, required=False)
        ],
        responses={200: VideoSerializer(many=True)},
        tags=["Videos"],
    )
    def list(self, request):
        queryset = VideoModel.objects.all().order_by("-created_at")
        search = request.query_params.get('search')
        category = request.query_params.get('category')
        
        if search:
            queryset = queryset.filter(Q(title__icontains=search))
        
        if category and category != 'Barchasi':
            queryset = queryset.filter(category__name=category)
            
        serializer = VideoSerializer(queryset, many=True, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_summary="Delete a video",
        responses={204: "No Content"},
        tags=["Videos"],
    )
    def destroy(self, request, pk=None):
        if not request.user.is_staff and not request.user.is_superuser:
            return Response({"detail": "Staff only"}, status=status.HTTP_403_FORBIDDEN)
        
        video = VideoModel.objects.filter(pk=pk).first()
        if not video:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        
        video.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        video = VideoModel.objects.filter(pk=pk).first()
        if not video:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        
        like, created = VideoLikeModel.objects.get_or_create(user=request.user, video=video)
        if not created:
            like.delete()
            return Response({"message": "Unliked", "is_liked": False}, status=status.HTTP_200_OK)
        
        return Response({"message": "Liked", "is_liked": True}, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def comment(self, request, pk=None):
        video = VideoModel.objects.filter(pk=pk).first()
        if not video:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        
        text = request.data.get('text')
        if not text:
            return Response({"detail": "Text is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        comment = VideoCommentModel.objects.create(video=video, user=request.user, text=text)
        serializer = VideoCommentSerializer(comment)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
