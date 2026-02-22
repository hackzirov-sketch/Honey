// ============================================================
//  API KONFIGURATSIYA FAYLI — Django Backend bilan ulashgan
//  ============================================================
//  Django backend URL: http://localhost:8000
//  Barcha endpoint'lar /api/v1/ prefix bilan boshlanadi
// ============================================================

// ---------------------------------------------------------------
// 1. BACKEND URL
// ---------------------------------------------------------------
// Proxy orqali ishlaydi (vite.config.ts da sozlangan)
// Development: VITE_API_URL bo'sh qoladi, proxy ishlatiladi
// Production:  VITE_API_URL=http://your-domain.com
// ---------------------------------------------------------------
export const API_BASE_URL = import.meta.env.VITE_API_URL || "";

// ---------------------------------------------------------------
// 2. AUTH TOKEN SOZLAMALARI
// ---------------------------------------------------------------
export const AUTH_CONFIG = {
    tokenKey: "honey_access_token",
    refreshTokenKey: "honey_refresh_token",
    tokenPrefix: "Bearer",
};

// ---------------------------------------------------------------
// 3. DJANGO BACKEND ENDPOINT'LAR
// ---------------------------------------------------------------
export const API_ENDPOINTS = {
    // --- Auth ---
    AUTH: {
        REGISTER: "/api/v1/auth/register/",        // POST {username,email,phone,password,password_confirm}
        VERIFY_EMAIL: "/api/v1/auth/verify-email/",// POST {email,code}
        LOGIN: "/api/v1/auth/login/",              // POST {username,password} → {access,refresh,user}
        LOGOUT: "/api/v1/auth/logout/",            // POST {refresh_token,access_token}
        REFRESH: "/api/v1/auth/token/refresh/",    // POST {refresh} → {access}
        GOOGLE: "/api/v1/auth/google/",            // GET → redirect
    },

    // --- Profile ---
    PROFILE: {
        ME: "/api/v1/auth/profile/",                        // GET → user profile
        UPDATE: "/api/v1/auth/profile/update/",             // PATCH → update profile
        STATS: "/api/v1/auth/profile/stats/",               // GET → stats
        DELETE: "/api/v1/auth/profile/delete/",             // DELETE
        CHANGE_PASSWORD: "/api/v1/auth/profile/change-password/", // POST {old_password, new_password, confirm_password}
    },

    // --- Library ---
    LIBRARY: {
        BOOKS: "/api/v1/library/books/",                          // GET ?search=&category=
        BOOK_DETAIL: (id: string) => `/api/v1/library/books/${id}/`,  // GET
        CATEGORIES: "/api/v1/library/categories/",                // GET
        GENRES: "/api/v1/library/genres/",                        // GET
        USER_BOOKS: "/api/v1/library/user-books/",                // GET (mening kitoblarim)
        DOWNLOAD: "/api/v1/library/user-books/download/",         // POST {book_id}
        REMOVE: (id: string) => `/api/v1/library/user-books/${id}/`, // DELETE
    },

    // --- Chat ---
    CHAT: {
        LIST: "/api/v1/chat/chats/",                                     // GET
        CREATE: "/api/v1/chat/chats/",                                   // POST {user_id}
        GROUPS: "/api/v1/chat/groups/",                                  // GET
        DETAIL: (id: string | number) => `/api/v1/chat/chats/${id}/`,             // GET
        MESSAGES: (id: string | number) => `/api/v1/chat/chats/${id}/messages/`,  // GET
        SEND: (id: string | number) => `/api/v1/chat/chats/${id}/send/`,          // POST {content}
        GROUP_MESSAGES: (id: string) => `/api/v1/chat/groups/${id}/messages/`,    // GET
        GROUP_SEND: (id: string) => `/api/v1/chat/groups/${id}/send/`,            // POST {content}
        // AI
        AI_CHAT: "/api/v1/chat/ai/chat/",     // POST {message} → {reply}
        AI_SEARCH: "/api/v1/chat/ai/search/", // POST {query}
        AI_IMPROVE: "/api/v1/chat/ai/improve/",// POST {text}
        GLOBAL_SEARCH: "/api/v1/chat/search/", // GET ?search=query
        MESSAGE_DELETE: (id: string) => `/api/v1/chat/messages/${id}/`, // DELETE
    },

    // --- AI (geminiService.ts dan foydalanish uchun) ---
    AI: {
        CHAT: "/api/v1/chat/ai/chat/",      // POST {message, systemInstruction} → {text}
        SEARCH: "/api/v1/chat/ai/search/",  // POST {query} → {text, sources}
        IMPROVE: "/api/v1/chat/ai/improve/",// POST {text} → {text}
    },

    // --- Video ---
    VIDEO: {
        LIST: "/api/v1/video/videos/",  // GET ?search= → [{id, title, video, video_embed}]
        DETAIL: (id: string) => `/api/v1/video/videos/${id}/`,
        LIKE: (id: string) => `/api/v1/video/videos/${id}/like/`,
        COMMENT: (id: string) => `/api/v1/video/videos/${id}/comment/`,
        CATEGORIES: "/api/v1/video/categories/",
    },

    // --- Live ---
    LIVE: {
        SESSIONS: "/api/v1/live/sessions/",
        DETAIL: (id: string) => `/api/v1/live/sessions/${id}/`,
        JOIN: (id: string) => `/api/v1/live/sessions/${id}/join_request/`,
        APPROVE: (sessionId: string, participantId: string) => `/api/v1/live/sessions/${sessionId}/approve-participant/${participantId}/`,
        MESSAGES: (id: string) => `/api/v1/live/sessions/${id}/messages/`,
        SEND: (id: string) => `/api/v1/live/sessions/${id}/send_message/`,
        PARTICIPANTS: (id: string) => `/api/v1/live/sessions/${id}/participants/`,
        START: (id: string) => `/api/v1/live/sessions/${id}/start_stream/`,
        END: (id: string) => `/api/v1/live/sessions/${id}/end_stream/`,
    },
} as const;

// ---------------------------------------------------------------
// 4. REQUEST TIMEOUT (millisekund)
// ---------------------------------------------------------------
export const REQUEST_TIMEOUT = 20000; // 20 sekund

// ---------------------------------------------------------------
// 5. TOKEN HELPER FUNKSIYALAR
// ---------------------------------------------------------------
export function getAuthToken(): string | null {
    return localStorage.getItem(AUTH_CONFIG.tokenKey);
}

export function setAuthToken(token: string, refreshToken?: string): void {
    localStorage.setItem(AUTH_CONFIG.tokenKey, token);
    if (refreshToken) {
        localStorage.setItem(AUTH_CONFIG.refreshTokenKey, refreshToken);
    }
}

export function clearAuthTokens(): void {
    localStorage.removeItem(AUTH_CONFIG.tokenKey);
    localStorage.removeItem(AUTH_CONFIG.refreshTokenKey);
    localStorage.removeItem("honey_user");
}

export function authHeaders() {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`,
    };
}
