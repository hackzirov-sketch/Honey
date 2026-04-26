// ============================================================
//  AI / GEMINI SERVIS
//  ============================================================
//  Bu servis AI chat, qidiruv va matn yaxshilash funksiyalarini
//  boshqaradi.
//
//  Django dasturchilarga:
//   - POST /api/chat/     → {text: "AI javobi"}
//   - POST /api/search/   → {text: "...", sources: [...]}
//   - POST /api/improve/  → {text: "yaxshilangan matn"}
//
//  Agar Django backend da bu endpointlar tayyor bo'lsa, hech
//  narsa o'zgartirmang — avtomatik ishlaydi.
// ============================================================

import { api } from "./apiClient";
import { API_ENDPOINTS } from "@/config/api.config";

// ---------------------------------------------------------------
// AI CHAT
// ---------------------------------------------------------------
/**
 * Honey AI bilan suhbat
 * @param message - Foydalanuvchi xabari
 * @param systemInstruction - AI ga ko'rsatma (ixtiyoriy)
 *
 * Django endpoint: POST /api/chat/
 * Request body: { message: string, systemInstruction: string }
 * Response:     { text: string }
 */
export const chatWithHoneyAI = async (
  message: string,
  systemInstruction: string = ""
): Promise<string> => {
  try {
    const data = await api.post<{ text: string }>(API_ENDPOINTS.AI.CHAT, {
      message,
      systemInstruction,
    });
    return data.text || "Uzr, hozirda javob bera olmayman.";
  } catch (error: any) {
    console.error("AI Chat xatosi:", error.message);
    return "Xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.";
  }
};

// ---------------------------------------------------------------
// TA'LIMIY QIDIRUV
// ---------------------------------------------------------------
/**
 * Xavfsiz ta'limiy kontent qidirish
 * @param query - Qidiruv so'rovi
 *
 * Django endpoint: POST /api/search/
 * Request body: { query: string }
 * Response:     { text: string, sources: Array<{title, url}> }
 */
export const searchEducationalContent = async (
  query: string
): Promise<{ text: string; sources: any[] }> => {
  try {
    const data = await api.post<{ text: string; sources: any[] }>(
      API_ENDPOINTS.AI.SEARCH,
      { query }
    );
    return {
      text: data.text || "",
      sources: data.sources || [],
    };
  } catch (error: any) {
    console.error("Qidiruv xatosi:", error.message);
    return { text: "Ma'lumot topilmadi.", sources: [] };
  }
};

// ---------------------------------------------------------------
// MATN YAXSHILASH
// ---------------------------------------------------------------
/**
 * Berilgan matnni AI yordamida yaxshilash
 * @param text - Yaxshilanishi kerak bo'lgan matn
 *
 * Django endpoint: POST /api/improve/
 * Request body: { text: string }
 * Response:     { text: string }
 */
export const improveText = async (text: string): Promise<string> => {
  try {
    const data = await api.post<{ text: string }>(API_ENDPOINTS.AI.IMPROVE, {
      text,
    });
    return data.text?.trim() || text;
  } catch (error: any) {
    console.error("Matn yaxshilash xatosi:", error.message);
    return text; // Xato bo'lsa original matnni qaytaradi
  }
};
