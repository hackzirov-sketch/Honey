from rest_framework import serializers
from authentication.serializers import UserSerializer
from .models import GroupModel, MessageModel, ChatModel


class GroupSerializer(serializers.ModelSerializer):
    admin = UserSerializer(read_only=True)
    members = UserSerializer(many=True, read_only=True)

    class Meta:
        model = GroupModel
        fields = ['id', 'name', 'description', 'avatar', 'admin', 'members', 'is_public', 'group_type']


class AddMemberSerializer(serializers.Serializer):
    user_id = serializers.UUIDField(required=True)


class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    receiver = UserSerializer(read_only=True)
    group = GroupSerializer(read_only=True)
    read_by = UserSerializer(many=True, read_only=True)
    file = serializers.FileField(required=False, allow_null=True)

    class Meta:
        model = MessageModel
        fields = ("id", "sender", "receiver", "group", "content", "message_type", "file", "read_by", "created_at")


class ChatSerializer(serializers.ModelSerializer):
    other_user = serializers.SerializerMethodField()
    last_message = MessageSerializer(read_only=True)

    class Meta:
        model = ChatModel
        fields = (
            "id",
            "other_user",
            "last_message",
            "updated_at",
        )

    def get_other_user(self, obj):
        request = self.context.get("request")
        user = request.user

        other = obj.user2 if obj.user1 == user else obj.user1
        return UserSerializer(other).data


class SendMessageSerializer(serializers.ModelSerializer):
    file = serializers.FileField(required=False, allow_null=True)

    class Meta:
        model = MessageModel
        fields = (
            "content",
            "message_type",
            "file",
        )
