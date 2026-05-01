import crypto from 'crypto';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { Router, type NextFunction, type Request, type Response } from 'express';
import { ConversationType, MessageType as PrismaMessageType, StreamType } from '@prisma/client';
import { prisma } from '../../../config/prisma';
import { authRequired, optionalAuth } from '../../../middleware';
import { callService } from '../../calls/services/call.service';
import { streamService } from '../../streams/services/stream.service';
import type { AuthenticatedRequest } from '../../../types';

type LegacyUserSource = {
  id: string;
  username: string;
  email: string;
  avatarUrl: string | null;
  bio: string | null;
  isVerified: boolean;
  isStaff: boolean;
  isSuperuser: boolean;
};

const USER_SELECT = {
  id: true,
  username: true,
  email: true,
  avatarUrl: true,
  bio: true,
  isVerified: true,
  isStaff: true,
  isSuperuser: true,
} as const;

const MESSAGE_INCLUDE = {
  sender: { select: USER_SELECT },
  reactions: { select: { emoji: true, userId: true } },
  replyTo: {
    select: {
      id: true,
      content: true,
      type: true,
      sender: { select: USER_SELECT },
    },
  },
} as const;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 },
});

const legacyVideoCategories = new Set<string>();

function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>,
) {
  return (req: Request, res: Response, next: NextFunction): void => {
    void fn(req, res, next).catch(next);
  };
}

function authUser(req: Request): AuthenticatedRequest['user'] {
  return (req as AuthenticatedRequest).user;
}

function toLegacyUser(user: LegacyUserSource | null) {
  if (!user) return null;
  return {
    id: user.id,
    username: user.username,
    name: user.username,
    email: user.email,
    avatar: user.avatarUrl,
    picture: user.avatarUrl,
    bio: user.bio,
    is_verified: user.isVerified,
    is_staff: user.isStaff,
    is_superuser: user.isSuperuser,
  };
}

function legacyMessageType(type: PrismaMessageType): string {
  const mapping: Record<PrismaMessageType, string> = {
    TEXT: 'text',
    IMAGE: 'image',
    VIDEO: 'video',
    AUDIO: 'audio',
    FILE: 'file',
    VOICE: 'voice',
    SYSTEM: 'system',
    LOCATION: 'location',
    CONTACT: 'contact',
  };
  return mapping[type] ?? 'text';
}

function prismaMessageType(raw: string | undefined, hasFile: boolean): PrismaMessageType {
  const value = (raw ?? '').trim().toLowerCase();
  if (!value && hasFile) return 'FILE';
  if (value === 'image') return 'IMAGE';
  if (value === 'video') return 'VIDEO';
  if (value === 'audio') return 'AUDIO';
  if (value === 'voice') return 'VOICE';
  if (value === 'file') return 'FILE';
  if (value === 'location') return 'LOCATION';
  if (value === 'contact') return 'CONTACT';
  return 'TEXT';
}

function saveUpload(file: Express.Multer.File, folder: string): string {
  const dir = path.resolve(process.cwd(), 'uploads', folder);
  fs.mkdirSync(dir, { recursive: true });
  const ext = path.extname(file.originalname || '').toLowerCase();
  const safeBase = (path.basename(file.originalname || 'file', ext).replace(/[^a-zA-Z0-9_.-]/g, '-') || 'file').slice(0, 80);
  const filename = `${Date.now()}-${crypto.randomUUID()}-${safeBase}${ext}`;
  fs.writeFileSync(path.join(dir, filename), file.buffer);
  return `/uploads/${folder}/${filename}`.replace(/\\/g, '/');
}

function groupReactions(reactions: Array<{ emoji: string; userId: string }>) {
  const grouped = new Map<string, { count: number; users: string[] }>();
  for (const reaction of reactions) {
    const current = grouped.get(reaction.emoji) ?? { count: 0, users: [] };
    current.count += 1;
    if (!current.users.includes(reaction.userId)) current.users.push(reaction.userId);
    grouped.set(reaction.emoji, current);
  }
  return Array.from(grouped.entries()).map(([emoji, value]) => ({
    emoji,
    count: value.count,
    users: value.users,
  }));
}

function toLegacyMessage(message: {
  id: string;
  content: string | null;
  type: PrismaMessageType;
  createdAt: Date;
  editedAt: Date | null;
  sender: LegacyUserSource;
  reactions: Array<{ emoji: string; userId: string }>;
  replyTo: {
    id: string;
    content: string | null;
    type: PrismaMessageType;
    sender: LegacyUserSource;
  } | null;
}) {
  const fileCandidate = message.content ?? '';
  const file =
    message.type !== 'TEXT' && message.type !== 'SYSTEM' && fileCandidate.startsWith('/uploads/')
      ? fileCandidate
      : null;

  return {
    id: message.id,
    content: message.content,
    sender: toLegacyUser(message.sender),
    created_at: message.createdAt,
    message_type: legacyMessageType(message.type),
    file,
    reply_to: message.replyTo
      ? {
          id: message.replyTo.id,
          content: message.replyTo.content,
          sender: toLegacyUser(message.replyTo.sender),
          message_type: legacyMessageType(message.replyTo.type),
        }
      : null,
    edited_at: message.editedAt,
    reactions: groupReactions(message.reactions),
    link_preview: null,
  };
}

