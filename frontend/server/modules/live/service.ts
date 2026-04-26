import { createId, nowIso, sqlite } from "../../core/db";
import { HttpError } from "../../core/http";
import { serializeLiveSession, userById } from "../../core/serializers";
import { liveRepo } from "./repo";

export const liveService = {
  sessions() {
    return (sqlite.prepare("SELECT * FROM live_sessions ORDER BY created_at DESC").all() as any[]).map(serializeLiveSession);
  },
  create(data: any, userId: string) {
    return serializeLiveSession(liveRepo.createSession(data, userId));
  },
  join(sessionId: string, userId: string) {
    const session = liveRepo.getSession(sessionId);
    if (!session) throw new HttpError(404, "Session not found");
    const status = session.streamer_id === userId ? "approved" : "pending";
    try {
      sqlite.prepare("INSERT INTO live_participants (id, session_id, user_id, status, created_at) VALUES (?, ?, ?, ?, ?)")
        .run(createId("lp"), sessionId, userId, status, nowIso());
    } catch {
      // already joined
    }
    return { message: "Join request sent" };
  },
  participants(sessionId: string) {
    return (sqlite.prepare("SELECT * FROM live_participants WHERE session_id = ? ORDER BY created_at").all(sessionId) as any[])
      .map((p) => ({
        id: p.id,
        user: userById(p.user_id),
        status: p.status,
        is_muted: !!p.is_muted,
        is_camera_off: !!p.is_camera_off,
      }));
  },
  approve(sessionId: string, participantId: string, userId: string) {
    const session = liveRepo.getSession(sessionId);
    if (!session) throw new HttpError(404, "Session not found");
    if (session.streamer_id !== userId) throw new HttpError(403, "Only streamer can approve");
    sqlite.prepare("UPDATE live_participants SET status = 'approved' WHERE id = ? AND session_id = ?").run(participantId, sessionId);
    return { message: "Approved" };
  },
  messages(sessionId: string) {
    return (sqlite.prepare("SELECT * FROM live_messages WHERE session_id = ? ORDER BY created_at").all(sessionId) as any[])
      .map((m) => ({ id: m.id, user: userById(m.user_id), text: m.text, created_at: m.created_at }));
  },
  send(sessionId: string, userId: string, text: string) {
    const id = createId("lm");
    sqlite.prepare("INSERT INTO live_messages (id, session_id, user_id, text, created_at) VALUES (?, ?, ?, ?, ?)")
      .run(id, sessionId, userId, text, nowIso());
    return { id, user: userById(userId), text, created_at: nowIso() };
  },
  start(sessionId: string, userId: string) {
    const session = liveRepo.getSession(sessionId);
    if (!session || session.streamer_id !== userId) throw new HttpError(403, "Forbidden");
    sqlite.prepare("UPDATE live_sessions SET status = 'live', updated_at = ? WHERE id = ?").run(nowIso(), sessionId);
    return serializeLiveSession(liveRepo.getSession(sessionId));
  },
  end(sessionId: string, userId: string) {
    const session = liveRepo.getSession(sessionId);
    if (!session || session.streamer_id !== userId) throw new HttpError(403, "Forbidden");
    sqlite.prepare("UPDATE live_sessions SET status = 'finished', updated_at = ? WHERE id = ?").run(nowIso(), sessionId);
    return serializeLiveSession(liveRepo.getSession(sessionId));
  },
};
