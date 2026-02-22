from django.db import models
from authentication.models import UserModel
from core.base import BaseModel

class LiveSessionModel(BaseModel):
    class Status(models.TextChoices):
        SCHEDULED = "scheduled", "Scheduled"
        LIVE = "live", "Live"
        FINISHED = "finished", "Finished"

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    streamer = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name="streamed_sessions")
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.SCHEDULED)
    cover = models.ImageField(upload_to="live/covers/", null=True, blank=True)
    started_at = models.DateTimeField(null=True, blank=True)
    ended_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = "live_session"
        verbose_name = "Live Session"
        verbose_name_plural = "Live Sessions"

    def __str__(self):
        return f"{self.title} ({self.status})"

class LiveParticipantModel(BaseModel):
    class Status(models.TextChoices):
        PENDING = "pending", "Pending"
        APPROVED = "approved", "Approved"
        REJECTED = "rejected", "Rejected"

    session = models.ForeignKey(LiveSessionModel, on_delete=models.CASCADE, related_name="participants")
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name="live_participations")
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    is_muted = models.BooleanField(default=False)
    is_camera_off = models.BooleanField(default=False)

    class Meta:
        db_table = "live_participant"
        unique_together = ("session", "user")

class LiveChatMessageModel(BaseModel):
    session = models.ForeignKey(LiveSessionModel, on_delete=models.CASCADE, related_name="chat_messages")
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    text = models.TextField()

    class Meta:
        db_table = "live_chat_message"
        ordering = ["created_at"]
