from rest_framework import serializers
from authentication.serializers import UserSerializer
from .models import LiveSessionModel, LiveParticipantModel, LiveChatMessageModel

class LiveParticipantSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = LiveParticipantModel
        fields = ["id", "user", "status", "is_muted", "is_camera_off", "created_at"]

class LiveChatMessageSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = LiveChatMessageModel
        fields = ["id", "user", "text", "created_at"]

class LiveSessionSerializer(serializers.ModelSerializer):
    streamer = UserSerializer(read_only=True)
    participants_count = serializers.IntegerField(source="participants.count", read_only=True)
    
    class Meta:
        model = LiveSessionModel
        fields = [
            "id", "title", "description", "streamer", "status", 
            "cover", "started_at", "ended_at", "participants_count", "created_at"
        ]
