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
  });

  return io;
}
