// ─── Auth Module Exports ───────────────────────────────────────────────────────

export { authController } from "./controllers/auth.controller";
export { authService } from "./services/auth.service";
export { authenticate, optionalAuth, requireRoles } from "./guards/auth.guard";

// Re-export DTOs for convenience
export {
  RegisterDtoSchema,
  LoginDtoSchema,
  RefreshDtoSchema,
  ChangePasswordDtoSchema,
  ForgotPasswordDtoSchema,
  ResetPasswordDtoSchema,
  UpdateProfileDtoSchema,
  type RegisterDto,
  type LoginDto,
  type RefreshDto,
  type ChangePasswordDto,
  type ForgotPasswordDto,
  type ResetPasswordDto,
  type UpdateProfileDto,
  type DeviceInfo,
} from "./dto/auth.dto";

// Re-export service types
export type { TokenPair, AuthenticatedUser, SessionInfo } from "./services/auth.service";

// Default export is the router for easy mounting:
// import authRoutes from "./modules/auth";
// app.use("/auth", authRoutes);
export { default as authRoutes } from "./routes/auth.routes";
