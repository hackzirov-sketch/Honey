
import { GoogleGenAI } from "@google/genai";

// Always use the direct process.env.API_KEY for initialization as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Umumiy AI chat funksiyasi
 */
export const chatWithHoneyAI = async (message: string, systemInstruction: string = "") => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: message,
      config: {
        systemInstruction: systemInstruction || "Siz Honey platformasining aqlli yordamchisiz. Foydalanuvchiga xushmuomalalik bilan yordam bering. Javoblaringiz qisqa va aniq bo'lsin.",
        temperature: 0.7,
      },
    });
    // Use .text property getter as per guidelines
    return response.text || "Uzr, hozirda javob bera olmayman.";
  } catch (error) {
    console.error("AI Error:", error);
    return "Xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.";
  }
};

/**
 * Xavfsiz ta'limiy qidiruv (Google Search Grounding)
 */
export const searchEducationalContent = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Search for safe, educational content about: ${query}. Include real URLs and brief descriptions. Ensure it's 100% safe for all ages.`,
      config: {
        tools: [{ googleSearch: {} }],
        systemInstruction: "You are an educational search filter. Provide real, safe, and curated learning links from the web.",
      },
    });
    
    // groundingChunks contains the website URLs required by guidelines
    return {
      text: response.text,
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("Search Error:", error);
    return { text: "Ma'lumot topilmadi.", sources: [] };
  }
};

export const improveText = async (text: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Quyidagi matnni grammatik va uslubiy jihatdan mukammal qilib tahrirlab ber: "${text}"`,
      config: {
        systemInstruction: "Siz professional muharrirsiz. Faqat tahrirlangan matnni qaytaring.",
      }
    });
    // Use .text property getter
    return response.text?.trim() || text;
  } catch (error) {
    return text;
  }
};
