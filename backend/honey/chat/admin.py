from django.contrib import admin
from .models import ChatModel, MessageModel, GroupModel


@admin.register(ChatModel)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('id', 'user1', 'user2', 'created_at')


@admin.register(MessageModel)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('id', 'sender', 'receiver', 'created_at')


@admin.register(GroupModel)
class GroupAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
