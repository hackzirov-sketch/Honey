import { userById } from "../../core/serializers";
import { commentRepo } from "./repo";

export const commentService = {
  create(userId: string, data: { text: string; video_id?: string; book_id?: string }) {
    const row = commentRepo.create(userId, data) as any;
    return { id: row.id, text: row.text, user: userById(row.user_id), created_at: row.created_at };
  },
};
