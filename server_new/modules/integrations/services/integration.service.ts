import { AppError } from "../../../errors";

const OPEN_LIBRARY_BASE = "https://openlibrary.org";
const OPEN_LIBRARY_COVER_BASE = "https://covers.openlibrary.org/b";
const YOUTUBE_BASE = "https://www.googleapis.com/youtube/v3";
const INSTAGRAM_BASE = "https://graph.instagram.com";
const ZOOM_OAUTH_URL = "https://zoom.us/oauth/token";
const ZOOM_API_BASE = "https://api.zoom.us/v2";

interface OpenLibrarySearchDoc {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  isbn?: string[];
  number_of_pages_median?: number;
  language?: string[];
  edition_count?: number;
}

interface YouTubeSearchItem {
  id?: { videoId?: string };
  snippet?: {
    title?: string;
    description?: string;
    channelTitle?: string;
    publishedAt?: string;
    thumbnails?: {
      high?: { url?: string };
      medium?: { url?: string };
      maxres?: { url?: string };
    };
  };
}

interface YouTubeVideoItem {
  id?: string;
  snippet?: {
    title?: string;
    description?: string;
    channelTitle?: string;
    publishedAt?: string;
    thumbnails?: {
      high?: { url?: string };
      maxres?: { url?: string };
    };
  };
  statistics?: {
    viewCount?: string;
    likeCount?: string;
    commentCount?: string;
  };
  contentDetails?: {
    duration?: string;
  };
}

type ZoomTokenCache = {
  value: string;
  expiresAt: number;
};

let zoomTokenCache: ZoomTokenCache | null = null;

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);

  if (!response.ok) {
    const body = await response.text();
    throw new AppError(
      `External API request failed (${response.status})`,
      response.status >= 500 ? 502 : response.status,
      "EXTERNAL_API_ERROR",
      { url, status: response.status, body },
    );
  }

  return (await response.json()) as T;
}

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new AppError(
      `${key} is not configured`,
      503,
      "INTEGRATION_NOT_CONFIGURED",
    );
  }
  return value;
}

function parseLimit(raw: unknown, fallback: number, max: number): number {
  const parsed = Number(raw);
  if (Number.isNaN(parsed) || parsed <= 0) return fallback;
  return Math.min(parsed, max);
}

async function getZoomAccessToken(): Promise<string> {
  if (zoomTokenCache && zoomTokenCache.expiresAt > Date.now() + 60_000) {
    return zoomTokenCache.value;
  }

  const accountId = requireEnv("ZOOM_ACCOUNT_ID");
  const clientId = requireEnv("ZOOM_CLIENT_ID");
  const clientSecret = requireEnv("ZOOM_CLIENT_SECRET");
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const url = `${ZOOM_OAUTH_URL}?grant_type=account_credentials&account_id=${accountId}`;

  const tokenResponse = await fetchJson<{ access_token: string; expires_in: number }>(
    url,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );

  zoomTokenCache = {
    value: tokenResponse.access_token,
    expiresAt: Date.now() + Math.max(60, tokenResponse.expires_in - 60) * 1_000,
  };

  return zoomTokenCache.value;
}

