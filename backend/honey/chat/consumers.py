import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.utils import timezone
from authentication.models import UserModel
from .models import MessageModel, GroupModel
from .serializers import MessageSerializer


class ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.user = self.scope.get('user')
        if not self.user or not self.user.is_authenticated:
            await self.close()
            return

        self.room_name = self.scope['url_route']['kwargs'].get('room_name')
        if not self.room_name:
            await self.close()
            return

        self.room_group_name = self.room_name

        await self.channel_layer.group_add(
            f"user_{self.user.id}",
            self.channel_name
        )

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.update_user_status(True)
        await self.accept()

    async def disconnect(self, close_code):
        if self.user and self.user.is_authenticated:
            await self.channel_layer.group_discard(
                f"user_{self.user.id}",
                self.channel_name
            )

            await self.channel_layer.group_discard(
                self.room_group_name,
                self.channel_name
            )

            await self.update_user_status(False)

    async def receive(self, text_data=None, bytes_data=None):
        if not text_data:
            return

        try:
            data = json.loads(text_data)
        except json.JSONDecodeError:
            await self.send(text_data=json.dumps({
                "type": "error",
                "message": "Invalid JSON"
            }))
            return

        msg_type = data.get("type")

        if msg_type == "message":
            await self.handle_message(data)
        elif msg_type == "typing":
            await self.handle_typing(data)
        elif msg_type == "call":
            await self.handle_call(data)

    async def handle_message(self, data):
        receiver_id = data.get("receiver_id")
        content = data.get("content")

        if not content or not receiver_id:
            await self.send(text_data=json.dumps({
                "type": "error",
                "message": "Missing receiver_id or content"
            }))
            return

        try:
            message = await self.create_message(
                sender=self.user,
                receiver_id=receiver_id,
                content=content,
                message_type=data.get("message_type", "text")
            )
            message_data = await self.serialize_message(message)

            await self.channel_layer.group_send(
                f"user_{receiver_id}",
                {
                    "type": "chat_message",
                    "message": message_data
                }
            )

            await self.send(text_data=json.dumps({
                "type": "message_sent",
                "message": message_data
            }))

        except Exception as e:
            await self.send(text_data=json.dumps({
                "type": "error",
                "message": f"Failed to send message: {str(e)}"
            }))

    async def handle_typing(self, data):
        receiver_id = data.get("receiver_id")
        is_typing = data.get("is_typing", False)

        if not receiver_id:
            return

        await self.channel_layer.group_send(
            f"user_{receiver_id}",
            {
                "type": "typing_indicator",
                "user_id": str(self.user.id),
                "username": self.user.username,
                "is_typing": is_typing
            }
        )

    async def handle_call(self, data):
        receiver_id = data.get("receiver_id")
        call_type = data.get("call_type")
        signal_data = data.get("signal_data")

        if not receiver_id:
            return

        await self.channel_layer.group_send(
            f"user_{receiver_id}",
            {
                "type": "call_signal",
                "call_type": call_type,
                "signal_data": signal_data,
                "sender_id": str(self.user.id),
                "sender_username": self.user.username
            }
        )

    async def chat_message(self, event):
        await self.send(text_data=json.dumps({
            "type": "message",
            "message": event["message"]
        }))

    async def typing_indicator(self, event):
        await self.send(text_data=json.dumps({
            "type": "typing",
            "user_id": event["user_id"],
            "username": event["username"],
            "is_typing": event["is_typing"]
        }))

    async def call_signal(self, event):
        await self.send(text_data=json.dumps({
            "type": "call",
            "call_type": event["call_type"],
            "signal_data": event["signal_data"],
            "sender_id": event["sender_id"],
            "sender_username": event["sender_username"]
        }))

    @database_sync_to_async
    def create_message(self, sender, receiver_id, content, message_type="text"):
        receiver = UserModel.objects.get(id=receiver_id)
        return MessageModel.objects.create(
            sender=sender,
            receiver=receiver,
            content=content,
            message_type=message_type
        )

    @database_sync_to_async
    def serialize_message(self, message):
        from .serializers import MessageSerializer  # Import your serializer

        serializer = MessageSerializer(message)
        return serializer.data

    @database_sync_to_async
    def update_user_status(self, online):
        self.user.online = online
        self.user.last_seen = timezone.now()
        self.user.save(update_fields=["online", "last_seen"])


class GroupConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.user = self.scope.get('user')
        self.group_id = self.scope['url_route']['kwargs'].get("group_id")

        if not self.user or not self.user.is_authenticated or not self.group_id:
            await self.close()
            return

        await self.channel_layer.group_add(
            f"group_{self.group_id}",
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            f"group_{self.group_id}",
            self.channel_name
        )

    async def receive(self, text_data=None, bytes_data=None):
        if not text_data:
            return

        try:
            data = json.loads(text_data)
        except json.JSONDecodeError:
            await self.send(text_data=json.dumps({"type": "error", "message": "Invalid JSON"}))
            return

        if data.get("type") == "group_message":
            await self.handle_group_message(data)

    async def handle_group_message(self, data):
        content = data.get("content")
        if not content:
            await self.send(text_data=json.dumps({"type": "error", "message": "Missing content"}))
            return

        try:
            message = await self.create_group_message(
                sender=self.user,
                group_id=self.group_id,
                content=content,
                message_type=data.get("message_type", "text")
            )

            message_data = await self.serialize_message(message)

            await self.channel_layer.group_send(
                f"group_{self.group_id}",
                {
                    "type": "group_message",
                    "message": message_data
                }
            )
        except GroupModel.DoesNotExist:
            await self.send(text_data=json.dumps({"type": "error", "message": "Group not found"}))
        except Exception as e:
            await self.send(text_data=json.dumps({"type": "error", "message": str(e)}))

    async def group_message(self, event):
        await self.send(text_data=json.dumps({
            "type": "group_message",
            "message": event["message"]
        }))

    @database_sync_to_async
    def create_group_message(self, sender, group_id, content, message_type="text"):
        group = GroupModel.objects.get(id=group_id)
        return MessageModel.objects.create(
            sender=sender,
            group=group,
            content=content,
            message_type=message_type
        )

    @database_sync_to_async
    def serialize_message(self, message):
        serializer = MessageSerializer(message)
        return serializer.data