async function requireMember(conversationId: string, userId: string) {
  const member = await prisma.conversationMember.findUnique({
    where: { userId_conversationId: { userId, conversationId } },
    select: { role: true },
  });
  if (!member) {
    const error = new Error('Forbidden');
    Object.assign(error, { status: 403, code: 'FORBIDDEN' });
    throw error;
  }
  return member;
}

function mapMeetingStatus(status: 'SCHEDULED' | 'ACTIVE' | 'ENDED' | 'CANCELLED') {
  if (status === 'SCHEDULED') return 'scheduled';
  if (status === 'ACTIVE') return 'live';
  return 'finished';
}

function mapParticipantStatus(status: 'WAITING' | 'APPROVED' | 'REJECTED' | 'LEFT') {
  if (status === 'WAITING') return 'pending';
  if (status === 'APPROVED') return 'approved';
  if (status === 'REJECTED') return 'rejected';
  return 'left';
}

function mapStreamSource(videoUrl: string | null): 'file' | 'youtube' | 'instagram' | 'external' {
  if (!videoUrl) return 'external';
  const lower = videoUrl.toLowerCase();
  if (lower.includes('youtube.com') || lower.includes('youtu.be')) return 'youtube';
  if (lower.includes('instagram.com')) return 'instagram';
  if (videoUrl.startsWith('/uploads/')) return 'file';
  return 'external';
}

const chatRouter = Router();
chatRouter.use(authRequired);

chatRouter.get('/chats/', asyncHandler(async (req, res) => {
  const me = authUser(req);
  const chats = await prisma.conversation.findMany({
    where: { type: ConversationType.PRIVATE, deletedAt: null, members: { some: { userId: me.id } } },
    orderBy: { updatedAt: 'desc' },
    include: {
      members: { include: { user: { select: USER_SELECT } } },
      messages: { where: { isDeleted: false }, orderBy: { createdAt: 'desc' }, take: 1, include: MESSAGE_INCLUDE },
    },
  });
  res.json(
    chats.map((chat) => ({
      id: chat.id,
      other_user: toLegacyUser(chat.members.find((m) => m.userId !== me.id)?.user ?? null),
      last_message: chat.messages[0] ? toLegacyMessage(chat.messages[0]) : null,
      updated_at: chat.updatedAt,
    })),
  );
}));

chatRouter.post('/chats/', asyncHandler(async (req, res) => {
  const me = authUser(req);
  const targetId = String(req.body?.user_id ?? '').trim();
  if (!targetId) {
    res.status(422).json({ detail: 'user_id is required' });
    return;
  }
  if (targetId === me.id) {
    res.status(422).json({ detail: 'Cannot start chat with yourself' });
    return;
  }

  const targetUser = await prisma.user.findUnique({
    where: { id: targetId },
    select: { id: true },
  });
  if (!targetUser) {
    res.status(404).json({ detail: 'User not found' });
    return;
  }

  const existing = await prisma.conversation.findFirst({
    where: {
      type: ConversationType.PRIVATE,
      deletedAt: null,
      AND: [
        { members: { some: { userId: me.id } } },
        { members: { some: { userId: targetId } } },
      ],
    },
    include: { members: { select: { userId: true } } },
  });

  let conversationId = existing && existing.members.length === 2 ? existing.id : null;
  if (!conversationId) {
    const created = await prisma.conversation.create({
      data: {
        type: ConversationType.PRIVATE,
        createdBy: me.id,
        members: { create: [{ userId: me.id, role: 'MEMBER' }, { userId: targetId, role: 'MEMBER' }] },
      },
    });
    conversationId = created.id;
  }

  const chat = await prisma.conversation.findUnique({
    where: { id: conversationId },
    include: { members: { include: { user: { select: USER_SELECT } } } },
  });

  res.status(201).json({
    id: conversationId,
    other_user: toLegacyUser(chat?.members.find((m) => m.userId !== me.id)?.user ?? null),
    last_message: null,
    updated_at: chat?.updatedAt ?? new Date(),
  });
}));

chatRouter.get('/chats/:id/', asyncHandler(async (req, res) => {
  const me = authUser(req);
  const chat = await prisma.conversation.findFirst({
    where: { id: req.params.id, type: ConversationType.PRIVATE, deletedAt: null, members: { some: { userId: me.id } } },
    include: {
      members: { include: { user: { select: USER_SELECT } } },
      messages: { where: { isDeleted: false }, orderBy: { createdAt: 'desc' }, take: 1, include: MESSAGE_INCLUDE },
    },
  });
  if (!chat) {
    res.status(404).json({ detail: 'Chat not found' });
    return;
  }
  res.json({
    id: chat.id,
    other_user: toLegacyUser(chat.members.find((m) => m.userId !== me.id)?.user ?? null),
    last_message: chat.messages[0] ? toLegacyMessage(chat.messages[0]) : null,
    updated_at: chat.updatedAt,
  });
}));

