from django.db.models import Q
from drf_yasg import openapi
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from .models import GroupModel, MessageModel, ChatModel
from authentication.models import UserModel
from authentication.serializers import UserSerializer
from .serializers import GroupSerializer, MessageSerializer, AddMemberSerializer, ChatSerializer, SendMessageSerializer


class GroupViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Search groups by name",
        operation_description="Search public groups by name (Telegram-style search).",
        manual_parameters=[],
        responses={200: GroupSerializer(many=True)},
        tags=["Groups"]
    )
    def search(self, request):
        search_query = request.query_params.get("search", "").strip()

        if not search_query:
            return Response([], status=status.HTTP_200_OK)

        groups = GroupModel.objects.filter(
            is_public=True,
            name__icontains=search_query
        )

        serializer = GroupSerializer(groups, many=True, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_summary="List groups current user belongs to",
        operation_description="Returns all groups where the current user is a member.",
        responses={200: GroupSerializer(many=True)},
        tags=["Groups"]
    )
    def list(self, request):
        groups = GroupModel.objects.filter(members=request.user)
        serializer = GroupSerializer(groups, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_summary="Retrieve a single group by ID and current user",
        operation_description="Get details of a group using its ID and user.",
        responses={
            200: GroupSerializer(),
            404: "Group not found"
        },
        tags=["Groups"]
    )
    def retrieve(self, request, pk=None):
        group = GroupModel.objects.filter(id=pk, members=request.user).first()
        if not group:
            return Response({'message': 'Group not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = GroupSerializer(group, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_summary="Create a new group",
        operation_description="Create a new group. Admin will be the current user.",
        request_body=GroupSerializer,
        responses={
            201: GroupSerializer(),
            400: "Invalid input data"
        },
        tags=["Groups"]
    )
    def create(self, request):
        print(f"Group create request from {request.user.username}: {request.data}")
        try:
            serializer = GroupSerializer(data=request.data, context={'request': request})
            if not serializer.is_valid():
                print(f"Group creation invalid: {serializer.errors}")
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            group = serializer.save(admin=request.user)
            group.members.add(request.user) # Add admin as first member
            print(f"Group created: {group.name}")
            return Response(GroupSerializer(group, context={'request': request}).data, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(f"Group creation exception: {str(e)}")
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @swagger_auto_schema(
        operation_summary="Join public group",
        operation_description="Join a group if it is public. Returns 400 if group is private.",
        responses={
            200: "Joined successfully",
            400: "Group is private",
            404: "Group not found"
        },
        tags=["Groups"]
    )
    def join(self, request, pk=None):
        group = GroupModel.objects.filter(id=pk).first()
        if not group:
            return Response({'message': 'Group not found'}, status=status.HTTP_404_NOT_FOUND)

        if group.is_public:
            group.members.add(request.user)
            return Response({'status': 'joined'}, status=status.HTTP_200_OK)
        return Response({'error': 'Can not joined'}, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_summary="Add member to group (admin only)",
        operation_description="Admin can add a new user to the group by providing user_id in the request body.",
        request_body=AddMemberSerializer,
        responses={
            200: "Added",
            400: "user_id required",
            403: "Not admin",
            404: "User or group not found"
        },
        tags=["Groups"]
    )
    def add_member(self, request, pk=None):
        group = GroupModel.objects.filter(id=pk).first()
        if not group:
            return Response({'message': 'Group not found'}, status=status.HTTP_404_NOT_FOUND)

        if group.admin != request.user:
            return Response({'error': 'Not admin'}, status=status.HTTP_403_FORBIDDEN)

        user_id = request.data.get('user_id')
        if not user_id:
            return Response({'error': 'user_id required'}, status=status.HTTP_400_BAD_REQUEST)

        user = UserModel.objects.filter(id=user_id).first()
        if not user:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        group.members.add(user)
        return Response({'status': 'added'}, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_summary="Get all messages in a group",
        operation_description="Returns all messages of a specific group ordered by creation date.",
        responses={
            200: MessageSerializer(many=True),
            404: "Group not found"
        },
        tags=["Groups"]
    )
    def messages(self, request, pk=None):
        group = GroupModel.objects.filter(id=pk).first()
        if not group:
            return Response({'message': 'Group not found'}, status=status.HTTP_404_NOT_FOUND)

        messages = MessageModel.objects.filter(group=group).select_related('sender').order_by('created_at')
        serializer = MessageSerializer(messages, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_summary="Send message to group",
        operation_description="Send a message to a group or channel. If it is a channel, only the admin can post.",
        request_body=SendMessageSerializer,
        responses={201: MessageSerializer()},
        tags=["Groups"]
    )
    @action(detail=True, methods=["post"], url_path="send")
    def send_message(self, request, pk=None):
        group = GroupModel.objects.filter(id=pk).first()
        if not group:
            return Response({'message': 'Group not found'}, status=status.HTTP_404_NOT_FOUND)

        # Check if user is a member or admin
        if not group.members.filter(id=request.user.id).exists() and group.admin != request.user:
            return Response({'error': 'Not a member of this group'}, status=status.HTTP_403_FORBIDDEN)

        # Channel permissions
        if group.group_type == 'channel' and group.admin != request.user:
            return Response({'error': 'Only admins can post in channels'}, status=status.HTTP_403_FORBIDDEN)

        data = request.data.copy() if hasattr(request.data, 'copy') else dict(request.data)

        if 'file' in request.FILES:
            file = request.FILES['file']
            content_type = file.content_type or ''
            if content_type.startswith('image/'):
                data['message_type'] = 'image'
            else:
                data['message_type'] = 'file'
            if not data.get('content'):
                data['content'] = file.name

        serializer = SendMessageSerializer(data=data)
        serializer.is_valid(raise_exception=True)

        file_obj = request.FILES.get('file')
        message = serializer.save(
            sender=request.user,
            group=group,
            **({'file': file_obj} if file_obj else {})
        )

        return Response(
            MessageSerializer(message, context={"request": request}).data,
            status=status.HTTP_201_CREATED
        )


class ChatViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    @swagger_auto_schema(
        operation_summary="List user chats",
        operation_description="Returns all chats where the current user participates.",
        responses={200: ChatSerializer(many=True)},
        tags=["Chats"]
    )
    def list(self, request):
        chats = ChatModel.objects.filter(
            Q(user1=request.user) | Q(user2=request.user)
        ).select_related("last_message").order_by("-updated_at")

        serializer = ChatSerializer(chats, many=True, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_summary="Create or get chat",
        operation_description="Create a private chat between two users if it does not exist.",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                "user_id": openapi.Schema(type=openapi.TYPE_INTEGER)
            },
            required=["user_id"]
        ),
        tags=["Chats"]
    )
    def create(self, request):
        user_id = request.data.get("user_id")

        if not user_id:
            return Response({"error": "user_id required"}, status=status.HTTP_400_BAD_REQUEST)

        other_user = UserModel.objects.filter(id=user_id).first()
        if not other_user:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        user1, user2 = sorted([request.user, other_user], key=lambda u: u.id)

        chat, created = ChatModel.objects.get_or_create(
            user1=user1,
            user2=user2
        )

        serializer = ChatSerializer(chat, context={"request": request})
        return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_summary="Retrieve chat detail",
        operation_description="Get chat info by ID if current user is participant.",
        responses={200: ChatSerializer(), 404: "Chat not found"},
        tags=["Chats"]
    )
    def retrieve(self, request, pk=None):
        chat = ChatModel.objects.filter(
            Q(id=pk),
            Q(user1=request.user) | Q(user2=request.user)
        ).first()

        if not chat:
            return Response({"message": "Chat not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ChatSerializer(chat, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_summary="Get chat messages",
        operation_description="Returns all messages in a chat.",
        responses={200: MessageSerializer(many=True)},
        tags=["Chats"]
    )
    def messages(self, request, pk=None):
        chat = ChatModel.objects.filter(
            Q(id=pk),
            Q(user1=request.user) | Q(user2=request.user)
        ).first()

        if not chat:
            return Response({"message": "Chat not found"}, status=status.HTTP_404_NOT_FOUND)

        messages = MessageModel.objects.filter(
            receiver__in=[chat.user1, chat.user2],
            sender__in=[chat.user1, chat.user2]
        ).select_related('sender', 'receiver').order_by("created_at")

        serializer = MessageSerializer(messages, many=True, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_summary="Send message",
        operation_description="Send a message in a private chat.",
        request_body=SendMessageSerializer,
        responses={201: MessageSerializer()},
        tags=["Chats"]
    )
    def send_message(self, request, pk=None):
        chat = ChatModel.objects.filter(
            Q(id=pk),
            Q(user1=request.user) | Q(user2=request.user)
        ).first()

        if not chat:
            return Response(
                {"message": "Chat not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        # JSON yoki multipart/form-data ikkalasini ham qabul qiladi
        data = request.data.copy() if hasattr(request.data, 'copy') else dict(request.data)

        # file yuborilgan bo'lsa message_type ni avtomatik belgilaymiz
        if 'file' in request.FILES:
            file = request.FILES['file']
            content_type = file.content_type or ''
            if content_type.startswith('image/'):
                data['message_type'] = 'image'
            else:
                data['message_type'] = 'file'
            if not data.get('content'):
                data['content'] = file.name

        serializer = SendMessageSerializer(data=data)
        serializer.is_valid(raise_exception=True)

        receiver = chat.user2 if chat.user1 == request.user else chat.user1

        # Faylni alohida saqlash
        file_obj = request.FILES.get('file')
        message = serializer.save(
            sender=request.user,
            receiver=receiver,
            **({'file': file_obj} if file_obj else {})
        )

        chat.last_message = message
        chat.save(update_fields=["last_message", "updated_at"])

        return Response(
            MessageSerializer(message, context={"request": request}).data,
            status=status.HTTP_201_CREATED
        )


class GlobalSearchViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Global search for users and groups",
        operation_description="Search for users and public groups by username/name.",
        manual_parameters=[
            openapi.Parameter('search', openapi.IN_QUERY, type=openapi.TYPE_STRING, description="Search term")
        ],
        responses={
            200: openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    "users": openapi.Schema(type=openapi.TYPE_ARRAY, items=openapi.Schema(type=openapi.TYPE_OBJECT)),
                    "groups": openapi.Schema(type=openapi.TYPE_ARRAY, items=openapi.Schema(type=openapi.TYPE_OBJECT)),
                }
            )
        },
        tags=["Search"]
    )
    def search(self, request):
        query = request.query_params.get("search", "").strip()
        if not query:
            return Response({"users": [], "groups": []}, status=status.HTTP_200_OK)

        # Handle @username search
        search_term = query[1:] if query.startswith("@") else query

        # Search users
        users = UserModel.objects.filter(
            Q(username__icontains=search_term) |
            Q(email__icontains=search_term)
        ).exclude(id=request.user.id).filter(is_active=True)[:20]

        # Search public groups
        groups = GroupModel.objects.filter(
            is_public=True,
            name__icontains=search_term
        )[:20]

        return Response({
            "users": UserSerializer(users, many=True).data,
            "groups": GroupSerializer(groups, many=True, context={'request': request}).data
        }, status=status.HTTP_200_OK)


class MessageViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Delete a message",
        operation_description="Delete a message if you are the sender.",
        responses={204: "Deleted", 403: "Not your message", 404: "Message not found"},
        tags=["Messages"]
    )
    def destroy(self, request, pk=None):
        message = MessageModel.objects.filter(id=pk).first()
        if not message:
            return Response({"message": "Message not found"}, status=status.HTTP_404_NOT_FOUND)
        
        # Only sender or group admin can delete
        if message.sender != request.user:
            if message.group and message.group.admin == request.user:
                pass # Admin can delete
            else:
                return Response({"error": "You cannot delete this message"}, status=status.HTTP_403_FORBIDDEN)
        
        message.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
