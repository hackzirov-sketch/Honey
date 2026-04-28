// YouTube Data API v3 integration
// Docs: https://developers.google.com/youtube/v3
// Requires: YOUTUBE_API_KEY env var

const YT_BASE = "https://www.googleapis.com/youtube/v3";

function getKey(): string {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) throw new Error("YOUTUBE_API_KEY not configured");
  return key;
}

export const youtube = {
  isConfigured() {
    return !!process.env.YOUTUBE_API_KEY;
  },

  async search(query: string, maxResults = 12) {
    const key = getKey();
    const url = `${YT_BASE}/search?part=snippet&type=video&maxResults=${maxResults}&q=${encodeURIComponent(query)}&key=${key}`;
    const res = await fetch(url);
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`YouTube search failed: ${res.status} ${err}`);
    }
    const data = await res.json() as any;
    return (data.items || []).map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      channel: item.snippet.channelTitle,
      published_at: item.snippet.publishedAt,
      thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url,
      embed_url: `https://www.youtube.com/embed/${item.id.videoId}`,
      watch_url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }));
  },

  async videoDetail(videoId: string) {
    const key = getKey();
    const url = `${YT_BASE}/videos?part=snippet,statistics,contentDetails&id=${videoId}&key=${key}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`YouTube detail failed: ${res.status}`);
    const data = await res.json() as any;
    const item = (data.items || [])[0];
    if (!item) throw new Error("Video not found");
    return {
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      channel: item.snippet.channelTitle,
      published_at: item.snippet.publishedAt,
      thumbnail: item.snippet.thumbnails?.maxres?.url || item.snippet.thumbnails?.high?.url,
      duration: item.contentDetails?.duration,
      views: item.statistics?.viewCount,
      likes: item.statistics?.likeCount,
      comments: item.statistics?.commentCount,
      embed_url: `https://www.youtube.com/embed/${item.id}`,
      watch_url: `https://www.youtube.com/watch?v=${item.id}`,
    };
  },

  async trending(regionCode = "UZ", maxResults = 24) {
    const key = getKey();
    const url = `${YT_BASE}/videos?part=snippet,statistics&chart=mostPopular&regionCode=${regionCode}&maxResults=${maxResults}&key=${key}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`YouTube trending failed: ${res.status}`);
    const data = await res.json() as any;
    return (data.items || []).map((item: any) => ({
      id: item.id,
      title: item.snippet.title,
      channel: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails?.high?.url,
      views: item.statistics?.viewCount,
      embed_url: `https://www.youtube.com/embed/${item.id}`,
      watch_url: `https://www.youtube.com/watch?v=${item.id}`,
    }));
  },
};
