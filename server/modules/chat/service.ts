import { createId, nowIso, sqlite } from "../../core/db";
import { HttpError } from "../../core/http";
import { serializeMessage, userById } from "../../core/serializers";
import { chatRepo } from "./repo";

function serializeChat(row: any, currentUserId: string) {
  const otherId = row.user_a_id === currentUserId ? row.user_b_id : row.user_a_id;
  const last = sqlite.prepare("SELECT * FROM messages WHERE chat_id = ? AND deleted_at IS NULL ORDER BY created_at DESC LIMIT 1").get(row.id) as any;
  return {
    id: row.id,
    other_user: userById(otherId),
    last_message: last ? serializeMessage(last) : null,
    updated_at: row.updated_at,
  };
}

function serializeGroup(row: any) {
  const last = sqlite.prepare("SELECT * FROM messages WHERE group_id = ? AND deleted_at IS NULL ORDER BY created_at DESC LIMIT 1").get(row.id) as any;
  const members = sqlite.prepare("SELECT user_id FROM group_members WHERE group_id = ?").all(row.id) as any[];
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    group_type: row.group_type,
    avatar: row.avatar,
    admin: row.admin_id,
    members: members.map((m) => userById(m.user_id)),
    last_message: last ? serializeMessage(last) : null,
    updated_at: row.updated_at,
  };
}

function findMessage(messageId: string) {
  return sqlite.prepare("SELECT * FROM messages WHERE id = ?").get(messageId) as any;
}

function userCanAccessMessage(msg: any, userId: string): boolean {
  if (!msg) return false;
  if (msg.chat_id) {
    const chat = sqlite.prepare("SELECT * FROM chats WHERE id = ?").get(msg.chat_id) as any;
    return !!chat && (chat.user_a_id === userId || chat.user_b_id === userId);
  }
  if (msg.group_id) {
    const member = sqlite.prepare("SELECT id FROM group_members WHERE group_id = ? AND user_id = ?").get(msg.group_id, userId) as any;
    return !!member;
  }
  return false;
}

function requireGroupMember(groupId: string, userId: string) {
  const group = sqlite.prepare("SELECT * FROM groups WHERE id = ?").get(groupId) as any;
  if (!group) throw new HttpError(404, "Group not found");
  const member = sqlite.prepare("SELECT * FROM group_members WHERE group_id = ? AND user_id = ?").get(groupId, userId) as any;
  if (!member) throw new HttpError(403, "Forbidden");
  return { group, member };
}

function validateReplyTarget(replyToId: string | null | undefined, chatId?: string, groupId?: string) {
  if (!replyToId) return;
  const replyMsg = sqlite.prepare("SELECT id, chat_id, group_id, deleted_at FROM messages WHERE id = ?").get(replyToId) as any;
  if (!replyMsg || replyMsg.deleted_at) throw new HttpError(400, "Invalid reply target");
  if (chatId && replyMsg.chat_id !== chatId) throw new HttpError(400, "Reply target must be in same chat");
  if (groupId && replyMsg.group_id !== groupId) throw new HttpError(400, "Reply target must be in same group");
}