chatRouter.get('/chats/:id/messages/', asyncHandler(async (req, res) => {
  const me = authUser(req);
  await requireMember(req.params.id, me.id);
  const messages = await prisma.message.findMany({
    where: { conversationId: req.params.id, isDeleted: false },
    orderBy: { createdAt: 'asc' },
    include: MESSAGE_INCLUDE,
  });
  res.json(messages.map((message) => toLegacyMessage(message)));
}));

chatRouter.post('/chats/:id/send/', upload.single('file'), asyncHandler(async (req, res) => {
  const me = authUser(req);
  await requireMember(req.params.id, me.id);
  const fileUrl = req.file ? saveUpload(req.file, 'messages') : null;
  const content = String(req.body?.content ?? '').trim() || fileUrl || (req.file?.originalname ?? '');

  const created = await prisma.message.create({
    data: {
      conversationId: req.params.id,
      senderId: me.id,
      content,
      type: prismaMessageType(String(req.body?.message_type ?? ''), Boolean(req.file)),
      replyToId: req.body?.reply_to_id ? String(req.body.reply_to_id) : null,
      idempotencyKey: crypto.randomUUID(),
    },
    include: MESSAGE_INCLUDE,
  });
  await prisma.conversation.update({ where: { id: req.params.id }, data: { lastMessageAt: new Date() } });
  res.status(201).json(toLegacyMessage(created));
}));

chatRouter.get('/groups/', asyncHandler(async (_req, res) => {
  const groups = await prisma.conversation.findMany({
    where: { type: { in: [ConversationType.GROUP, ConversationType.CHANNEL] }, deletedAt: null },
    orderBy: { updatedAt: 'desc' },
    include: {
      members: { include: { user: { select: USER_SELECT } } },
      messages: { where: { isDeleted: false }, orderBy: { createdAt: 'desc' }, take: 1, include: MESSAGE_INCLUDE },
    },
  });
  res.json(
    groups.map((group) => ({
      id: group.id,
      name: group.name,
      description: group.description,
      group_type: group.type === ConversationType.CHANNEL ? 'channel' : 'group',
      avatar: group.avatarUrl,
      admin: group.members.find((m) => m.role === 'OWNER')?.userId ?? null,
      members: group.members.map((m) => toLegacyUser(m.user)),
      last_message: group.messages[0] ? toLegacyMessage(group.messages[0]) : null,
      updated_at: group.updatedAt,
    })),
  );
}));

chatRouter.post('/groups/', asyncHandler(async (req, res) => {
  const me = authUser(req);
  const name = String(req.body?.name ?? '').trim();
  if (!name) {
    res.status(422).json({ detail: 'name is required' });
    return;
  }
  const conversation = await prisma.conversation.create({
    data: {
      type: String(req.body?.group_type ?? '').toLowerCase() === 'channel' ? ConversationType.CHANNEL : ConversationType.GROUP,
      name,
      description: String(req.body?.description ?? '').trim() || null,
      createdBy: me.id,
      inviteLink: crypto.randomUUID().replace(/-/g, '').slice(0, 16),
      members: { create: { userId: me.id, role: 'OWNER' } },
    },
    include: { members: { include: { user: { select: USER_SELECT } } } },
  });
  res.status(201).json({
    id: conversation.id,
    name: conversation.name,
    description: conversation.description,
    group_type: conversation.type === ConversationType.CHANNEL ? 'channel' : 'group',
    avatar: conversation.avatarUrl,
    admin: me.id,
    members: conversation.members.map((m) => toLegacyUser(m.user)),
    last_message: null,
    updated_at: conversation.updatedAt,
  });
}));

chatRouter.get('/groups/search/', asyncHandler(async (req, res) => {
  const query = String(req.query.search ?? '').trim();
  const groups = await prisma.conversation.findMany({
    where: {
      type: { in: [ConversationType.GROUP, ConversationType.CHANNEL] },
      deletedAt: null,
      ...(query ? { name: { contains: query, mode: 'insensitive' } } : {}),
    },
    orderBy: { updatedAt: 'desc' },
    include: { members: { include: { user: { select: USER_SELECT } } } },
  });
  res.json(
    groups.map((group) => ({
      id: group.id,
      name: group.name,
      description: group.description,
      group_type: group.type === ConversationType.CHANNEL ? 'channel' : 'group',
      avatar: group.avatarUrl,
      admin: group.members.find((m) => m.role === 'OWNER')?.userId ?? null,
      members: group.members.map((m) => toLegacyUser(m.user)),
      last_message: null,
      updated_at: group.updatedAt,
    })),
  );
}));

