from django.urls import path
from chat.views import GroupViewSet, ChatViewSet, GlobalSearchViewSet, MessageViewSet
from chat.ai_views import AIChatViewSet

app_name = "chat"

urlpatterns = [
    # Groups
    path("groups/", GroupViewSet.as_view({"get": "list", "post": "create"}), name="group-list"),
    path("groups/search/", GroupViewSet.as_view({"get": "search", }), name="group-search", ),
    path("groups/<uuid:pk>/", GroupViewSet.as_view({"get": "retrieve"}), name="group-detail"),
    path("groups/<uuid:pk>/join/", GroupViewSet.as_view({"post": "join"}), name="group-join"),
    path("groups/<uuid:pk>/add-member/", GroupViewSet.as_view({"post": "add_member"}), name="group-add-member"),
    path("groups/<uuid:pk>/messages/", GroupViewSet.as_view({"get": "messages"}), name="group-messages"),
    path("groups/<uuid:pk>/send/", GroupViewSet.as_view({"post": "send_message"}), name="group-send"),
    # Chats
    path("chats/", ChatViewSet.as_view({"get": "list", "post": "create"})),
    path("chats/<uuid:pk>/", ChatViewSet.as_view({"get": "retrieve"})),
    path("chats/<uuid:pk>/messages/", ChatViewSet.as_view({"get": "messages"})),
    path("chats/<uuid:pk>/send/", ChatViewSet.as_view({"post": "send_message"})),
    
    # AI
    path("ai/chat/", AIChatViewSet.as_view({"post": "chat"}), name="ai-chat"),
    path("ai/search/", AIChatViewSet.as_view({"post": "search"}), name="ai-search"),
    path("ai/improve/", AIChatViewSet.as_view({"post": "improve"}), name="ai-improve"),
    
    # Global Search
    path("search/", GlobalSearchViewSet.as_view({"get": "search"}), name="global-search"),
    
    # Messages
    path("messages/<uuid:pk>/", MessageViewSet.as_view({"delete": "destroy"}), name="message-detail"),
]
