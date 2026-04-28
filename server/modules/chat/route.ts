import { Router } from "express";
import multer from "multer";
import { authRequired } from "../../core/middleware";
import { saveUploadedFile } from "../../core/uploads";
import { aiRoutes } from "../ai/route";
import { createChatSchema, createGroupSchema, editMessageSchema, sendMessageSchema } from "./schema";
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
    const data = req.is("multipart/form-data") ? { ...bodyWithFile(req), reply_to_id: req.body?.reply_to_id || null } : sendMessageSchema.parse(req.body);
    res.status(201).json(chatService.send(String(req.params.id), req.user!.id, data.content, data.message_type, (data as any).file, (data as any).reply_to_id));
  });

  router.get("/groups/", authRequired, (req, res) => res.json(chatService.groups(req.user!.id)));
  router.post("/groups/", authRequired, (req, res) => res.status(201).json(chatService.createGroup(req.user!.id, createGroupSchema.parse(req.body))));
  router.get("/groups/search/", authRequired, (req, res) => res.json(chatService.search(String(req.query.search || ""))));
  router.get("/groups/:id/", authRequired, (req, res) => res.json(chatService.groups(req.user!.id).find((g) => g.id === String(req.params.id))));
  router.post("/groups/:id/join/", authRequired, (req, res) => res.json(chatService.joinGroup(String(req.params.id), req.user!.id)));
  router.post("/groups/:id/add-member/", authRequired, (req, res) => res.json(chatService.joinGroup(String(req.params.id), String(req.body.user_id))));
  router.get("/groups/:id/messages/", authRequired, (req, res) => res.json(chatService.groupMessages(String(req.params.id))));
  router.post("/groups/:id/send/", authRequired, upload.single("file"), (req, res) => {
    const data = req.is("multipart/form-data") ? { ...bodyWithFile(req), reply_to_id: req.body?.reply_to_id || null } : sendMessageSchema.parse(req.body);
    res.status(201).json(chatService.groupSend(String(req.params.id), req.user!.id, data.content, data.message_type, (data as any).file, (data as any).reply_to_id));
  });

  router.get("/search/", authRequired, (req, res) => res.json(chatService.search(String(req.query.search || ""))));
  router.delete("/messages/:id/", authRequired, (req, res) => {
    chatService.deleteMessage(String(req.params.id), req.user!.id);
    res.status(204).end();
  });
  router.patch("/messages/:id/", authRequired, (req, res) => {
    const data = editMessageSchema.parse(req.body);
    res.json(chatService.editMessage(String(req.params.id), req.user!.id, data.content));
  });

  return router;
}
