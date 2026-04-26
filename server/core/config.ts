import path from "path";

const root = process.cwd();

export const config = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || (process.env.NODE_ENV === "production" ? 10000 : 5000)),
  jwtSecret: process.env.JWT_SECRET || process.env.SECRET_KEY || "honey-local-dev-secret-change-me",
  accessMinutes: Number(process.env.ACCESS_TOKEN_MINUTES || 60),
  refreshDays: Number(process.env.REFRESH_TOKEN_DAYS || 1),
  databasePath: process.env.SQLITE_PATH || path.join(root, "data", "honey.sqlite"),
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleRedirectUri: process.env.GOOGLE_REDIRECT_URI,
  geminiApiKey: process.env.GEMINI_API_KEY,
  geminiModel: process.env.GEMINI_MODEL || "gemini-2.0-flash",
  aiProvider: process.env.AI_PROVIDER || "auto",
  aiWebSearch: process.env.AI_WEB_SEARCH || "always",
  openRouterSearchMaxResults: Number(process.env.OPENROUTER_SEARCH_MAX_RESULTS || 5),
  openRouterSearchMaxTotalResults: Number(process.env.OPENROUTER_SEARCH_MAX_TOTAL_RESULTS || 8),
  openRouterApiKey: process.env.OPENROUTER_API_KEY,
  openRouterModel: process.env.OPENROUTER_MODEL || "openrouter/auto",
  cerebrasApiKey: process.env.CEREBRAS_API_KEY,
  cerebrasModel: process.env.CEREBRAS_MODEL || "llama-3.3-70b",
  sambanovaApiKey: process.env.SAMBANOVA_API_KEY,
  sambanovaModel: process.env.SAMBANOVA_MODEL || "Meta-Llama-3.1-8B-Instruct",
  huggingFaceApiKey: process.env.HUGGINGFACE_API_KEY,
  huggingFaceModel: process.env.HUGGINGFACE_MODEL || "meta-llama/Llama-3.1-8B-Instruct",
  smtp: {
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT || 587),
    secure: process.env.EMAIL_USE_SSL === "true",
    user: process.env.EMAIL_HOST_USER,
    pass: process.env.EMAIL_HOST_PASSWORD,
    from: process.env.DEFAULT_FROM_EMAIL || "noreply@honey.local",
  },
};

export function publicBaseUrl(reqHost?: string) {
  if (process.env.PUBLIC_URL) return process.env.PUBLIC_URL.replace(/\/$/, "");
  if (process.env.RENDER_EXTERNAL_HOSTNAME) return `https://${process.env.RENDER_EXTERNAL_HOSTNAME}`;
  return reqHost ? `http://${reqHost}` : config.frontendUrl;
}
