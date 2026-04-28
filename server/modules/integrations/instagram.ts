// Instagram Basic Display / Graph API integration
// Docs: https://developers.facebook.com/products/instagram/apis/
// Requires: INSTAGRAM_ACCESS_TOKEN env var (long-lived user token)

const IG_BASE = "https://graph.instagram.com";

function getToken(): string {
  const t = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!t) throw new Error("INSTAGRAM_ACCESS_TOKEN not configured");
  return t;
}

export const instagram = {
  isConfigured() {
    return !!process.env.INSTAGRAM_ACCESS_TOKEN;
  },

  async profile() {
    const token = getToken();
    const fields = "id,username,account_type,media_count";
    const url = `${IG_BASE}/me?fields=${fields}&access_token=${token}`;
    const res = await fetch(url);
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Instagram profile failed: ${res.status} ${err}`);
    }
    return res.json();
  },

  async feed(limit = 12) {
    const token = getToken();
    const fields = "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username";
    const url = `${IG_BASE}/me/media?fields=${fields}&limit=${limit}&access_token=${token}`;
    const res = await fetch(url);
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Instagram feed failed: ${res.status} ${err}`);
    }
    const data = await res.json() as any;
    return (data.data || []).map((post: any) => ({
      id: post.id,
      caption: post.caption || "",
      media_type: post.media_type,
      media_url: post.media_url,
      thumbnail_url: post.thumbnail_url || post.media_url,
      permalink: post.permalink,
      timestamp: post.timestamp,
      username: post.username,
    }));
  },
};
