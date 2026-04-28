// Zoom Server-to-Server OAuth integration
// Docs: https://developers.zoom.us/docs/api/
// Requires: ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET env vars

const ZOOM_OAUTH_URL = "https://zoom.us/oauth/token";
const ZOOM_API_BASE = "https://api.zoom.us/v2";

let cachedToken: { value: string; expiresAt: number } | null = null;

function getCreds() {
  const accountId = process.env.ZOOM_ACCOUNT_ID;
  const clientId = process.env.ZOOM_CLIENT_ID;
  const clientSecret = process.env.ZOOM_CLIENT_SECRET;
  if (!accountId || !clientId || !clientSecret) {
    throw new Error("Zoom credentials not configured");
  }
  return { accountId, clientId, clientSecret };
}

async function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.value;
  }
  const { accountId, clientId, clientSecret } = getCreds();
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const url = `${ZOOM_OAUTH_URL}?grant_type=account_credentials&account_id=${accountId}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Zoom OAuth failed: ${res.status} ${err}`);
  }
  const data = await res.json() as any;
  cachedToken = {
    value: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 60) * 1000,
  };
  return cachedToken.value;
}

export const zoom = {
  isConfigured() {
    return !!(process.env.ZOOM_ACCOUNT_ID && process.env.ZOOM_CLIENT_ID && process.env.ZOOM_CLIENT_SECRET);
  },

  async listMeetings(userId = "me") {
    const token = await getAccessToken();
    const url = `${ZOOM_API_BASE}/users/${userId}/meetings?type=upcoming&page_size=30`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Zoom list meetings failed: ${res.status} ${err}`);
    }
    const data = await res.json() as any;
    return (data.meetings || []).map((m: any) => ({
      id: m.id,
      uuid: m.uuid,
      topic: m.topic,
      start_time: m.start_time,
      duration: m.duration,
      timezone: m.timezone,
      join_url: m.join_url,
      agenda: m.agenda,
      created_at: m.created_at,
    }));
  },

  async createMeeting(opts: { topic: string; start_time?: string; duration?: number; agenda?: string }, userId = "me") {
    const token = await getAccessToken();
    const url = `${ZOOM_API_BASE}/users/${userId}/meetings`;
    const body = {
      topic: opts.topic,
      type: opts.start_time ? 2 : 1, // 1 = instant, 2 = scheduled
      start_time: opts.start_time,
      duration: opts.duration || 60,
      agenda: opts.agenda || "",
      settings: {
        host_video: true,
        participant_video: true,
        join_before_host: false,
        mute_upon_entry: true,
        waiting_room: true,
        approval_type: 0,
      },
    };
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Zoom create meeting failed: ${res.status} ${err}`);
    }
    const m = await res.json() as any;
    return {
      id: m.id,
      uuid: m.uuid,
      topic: m.topic,
      start_time: m.start_time,
      duration: m.duration,
      join_url: m.join_url,
      start_url: m.start_url,
      password: m.password,
    };
  },

  async deleteMeeting(meetingId: string | number) {
    const token = await getAccessToken();
    const url = `${ZOOM_API_BASE}/meetings/${meetingId}`;
    const res = await fetch(url, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok && res.status !== 204) {
      const err = await res.text();
      throw new Error(`Zoom delete meeting failed: ${res.status} ${err}`);
    }
    return { success: true };
  },
};
