import { GoogleGenAI } from "@google/genai";
import { config } from "../../core/config";
import { HttpError } from "../../core/http";

type ProviderName = "openrouter" | "cerebras" | "sambanova" | "huggingface" | "gemini";

type Provider = {
  name: ProviderName;
  apiKey?: string;
  baseUrl?: string;
  model: string;
};

type ChatResult = {
  text: string;
  provider?: ProviderName;
  model?: string;
  sources?: Array<{ title?: string; url?: string; content?: string }>;
  error?: string;
  retryable?: boolean;
};

const uzbekSystemPrompt = [
  "Siz Honey platformasining aqlli AI yordamchisisiz.",
  "Har doim ravon, tabiiy va tushunarli o'zbek tilida, lotin yozuvida javob bering.",
  "Keraksiz inglizcha aralashmalarni ishlatmang; texnik termin kerak bo'lsa, qisqa izoh bering.",
  "Internet qidiruvdan foydalansangiz, javobda sanalar, raqamlar va faktlarni aniq ayting.",
  "Manba bo'lmasa yoki internetdan tasdiqlanmasa, buni ochiq ayting.",
  "Bilmagan narsangizni to'qimang; noaniqlik bo'lsa aniq ayting.",
].join(" ");

const providers: Provider[] = [
  {
    name: "openrouter",
    apiKey: config.openRouterApiKey,
    baseUrl: "https://openrouter.ai/api/v1/chat/completions",
    model: config.openRouterModel,
  },
  {
    name: "cerebras",
    apiKey: config.cerebrasApiKey,
    baseUrl: "https://api.cerebras.ai/v1/chat/completions",
    model: config.cerebrasModel,
  },
  {
    name: "sambanova",
    apiKey: config.sambanovaApiKey,
    baseUrl: "https://api.sambanova.ai/v1/chat/completions",
    model: config.sambanovaModel,
  },
  {
    name: "huggingface",
    apiKey: config.huggingFaceApiKey,
    baseUrl: "https://router.huggingface.co/v1/chat/completions",
    model: config.huggingFaceModel,
  },
  {
    name: "gemini",
    apiKey: config.geminiApiKey,
    model: config.geminiModel,
  },
];

const gemini = config.geminiApiKey ? new GoogleGenAI({ apiKey: config.geminiApiKey }) : null;

function orderedProviders(search = false) {
  const enabled = providers.filter((provider) => !!provider.apiKey);
  if (config.aiProvider !== "auto") {
    const selected = enabled.find((provider) => provider.name === config.aiProvider);
    return selected ? [selected] : enabled;
  }
  if (search) {
    const openRouter = enabled.find((provider) => provider.name === "openrouter");
    return openRouter ? [openRouter, ...enabled.filter((provider) => provider.name !== "openrouter")] : enabled;
  }
  return enabled;
}

function isRetryable(error: any) {
  const raw = JSON.stringify(error);
  return (
    error?.status === 408 ||
    error?.status === 429 ||
    error?.status >= 500 ||
    raw.includes("RESOURCE_EXHAUSTED") ||
    raw.includes("Quota exceeded") ||
    raw.includes("rate limit") ||
    raw.includes("Too Many Requests")
  );
}

function fallbackMessage(error: any) {
  const raw = JSON.stringify(error);
  if (raw.includes("RESOURCE_EXHAUSTED") || raw.includes("Quota exceeded") || raw.includes("rate limit") || error?.status === 429) {
    return "AI limiti vaqtincha tugadi. Boshqa providerga o'tib ko'ryapman.";
  }
  return "AI provider vaqtincha javob bermadi. Boshqa providerga o'tib ko'ryapman.";
}

function wantsWebSearch() {
  return config.aiWebSearch === "always";
}

function appendSources(text: string, sources?: Array<{ title?: string; url?: string }>) {
  const unique = (sources || [])
    .filter((source) => source.url)
    .filter((source, index, arr) => arr.findIndex((item) => item.url === source.url) === index)
    .slice(0, 5);

  if (unique.length === 0) return text;

  const sourceText = unique
    .map((source, index) => `${index + 1}. [${source.title || source.url}](${source.url})`)
    .join("\n");

  return `${text.trim()}\n\nManbalar:\n${sourceText}`;
}

