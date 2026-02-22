from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import LiveSessionModel, LiveParticipantModel, LiveChatMessageModel
from .serializers import LiveSessionSerializer, LiveParticipantSerializer, LiveChatMessageSerializer
from django.utils import timezone

class LiveSessionViewSet(viewsets.ModelViewSet):
    serializer_class = LiveSessionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return LiveSessionModel.objects.exclude(status=LiveSessionModel.Status.FINISHED).order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save(streamer=self.request.user)

    @action(detail=True, methods=['post'])
    def join_request(self, request, pk=None):
        session = self.get_object()
        participant, created = LiveParticipantModel.objects.get_or_create(
            session=session,
            user=request.user
        )
        if not created:
             return Response({"detail": "Request already sent"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(LiveParticipantSerializer(participant).data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'], url_path='approve-participant/(?P<participant_id>[^/.]+)')
    def approve_participant(self, request, pk=None, participant_id=None):
        session = self.get_object()
        if session.streamer != request.user:
            return Response({"detail": "Only streamer can approve"}, status=status.HTTP_403_FORBIDDEN)
        
        participant = LiveParticipantModel.objects.filter(id=participant_id, session=session).first()
        if not participant:
            return Response({"detail": "Participant not found"}, status=status.HTTP_404_NOT_FOUND)
        
        participant.status = LiveParticipantModel.Status.APPROVED
        participant.save()
        return Response(LiveParticipantSerializer(participant).data)

    @action(detail=True, methods=['get'])
    def participants(self, request, pk=None):
        session = self.get_object()
        participants = session.participants.all()
        return Response(LiveParticipantSerializer(participants, many=True).data)

    @action(detail=True, methods=['post'])
    def send_message(self, request, pk=None):
        session = self.get_object()
        text = request.data.get('text')
        if not text:
            return Response({"detail": "Text is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        message = LiveChatMessageModel.objects.create(
            session=session,
            user=request.user,
            text=text
        )
        return Response(LiveChatMessageSerializer(message).data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['get'])
    def messages(self, request, pk=None):
        session = self.get_object()
        messages = session.chat_messages.all()[:100]
        return Response(LiveChatMessageSerializer(messages, many=True).data)

    @action(detail=True, methods=['post'])
    def start_stream(self, request, pk=None):
        session = self.get_object()
        if session.streamer != request.user:
            return Response({"detail": "Only streamer can start"}, status=status.HTTP_403_FORBIDDEN)
        session.status = LiveSessionModel.Status.LIVE
        session.started_at = timezone.now()
        session.save()
        return Response(LiveSessionSerializer(session).data)

    @action(detail=True, methods=['post'])
    def end_stream(self, request, pk=None):
        session = self.get_object()
        if session.streamer != request.user:
            return Response({"detail": "Only streamer can end"}, status=status.HTTP_403_FORBIDDEN)
        session.status = LiveSessionModel.Status.FINISHED
        session.ended_at = timezone.now()
        session.save()
        return Response(LiveSessionSerializer(session).data)
