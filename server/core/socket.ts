import type { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { verifyToken } from "./jwt";
import { chatService } from "../modules/chat/service";
import { liveService } from "../modules/live/service";

export function setupSocket(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    cors: { origin: true, credentials: true },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth?.token || String(socket.handshake.headers.authorization || "").replace(/^Bearer /, "");
    if (!token) return next(new Error("Unauthorized"));
    try {
      const payload = verifyToken(token, "access");
      socket.data.userId = payload.sub;
      return next();
    } catch {
      return next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    socket.on("join_room", (room: string) => socket.join(room));
    socket.on("leave_room", (room: string) => socket.leave(room));

    socket.on("chat_send", (payload: { chatId: string; content: string; message_type?: string }) => {
      try {
        const message = chatService.send(payload.chatId, socket.data.userId, payload.content, payload.message_type || "text");
        io.to(`chat:${payload.chatId}`).emit("message_created", message);
      } catch (error: any) {
        socket.emit("error", { message: error.message || "chat_send failed" });
      }
    });

    socket.on("group_send", (payload: { groupId: string; content: string; message_type?: string }) => {
      try {
        const message = chatService.groupSend(payload.groupId, socket.data.userId, payload.content, payload.message_type || "text");
        io.to(`group:${payload.groupId}`).emit("message_created", message);
      } catch (error: any) {
        socket.emit("error", { message: error.message || "group_send failed" });
      }
    });

    socket.on("live_send", (payload: { sessionId: string; text: string }) => {
      try {
        const message = liveService.send(payload.sessionId, socket.data.userId, payload.text);
        io.to(`live:${payload.sessionId}`).emit("message_created", message);
      } catch (error: any) {
        socket.emit("error", { message: error.message || "live_send failed" });
      }
    });

    // ---------- Live WebRTC signaling (mesh) ----------
    socket.on("live_join", ({ sessionId }: { sessionId: string }) => {
      if (!sessionId) return;
      const room = `live:rtc:${sessionId}`;

      // Existing peers in the room (excluding self)
      const peers = Array.from(io.sockets.adapter.rooms.get(room) || [])
        .filter((sid) => sid !== socket.id)
        .map((sid) => {
          const s = io.sockets.sockets.get(sid);
          return { socketId: sid, userId: s?.data?.userId };
        });

      socket.join(room);
      socket.data.liveSessionId = sessionId;

      // Tell the newcomer who is already there
      socket.emit("live_existing_peers", peers);
      // Tell the rest that someone new joined
      socket.to(room).emit("live_peer_joined", { socketId: socket.id, userId: socket.data.userId });
    });

    socket.on("live_signal", ({ to, data }: { to: string; data: any }) => {
      if (!to) return;
      io.to(to).emit("live_signal", { from: socket.id, fromUserId: socket.data.userId, data });
    });

    socket.on("live_state", ({ sessionId, isMuted, isCameraOff }: { sessionId: string; isMuted?: boolean; isCameraOff?: boolean }) => {
      if (!sessionId) return;
      const room = `live:rtc:${sessionId}`;
      socket.to(room).emit("live_peer_state", {
        socketId: socket.id,
        userId: socket.data.userId,
        isMuted: !!isMuted,
        isCameraOff: !!isCameraOff,
      });
    });

    const leaveLiveRoom = () => {
      const sid = socket.data.liveSessionId;
      if (!sid) return;
      const room = `live:rtc:${sid}`;
      socket.to(room).emit("live_peer_left", { socketId: socket.id, userId: socket.data.userId });
      socket.leave(room);
      socket.data.liveSessionId = null;
    };

    socket.on("live_leave", leaveLiveRoom);
    socket.on("disconnect", leaveLiveRoom);
  });

  return io;
}
