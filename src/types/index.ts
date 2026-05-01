// ============================================
// Honey — Social Communication Platform Types
// ============================================

// ---- User Types ----
export interface User {
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatar?: string;
  bio?: string;
  status: 'online' | 'offline' | 'away' | 'busy' | 'invisible';
  role: 'user' | 'moderator' | 'admin' | 'premium';
  isVerified: boolean;
  isPremium: boolean;
  followers: number;
  following: number;
  postsCount: number;
  joinedAt: string;
  lastSeen?: string;
  settings: UserSettings;
  profile?: Profile;
}

export interface UserSettings {
  theme: 'dark' | 'light' | 'system';
  language: string;
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  appearance: AppearanceSettings;
}

export interface NotificationSettings {
  pushEnabled: boolean;
  emailEnabled: boolean;
  soundEnabled: boolean;
  messagePreview: boolean;
  groupNotifications: boolean;
  liveNotifications: boolean;
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'friends' | 'private';
  onlineStatus: boolean;
  readReceipts: boolean;
  typingIndicator: boolean;
  lastSeen: boolean;
}

export interface AppearanceSettings {
  fontSize: 'small' | 'medium' | 'large';
  compactMode: boolean;
  animations: boolean;
}

export interface Profile {
  bio: string;
  location?: string;
  website?: string;
  birthday?: string;
  gender?: string;
  interests: string[];
  coverPhoto?: string;
  socialLinks: SocialLinks;
}

export interface SocialLinks {
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  github?: string;
  youtube?: string;
}

// ---- Chat Types ----
export type ChatType = 'private' | 'group' | 'channel';

export interface Chat {
  id: string;
  type: ChatType;
  name?: string;
  avatar?: string;
  description?: string;
  participants: ChatParticipant[];
  lastMessage?: Message;
  unreadCount: number;
  isPinned: boolean;
  isMuted: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  // Group/Channel specific
  admins?: string[];
  memberCount?: number;
  isPrivate?: boolean;
  category?: string;
}

export interface ChatParticipant {
  userId: string;
  role: 'member' | 'admin' | 'moderator' | 'owner';
  joinedAt: string;
  lastReadAt?: string;
  isMuted: boolean;
  nickname?: string;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  type: 'text' | 'image' | 'video' | 'audio' | 'file' | 'voice' | 'system' | 'sticker' | 'gif';
  status: 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
  replyTo?: string;
  editedAt?: string;
  deletedAt?: string;
  reactions: MessageReaction[];
  attachments: Attachment[];
  mentions: string[];
  createdAt: string;
}

export interface MessageReaction {
  emoji: string;
  userIds: string[];
}

export interface Attachment {
  id: string;
  type: 'image' | 'video' | 'audio' | 'file';
  url: string;
  name: string;
  size: number;
  mimeType: string;
  width?: number;
  height?: number;
  duration?: number;
  thumbnailUrl?: string;
}

// ---- Group Types ----
export interface Group {
  id: string;
  name: string;
  description: string;
  avatar?: string;
  coverPhoto?: string;
  category: string;
  members: GroupMember[];
  admins: string[];
  createdBy: string;
  memberCount: number;
  isPrivate: boolean;
  createdAt: string;
  settings: GroupSettings;
}

export interface GroupMember {
  userId: string;
  role: 'member' | 'admin' | 'moderator' | 'owner';
  joinedAt: string;
}

export interface GroupSettings {
  maxMembers: number;
  allowInvites: boolean;
  requireApproval: boolean;
  onlyAdminsPost: boolean;
}

// ---- Channel Types ----
export interface Channel {
  id: string;
  name: string;
  description: string;
  avatar?: string;
  coverPhoto?: string;
  category: string;
  subscribers: number;
  createdBy: string;
  isVerified: boolean;
  isPrivate: boolean;
  createdAt: string;
  settings: ChannelSettings;
}

export interface ChannelSettings {
  autoSubscribe: boolean;
  allowComments: boolean;
  contentLanguage: string;
  nsfw: boolean;
}

// ---- Post & Feed Types ----
export type PostType = 'text' | 'image' | 'video' | 'poll' | 'reel' | 'article' | 'shared';
export type PostVisibility = 'public' | 'friends' | 'private';

export interface Post {
  id: string;
  authorId: string;
  author?: User;
  content: string;
  type: PostType;
  visibility: PostVisibility;
  media: MediaItem[];
  hashtags: string[];
  mentions: string[];
  location?: string;
  taggedUsers: string[];
  likes: number;
  comments: Comment[];
  commentCount: number;
  shares: number;
  isLiked: boolean;
  isShared: boolean;
  isBookmarked: boolean;
  isPinned: boolean;
  createdAt: string;
  editedAt?: string;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  author?: User;
  content: string;
  likes: number;
  isLiked: boolean;
  replyTo?: string;
  replies: Comment[];
  createdAt: string;
}