chatRouter.get('/groups/:id/', asyncHandler(async (req, res) => {
  const group = await prisma.conversation.findFirst({
    where: { id: req.params.id, type: { in: [ConversationType.GROUP, ConversationType.CHANNEL] }, deletedAt: null },
    include: { members: { include: { user: { select: USER_SELECT } } }, messages: { where: { isDeleted: false }, orderBy: { createdAt: 'desc' }, take: 1, include: MESSAGE_INCLUDE } },
  });
  if (!group) {
    res.status(404).json({ detail: 'Group not found' });
    return;
  }
  res.json({
    id: group.id,
    name: group.name,
    description: group.description,
    group_type: group.type === ConversationType.CHANNEL ? 'channel' : 'group',
    avatar: group.avatarUrl,
    admin: group.members.find((m) => m.role === 'OWNER')?.userId ?? null,
    members: group.members.map((m) => toLegacyUser(m.user)),
    last_message: group.messages[0] ? toLegacyMessage(group.messages[0]) : null,
    updated_at: group.updatedAt,
  });
}));

chatRouter.post('/groups/:id/join/', asyncHandler(async (req, res) => {
  const me = authUser(req);
  const exists = await prisma.conversationMember.findUnique({ where: { userId_conversationId: { userId: me.id, conversationId: req.params.id } } });
  if (!exists) {
    await prisma.conversationMember.create({ data: { userId: me.id, conversationId: req.params.id, role: 'MEMBER' } });
  }
  res.json({ message: 'Joined' });
}));

chatRouter.post('/groups/:id/add-member/', asyncHandler(async (req, res) => {
  const me = authUser(req);
  const targetId = String(req.body?.user_id ?? '').trim();
  if (!targetId) {
    res.status(422).json({ detail: 'user_id is required' });
    return;
  }
  const member = await requireMember(req.params.id, me.id);
  if (member.role !== 'OWNER' && member.role !== 'ADMIN') {
    res.status(403).json({ detail: 'Only owner/admin can add members' });
    return;
  }
  const exists = await prisma.conversationMember.findUnique({ where: { userId_conversationId: { userId: targetId, conversationId: req.params.id } } });
  if (!exists) {
    await prisma.conversationMember.create({ data: { userId: targetId, conversationId: req.params.id, role: 'MEMBER' } });
  }
  res.json({ message: 'Member added' });
}));

chatRouter.get('/groups/:id/messages/', asyncHandler(async (req, res) => {
  const me = authUser(req);
  await requireMember(req.params.id, me.id);
  const messages = await prisma.message.findMany({ where: { conversationId: req.params.id, isDeleted: false }, orderBy: { createdAt: 'asc' }, include: MESSAGE_INCLUDE });
  res.json(messages.map((message) => toLegacyMessage(message)));
}));

chatRouter.post('/groups/:id/send/', upload.single('file'), asyncHandler(async (req, res) => {
  const me = authUser(req);
  const exists = await prisma.conversationMember.findUnique({ where: { userId_conversationId: { userId: me.id, conversationId: req.params.id } } });
  if (!exists) {
    await prisma.conversationMember.create({ data: { userId: me.id, conversationId: req.params.id, role: 'MEMBER' } });
  }
  const fileUrl = req.file ? saveUpload(req.file, 'messages') : null;
  const content = String(req.body?.content ?? '').trim() || fileUrl || (req.file?.originalname ?? '');
  const created = await prisma.message.create({
    data: { conversationId: req.params.id, senderId: me.id, content, type: prismaMessageType(String(req.body?.message_type ?? ''), Boolean(req.file)), idempotencyKey: crypto.randomUUID() },
    include: MESSAGE_INCLUDE,
  });
  await prisma.conversation.update({ where: { id: req.params.id }, data: { lastMessageAt: new Date() } });
  res.status(201).json(toLegacyMessage(created));
}));

chatRouter.get('/search/', asyncHandler(async (req, res) => {
  const query = String(req.query.search ?? '').trim();
  const users = await prisma.user.findMany({
    where: query ? { OR: [{ username: { contains: query, mode: 'insensitive' } }, { email: { contains: query, mode: 'insensitive' } }] } : undefined,
    take: 20,
    select: USER_SELECT,
  });
  const groups = await prisma.conversation.findMany({
    where: { type: { in: [ConversationType.GROUP, ConversationType.CHANNEL] }, deletedAt: null, ...(query ? { name: { contains: query, mode: 'insensitive' } } : {}) },
    take: 20,
    include: { members: { include: { user: { select: USER_SELECT } } } },
  });
  res.json({
    users: users.map((user) => toLegacyUser(user)),
    groups: groups.map((group) => ({
      id: group.id,
      name: group.name,
      description: group.description,
      group_type: group.type === ConversationType.CHANNEL ? 'channel' : 'group',
      avatar: group.avatarUrl,
      admin: group.members.find((m) => m.role === 'OWNER')?.userId ?? null,
      members: group.members.map((m) => toLegacyUser(m.user)),
      last_message: null,
      updated_at: group.updatedAt,
    })),
  });
}));

