// OpenLibrary integration — public API, no auth required
// Docs: https://openlibrary.org/developers/api

const OL_BASE = "https://openlibrary.org";
const COVER_BASE = "https://covers.openlibrary.org/b";

type OLSearchDoc = {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  isbn?: string[];
  number_of_pages_median?: number;
  language?: string[];
  edition_count?: number;
};

export const openlibrary = {
  async search(query: string, limit = 20) {
    if (!query.trim()) return { results: [] };
    const url = `${OL_BASE}/search.json?q=${encodeURIComponent(query)}&limit=${limit}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("OpenLibrary search failed");
    const data = await res.json() as { docs: OLSearchDoc[]; numFound: number };
    const results = (data.docs || []).map((d) => ({
      ol_key: d.key,
      title: d.title,
      author: (d.author_name || []).join(", ") || "Noma'lum muallif",
      year: d.first_publish_year || null,
      pages: d.number_of_pages_median || null,
      language: (d.language || [])[0] || null,
      isbn: (d.isbn || [])[0] || null,
      cover_url: d.cover_i ? `${COVER_BASE}/id/${d.cover_i}-M.jpg` : null,
      cover_url_large: d.cover_i ? `${COVER_BASE}/id/${d.cover_i}-L.jpg` : null,
      edition_count: d.edition_count || 0,
      read_url: `https://openlibrary.org${d.key}`,
    }));
    return { results, total: data.numFound || results.length };
  },

  async detail(olKey: string) {
    const key = olKey.startsWith("/") ? olKey : `/works/${olKey}`;
    const url = `${OL_BASE}${key}.json`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("OpenLibrary detail failed");
    const data = await res.json() as any;
    return {
      ol_key: data.key,
      title: data.title,
      description: typeof data.description === "string" ? data.description : (data.description?.value || null),
      subjects: data.subjects || [],
      cover_url: data.covers?.[0] ? `${COVER_BASE}/id/${data.covers[0]}-L.jpg` : null,
      first_publish_date: data.first_publish_date || null,
      read_url: `https://openlibrary.org${data.key}`,
    };
  },

  async trending(subject = "") {
    const url = subject
      ? `${OL_BASE}/subjects/${encodeURIComponent(subject)}.json?limit=24`
      : `${OL_BASE}/trending/daily.json?limit=24`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("OpenLibrary trending failed");
    const data = await res.json() as any;
    const works = data.works || data.trending || [];
    return works.map((w: any) => ({
      ol_key: w.key,
      title: w.title,
      author: (w.authors || []).map((a: any) => a.name).join(", ") || "Noma'lum",
      cover_url: w.cover_id ? `${COVER_BASE}/id/${w.cover_id}-M.jpg` : null,
      read_url: `https://openlibrary.org${w.key}`,
    }));
  },
};