// ---- Story Types ----
export interface Story {
  id: string;
  authorId: string;
  author?: User;
  media: MediaItem;
  type: 'image' | 'video';
  caption?: string;
  isViewed: boolean;
  viewers: StoryViewer[];
  viewerCount: number;
  createdAt: string;
  expiresAt: string;
}

export interface StoryViewer {
  userId: string;
  viewedAt: string;
}

export interface StoryGroup {
  userId: string;
  user?: User;
  stories: Story[];
  hasUnviewed: boolean;
  latestStory: Story;
}

// ---- Reel Types ----
export interface Reel {
  id: string;
  authorId: string;
  author?: User;
  video: MediaItem;
  caption: string;
  audioTrack?: string;
  hashtags: string[];
  likes: number;
  comments: Comment[];
  commentCount: number;
  shares: number;
  isLiked: boolean;
  createdAt: string;
}

// ---- Video & Stream Types ----
export interface Video {
  id: string;
  title: string;
  description: string;
  authorId: string;
  author?: User;
  url: string;
  thumbnailUrl: string;
  duration: number;
  views: number;
  likes: number;
  dislikes: number;
  comments: Comment[];
  commentCount: number;
  isLiked: boolean;
  isDisliked: boolean;
  isBookmarked: boolean;
  category: string;
  tags: string[];
  createdAt: string;
}

export interface Stream {
  id: string;
  title: string;
  description: string;
  streamerId: string;
  streamer?: User;
  thumbnailUrl: string;
  categoryId: string;
  category: string;
  tags: string[];
  viewers: number;
  peakViewers: number;
  isLive: boolean;
  isRecorded: boolean;
  startedAt: string;
  endedAt?: string;
  duration?: number;
}

// ---- Meeting Types ----
export interface Meeting {
  id: string;
  title: string;
  description?: string;
  hostId: string;
  host?: User;
  participants: MeetingParticipant[];
  scheduledAt: string;
  duration: number; // in minutes
  status: 'scheduled' | 'in-progress' | 'ended' | 'cancelled';
  meetingLink: string;
  type: 'video' | 'audio' | 'group' | 'webinar';
  isMuted: boolean;
  isRecording: boolean;
  maxParticipants: number;
  createdAt: string;
}

export interface MeetingParticipant {
  userId: string;
  role: 'host' | 'co-host' | 'participant';
  joinedAt?: string;
  leftAt?: string;
  isMuted: boolean;
  isVideoOn: boolean;
  isScreenSharing: boolean;
}

// ---- Notification Types ----
export type NotificationType =
  | 'like'
  | 'comment'
  | 'follow'
  | 'message'
  | 'mention'
  | 'group_invite'
  | 'meeting'
  | 'stream'
  | 'system'
  | 'birthday'
  | 'achievement';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  fromUserId: string;
  fromUser?: User;
  referenceId?: string;
  referenceType?: string;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
  icon?: string;
}

// ---- File & Media Types ----
export interface FileItem {
  id: string;
  name: string;
  type: 'image' | 'video' | 'audio' | 'document' | 'archive' | 'other';
  size: number;
  url: string;
  mimeType: string;
  uploadedBy: string;
  uploadedAt: string;
  thumbnailUrl?: string;
  width?: number;
  height?: number;
  duration?: number;
  folder?: string;
}

export interface MediaItem {
  id: string;
  type: 'image' | 'video' | 'audio' | 'gif';
  url: string;
  thumbnailUrl?: string;
  width?: number;
  height?: number;
  duration?: number;
  alt?: string;
  size?: number;
}

// ---- Search Types ----
export interface SearchResult {
  users: User[];
  posts: Post[];
  videos: Video[];
  channels: Channel[];
  groups: Group[];
  hashtags: string[];
}

export interface SearchFilters {
  type: 'all' | 'users' | 'posts' | 'videos' | 'channels' | 'groups';
  sortBy: 'relevance' | 'recent' | 'popular';
  category?: string;
}

// ---- Common Types ----
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: Pagination;
}

export interface WebSocketEvent {
  type: string;
  payload: unknown;
  timestamp: string;
}

// ---- Tab Types ----
export type AppTab = 'home' | 'hub' | 'meet' | 'streams' | 'feed' | 'explore' | 'library' | 'files' | 'profile' | 'settings' | 'notifications';

// ---- Settings Types ----
export interface AppSettings {
  theme: 'dark' | 'light' | 'system';
  language: string;
  fontSize: 'small' | 'medium' | 'large';
  compactMode: boolean;
  animations: boolean;
  autoPlayVideos: boolean;
  hapticFeedback: boolean;
}
