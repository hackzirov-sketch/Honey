import { createId, nowIso, sqlite } from "../../core/db";

export const chatRepo = {
  findOrCreateChat(a: string, b: string) {
    const [userA, userB] = [a, b].sort();
    let row = sqlite.prepare("SELECT * FROM chats WHERE user_a_id = ? AND user_b_id = ?").get(userA, userB) as any;
    if (!row) {
      const id = createId("chat");
      const stamp = nowIso();
      sqlite.prepare("INSERT INTO chats (id, user_a_id, user_b_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?)")
        .run(id, userA, userB, stamp, stamp);
      row = sqlite.prepare("SELECT * FROM chats WHERE id = ?").get(id);
    }
    return row;
  },
  createMessage(input: { chatId?: string; groupId?: string; senderId: string; content: string; messageType?: string; file?: string | null; replyToId?: string | null }) {
    const id = createId("msg");
    const stamp = nowIso();
    sqlite.prepare(`
      INSERT INTO messages (id, chat_id, group_id, sender_id, content, message_type, file, reply_to_id, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, input.chatId || null, input.groupId || null, input.senderId, input.content, input.messageType || "text", input.file || null, input.replyToId || null, stamp);
    if (input.chatId) sqlite.prepare("UPDATE chats SET updated_at = ? WHERE id = ?").run(stamp, input.chatId);
    if (input.groupId) sqlite.prepare("UPDATE groups SET updated_at = ? WHERE id = ?").run(stamp, input.groupId);
    return sqlite.prepare("SELECT * FROM messages WHERE id = ?").get(id) as any;
  },
};