chatRouter.delete('/messages/:id/', asyncHandler(async (req, res) => {
  const me = authUser(req);
  const message = await prisma.message.findUnique({ where: { id: req.params.id }, select: { id: true, senderId: true, isDeleted: true } });
  if (!message || message.isDeleted) {
    res.status(404).json({ detail: 'Message not found' });
    return;
  }
  if (message.senderId !== me.id) {
    res.status(403).json({ detail: 'Forbidden' });
    return;
  }
  await prisma.message.update({ where: { id: message.id }, data: { isDeleted: true, deletedAt: new Date(), deletedBy: me.id } });
  res.status(204).end();
}));

chatRouter.patch('/messages/:id/', asyncHandler(async (req, res) => {
  const me = authUser(req);
  const content = String(req.body?.content ?? '').trim();
  if (!content) {
    res.status(422).json({ detail: 'content is required' });
    return;
  }
  const message = await prisma.message.findUnique({ where: { id: req.params.id }, select: { id: true, senderId: true, isDeleted: true } });
  if (!message || message.isDeleted) {
    res.status(404).json({ detail: 'Message not found' });
    return;
  }
  if (message.senderId !== me.id) {
    res.status(403).json({ detail: 'Forbidden' });
    return;
  }
  const updated = await prisma.message.update({ where: { id: message.id }, data: { content, isEdited: true, editedAt: new Date() }, include: MESSAGE_INCLUDE });
  res.json(toLegacyMessage(updated));
}));

chatRouter.post('/messages/:id/reactions/', asyncHandler(async (req, res) => {
  const me = authUser(req);
  const emoji = String(req.body?.emoji ?? '').trim();
  if (!emoji) {
    res.status(422).json({ detail: 'emoji is required' });
    return;
  }
  const message = await prisma.message.findUnique({ where: { id: req.params.id }, select: { id: true, conversationId: true, isDeleted: true } });
  if (!message || message.isDeleted) {
    res.status(404).json({ detail: 'Message not found' });
    return;
  }
  await requireMember(message.conversationId, me.id);
  await prisma.messageReaction.create({ data: { messageId: message.id, userId: me.id, emoji } }).catch(() => undefined);
  const updated = await prisma.message.findUnique({ where: { id: message.id }, include: MESSAGE_INCLUDE });
  if (!updated) {
    res.status(404).json({ detail: 'Message not found' });
    return;
  }
  res.json(toLegacyMessage(updated));
}));

chatRouter.delete('/messages/:id/reactions/:emoji/', asyncHandler(async (req, res) => {
  const me = authUser(req);
  const message = await prisma.message.findUnique({ where: { id: req.params.id }, select: { id: true, conversationId: true, isDeleted: true } });
  if (!message || message.isDeleted) {
    res.status(404).json({ detail: 'Message not found' });
    return;
  }
  await requireMember(message.conversationId, me.id);
  await prisma.messageReaction.deleteMany({ where: { messageId: message.id, userId: me.id, emoji: decodeURIComponent(req.params.emoji) } });
  const updated = await prisma.message.findUnique({ where: { id: message.id }, include: MESSAGE_INCLUDE });
  if (!updated) {
    res.status(404).json({ detail: 'Message not found' });
    return;
  }
  res.json(toLegacyMessage(updated));
}));

const liveRouter = Router();
liveRouter.use(authRequired);

liveRouter.get('/sessions/', asyncHandler(async (_req, res) => {
  const sessions = await prisma.meetingRoom.findMany({
    orderBy: { createdAt: 'desc' },
    include: { host: { select: USER_SELECT }, participants: { where: { status: 'APPROVED' }, select: { id: true } } },
  });
  res.json(
    sessions.map((s) => ({
      id: s.id,
      title: s.title,
      description: s.description,
      streamer: toLegacyUser(s.host),
      status: mapMeetingStatus(s.status),
      participants_count: s.participants.length,
      cover: null,
      created_at: s.createdAt,
      updated_at: s.updatedAt,
    })),
  );
}));

liveRouter.post('/sessions/', asyncHandler(async (req, res) => {
  const me = authUser(req);
  const meeting = await callService.createMeeting(me.id, {
    title: String(req.body?.title ?? '').trim() || undefined,
    description: String(req.body?.description ?? '').trim() || undefined,
    waitingRoom: false,
  });
  if (String(req.body?.status ?? '').toLowerCase() === 'live') {
    await callService.startMeeting(me.id, meeting.id);
  }
  const detail = await prisma.meetingRoom.findUnique({
    where: { id: meeting.id },
    include: { host: { select: USER_SELECT }, participants: { where: { status: 'APPROVED' }, select: { id: true } } },
  });
  if (!detail) {
    res.status(500).json({ detail: 'Failed to create session' });
    return;
  }
  res.status(201).json({
    id: detail.id,
    title: detail.title,
    description: detail.description,
    streamer: toLegacyUser(detail.host),
    status: mapMeetingStatus(detail.status),
    participants_count: detail.participants.length,
    cover: null,
    created_at: detail.createdAt,
    updated_at: detail.updatedAt,
  });
}));

