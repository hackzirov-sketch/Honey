import type { User } from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "";

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  error?: {
    code?: string;
    message?: string;
  };
}

interface BackendAuthUser {
  id: string;
  username: string;
  email: string;
  bio: string | null;
  avatarUrl: string | null;
  isVerified: boolean;
  isStaff: boolean;
  isSuperuser: boolean;
  createdAt: string;
  lastSeen: string | null;
}

interface BackendAuthPayload {
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  user: BackendAuthUser;
}

interface BackendTokenPayload {
  accessToken: string;
  refreshToken: string;
}

export interface AuthSession {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface OpenLibraryBook {
  ol_key: string;
  title: string;
  author: string;
  year: number | null;
  pages: number | null;
  language: string | null;
  isbn: string | null;
  cover_url: string | null;
  cover_url_large: string | null;
  edition_count: number;
  read_url: string;
}

export interface OpenLibrarySearchResult {
  results: OpenLibraryBook[];
  total: number;
}

function createDefaultSettings(): User["settings"] {
  return {
    theme: "dark",
    language: "en",
    notifications: {
      pushEnabled: true,
      emailEnabled: true,
      soundEnabled: true,
      messagePreview: true,
      groupNotifications: true,
      liveNotifications: true,
    },
    privacy: {
      profileVisibility: "public",
      onlineStatus: true,
      readReceipts: true,
      typingIndicator: true,
      lastSeen: true,
    },
    appearance: {
      fontSize: "medium",
      compactMode: false,
      animations: true,
    },
  };
}

function toFrontendUser(input: BackendAuthUser): User {
  const displayName = input.username || input.email.split("@")[0] || "Honey User";
  return {
    id: input.id,
    username: input.username,
    displayName,
    email: input.email,
    avatar: input.avatarUrl ?? undefined,
    bio: input.bio ?? undefined,
    status: "online",
    role: input.isSuperuser ? "admin" : input.isStaff ? "moderator" : "user",
    isVerified: input.isVerified,
    isPremium: false,
    followers: 0,
    following: 0,
    postsCount: 0,
    joinedAt: input.createdAt,
    lastSeen: input.lastSeen ?? undefined,
    settings: createDefaultSettings(),
  };
}

async function request<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });

  const payload = (await response.json()) as ApiEnvelope<T>;
  if (!response.ok || !payload.success) {
    const message =
      payload.error?.message ||
      `Request failed: ${response.status}`;
    throw new Error(message);
  }

  return payload.data;
}

export async function registerWithApi(input: {
  username: string;
  email: string;
  password: string;
}): Promise<AuthSession> {
  const payload = await request<BackendAuthPayload>("/api/v1/auth/register", {
    method: "POST",
    body: JSON.stringify(input),
  });

  return {
    user: toFrontendUser(payload.user),
    accessToken: payload.tokens.accessToken,
    refreshToken: payload.tokens.refreshToken,
  };
}

export async function loginWithApi(input: {
  emailOrUsername: string;
  password: string;
}): Promise<AuthSession> {
  const payload = await request<BackendAuthPayload>("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });

  return {
    user: toFrontendUser(payload.user),
    accessToken: payload.tokens.accessToken,
    refreshToken: payload.tokens.refreshToken,
  };
}

export async function refreshSessionWithApi(
  refreshToken: string,
): Promise<{ accessToken: string; refreshToken: string }> {
  const payload = await request<BackendTokenPayload>("/api/v1/auth/refresh", {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
  });

  return {
    accessToken: payload.accessToken,
    refreshToken: payload.refreshToken,
  };
}

export async function fetchMeWithApi(accessToken: string): Promise<User> {
  const payload = await request<BackendAuthUser>("/api/v1/auth/me", {
    method: "GET",
    headers: accessToken
      ? {
          Authorization: `Bearer ${accessToken}`,
        }
      : undefined,
  });

  return toFrontendUser(payload);
}

export async function logoutWithApi(
  accessToken: string,
): Promise<void> {
  await request<{ message: string }>("/api/v1/auth/logout", {
    method: "POST",
    headers: accessToken
      ? {
          Authorization: `Bearer ${accessToken}`,
        }
      : undefined,
  });
}

export async function searchOpenLibrary(
  query: string,
  limit = 20,
): Promise<OpenLibrarySearchResult> {
  const q = encodeURIComponent(query);
  const payload = await request<OpenLibrarySearchResult>(
    `/api/v1/integrations/openlibrary/search?q=${q}&limit=${limit}`,
  );
  return payload;
}

export async function trendingOpenLibrary(subject = ""): Promise<OpenLibraryBook[]> {
  const encoded = encodeURIComponent(subject);
  const payload = await request<OpenLibraryBook[]>(
    `/api/v1/integrations/openlibrary/trending?subject=${encoded}`,
  );
  return payload;
}
