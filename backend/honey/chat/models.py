from django.db import models
from authentication.models import UserModel
from core.base import BaseModel


class MessageType(models.TextChoices):
    TEXT = "text", "Text"
    IMAGE = "image", "Image"
    FILE = "file", "File"
    VOICE = "voice", "Voice"


class GroupType(models.TextChoices):
    GROUP = "group", "Group"
    CHANNEL = "channel", "Channel"


class GroupModel(BaseModel):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True)
    avatar = models.ImageField(upload_to='chat/group/', null=True, blank=True)
    admin = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name='group_admin')
    members = models.ManyToManyField(UserModel, related_name='group_members')
    is_public = models.BooleanField(default=True)
    group_type = models.CharField(max_length=10, choices=GroupType.choices, default=GroupType.GROUP)

    class Meta:
        db_table = 'group'
        verbose_name = 'Group'
        verbose_name_plural = 'Groups'

    def __str__(self):
        return self.name


class MessageModel(BaseModel):
    sender = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name='message_sender')
    receiver = models.ForeignKey(UserModel, on_delete=models.CASCADE, null=True, blank=True,
                                 related_name='message_receiver')
    group = models.ForeignKey(GroupModel, on_delete=models.CASCADE, null=True, blank=True,
                              related_name='message_group')
    content = models.TextField()
    message_type = models.CharField(max_length=10, choices=MessageType.choices, default=MessageType.TEXT)
    file = models.FileField(upload_to='chat/message/file/', null=True, blank=True)
    read_by = models.ManyToManyField(UserModel, related_name='message_read_by', blank=True)

    class Meta:
        db_table = 'message'
        verbose_name = 'Message'
        verbose_name_plural = 'Messages'
        indexes = [
            models.Index(fields=['sender', 'receiver']),
            models.Index(fields=['group']),
        ]

    def __str__(self):
        return f"{self.sender.username}: {self.content[:50]}"


class ChatModel(BaseModel):
    user1 = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name='chat_user1')
    user2 = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name='chat_user2')
    last_message = models.ForeignKey(MessageModel, on_delete=models.SET_NULL, null=True, blank=True)

    class Meta:
        db_table = 'chat'
        verbose_name = 'Chat'
        verbose_name_plural = 'Chats'
        constraints = [
            models.UniqueConstraint(fields=['user1', 'user2'], name='unique_chat_between_two_users')
        ]

    def __str__(self):
        return f"{self.user1.username} - {self.user2.username}"