async function callOpenAiCompatible(
  provider: Provider,
  message: string,
  systemInstruction?: string,
  withSearch = false,
): Promise<ChatResult> {
  if (!provider.baseUrl || !provider.apiKey) throw new Error(`${provider.name} API key sozlanmagan`);

  const body: Record<string, unknown> = {
    model: withSearch && provider.name === "openrouter" ? provider.model : provider.model,
    messages: [
      {
        role: "system",
        content: [
          uzbekSystemPrompt,
          withSearch && provider.name === "openrouter"
            ? "Sizda web search tool bor. Fakt, yangilik, narx, sana, versiya yoki hozirgi holat so'ralsa tool orqali internetdan tekshiring va manbalarni ko'rsating."
            : "",
          systemInstruction || "",
        ].filter(Boolean).join("\n").trim(),
      },
      { role: "user", content: message },
    ],
    temperature: 0.5,
    max_tokens: 900,
  };

  if (withSearch && provider.name === "openrouter") {
    body.tools = [
      {
        type: "openrouter:web_search",
        max_results: config.openRouterSearchMaxResults,
        search_prompt:
          "Use current, reliable web sources. Prefer official documentation and primary sources. Return citations.",
      },
    ];
    body.web_search_options = {
      search_context_size: "high",
      max_results: config.openRouterSearchMaxTotalResults,
    };
  }

  const response = await fetch(provider.baseUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${provider.apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://honey.local",
      "X-Title": "Honey Ecosystem",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw { status: response.status, provider: provider.name, data };
  }

  const messageData = data?.choices?.[0]?.message || {};
  const citations = (messageData.annotations || [])
    .map((item: any) => item?.url_citation)
    .filter(Boolean)
    .map((item: any) => ({ title: item.title, url: item.url, content: item.content }));

  return {
    text: appendSources(messageData.content || data?.choices?.[0]?.text || "", citations),
    provider: provider.name,
    model: provider.model,
    sources: citations,
  };
}

async function callGemini(message: string, systemInstruction?: string): Promise<ChatResult> {
  if (!gemini) throw new Error("Gemini API key sozlanmagan");
  const response = await gemini.models.generateContent({
    model: config.geminiModel,
    contents: message,
    config: { systemInstruction: `${uzbekSystemPrompt}\n${systemInstruction || ""}`.trim() },
  });
  return {
    text: response.text || "",
    provider: "gemini",
    model: config.geminiModel,
  };
}

async function runWithFallback(message: string, systemInstruction?: string, withSearch = false): Promise<ChatResult> {
  const available = orderedProviders(withSearch);
  if (available.length === 0) {
    return { text: "AI API key sozlanmagan. .env faylga kamida bitta provider key qo'shing.", error: "missing_api_key" };
  }

  const errors: string[] = [];
  for (const provider of available) {
    try {
      if (provider.name === "gemini") return await callGemini(message, systemInstruction);
      return await callOpenAiCompatible(provider, message, systemInstruction, withSearch);
    } catch (error: any) {
      errors.push(`${provider.name}: ${fallbackMessage(error)}`);
      if (!isRetryable(error)) continue;
    }
  }

  console.error("AI providers failed:", errors);
  return {
    text: "AI providerlar hozircha javob bermadi. Birozdan keyin qayta urinib ko'ring.",
    error: "providers_failed",
    retryable: true,
  };
}

export const aiService = {
  async chat(message: string, systemInstruction?: string) {
    return runWithFallback(message, systemInstruction, wantsWebSearch());
  },
  async search(query: string) {
    const prompt = [
      `Qidiruv so'rovi: ${query}`,
      "Internetdan topilgan ma'lumotlar asosida o'zbek tilida aniq, tekshirilgan va manbali javob bering.",
      "Eng muhim faktlar uchun sanalar, raqamlar va rasmiy manbalarni ko'rsating.",
      "Agar aniq manba topilmasa, taxmin qilmang.",
    ].join("\n");
    const result = await runWithFallback(prompt, "Siz qidiruv yordamchisisiz. Natijani faqat o'zbek tilida bering.", true);
    return { text: result.text, sources: result.sources || [], provider: result.provider, model: result.model, error: result.error };
  },
  async improve(text: string) {
    if (!text.trim()) throw new HttpError(400, "Text required");
    return runWithFallback(`Quyidagi matnni ravon o'zbek tilida tahrirlab, mazmunini saqlang:\n\n${text}`);
  },
};
