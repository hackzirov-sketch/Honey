// ============================================================
//  MARKAZIY API CLIENT
//  ============================================================
//  Bu fayl barcha HTTP so'rovlarni boshqaradi.
//  Django backend bilan ulashganda faqat api.config.ts
//  faylini o'zgartirsangiz yetarli — bu fayl avtomatik
//  yangi URL ishlatadi.
//
//  Xususiyatlar:
//   ✅ Avtomatik token qo'shish (Authorization header)
//   ✅ 401 (Unauthorized) da avtomatik token yangilash
//   ✅ Request timeout
//   ✅ Xato handling
// ============================================================

import {
    API_BASE_URL,
    AUTH_CONFIG,
    REQUEST_TIMEOUT,
    getAuthToken,
    setAuthToken,
    clearAuthTokens,
} from "@/config/api.config";

// ---------------------------------------------------------------
// XATO TIPI
// ---------------------------------------------------------------
export class ApiError extends Error {
    status: number;
    data: any;

    constructor(message: string, status: number, data?: any) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.data = data;
    }
}

// ---------------------------------------------------------------
// TOKEN YANGILASH (Django SimpleJWT refresh)
// ---------------------------------------------------------------
// Django dasturchilarga: /api/auth/token/refresh/ endpointini
// qo'shing. POST {refresh: "..."} → {access: "..."}
async function refreshAccessToken(): Promise<boolean> {
    const refreshToken = localStorage.getItem(AUTH_CONFIG.refreshTokenKey);
    if (!refreshToken) return false;

    try {
        const res = await fetch(`${API_BASE_URL}/api/v1/auth/token/refresh/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        if (!res.ok) {
            clearAuthTokens();
            return false;
        }

        const data = await res.json();
        setAuthToken(data.access); // yangi access token saqlash
        return true;
    } catch {
        clearAuthTokens();
        return false;
    }
}

// ---------------------------------------------------------------
// ASOSIY REQUEST FUNKSIYASI
// ---------------------------------------------------------------
interface RequestOptions extends RequestInit {
    skipAuth?: boolean;  // true bo'lsa token qo'shilmaydi
    timeout?: number;    // millisekund
}

export async function apiClient<T = any>(
    endpoint: string,
    options: RequestOptions = {}
): Promise<T> {
    const {
        skipAuth = false,
        timeout = REQUEST_TIMEOUT,
        headers = {},
        ...rest
    } = options;

    // --- To'liq URL yasash ---
    // API_BASE_URL bo'sh bo'lsa (Express mode), faqat endpoint ishlatadi
    // Django mode da: "http://localhost:8000" + "/api/chat/" = to'liq URL
    const url = `${API_BASE_URL}${endpoint}`;

    // --- Headerlar ---
    const requestHeaders: Record<string, string> = {
        "Content-Type": "application/json",
        ...(headers as Record<string, string>),
    };

    // --- Auth token qo'shish ---
    // Django dasturchilarga: token "Bearer <token>" formatida keladi
    if (!skipAuth) {
        const token = getAuthToken();
        if (token) {
            requestHeaders["Authorization"] = `${AUTH_CONFIG.tokenPrefix} ${token}`;
        }
    }

    // --- Timeout uchun AbortController ---
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        let res = await fetch(url, {
            ...rest,
            headers: requestHeaders,
            signal: controller.signal,
            credentials: "include", // Cookie based session uchun (Django session auth)
        });

        clearTimeout(timeoutId);

        // --- 401: Token muddati o'tgan → refresh qilish ---
        if (res.status === 401 && !skipAuth) {
            const refreshed = await refreshAccessToken();
            if (refreshed) {
                // Yangi token bilan qayta urinish
                const newToken = getAuthToken();
                if (newToken) {
                    requestHeaders["Authorization"] = `${AUTH_CONFIG.tokenPrefix} ${newToken}`;
                }
                res = await fetch(url, { ...rest, headers: requestHeaders });
            } else {
                // Refresh ham ishlamadi → login sahifasiga redirect
                window.location.href = "/login";
                throw new ApiError("Session muddati tugadi. Iltimos qaytadan kiring.", 401);
            }
        }

        // --- Javobni parse qilish ---
        const contentType = res.headers.get("content-type");
        const isJson = contentType?.includes("application/json");
        const data = isJson ? await res.json() : await res.text();

        if (!res.ok) {
            // Django odatda xatoni {detail: "..."} yoki {message: "..."} formatda qaytaradi
            const errorMessage =
                data?.detail || data?.message || data?.error || `HTTP ${res.status} xato`;
            throw new ApiError(errorMessage, res.status, data);
        }

        return data as T;
    } catch (err) {
        clearTimeout(timeoutId);

        if (err instanceof ApiError) throw err;

        if ((err as any)?.name === "AbortError") {
            throw new ApiError("So'rov vaqti tugadi (timeout)", 408);
        }

        throw new ApiError(
            "Server bilan aloqa o'rnatib bo'lmadi. Internet aloqangizni tekshiring.",
            0
        );
    }
}

// ---------------------------------------------------------------
// QISQARTMA METODLAR (GET, POST, PUT, PATCH, DELETE)
// ---------------------------------------------------------------

/** GET so'rov — ma'lumot olish */
export const api = {
    get: <T = any>(url: string, options?: RequestOptions) =>
        apiClient<T>(url, { ...options, method: "GET" }),

    post: <T = any>(url: string, body?: any, options?: RequestOptions) =>
        apiClient<T>(url, {
            ...options,
            method: "POST",
            body: body ? JSON.stringify(body) : undefined,
        }),

    put: <T = any>(url: string, body?: any, options?: RequestOptions) =>
        apiClient<T>(url, {
            ...options,
            method: "PUT",
            body: body ? JSON.stringify(body) : undefined,
        }),

    patch: <T = any>(url: string, body?: any, options?: RequestOptions) =>
        apiClient<T>(url, {
            ...options,
            method: "PATCH",
            body: body ? JSON.stringify(body) : undefined,
        }),

    delete: <T = any>(url: string, options?: RequestOptions) =>
        apiClient<T>(url, { ...options, method: "DELETE" }),
};
