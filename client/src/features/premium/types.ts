export type Presence = "online" | "away" | "offline";

export interface UserIdentity {
  id: string;
  name: string;
  avatarUrl: string;
  presence: Presence;
}

export interface MessageReaction {
  emoji: string;
  count: number;
  reactedByMe: boolean;
}

export type MessageKind = "text" | "voice" | "file";

export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  kind: MessageKind;
  text: string;
  createdAt: string;
  voiceSeconds?: number;
  fileName?: string;
  reactions: MessageReaction[];
}

export interface ChatThread {
  id: string;
  title: string;
  subtitle: string;
  unreadCount: number;
  isPinned: boolean;
  isMuted: boolean;
  participants: UserIdentity[];
}

export type ParticipantRole = "host" | "co-host" | "participant";

export interface LiveParticipant {
  id: string;
  name: string;
  avatarUrl: string;
  role: ParticipantRole;
  isMuted: boolean;
  isCameraOn: boolean;
  isHandRaised: boolean;
}

export interface StreamVideo {
  id: string;
  title: string;
  creator: string;
  posterUrl: string;
  sourceUrl: string;
  isLive: boolean;
  likes: number;
  commentsCount: number;
  tags: string[];
}

export interface StreamComment {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}
