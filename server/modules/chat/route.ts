import { Router } from "express";
import multer from "multer";
import { authRequired } from "../../core/middleware";
import { saveUploadedFile } from "../../core/uploads";
import { aiRoutes } from "../ai/route";
import { createChatSchema, createGroupSchema, sendMessageSchema } from "./schema";
import { chatService } from "./service";

const upload = multer({ storage: multer.memoryStorage() });

function bodyWithFile(req: any) {
  const fileUrl = saveUploadedFile(req.file);
  return {
    content: req.body?.content || req.file?.originalname || "",
    message_type: req.body?.message_type || (req.file ? "file" : "text"),
    file: fileUrl,
  };
}

function emit(req: any, room: string | null, event: string, payload: any) {
  if (!room) return;
  const io = req.app.get("io");
  if (io) io.to(room).emit(event, payload);
}

export function chatRoutes() {
  const router = Router();
  router.use("/ai", aiRoutes());

  router.get("/chats/", authRequired, (req, res) => res.json(chatService.chats(req.user!.id)));
  router.post("/chats/", authRequired, (req, res) => {
    const data = createChatSchema.parse(req.body);
    res.status(201).json(chatService.createChat(req.user!.id, data.user_id));
  });
  router.get("/chats/:id/", authRequired, (req, res) => res.json(chatService.chats(req.user!.id).find((c) => c.id === String(req.params.id))));
  router.get("/chats/:id/messages/", authRequired, (req, res) => res.json(chatService.messages(String(req.params.id), req.user!.id)));
  router.post("/chats/:id/send/", authRequired, upload.single("file"), (req, res) => {
    const data = req.is("multipart/form-data") ? bodyWithFile(req) : sendMessageSchema.parse(req.body);
    const message = chatService.send(String(req.params.id), req.user!.id, data.content, data.message_type, (data as any).file);
    emit(req, `chat:${req.params.id}`, "message_created", message);
    res.status(201).json(message);
  });

  router.get("/groups/", authRequired, (req, res) => res.json(chatService.groups(req.user!.id)));
  router.post("/groups/", authRequired, (req, res) => res.status(201).json(chatService.createGroup(req.user!.id, createGroupSchema.parse(req.body))));
  router.get("/groups/search/", authRequired, (req, res) => res.json(chatService.search(String(req.query.search || ""))));
  router.get("/groups/:id/", authRequired, (req, res) => res.json(chatService.groups(req.user!.id).find((g) => g.id === String(req.params.id))));
  router.post("/groups/:id/join/", authRequired, (req, res) => res.json(chatService.joinGroup(String(req.params.id), req.user!.id)));
  router.post("/groups/:id/add-member/", authRequired, (req, res) => res.json(chatService.joinGroup(String(req.params.id), String(req.body.user_id))));
  router.get("/groups/:id/messages/", authRequired, (req, res) => res.json(chatService.groupMessages(String(req.params.id))));
  router.post("/groups/:id/send/", authRequired, upload.single("file"), (req, res) => {
    const data = req.is("multipart/form-data") ? bodyWithFile(req) : sendMessageSchema.parse(req.body);
    const message = chatService.groupSend(String(req.params.id), req.user!.id, data.content, data.message_type, (data as any).file);
    emit(req, `group:${req.params.id}`, "message_created", message);
    res.status(201).json(message);
  });

  router.get("/search/", authRequired, (req, res) => res.json(chatService.search(String(req.query.search || ""))));
  router.delete("/messages/:id/", authRequired, (req, res) => {
    const msg = chatService.findMessageById(String(req.params.id));
    chatService.deleteMessage(String(req.params.id), req.user!.id);
    if (msg) emit(req, chatService.messageRoom(msg), "message_deleted", { id: msg.id, chat_id: msg.chat_id, group_id: msg.group_id });
    res.status(204).end();
  });

  // ----- Reactions -----
  router.post("/messages/:id/reactions/", authRequired, (req, res) => {
    const emoji = String(req.body?.emoji || "");
    const updated = chatService.addReaction(String(req.params.id), req.user!.id, emoji);
    const msg = chatService.findMessageById(String(req.params.id));
    emit(req, chatService.messageRoom(msg), "message_reactions_updated", updated);
    res.status(201).json(updated);
  });

  router.delete("/messages/:id/reactions/:emoji/", authRequired, (req, res) => {
    const emoji = decodeURIComponent(String(req.params.emoji || ""));
    const updated = chatService.removeReaction(String(req.params.id), req.user!.id, emoji);
    const msg = chatService.findMessageById(String(req.params.id));
    emit(req, chatService.messageRoom(msg), "message_reactions_updated", updated);
    res.json(updated);
  });

  return router;
}