export const integrationService = {
  status() {
    return {
      openlibrary: true,
      youtube: Boolean(process.env.YOUTUBE_API_KEY),
      instagram: Boolean(process.env.INSTAGRAM_ACCESS_TOKEN),
      zoom: Boolean(
        process.env.ZOOM_ACCOUNT_ID &&
          process.env.ZOOM_CLIENT_ID &&
          process.env.ZOOM_CLIENT_SECRET,
      ),
    };
  },

  async openLibrarySearch(query: string, rawLimit?: unknown) {
    if (!query.trim()) {
      return { results: [], total: 0 };
    }

    const limit = parseLimit(rawLimit, 20, 50);
    const url = `${OPEN_LIBRARY_BASE}/search.json?q=${encodeURIComponent(query)}&limit=${limit}`;
    const payload = await fetchJson<{ docs: OpenLibrarySearchDoc[]; numFound: number }>(url);

    const results = (payload.docs ?? []).map((doc) => ({
      ol_key: doc.key,
      title: doc.title,
      author: (doc.author_name ?? []).join(", ") || "Unknown author",
      year: doc.first_publish_year ?? null,
      pages: doc.number_of_pages_median ?? null,
      language: (doc.language ?? [])[0] ?? null,
      isbn: (doc.isbn ?? [])[0] ?? null,
      cover_url: doc.cover_i ? `${OPEN_LIBRARY_COVER_BASE}/id/${doc.cover_i}-M.jpg` : null,
      cover_url_large: doc.cover_i
        ? `${OPEN_LIBRARY_COVER_BASE}/id/${doc.cover_i}-L.jpg`
        : null,
      edition_count: doc.edition_count ?? 0,
      read_url: `https://openlibrary.org${doc.key}`,
    }));

    return { results, total: payload.numFound ?? results.length };
  },

  async openLibraryTrending(subject?: string) {
    const path = subject?.trim()
      ? `/subjects/${encodeURIComponent(subject.trim())}.json?limit=24`
      : "/trending/daily.json?limit=24";
    const payload = await fetchJson<{ works?: Array<{ key?: string; title?: string; cover_id?: number; authors?: Array<{ name?: string }> }>; trending?: Array<{ key?: string; title?: string; cover_id?: number; authors?: Array<{ name?: string }> }> }>(
      `${OPEN_LIBRARY_BASE}${path}`,
    );

    const items = (payload.works ?? payload.trending ?? []).map((work) => ({
      ol_key: work.key ?? "",
      title: work.title ?? "",
      author: (work.authors ?? []).map((author) => author.name ?? "").filter(Boolean).join(", ") || "Unknown",
      cover_url: work.cover_id
        ? `${OPEN_LIBRARY_COVER_BASE}/id/${work.cover_id}-M.jpg`
        : null,
      read_url: work.key ? `https://openlibrary.org${work.key}` : null,
    }));

    return items;
  },

  async openLibraryDetail(rawKey: string) {
    const key = rawKey.startsWith("/") ? rawKey : `/works/${rawKey}`;
    const payload = await fetchJson<{
      key?: string;
      title?: string;
      description?: string | { value?: string };
      subjects?: string[];
      covers?: number[];
      first_publish_date?: string;
    }>(`${OPEN_LIBRARY_BASE}${key}.json`);

    return {
      ol_key: payload.key ?? key,
      title: payload.title ?? "",
      description:
        typeof payload.description === "string"
          ? payload.description
          : payload.description?.value ?? null,
      subjects: payload.subjects ?? [],
      cover_url: payload.covers?.[0]
        ? `${OPEN_LIBRARY_COVER_BASE}/id/${payload.covers[0]}-L.jpg`
        : null,
      first_publish_date: payload.first_publish_date ?? null,
      read_url: payload.key ? `https://openlibrary.org${payload.key}` : null,
    };
  },

  async youtubeSearch(query: string, rawLimit?: unknown) {
    const apiKey = requireEnv("YOUTUBE_API_KEY");
    const limit = parseLimit(rawLimit, 12, 30);

    const url =
      `${YOUTUBE_BASE}/search?part=snippet&type=video` +
      `&maxResults=${limit}&q=${encodeURIComponent(query)}&key=${apiKey}`;

    const payload = await fetchJson<{ items?: YouTubeSearchItem[] }>(url);

    return (payload.items ?? [])
      .map((item) => {
        const videoId = item.id?.videoId;
        if (!videoId) return null;
        return {
          id: videoId,
          title: item.snippet?.title ?? "",
          description: item.snippet?.description ?? "",
          channel: item.snippet?.channelTitle ?? "",
          published_at: item.snippet?.publishedAt ?? "",
          thumbnail:
            item.snippet?.thumbnails?.high?.url ??
            item.snippet?.thumbnails?.medium?.url ??
            null,
          embed_url: `https://www.youtube.com/embed/${videoId}`,
          watch_url: `https://www.youtube.com/watch?v=${videoId}`,
        };
      })
      .filter((value): value is NonNullable<typeof value> => value !== null);
  },

  async youtubeTrending(rawRegion?: string, rawLimit?: unknown) {
    const apiKey = requireEnv("YOUTUBE_API_KEY");
    const limit = parseLimit(rawLimit, 24, 50);
    const region = (rawRegion ?? "UZ").trim() || "UZ";
    const url =
      `${YOUTUBE_BASE}/videos?part=snippet,statistics&chart=mostPopular` +
      `&regionCode=${encodeURIComponent(region)}&maxResults=${limit}&key=${apiKey}`;

    const payload = await fetchJson<{ items?: YouTubeVideoItem[] }>(url);
    return (payload.items ?? []).map((item) => ({
      id: item.id ?? "",
      title: item.snippet?.title ?? "",
      channel: item.snippet?.channelTitle ?? "",
      thumbnail: item.snippet?.thumbnails?.high?.url ?? null,
      views: item.statistics?.viewCount ?? "0",
      embed_url: item.id ? `https://www.youtube.com/embed/${item.id}` : null,
      watch_url: item.id ? `https://www.youtube.com/watch?v=${item.id}` : null,
    }));
  },

  async youtubeDetail(videoId: string) {
    const apiKey = requireEnv("YOUTUBE_API_KEY");
    const url =
      `${YOUTUBE_BASE}/videos?part=snippet,statistics,contentDetails` +
      `&id=${encodeURIComponent(videoId)}&key=${apiKey}`;
    const payload = await fetchJson<{ items?: YouTubeVideoItem[] }>(url);
    const item = payload.items?.[0];

    if (!item || !item.id) {
      throw new AppError("YouTube video not found", 404, "NOT_FOUND");
    }

    return {
      id: item.id,
      title: item.snippet?.title ?? "",
      description: item.snippet?.description ?? "",
      channel: item.snippet?.channelTitle ?? "",
      published_at: item.snippet?.publishedAt ?? "",
      thumbnail:
        item.snippet?.thumbnails?.maxres?.url ??
        item.snippet?.thumbnails?.high?.url ??
        null,
      duration: item.contentDetails?.duration ?? null,
      views: item.statistics?.viewCount ?? "0",
      likes: item.statistics?.likeCount ?? "0",
      comments: item.statistics?.commentCount ?? "0",
      embed_url: `https://www.youtube.com/embed/${item.id}`,
      watch_url: `https://www.youtube.com/watch?v=${item.id}`,
    };
  },

  async instagramProfile() {
    const token = requireEnv("INSTAGRAM_ACCESS_TOKEN");
    const fields = "id,username,account_type,media_count";
    const url = `${INSTAGRAM_BASE}/me?fields=${fields}&access_token=${token}`;
    return fetchJson<Record<string, unknown>>(url);
  },

  async instagramFeed(rawLimit?: unknown) {
    const token = requireEnv("INSTAGRAM_ACCESS_TOKEN");
    const limit = parseLimit(rawLimit, 12, 30);
    const fields =
      "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username";
    const url =
      `${INSTAGRAM_BASE}/me/media?fields=${fields}` +
      `&limit=${limit}&access_token=${token}`;

    const payload = await fetchJson<{
      data?: Array<{
        id?: string;
        caption?: string;
        media_type?: string;
        media_url?: string;
        thumbnail_url?: string;
        permalink?: string;
        timestamp?: string;
        username?: string;
      }>;
    }>(url);

    return (payload.data ?? []).map((post) => ({
      id: post.id ?? "",
      caption: post.caption ?? "",
      media_type: post.media_type ?? "",
      media_url: post.media_url ?? null,
      thumbnail_url: post.thumbnail_url ?? post.media_url ?? null,
      permalink: post.permalink ?? null,
      timestamp: post.timestamp ?? null,
      username: post.username ?? null,
    }));
  },

  async zoomMeetings(userId = "me") {
    const token = await getZoomAccessToken();
    const url = `${ZOOM_API_BASE}/users/${encodeURIComponent(userId)}/meetings?type=upcoming&page_size=30`;
    const payload = await fetchJson<{
      meetings?: Array<{
        id?: string | number;
        uuid?: string;
        topic?: string;
        start_time?: string;
        duration?: number;
        timezone?: string;
        join_url?: string;
        agenda?: string;
        created_at?: string;
      }>;
    }>(url, { headers: { Authorization: `Bearer ${token}` } });

    return (payload.meetings ?? []).map((meeting) => ({
      id: meeting.id ?? "",
      uuid: meeting.uuid ?? "",
      topic: meeting.topic ?? "",
      start_time: meeting.start_time ?? "",
      duration: meeting.duration ?? 0,
      timezone: meeting.timezone ?? "",
      join_url: meeting.join_url ?? "",
      agenda: meeting.agenda ?? "",
      created_at: meeting.created_at ?? "",
    }));
  },

  async createZoomMeeting(
    input: { topic: string; start_time?: string; duration?: number; agenda?: string },
    userId = "me",
  ) {
    const token = await getZoomAccessToken();
    const url = `${ZOOM_API_BASE}/users/${encodeURIComponent(userId)}/meetings`;
    const payload = await fetchJson<{
      id?: string | number;
      uuid?: string;
      topic?: string;
      start_time?: string;
      duration?: number;
      join_url?: string;
      start_url?: string;
      password?: string;
    }>(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic: input.topic,
        type: input.start_time ? 2 : 1,
        start_time: input.start_time,
        duration: input.duration ?? 60,
        agenda: input.agenda ?? "",
        settings: {
          host_video: true,
          participant_video: true,
          join_before_host: false,
          mute_upon_entry: true,
          waiting_room: true,
          approval_type: 0,
        },
      }),
    });

    return {
      id: payload.id ?? "",
      uuid: payload.uuid ?? "",
      topic: payload.topic ?? "",
      start_time: payload.start_time ?? "",
      duration: payload.duration ?? 0,
      join_url: payload.join_url ?? "",
      start_url: payload.start_url ?? "",
      password: payload.password ?? "",
    };
  },

  async deleteZoomMeeting(meetingId: string) {
    const token = await getZoomAccessToken();
    const url = `${ZOOM_API_BASE}/meetings/${encodeURIComponent(meetingId)}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok && response.status !== 204) {
      const body = await response.text();
      throw new AppError(
        "Failed to delete Zoom meeting",
        502,
        "EXTERNAL_API_ERROR",
        { status: response.status, body },
      );
    }

    return { success: true };
  },
};