liveRouter.get('/sessions/:id/', asyncHandler(async (req, res) => {
  const detail = await prisma.meetingRoom.findUnique({
    where: { id: req.params.id },
    include: { host: { select: USER_SELECT }, participants: { where: { status: 'APPROVED' }, select: { id: true } } },
  });
  if (!detail) {
    res.status(404).json({ detail: 'Session not found' });
    return;
  }
  res.json({
    id: detail.id,
    title: detail.title,
    description: detail.description,
    streamer: toLegacyUser(detail.host),
    status: mapMeetingStatus(detail.status),
    participants_count: detail.participants.length,
    cover: null,
    created_at: detail.createdAt,
    updated_at: detail.updatedAt,
  });
}));

liveRouter.post('/sessions/:id/join_request/', asyncHandler(async (req, res) => {
  const me = authUser(req);
  const meeting = await prisma.meetingRoom.findUnique({ where: { id: req.params.id }, select: { meetingLink: true } });
  if (!meeting) {
    res.status(404).json({ detail: 'Session not found' });
    return;
  }
  await callService.joinMeeting(me.id, meeting.meetingLink);
  res.json({ message: 'Join request sent' });
}));

liveRouter.post('/sessions/:id/join/', asyncHandler(async (req, res) => {
  const me = authUser(req);
  const meeting = await prisma.meetingRoom.findUnique({ where: { id: req.params.id }, select: { meetingLink: true } });
  if (!meeting) {
    res.status(404).json({ detail: 'Session not found' });
    return;
  }
  await callService.joinMeeting(me.id, meeting.meetingLink);
  res.json({ message: 'Join request sent' });
}));

liveRouter.get('/sessions/:id/participants/', asyncHandler(async (req, res) => {
  const participants = await prisma.meetingParticipant.findMany({
    where: { roomId: req.params.id },
    orderBy: { joinedAt: 'asc' },
    include: { user: { select: USER_SELECT } },
  });
  res.json(
    participants.map((p) => ({
      id: p.id,
      user: toLegacyUser(p.user),
      status: mapParticipantStatus(p.status),
      is_muted: p.isMuted,
      is_camera_off: p.isCameraOff,
    })),
  );
}));

liveRouter.post('/sessions/:id/approve-participant/:participantId/', asyncHandler(async (req, res) => {
  const me = authUser(req);
  await callService.approveParticipant(me.id, req.params.id, req.params.participantId);
  res.json({ message: 'Approved' });
}));

liveRouter.get('/sessions/:id/messages/', asyncHandler(async (req, res) => {
  const messages = await prisma.meetingChatMessage.findMany({
    where: { roomId: req.params.id, isDeleted: false },
    orderBy: { createdAt: 'asc' },
  });
  const senderIds = Array.from(new Set(messages.map((message) => message.senderId)));
  const users = senderIds.length
    ? await prisma.user.findMany({
        where: { id: { in: senderIds } },
        select: USER_SELECT,
      })
    : [];
  const userMap = new Map(users.map((user) => [user.id, user]));

  res.json(
    messages.map((message) => ({
      id: message.id,
      user: toLegacyUser(userMap.get(message.senderId) ?? null),
      text: message.content,
      created_at: message.createdAt,
    })),
  );
}));

liveRouter.post('/sessions/:id/send_message/', asyncHandler(async (req, res) => {
  const me = authUser(req);
  const text = String(req.body?.text ?? '').trim();
  if (!text) {
    res.status(422).json({ detail: 'text is required' });
    return;
  }
  const participant = await prisma.meetingParticipant.findUnique({
    where: {
      roomId_userId: { roomId: req.params.id, userId: me.id },
    },
    select: { status: true },
  });
  if (!participant || participant.status !== 'APPROVED') {
    res.status(403).json({ detail: 'Only approved participants can send chat messages' });
    return;
  }

  const message = await prisma.meetingChatMessage.create({
    data: {
      roomId: req.params.id,
      senderId: me.id,
      content: text,
    },
  });

  const sender = await prisma.user.findUnique({
    where: { id: me.id },
    select: USER_SELECT,
  });

  res.status(201).json({
    id: message.id,
    user: toLegacyUser(sender),
    text: message.content,
    created_at: message.createdAt,
  });
}));

liveRouter.post('/sessions/:id/start_stream/', asyncHandler(async (req, res) => {
  const me = authUser(req);
  const started = await callService.startMeeting(me.id, req.params.id);
  res.json({
    id: started.id,
    title: started.title,
    description: started.description,
    status: mapMeetingStatus(started.status),
    created_at: started.createdAt,
    updated_at: started.updatedAt,
  });
}));

