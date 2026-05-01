// =============================================================================
// Honey — Socket.IO Typed Event Interfaces
// =============================================================================
// Strictly typed bidirectional event map. No `any`.
// =============================================================================

// ---- Payload Interfaces ----------------------------------------------------

export interface MessageAttachmentPayload {
  id: string;
  type: string;
  fileName: string;
  fileSize: number;
  thumbnailUrl: string | null;
}

export interface MessagePayload {
  id: string;
  conversationId: string;
  senderId: string;
  content: string | null;
  type: string;
  replyToId: string | null;
  isEdited: boolean;
  createdAt: string;
  sender?: {
    id: string;
    username: string;
    avatarUrl: string | null;
  };
  attachments?: MessageAttachmentPayload[];
}

export interface ReactionPayload {
  id: string;
  userId: string;
  username: string;
  emoji: string;
}

export interface MeetingParticipantPayload {
  userId: string;
  username: string;
  avatarUrl: string | null;
  role: string;
}

export interface StreamCommentPayload {
  id: string;
  userId: string;
  username: string;
  content: string;
  createdAt: string;
}

export interface NotificationPayload {
  id: string;
  type: string;
  title: string;
  body?: string;
  payload?: Record<string, unknown>;
  createdAt: string;
}

// ---- Auth Data --------------------------------------------------------------

export interface AuthSuccessData {
  userId: string;
}

export interface AuthErrorData {
  message: string;
}

// ---- Presence Data ----------------------------------------------------------

export interface PresenceUpdateData {
  status: 'online' | 'away' | 'busy';
}

export interface PresenceStatusData {
  userId: string;
  lastSeen: string;
}

// ---- Message Data -----------------------------------------------------------

export interface MessageSendData {
  conversationId: string;
  content: string;
  type: string;
  replyToId?: string;
  idempotencyKey?: string;
}

export interface MessageEditData {
  messageId: string;
  content: string;
}

export interface MessageDeleteData {
  messageId: string;
}

export interface MessageReactData {
  messageId: string;
  emoji: string;
}

export interface TypingData {
  conversationId: string;
}

export interface MessageReadData {
  conversationId: string;
  messageId: string;
}

export interface MessageDeletedData {
  messageId: string;
  conversationId: string;
  deletedBy: string;
}

export interface TypingIndicatorData {
  conversationId: string;
  userId: string;
  isTyping: boolean;
}

export interface MessageReadReceiptData {
  conversationId: string;
  userId: string;
  lastReadMessageId: string;
}

export interface MessageDeliveredData {
  conversationId: string;
  messageId: string;
  deliveredAt: string;
}

export interface ReactionActionData {
  messageId: string;
  userId: string;
  emoji: string;
}

// ---- Meeting / WebRTC Data --------------------------------------------------

export interface MeetingJoinData {
  meetingId: string;
}

export interface MeetingLeaveData {
  meetingId: string;
}

export interface WebRTCRelayData {
  meetingId: string;
  targetUserId: string;
  sdp: string;
}

export interface IceCandidateData {
  meetingId: string;
  targetUserId: string;
  candidate: RTCIceCandidateInit;
}

export interface MeetingStateData {
  meetingId: string;
  userId: string;
  isMuted: boolean;
  isCameraOff: boolean;
  isScreenSharing: boolean;
}

export interface MeetingHandData {
  meetingId: string;
  userId: string;
}

export interface MeetingToggleData {
  meetingId: string;
  isMuted: boolean;
}

export interface MeetingCameraData {
  meetingId: string;
  isCameraOff: boolean;
}

export interface MeetingScreenShareData {
  meetingId: string;
  isSharing: boolean;
}

export interface MeetingChatSendData {
  meetingId: string;
  content: string;
}

export interface MeetingChatReceivedData {
  meetingId: string;
  userId: string;
  content: string;
  createdAt: string;
}

export interface MeetingHostActionData {
  meetingId: string;
  targetUserId: string;
  action: 'kick' | 'mute' | 'promote';
}

export interface MeetingHostActionResultData {
  meetingId: string;
  targetUserId: string;
  action: string;
}

export interface MeetingEndedData {
  meetingId: string;
  reason: string;
}

export interface ParticipantLeftData {
  meetingId: string;
  userId: string;
}

// ---- Stream Data ------------------------------------------------------------

export interface StreamJoinData {
  streamId: string;
}

export interface StreamLeaveData {
  streamId: string;
}

export interface StreamCommentSendData {
  streamId: string;
  content: string;
}

export interface StreamReactData {
  streamId: string;
  type: string;
}

export interface StreamViewerCountData {
  streamId: string;
  count: number;
}

export interface StreamReactionUpdateData {
  streamId: string;
  type: string;
  count: number;
}

// ---- Error Data -------------------------------------------------------------

export interface SocketErrorData {
  event: string;
  message: string;
}

// ---- WebRTC Relay Event Data ------------------------------------------------

export interface WebRTCOfferReceivedData {
  fromUserId: string;
  sdp: string;
}

export interface WebRTCAnswerReceivedData {
  fromUserId: string;
  sdp: string;
}

export interface IceCandidateReceivedData {
  fromUserId: string;
  candidate: RTCIceCandidateInit;
}

