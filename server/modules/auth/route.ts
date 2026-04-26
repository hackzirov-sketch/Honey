import { Router } from "express";
import { config, publicBaseUrl } from "../../core/config";
import { asyncHandler, HttpError } from "../../core/http";
import { authLimiter, authRequired } from "../../core/middleware";
import { authService } from "./service";
import { changePasswordSchema, loginSchema, profileUpdateSchema, registerSchema, verifyEmailSchema } from "./schema";

export function authRoutes() {
  const router = Router();

  router.post("/register/", authLimiter, asyncHandler(async (req, res) => {
    const data = registerSchema.parse(req.body);
    res.status(201).json(await authService.register(data));
  }));

  router.post("/verify-email/", authLimiter, asyncHandler(async (req, res) => {
    const data = verifyEmailSchema.parse(req.body);
    res.json(authService.verifyEmail(data.email, data.code));
  }));

  router.post("/login/", authLimiter, asyncHandler(async (req, res) => {
    const data = loginSchema.parse(req.body);
    res.json(await authService.login(data.username, data.password));
  }));

  router.post("/logout/", authRequired, asyncHandler(async (req, res) => {
    const access = (req.headers.authorization || "").replace(/^Bearer /, "");
    const refresh = req.body?.refresh || req.body?.refresh_token;
    res.json(authService.logout(access, refresh));
  }));

  router.post("/token/refresh/", authLimiter, asyncHandler(async (req, res) => {
    res.json(authService.refresh(req.body?.refresh));
  }));

  router.get("/google/", asyncHandler(async (req, res) => {
    if (!config.googleClientId) {
      const url = `${config.frontendUrl}/#/auth?error=${encodeURIComponent("Google OAuth sozlanmagan")}`;
      return res.redirect(url);
    }
    const redirectUri = config.googleRedirectUri || `${publicBaseUrl(req.headers.host)}/api/v1/auth/google/callback/`;
    const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    url.searchParams.set("client_id", config.googleClientId);
    url.searchParams.set("redirect_uri", redirectUri);
    url.searchParams.set("response_type", "code");
    url.searchParams.set("scope", "openid email profile");
    url.searchParams.set("access_type", "offline");
    return res.redirect(url.toString());
  }));

  router.get("/google/callback/", asyncHandler(async (req, res) => {
    const code = String(req.query.code || "");
    if (!code || !config.googleClientId || !config.googleClientSecret) {
      return res.redirect(`${config.frontendUrl}/#/auth?error=${encodeURIComponent("Google OAuth callback xato")}`);
    }
    const redirectUri = config.googleRedirectUri || `${publicBaseUrl(req.headers.host)}/api/v1/auth/google/callback/`;
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: config.googleClientId,
        client_secret: config.googleClientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });
    if (!tokenRes.ok) throw new HttpError(400, "Google token exchange failed");
    const tokenData = await tokenRes.json() as any;
    const profileRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    if (!profileRes.ok) throw new HttpError(400, "Google profile failed");
    const profile = await profileRes.json() as any;
    const data = await authService.googleCallback({ email: profile.email, name: profile.name, avatar: profile.picture });
    const user = encodeURIComponent(JSON.stringify(data.user));
    return res.redirect(`${config.frontendUrl}/#/auth?access=${data.access}&refresh=${data.refresh}&user=${user}`);
  }));

  router.get("/profile/", authRequired, (req, res) => res.json(req.user));
  router.get("/profile/stats/", authRequired, (req, res) => res.json(authService.stats(req.user!.id)));
  router.patch("/profile/update/", authRequired, asyncHandler(async (req, res) => {
    res.json(authService.updateProfile(req.user!.id, profileUpdateSchema.parse(req.body)));
  }));
  router.delete("/profile/delete/", authRequired, (req, res) => res.json(authService.deleteProfile(req.user!.id)));
  router.post("/profile/change-password/", authRequired, asyncHandler(async (req, res) => {
    const data = changePasswordSchema.parse(req.body);
    res.json(await authService.changePassword(req.user!.id, data.old_password, data.new_password));
  }));

  return router;
}