liveRouter.post('/sessions/:id/end_stream/', asyncHandler(async (req, res) => {
  const me = authUser(req);
  const ended = await callService.endMeeting(me.id, req.params.id);
  res.json({
    id: ended.id,
    title: ended.title,
    description: ended.description,
    status: mapMeetingStatus(ended.status),
    created_at: ended.createdAt,
    updated_at: ended.updatedAt,
  });
}));

const videoRouter = Router();
videoRouter.get('/videos/', optionalAuth, asyncHandler(async (req, res) => {
  const query = String(req.query.search ?? '').trim();
  const me = (req as AuthenticatedRequest).user;

  const videos = await prisma.stream.findMany({
    where: {
      deletedAt: null,
      ...(query
        ? {
            OR: [
              { title: { contains: query, mode: 'insensitive' } },
              { description: { contains: query, mode: 'insensitive' } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: 'desc' },
    include: {
      creator: { select: USER_SELECT },
      comments: { where: { isDeleted: false }, orderBy: { createdAt: 'asc' }, include: { user: { select: USER_SELECT } } },
    },
  });

  const likedIds = me
    ? new Set(
        (
          await prisma.streamReaction.findMany({
            where: { userId: me.id, type: 'like', streamId: { in: videos.map((v) => v.id) } },
            select: { streamId: true },
          })
        ).map((r) => r.streamId),
      )
    : new Set<string>();

  for (const category of videos.map((v) => v.category).filter((v): v is string => Boolean(v))) {
    legacyVideoCategories.add(category);
  }

  res.json(
    videos.map((video) => ({
      id: video.id,
      title: video.title,
      description: video.description ?? '',
      video: video.videoUrl,
      video_embed: null,
      file: video.videoUrl?.startsWith('/uploads/') ? video.videoUrl : null,
      cover: video.thumbnailUrl,
      uploader: toLegacyUser(video.creator),
      category: video.category ? { id: video.category.toLowerCase().replace(/\s+/g, '-'), name: video.category } : null,
      category_name: video.category,
      source_type: mapStreamSource(video.videoUrl),
      likes_count: video.likeCount,
      views: video.viewerCount,
      is_liked: likedIds.has(video.id),
      comments: video.comments.map((c) => ({ id: c.id, text: c.content, created_at: c.createdAt, user: toLegacyUser(c.user) })),
      created_at: video.createdAt,
    })),
  );
}));

videoRouter.use(authRequired);

videoRouter.post('/videos/', upload.fields([{ name: 'file', maxCount: 1 }, { name: 'cover', maxCount: 1 }]), asyncHandler(async (req, res) => {
  const me = authUser(req);
  if (!me.isStaff && !me.isSuperuser) {
    res.status(403).json({ detail: 'Staff permission required' });
    return;
  }
  const files = req.files as Record<string, Express.Multer.File[]> | undefined;
  const videoFile = files?.file?.[0];
  const coverFile = files?.cover?.[0];
  const videoUrl = videoFile ? saveUpload(videoFile, 'videos') : String(req.body?.video ?? req.body?.video_url ?? req.body?.youtube_url ?? req.body?.instagram_url ?? '').trim();
  if (!videoUrl) {
    res.status(400).json({ detail: 'Video file or URL is required' });
    return;
  }
  const category = String(req.body?.category_id ?? req.body?.category ?? '').trim() || null;
  if (category) legacyVideoCategories.add(category);

  const stream = await prisma.stream.create({
    data: {
      creatorId: me.id,
      title: String(req.body?.title ?? '').trim(),
      description: String(req.body?.description ?? '').trim() || null,
      type: StreamType.VIDEO,
      status: 'PUBLISHED',
      videoUrl,
      thumbnailUrl: coverFile ? saveUpload(coverFile, 'covers') : String(req.body?.cover ?? '').trim() || null,
      category,
      tags: '',
      isPublic: true,
      isCommentsOn: true,
    },
    include: { creator: { select: USER_SELECT } },
  });

  res.status(201).json({
    id: stream.id,
    title: stream.title,
    description: stream.description ?? '',
    video: stream.videoUrl,
    video_embed: null,
    file: stream.videoUrl?.startsWith('/uploads/') ? stream.videoUrl : null,
    cover: stream.thumbnailUrl,
    uploader: toLegacyUser(stream.creator),
    category: stream.category ? { id: stream.category.toLowerCase().replace(/\s+/g, '-'), name: stream.category } : null,
    category_name: stream.category,
    source_type: mapStreamSource(stream.videoUrl),
    likes_count: stream.likeCount,
    views: stream.viewerCount,
    is_liked: false,
    comments: [],
    created_at: stream.createdAt,
  });
}));

videoRouter.delete('/videos/:id/', asyncHandler(async (req, res) => {
  const me = authUser(req);
  const stream = await prisma.stream.findUnique({ where: { id: req.params.id }, select: { id: true, creatorId: true, deletedAt: true } });
  if (!stream || stream.deletedAt) {
    res.status(404).json({ detail: 'Video not found' });
    return;
  }
  if (stream.creatorId !== me.id && !me.isStaff && !me.isSuperuser) {
    res.status(403).json({ detail: 'Forbidden' });
    return;
  }
  await prisma.stream.update({ where: { id: stream.id }, data: { deletedAt: new Date() } });
  res.status(204).end();
}));

videoRouter.post('/videos/:id/like/', asyncHandler(async (req, res) => {
  const me = authUser(req);
  await streamService.toggleLike(me.id, req.params.id);
  const stream = await prisma.stream.findUnique({ where: { id: req.params.id }, include: { creator: { select: USER_SELECT }, comments: { where: { isDeleted: false }, include: { user: { select: USER_SELECT } } } } });
  if (!stream || stream.deletedAt) {
    res.status(404).json({ detail: 'Video not found' });
    return;
  }
  const liked = await prisma.streamReaction.findUnique({ where: { streamId_userId_type: { streamId: stream.id, userId: me.id, type: 'like' } }, select: { id: true } });
  res.json({
    id: stream.id,
    title: stream.title,
    description: stream.description ?? '',
    video: stream.videoUrl,
    video_embed: null,
    file: stream.videoUrl?.startsWith('/uploads/') ? stream.videoUrl : null,
    cover: stream.thumbnailUrl,
    uploader: toLegacyUser(stream.creator),
    category: stream.category ? { id: stream.category.toLowerCase().replace(/\s+/g, '-'), name: stream.category } : null,
    category_name: stream.category,
    source_type: mapStreamSource(stream.videoUrl),
    likes_count: stream.likeCount,
    views: stream.viewerCount,
    is_liked: Boolean(liked),
    comments: stream.comments.map((c) => ({ id: c.id, text: c.content, created_at: c.createdAt, user: toLegacyUser(c.user) })),
    created_at: stream.createdAt,
  });
}));

videoRouter.post('/videos/:id/comment/', asyncHandler(async (req, res) => {
  const me = authUser(req);
  const text = String(req.body?.text ?? req.body?.content ?? req.body?.comment ?? '').trim();
  if (!text) {
    res.status(422).json({ detail: 'text is required' });
    return;
  }
  const comment = await streamService.addComment(me.id, req.params.id, text);
  res.status(201).json({
    id: comment.id,
    text: comment.content,
    user: toLegacyUser({
      id: comment.user.id,
      username: comment.user.username,
      email: '',
      avatarUrl: comment.user.avatarUrl,
      bio: null,
      isVerified: false,
      isStaff: false,
      isSuperuser: false,
    }),
    created_at: comment.createdAt,
  });
}));

videoRouter.get('/categories/', asyncHandler(async (_req, res) => {
  const dbCategories = await prisma.stream.findMany({ where: { deletedAt: null, category: { not: null } }, select: { category: true } });
  for (const category of dbCategories) {
    if (category.category) legacyVideoCategories.add(category.category);
  }
  res.json(
    Array.from(legacyVideoCategories.values())
      .sort((a, b) => a.localeCompare(b))
      .map((name) => ({ id: name.toLowerCase().replace(/\s+/g, '-'), name })),
  );
}));

videoRouter.post('/categories/', asyncHandler(async (req, res) => {
  const me = authUser(req);
  if (!me.isStaff && !me.isSuperuser) {
    res.status(403).json({ detail: 'Staff permission required' });
    return;
  }
  const name = String(req.body?.name ?? '').trim();
  if (!name) {
    res.status(422).json({ detail: 'name is required' });
    return;
  }
  legacyVideoCategories.add(name);
  res.status(201).json({ id: name.toLowerCase().replace(/\s+/g, '-'), name });
}));

const commentRouter = Router();
commentRouter.use(authRequired);

commentRouter.post('/', asyncHandler(async (req, res) => {
  const me = authUser(req);
  const text = String(req.body?.text ?? '').trim();
  if (!text) {
    res.status(422).json({ detail: 'text is required' });
    return;
  }
  const videoId = String(req.body?.video_id ?? '').trim();
  if (videoId) {
    const comment = await streamService.addComment(me.id, videoId, text);
    res.status(201).json({
      id: comment.id,
      text: comment.content,
      user: toLegacyUser({
        id: comment.user.id,
        username: comment.user.username,
        email: '',
        avatarUrl: comment.user.avatarUrl,
        bio: null,
        isVerified: false,
        isStaff: false,
        isSuperuser: false,
      }),
      created_at: comment.createdAt,
    });
    return;
  }
  res.status(201).json({
    id: crypto.randomUUID(),
    text,
    user: toLegacyUser({
      id: me.id,
      username: me.username,
      email: me.email,
      avatarUrl: null,
      bio: null,
      isVerified: me.isVerified,
      isStaff: me.isStaff,
      isSuperuser: me.isSuperuser,
    }),
    created_at: new Date(),
  });
}));

export const legacyChatRoutes = chatRouter;
export const legacyLiveRoutes = liveRouter;
export const legacyVideoRoutes = videoRouter;
export const legacyCommentRoutes = commentRouter;
