import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().default(""),
  password: z.string().min(6),
  password_confirm: z.string().min(6),
}).refine((data) => data.password === data.password_confirm, {
  path: ["password_confirm"],
  message: "Parollar mos emas",
});

export const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const verifyEmailSchema = z.object({
  email: z.string().email(),
  code: z.union([z.string(), z.number()]).transform(String),
});

export const profileUpdateSchema = z.object({
  username: z.string().min(2).optional(),
  name: z.string().min(1).optional(),
  phone: z.string().nullable().optional(),
  avatar: z.string().nullable().optional(),
  picture: z.string().nullable().optional(),
  bio: z.string().nullable().optional(),
});

export const changePasswordSchema = z.object({
  old_password: z.string().min(1),
  new_password: z.string().min(6),
  confirm_password: z.string().min(6),
}).refine((data) => data.new_password === data.confirm_password, {
  path: ["confirm_password"],
  message: "Parollar mos emas",
});
