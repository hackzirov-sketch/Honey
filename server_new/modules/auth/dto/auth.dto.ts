import { z } from "zod";

// ─── Shared Validators ────────────────────────────────────────────────────────

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

// ─── Register ─────────────────────────────────────────────────────────────────

export const RegisterDtoSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(32, "Username must be at most 32 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores",
    ),
  email: z.string().email("Invalid email address"),
  password: passwordSchema,
});

export type RegisterDto = z.infer<typeof RegisterDtoSchema>;

// ─── Login ────────────────────────────────────────────────────────────────────

export const LoginDtoSchema = z.object({
  emailOrUsername: z.string().min(1, "Email or username is required"),
  password: z.string().min(1, "Password is required"),
});

export type LoginDto = z.infer<typeof LoginDtoSchema>;

// ─── Refresh Token ────────────────────────────────────────────────────────────

export const RefreshDtoSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required"),
});

export type RefreshDto = z.infer<typeof RefreshDtoSchema>;

// ─── Change Password ──────────────────────────────────────────────────────────

export const ChangePasswordDtoSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: passwordSchema,
});

export type ChangePasswordDto = z.infer<typeof ChangePasswordDtoSchema>;

// ─── Forgot Password ──────────────────────────────────────────────────────────

export const ForgotPasswordDtoSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type ForgotPasswordDto = z.infer<typeof ForgotPasswordDtoSchema>;

// ─── Email Verification ──────────────────────────────────────────────────────

export const RequestEmailVerificationDtoSchema = z.object({
  email: z.string().email("Invalid email address").optional(),
});

export type RequestEmailVerificationDto = z.infer<typeof RequestEmailVerificationDtoSchema>;

export const VerifyEmailDtoSchema = z
  .object({
    token: z.string().min(1, "Token is required").optional(),
    code: z.string().min(1, "Code is required").optional(),
  })
  .refine(
    (value) => Boolean(value.token || value.code),
    "Either token or code is required",
  );

export type VerifyEmailDto = z.infer<typeof VerifyEmailDtoSchema>;

// ─── Reset Password ───────────────────────────────────────────────────────────

export const ResetPasswordDtoSchema = z.object({
  token: z.string().min(1, "Reset token is required"),
  newPassword: passwordSchema,
});

export type ResetPasswordDto = z.infer<typeof ResetPasswordDtoSchema>;

// ─── Update Profile ───────────────────────────────────────────────────────────

export const UpdateProfileDtoSchema = z.object({
  bio: z.string().max(500, "Bio must be at most 500 characters").optional(),
  avatarUrl: z
    .string()
    .url("Invalid avatar URL")
    .max(2048, "Avatar URL must be at most 2048 characters")
    .optional()
    .or(z.literal("")),
  displayName: z
    .string()
    .min(1, "Display name must be at least 1 character")
    .max(64, "Display name must be at most 64 characters")
    .optional(),
  website: z
    .string()
    .url("Invalid website URL")
    .max(2048, "Website URL must be at most 2048 characters")
    .optional()
    .or(z.literal("")),
  location: z
    .string()
    .max(128, "Location must be at most 128 characters")
    .optional(),
  firstName: z
    .string()
    .min(1, "First name must be at least 1 character")
    .max(64, "First name must be at most 64 characters")
    .optional(),
  lastName: z
    .string()
    .min(1, "Last name must be at least 1 character")
    .max(64, "Last name must be at most 64 characters")
    .optional(),
});

export type UpdateProfileDto = z.infer<typeof UpdateProfileDtoSchema>;

// ─── Device Info ──────────────────────────────────────────────────────────────

export interface DeviceInfo {
  userAgent?: string;
  ipAddress?: string;
}
