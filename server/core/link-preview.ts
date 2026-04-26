export type LinkPreview = {
  type: "youtube" | "instagram" | "link";
  url: string;
  title: string;
  site_name: string;
  embed_url?: string;
  thumbnail?: string;
};

const urlPattern = /(https?:\/\/[^\s<>"']+)/i;

function cleanUrl(value: string) {
  return value.trim().replace(/[),.!?]+$/g, "");
}

function parseUrl(value?: string | null) {
  if (!value) return null;
  try {
    return new URL(cleanUrl(value));
  } catch {
    return null;
  }
}

export function extractFirstUrl(content?: string | null) {
  const match = content?.match(urlPattern);
  return match ? cleanUrl(match[1]) : null;
}

export function extractYoutubeId(value?: string | null) {
  const parsed = parseUrl(value);
  if (!parsed) return "";

  const host = parsed.hostname.replace(/^www\./, "");
  if (host === "youtu.be") {
    return parsed.pathname.split("/").filter(Boolean)[0] || "";
  }

  if (!host.endsWith("youtube.com") && !host.endsWith("youtube-nocookie.com")) {
    return "";
  }

  const parts = parsed.pathname.split("/").filter(Boolean);
  if (parsed.pathname === "/watch") return parsed.searchParams.get("v") || "";
  if (parts[0] === "embed" || parts[0] === "shorts" || parts[0] === "live") return parts[1] || "";
  return "";
}

export function extractInstagramEmbedUrl(value?: string | null) {
  const parsed = parseUrl(value);
  if (!parsed) return "";

  const host = parsed.hostname.replace(/^www\./, "");
  if (!host.endsWith("instagram.com")) return "";

  const match = parsed.pathname.match(/^\/(p|reel|tv)\/([^/?#]+)/i);
  if (!match) return "";

  return `https://www.instagram.com/${match[1]}/${match[2]}/embed`;
}

export function resolveVideoEmbedUrl(videoUrl?: string | null, explicitEmbed?: string | null) {
  if (explicitEmbed) return cleanUrl(explicitEmbed);

  const youtubeId = extractYoutubeId(videoUrl);
  if (youtubeId) return `https://www.youtube.com/embed/${youtubeId}`;

  return extractInstagramEmbedUrl(videoUrl) || null;
}

export function isLocalUploadUrl(value?: string | null) {
  return !!value && /^\/uploads\//.test(value);
}

export function detectVideoSource(videoUrl?: string | null, embedUrl?: string | null) {
  if (isLocalUploadUrl(videoUrl)) return "upload";
  if (extractYoutubeId(videoUrl) || extractYoutubeId(embedUrl)) return "youtube";
  if (extractInstagramEmbedUrl(videoUrl) || extractInstagramEmbedUrl(embedUrl)) return "instagram";
  return videoUrl || embedUrl ? "external" : "unknown";
}

export function detectLinkPreview(content?: string | null): LinkPreview | null {
  const url = extractFirstUrl(content);
  if (!url) return null;

  const youtubeId = extractYoutubeId(url);
  if (youtubeId) {
    return {
      type: "youtube",
      url,
      title: "YouTube video",
      site_name: "YouTube",
      embed_url: `https://www.youtube.com/embed/${youtubeId}`,
      thumbnail: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
    };
  }

  const instagramEmbed = extractInstagramEmbedUrl(url);
  if (instagramEmbed) {
    return {
      type: "instagram",
      url,
      title: "Instagram post yoki reel",
      site_name: "Instagram",
      embed_url: instagramEmbed,
    };
  }

  const parsed = parseUrl(url);
  return {
    type: "link",
    url,
    title: parsed?.hostname.replace(/^www\./, "") || "Havola",
    site_name: parsed?.hostname.replace(/^www\./, "") || "Havola",
  };
}