export const chatService = {
  chats(userId: string) {
    return (sqlite.prepare("SELECT * FROM chats WHERE user_a_id = ? OR user_b_id = ? ORDER BY updated_at DESC").all(userId, userId) as any[])
      .map((row) => serializeChat(row, userId));
  },
  createChat(userId: string, targetId: string) {
    const target = sqlite.prepare("SELECT * FROM users WHERE id = ?").get(targetId) as any;
    if (!target) throw new HttpError(404, "User not found");
    return serializeChat(chatRepo.findOrCreateChat(userId, targetId), userId);
  },
  messages(chatId: string, userId: string) {
    const chat = sqlite.prepare("SELECT * FROM chats WHERE id = ?").get(chatId) as any;
    if (!chat || (chat.user_a_id !== userId && chat.user_b_id !== userId)) throw new HttpError(404, "Chat not found");
    return (sqlite.prepare("SELECT * FROM messages WHERE chat_id = ? AND deleted_at IS NULL ORDER BY created_at").all(chatId) as any[]).map(serializeMessage);
  },
  send(chatId: string, userId: string, content: string, messageType = "text", file?: string | null, replyToId?: string | null) {
    const chat = sqlite.prepare("SELECT * FROM chats WHERE id = ?").get(chatId) as any;
    if (!chat || (chat.user_a_id !== userId && chat.user_b_id !== userId)) throw new HttpError(404, "Chat not found");
    validateReplyTarget(replyToId, chatId, undefined);
    return serializeMessage(chatRepo.createMessage({ chatId, senderId: userId, content, messageType, file, replyToId }));
  },
  groups(userId: string) {
    return (sqlite.prepare(`
      SELECT g.* FROM groups g
      LEFT JOIN group_members gm ON gm.group_id = g.id AND gm.user_id = ?
      WHERE gm.id IS NOT NULL OR g.group_type = 'channel' OR g.group_type = 'group'
      ORDER BY g.updated_at DESC
    `).all(userId) as any[]).map(serializeGroup);
  },
  createGroup(userId: string, data: any) {
    const id = createId("grp");
    const stamp = nowIso();
    sqlite.prepare("INSERT INTO groups (id, name, description, group_type, admin_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)")
      .run(id, data.name, data.description || "", data.group_type || "group", userId, stamp, stamp);
    sqlite.prepare("INSERT INTO group_members (id, group_id, user_id, role, created_at) VALUES (?, ?, ?, 'admin', ?)")
      .run(createId("gm"), id, userId, stamp);
    return serializeGroup(sqlite.prepare("SELECT * FROM groups WHERE id = ?").get(id));
  },
  joinGroup(groupId: string, userId: string) {
    const group = sqlite.prepare("SELECT * FROM groups WHERE id = ?").get(groupId) as any;
    if (!group) throw new HttpError(404, "Group not found");
    try {
      sqlite.prepare("INSERT INTO group_members (id, group_id, user_id, role, created_at) VALUES (?, ?, ?, 'member', ?)")
        .run(createId("gm"), groupId, userId, nowIso());
    } catch {
      // already member
    }
    return serializeGroup(group);
  },
  addMember(groupId: string, actorUserId: string, targetUserId: string) {
    const { group, member } = requireGroupMember(groupId, actorUserId);
    if (member.role !== "admin" && group.admin_id !== actorUserId) {
      throw new HttpError(403, "Only admin can add members");
    }
    const target = sqlite.prepare("SELECT id FROM users WHERE id = ?").get(targetUserId) as any;
    if (!target) throw new HttpError(404, "User not found");
    try {
      sqlite.prepare("INSERT INTO group_members (id, group_id, user_id, role, created_at) VALUES (?, ?, ?, 'member', ?)")
        .run(createId("gm"), groupId, targetUserId, nowIso());
    } catch {
      // already member
    }
    return serializeGroup(group);
  },
  groupMessages(groupId: string, userId: string) {
    requireGroupMember(groupId, userId);
    return (sqlite.prepare("SELECT * FROM messages WHERE group_id = ? AND deleted_at IS NULL ORDER BY created_at").all(groupId) as any[]).map(serializeMessage);
  },
  groupSend(groupId: string, userId: string, content: string, messageType = "text", file?: string | null, replyToId?: string | null) {
    this.joinGroup(groupId, userId);
    validateReplyTarget(replyToId, undefined, groupId);
    return serializeMessage(chatRepo.createMessage({ groupId, senderId: userId, content, messageType, file, replyToId }));
  },
  editMessage(id: string, userId: string, content: string) {
    const msg = sqlite.prepare("SELECT * FROM messages WHERE id = ?").get(id) as any;
    if (!msg) throw new HttpError(404, "Message not found");
    if (msg.sender_id !== userId) throw new HttpError(403, "Forbidden");
    if (msg.deleted_at) throw new HttpError(400, "Message deleted");
    sqlite.prepare("UPDATE messages SET content = ?, edited_at = ? WHERE id = ?").run(content, nowIso(), id);
    const fresh = sqlite.prepare("SELECT * FROM messages WHERE id = ?").get(id) as any;
    return serializeMessage(fresh);
  },
  search(query: string) {
    const q = `%${query}%`;
    const users = sqlite.prepare("SELECT * FROM users WHERE lower(username) LIKE lower(?) OR lower(email) LIKE lower(?) LIMIT 20").all(q, q) as any[];
    const groups = sqlite.prepare("SELECT * FROM groups WHERE lower(name) LIKE lower(?) LIMIT 20").all(q) as any[];
    return { users: users.map(userByIdFromRow), groups: groups.map(serializeGroup) };
  },
  deleteMessage(id: string, userId: string) {
    const msg = sqlite.prepare("SELECT * FROM messages WHERE id = ?").get(id) as any;
    if (!msg) throw new HttpError(404, "Message not found");
    if (msg.sender_id !== userId) throw new HttpError(403, "Forbidden");
    sqlite.prepare("UPDATE messages SET deleted_at = ? WHERE id = ?").run(nowIso(), id);
    return msg;
  },

  // ----- Reactions -----
  addReaction(messageId: string, userId: string, emoji: string) {
    const msg = findMessage(messageId);
    if (!msg) throw new HttpError(404, "Message not found");
    if (!userCanAccessMessage(msg, userId)) throw new HttpError(403, "Forbidden");
    if (!emoji || emoji.length > 16) throw new HttpError(400, "Invalid emoji");
    try {
      sqlite.prepare(
        "INSERT INTO message_reactions (id, message_id, user_id, emoji, created_at) VALUES (?, ?, ?, ?, ?)"
      ).run(createId("rxn"), messageId, userId, emoji, nowIso());
    } catch {
      // already exists — idempotent
    }
    return serializeMessage(msg);
  },

  removeReaction(messageId: string, userId: string, emoji: string) {
    const msg = findMessage(messageId);
    if (!msg) throw new HttpError(404, "Message not found");
    if (!userCanAccessMessage(msg, userId)) throw new HttpError(403, "Forbidden");
    sqlite.prepare(
      "DELETE FROM message_reactions WHERE message_id = ? AND user_id = ? AND emoji = ?"
    ).run(messageId, userId, emoji);
    return serializeMessage(msg);
  },

  // Returns a stable room name for socket broadcasts based on message location.
  messageRoom(msg: any): string | null {
    if (!msg) return null;
    if (msg.chat_id) return `chat:${msg.chat_id}`;
    if (msg.group_id) return `group:${msg.group_id}`;
    return null;
  },

  findMessageById(id: string) {
    return findMessage(id);
  },
};

function userByIdFromRow(row: any) {
  return userById(row.id);
}