export interface WebRTCRenegotiateReceivedData {
  fromUserId: string;
  sdp: string;
}

// ---- Client → Server Events -------------------------------------------------

export interface ClientToServerEvents {
  // Auth
  'auth:verify': (token: string, callback: (data: AuthSuccessData | AuthErrorData) => void) => void;

  // Presence
  'presence:update': (data: PresenceUpdateData) => void;

  // Conversations
  'conversation:join': (conversationId: string) => void;
  'conversation:leave': (conversationId: string) => void;

  // Messages
  'message:send': (data: MessageSendData) => void;
  'message:edit': (data: MessageEditData) => void;
  'message:delete': (data: MessageDeleteData) => void;
  'message:react': (data: MessageReactData) => void;
  'reaction:add': (data: MessageReactData) => void;
  'reaction:remove': (data: MessageReactData) => void;
  'typing:start': (data: TypingData) => void;
  'typing:stop': (data: TypingData) => void;
  'message:read': (data: MessageReadData) => void;

  // Calls / Meetings
  'meeting:join': (data: MeetingJoinData) => void;
  'meeting:leave': (data: MeetingLeaveData) => void;
  'webrtc:offer': (data: WebRTCRelayData) => void;
  'webrtc:answer': (data: WebRTCRelayData) => void;
  'webrtc:ice-candidate': (data: IceCandidateData) => void;
  'webrtc:renegotiate': (data: WebRTCRelayData) => void;
  'meeting:mute': (data: MeetingToggleData) => void;
  'meeting:camera': (data: MeetingCameraData) => void;
  'meeting:screen-share': (data: MeetingScreenShareData) => void;
  'meeting:raise-hand': (data: MeetingHandData) => void;
  'meeting:chat': (data: MeetingChatSendData) => void;
  'meeting:host-action': (data: MeetingHostActionData) => void;

  // Streams
  'stream:join': (data: StreamJoinData) => void;
  'stream:leave': (data: StreamLeaveData) => void;
  'stream:comment': (data: StreamCommentSendData) => void;
  'stream:react': (data: StreamReactData) => void;
}

// ---- Server → Client Events -------------------------------------------------

export interface ServerToClientEvents {
  // Auth
  'auth:success': (data: AuthSuccessData) => void;
  'auth:error': (data: AuthErrorData) => void;

  // Presence
  'presence:online': (data: PresenceStatusData) => void;
  'presence:offline': (data: PresenceStatusData) => void;

  // Messages
  'message:new': (data: MessagePayload) => void;
  'message:updated': (data: MessagePayload) => void;
  'message:edit': (data: MessagePayload) => void;
  'message:deleted': (data: MessageDeletedData) => void;
  'message:delete': (data: MessageDeletedData) => void;
  'message:delivered': (data: MessageDeliveredData) => void;
  'reaction:updated': (data: { messageId: string; reactions: ReactionPayload[] }) => void;
  'reaction:add': (data: ReactionActionData) => void;
  'reaction:remove': (data: ReactionActionData) => void;
  'typing:indicator': (data: TypingIndicatorData) => void;
  'typing:start': (data: TypingIndicatorData) => void;
  'typing:stop': (data: TypingIndicatorData) => void;
  'message:read': (data: MessageReadReceiptData) => void;

  // Calls
  'participant:joined': (data: MeetingParticipantPayload) => void;
  'participant:left': (data: ParticipantLeftData) => void;
  'webrtc:offer': (data: WebRTCOfferReceivedData) => void;
  'webrtc:answer': (data: WebRTCAnswerReceivedData) => void;
  'webrtc:ice-candidate': (data: IceCandidateReceivedData) => void;
  'webrtc:renegotiate': (data: WebRTCRenegotiateReceivedData) => void;
  'meeting:state': (data: MeetingStateData) => void;
  'meeting:hand': (data: MeetingHandData) => void;
  'meeting:host-action': (data: MeetingHostActionResultData) => void;
  'meeting:ended': (data: MeetingEndedData) => void;
  'meeting:chat': (data: MeetingChatReceivedData) => void;

  // Streams
  'stream:viewer-count': (data: StreamViewerCountData) => void;
  'stream:comment:new': (data: StreamCommentPayload) => void;
  'stream:comment:deleted': (data: { commentId: string }) => void;
  'stream:reaction:update': (data: StreamReactionUpdateData) => void;

  // Notifications
  'notification:new': (data: NotificationPayload) => void;

  // Errors
  'error': (data: SocketErrorData) => void;
}

// ---- Socket Data (attached to socket.data) ----------------------------------

export interface AuthenticatedSocketData {
  userId: string;
  username: string;
  connectedAt: number;
  activeMeetingId: string | null;
  activeStreamIds: Set<string>;
}

// ---- Typed Socket Type ------------------------------------------------------

import type { Socket } from 'socket.io';

export type HoneySocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  never,
  AuthenticatedSocketData
>;

// ---- Inter-server Events (for Redis adapter) --------------------------------

export interface InterServerEvents {
  ping: () => void;
}

// ---- Socket Server Type -----------------------------------------------------

import type { Server } from 'socket.io';

export type HoneyIOServer = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  AuthenticatedSocketData
>;
