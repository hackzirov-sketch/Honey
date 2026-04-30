import { z } from "zod";

export const updateUserDtoSchema = z.object({
  bio: z.string().max(500).optional(),
  avatarUrl: z.string().url().max(512).optional(),
  bannerUrl: z.string().url().max(512).optional(),
  firstName: z.string().max(100).optional(),
  lastName: z.string().max(100).optional(),
  displayName: z.string().max(100).optional(),
  dateOfBirth: z
    .string()
    .datetime({ offset: true })
    .or(z.string().date())
    .transform((v) => new Date(v))
    .optional(),
  gender: z.string().max(20).optional(),
  location: z.string().max(200).optional(),
  website: z.string().url().max(512).optional(),
  socialLinks: z.record(z.unknown()).optional(),
});

export type UpdateUserDto = z.infer<typeof updateUserDtoSchema>;

export const changePasswordDtoSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be at most 128 characters"),
});

export type ChangePasswordDto = z.infer<typeof changePasswordDtoSchema>;

export const searchUsersDtoSchema = z.object({
  query: z.string().min(2, "Search query must be at least 2 characters"),
  cursor: z.string().uuid().optional(),
  limit: z
    .number()
    .int()
    .min(1)
    .max(50)
    .default(20),
});

export type SearchUsersDto = z.infer<typeof searchUsersDtoSchema>;

export const userStatsQuerySchema = z.object({
  cursor: z.string().uuid().optional(),
  limit: z
    .number()
    .int()
    .min(1)
    .max(50)
    .default(20),
});

export type UserStatsQuery = z.infer<typeof userStatsQuerySchema>;
