import React, { useState, useEffect, useRef } from 'react';
import { API_BASE_URL, API_ENDPOINTS, getAuthToken } from '@/config/api.config';

interface Comment {
  id: string;
  userName: string;
  text: string;
  timestamp: Date;
}

interface BackendVideo {
  id: string;
  title: string;
  description: string;
  video: string;
  video_embed: string;
  file: string;
  cover: string;
  views: number;
  likes_count: number;
  is_liked: boolean;
  category_name: string;
  comments: any[];
  uploader?: { username: string; avatar?: string };
}

interface Video {
  id: string;
  title: string;
  channel: string;
  url: string;
  embedUrl: string;
  file?: string;
  thumbnail: string;
  duration: string;
  likes: number;
  isLiked: boolean;
  views: string;
  category: string;
  description: string;
  comments: any[];
  uploaderAvatar?: string;
  uploaderName?: string;
}

const CATEGORIES = ['Barchasi', 'Dizayn', 'Dasturlash', 'Biznes', 'Marketing', 'Psixologiya'];

// --- Video Comments Component ---
const VideoComments: React.FC<{ videoId: string; comments: any[]; onCommentAdded: () => void }> = ({ videoId, comments, onCommentAdded }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.VIDEO.COMMENT(videoId)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('honey_access_token')}`
        },
        body: JSON.stringify({ text: input }),
      });
      if (res.ok) {
        setInput('');
        onCommentAdded();
      }
    } catch (e) { } finally { setLoading(false); }
  };

  return (
    <div className="glass p-6 sm:p-12 rounded-[2rem] sm:rounded-[4rem] border border-white/10 flex flex-col h-[600px]">
      <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-8 flex items-center gap-3">
        <i className="fas fa-comments text-honey"></i>
        FIKRLAR ({comments.length})
      </h3>
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6 mb-6 pr-2">
        {comments.length === 0 ? (
          <p className="text-center text-gray-500 py-10 font-bold uppercase text-[10px]">Birinchi bo'lib fikr qoldiring...</p>
        ) : (
          comments.map((m, i) => (
            <div key={i} className="flex gap-4 animate-fadeIn">
              <div className="w-10 h-10 rounded-full bg-honey/10 border border-honey/20 flex items-center justify-center shrink-0">
                <i className="fas fa-user text-honey text-xs"></i>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-white font-black text-xs uppercase">{m.user?.username || 'Foydalanuvchi'}</span>
                  <span className="text-[10px] text-gray-500 font-bold">{new Date(m.created_at).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-300 text-sm font-medium leading-relaxed">{m.text}</p>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="flex gap-4 p-2 bg-white/5 rounded-2xl border border-white/10 focus-within:border-honey/50 transition-all">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Fikringizni qoldiring..."
          className="flex-1 bg-transparent border-none outline-none text-white font-bold px-4 text-sm"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-honey text-black px-6 py-3 rounded-xl font-black text-[10px] active:scale-95"
        >
          {loading ? '...' : 'YUBORISH'}
        </button>
      </div>
    </div>
  );
};

const Media: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('honey_user') || 'null');
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Barchasi');
  const [categories, setCategories] = useState<string[]>(['Barchasi']);

  const authHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAuthToken()}`,
  });

  const filteredVideos = videos.filter(
    v =>
      (activeCategory === 'Barchasi' || v.category === activeCategory) &&
      v.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const extractYoutubeId = (url: string): string => {
    if (!url) return '';
    if (url.includes('v=')) return url.split('v=')[1]?.split('&')[0] || '';
    if (url.includes('be/')) return url.split('be/')[1]?.split('?')[0] || '';
    if (url.includes('embed/')) return url.split('embed/')[1]?.split('?')[0] || '';
    return '';
  };

  const fetchVideos = async () => {
    setIsLoading(true);
    try {
      // Fetch Categories
      const catRes = await fetch(`${API_BASE_URL}${API_ENDPOINTS.VIDEO.CATEGORIES}`);
      if (catRes.ok) {
        const catData = await catRes.json();
        const names = catData.results ? catData.results.map((c: any) => c.name) : catData.map((c: any) => c.name);
        setCategories(['Barchasi', ...names]);
      }

      // Fetch Videos
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.VIDEO.LIST}`, {
        headers: authHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        const list: BackendVideo[] = data.results || data;
        const mapped: Video[] = list.map(v => {
          const yid = extractYoutubeId(v.video);
          return {
            id: v.id,
            title: v.title,
            channel: 'Honey Academy',
            url: v.video || '',
            embedUrl: v.video_embed || (yid ? `https://www.youtube.com/embed/${yid}` : ''),
            file: v.file,
            thumbnail: v.cover || '',
            duration: '12:00',
            likes: v.likes_count || 0,
            isLiked: v.is_liked || false,
            views: v.views >= 1000 ? (v.views / 1000).toFixed(1) + 'K' : v.views.toString(),
            category: v.category_name || 'Barchasi',
            description: v.description || "",
            comments: v.comments || [],
            uploaderAvatar: v.uploader?.avatar,
            uploaderName: v.uploader?.username
          };
        });
        setVideos(mapped);

        // Refresh selected video if exists
        if (selectedVideo) {
          const updated = mapped.find(v => v.id === selectedVideo.id);
          if (updated) setSelectedVideo(updated);
        }

        localStorage.setItem('honey_media_cache', JSON.stringify(mapped));
      }
    } catch (err) {
      const cached = localStorage.getItem('honey_media_cache');
      if (cached) setVideos(JSON.parse(cached));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleCommentAdded = () => {
    fetchVideos();
  };

  const handleLike = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.VIDEO.LIST}${id}/like/`, {
        method: 'POST',
        headers: authHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        // Update local state
        setVideos(prev => prev.map(v => {
          if (v.id === id) {
            return {
              ...v,
              isLiked: data.is_liked,
              likes: data.is_liked ? v.likes + 1 : v.likes - 1
            };
          }
          return v;
        }));
        if (selectedVideo?.id === id) {
          setSelectedVideo(prev => prev ? {
            ...prev,
            isLiked: data.is_liked,
            likes: data.is_liked ? prev.likes + 1 : prev.likes - 1
          } : null);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm("Haqiqatan ham ushbu videoni o'chirmoqchimisiz?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.VIDEO.LIST}${id}/`, {
        method: 'DELETE',
        headers: authHeaders(),
      });
      if (res.ok) {
        setVideos(prev => prev.filter(v => v.id !== id));
        if (selectedVideo?.id === id) setSelectedVideo(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ── Kirish talab qiladigan sahifa ──
  if (!user) {
    return (
      <div className="container mx-auto px-6 py-20 flex flex-col items-center justify-center text-center space-y-12 animate-fadeIn pb-64">
        <div className="w-32 h-32 bg-honey/10 rounded-[3rem] border border-honey/20 flex items-center justify-center text-5xl text-honey animate-float-soft">
          <i className="fas fa-vr-cardboard"></i>
        </div>
        <div className="max-w-3xl space-y-6">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter honey-glow-text">Immersive Media</h1>
          <p className="text-xl md:text-2xl text-gray-200 font-bold leading-relaxed">
            4K sifatdagi darsliklar va interaktiv bilimlar oqimi.
            Honey Streaming Studio orqali dunyodagi eng sara darslarni yuqori sifatda tomosha qiling.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mt-12">
            <div className="glass-premium p-6 rounded-3xl border-white/5">
              <i className="fas fa-tv text-honey mb-4 text-2xl"></i>
              <h4 className="text-white font-black uppercase mb-2">4K Darsliklar</h4>
              <p className="text-gray-300 text-sm font-bold">Har bir mavzu bo'yicha mukammal video kontentlar.</p>
            </div>
            <div className="glass-premium p-6 rounded-3xl border-white/5">
              <i className="fas fa-broadcast-tower text-red-500 mb-4 text-2xl"></i>
              <h4 className="text-white font-black uppercase mb-2">Jonli Efirlar</h4>
              <p className="text-gray-300 text-sm font-bold">Mentorlar bilan bevosita efirda muloqot va amaliy darslar.</p>
            </div>
          </div>
          <div className="pt-12">
            <a href="#/auth" className="bg-honey text-white px-12 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-honey/20 hover:scale-105 transition-all inline-block">
              STREAMNI BOSHLASH
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ── Video detail ko'rinishi ──
  if (selectedVideo) {
    return (
      <div className="container mx-auto px-6 py-12 animate-fadeIn pb-64">
        <button onClick={() => setSelectedVideo(null)} className="flex items-center gap-4 text-honey font-black uppercase tracking-widest mb-10 hover:translate-x-2 transition-transform drop-shadow-[0_0_8px_#FFB800]">
          <i className="fas fa-arrow-left"></i> ORQAGA QAYTISH
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6 md:space-y-10">
            <div className="aspect-video w-full rounded-2xl sm:rounded-[4rem] border-[4px] sm:border-[10px] border-honey/10 overflow-hidden shadow-[0_0_120px_rgba(255,184,0,0.15)] bg-black relative">
              <div className="absolute inset-0 border border-honey/40 rounded-2xl sm:rounded-[4rem] z-10 pointer-events-none"></div>
              {selectedVideo.file ? (
                <video
                  src={selectedVideo.file}
                  controls
                  autoPlay
                  className="w-full h-full relative z-0"
                  poster={selectedVideo.thumbnail}
                ></video>
              ) : selectedVideo.embedUrl ? (
                <iframe title={selectedVideo.title} src={`${selectedVideo.embedUrl}?autoplay=1&rel=0`} className="w-full h-full relative z-0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                  <i className="fas fa-play-circle text-8xl text-honey/20"></i>
                  <p className="text-gray-500 font-black text-base">Video formatida xatolik</p>
                </div>
              )}
            </div>

            <div className="glass p-6 sm:p-12 rounded-[2rem] sm:rounded-[4rem] border border-honey/20">
              <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
                <div>
                  <span className="text-honey font-black text-[10px] uppercase tracking-widest mb-2 block">{selectedVideo.category}</span>
                  <h1 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tighter">{selectedVideo.title}</h1>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleLike(selectedVideo.id)}
                    className={`flex items-center gap-3 px-8 py-5 rounded-3xl font-black transition-all border-2 shrink-0 active:scale-95 ${selectedVideo.isLiked ? 'bg-honey text-white border-honey shadow-lg shadow-honey/30' : 'bg-white/5 text-honey border-honey/30 hover:border-honey/60'}`}
                  >
                    <i className={`${selectedVideo.isLiked ? 'fas' : 'far'} fa-heart text-xl`}></i>
                    <span>{selectedVideo.likes} LIKES</span>
                  </button>
                  {(user?.is_superuser || user?.is_staff || user?.username === 'admin') && (
                    <button
                      onClick={(e) => handleDelete(selectedVideo.id, e as any)}
                      className="flex items-center gap-3 px-8 py-5 rounded-3xl font-black bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500 transition-all hover:text-white active:scale-95 shrink-0"
                    >
                      <i className="fas fa-trash-alt text-xl"></i>
                      <span>O'CHIRISH</span>
                    </button>
                  )}
                </div>
              </div>
              <div className="pt-6 border-t border-white/5">
                <p className="text-gray-300 text-xl leading-relaxed font-bold opacity-80">{selectedVideo.description}</p>
              </div>
            </div>

            <VideoComments videoId={selectedVideo.id} comments={selectedVideo.comments} onCommentAdded={handleCommentAdded} />
          </div>

          <div>
            <div className="glass p-10 rounded-[3.5rem] border border-honey/20 sticky top-32">
              <h4 className="text-honey font-black uppercase tracking-widest text-[10px] mb-10 text-center">Tavsiya etiladigan darslar</h4>
              <div className="space-y-8">
                {videos.filter(v => v.id !== selectedVideo.id).slice(0, 6).map(v => (
                  <div key={v.id} onClick={() => setSelectedVideo(v)} className="flex gap-4 group cursor-pointer hover:scale-105 transition-all">
                    <div className="w-32 aspect-video rounded-2xl overflow-hidden shrink-0 border border-white/10 group-hover:border-honey transition-all">
                      <img src={v.thumbnail} className="w-full h-full object-cover" alt={v.title} />
                    </div>
                    <div className="py-1">
                      <h5 className="font-black text-[12px] text-white uppercase line-clamp-2 group-hover:text-honey transition-colors">{v.title}</h5>
                      <p className="text-[9px] text-gray-600 font-black mt-2 uppercase">HONEY ACADEMY</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Asosiy ro'yxat ko'rinishi ──
  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 animate-fadeIn pb-32 md:pb-64">
      <div className="mb-12 md:mb-20">
        <div className="inline-flex items-center space-x-4 text-honey mb-6 bg-honey/5 px-6 py-2 rounded-full border border-honey/20">
          <i className="fas fa-play-circle text-2xl drop-shadow-[0_0_15px_#FFB800]"></i>
          <span className="text-[12px] font-black uppercase tracking-[0.5em]">Jonli Darslar &amp; Stream</span>
        </div>
        <h1 className="text-4xl md:text-8xl font-black honey-glow-text tracking-tighter uppercase leading-none">STREAMING STUDIO</h1>
      </div>

      <div className="flex flex-col gap-8 mb-12">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="relative w-full md:max-w-xl">
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              placeholder="Videolarni qidiring..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white outline-none focus:border-honey/50 transition-all font-bold" />
            <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-gray-500"></i>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            {(user?.is_superuser || user?.is_staff || user?.username === 'admin') && (
              <a href="#/admin" className="glass-btn text-white md:text-inherit px-8 py-3 text-[10px] uppercase tracking-widest font-black rounded-xl hover:bg-honey hover:text-black transition-all flex items-center gap-2">
                <i className="fas fa-plus"></i> VIDEO YUKLASH
              </a>
            )}
            <button className="bg-red-600 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest animate-pulse flex items-center gap-3 shadow-lg shadow-red-500/20">
              <span className="w-2 h-2 bg-white rounded-full"></span> JONLI EFIRDA
            </button>
            <button onClick={fetchVideos} disabled={isLoading}
              className="bg-honey text-white px-8 py-3 text-[10px] uppercase tracking-widest font-black rounded-xl active:scale-95 disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-honey/20">
              {isLoading
                ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span> Yuklanmoqda</>
                : <>YANGILASH <i className="fas fa-sync-alt"></i></>}
            </button>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border active:scale-95 ${activeCategory === cat ? 'bg-white text-black border-white' : 'bg-white/5 text-white border-white/10 hover:bg-white/10'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32">
          <div className="w-16 h-16 border-4 border-honey border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 mt-6 font-bold uppercase tracking-widest text-xs">Videolar yuklanmoqda...</p>
        </div>
      ) : filteredVideos.length === 0 ? (
        <div className="py-32 text-center glass-premium rounded-[4rem]">
          <i className="fas fa-video text-6xl text-honey/20 mb-10"></i>
          <h2 className="text-4xl font-black text-white mb-6 uppercase tracking-tighter">Video topilmadi</h2>
          <p className="text-gray-500 font-bold mb-10">Admin panel orqali videolar qo'shing yoki qidiruv so'rovini o'zgartiring.</p>
          <button onClick={() => { setSearchQuery(''); setActiveCategory('Barchasi'); }}
            className="bg-honey text-white px-12 py-5 uppercase tracking-widest text-xs rounded-2xl font-black">
            Barchasini ko'rish
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 md:gap-12">
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredVideos.map(video => (
                <div key={video.id} onClick={() => setSelectedVideo(video)} className="group cursor-pointer">
                  <div className="aspect-video rounded-[2.5rem] overflow-hidden mb-6 glass-premium relative group-hover:scale-[1.02] transition-all duration-700 shadow-2xl">
                    {video.thumbnail ? (
                      <img src={video.thumbnail} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt={video.title} />
                    ) : video.file ? (
                      <video src={video.file} className="w-full h-full object-cover opacity-60" preload="metadata" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-white/5">
                        <i className="fas fa-play-circle text-6xl text-white/5"></i>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
                      <div className="w-20 h-20 bg-honey text-white rounded-full flex items-center justify-center text-3xl shadow-[0_0_50px_rgba(255,184,0,0.5)]">
                        <i className="fas fa-play ml-1"></i>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 px-2">
                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/10 flex items-center justify-center bg-honey/10 text-honey font-black text-xs">
                      {video.uploaderAvatar ? (
                        <img src={video.uploaderAvatar.startsWith('http') ? video.uploaderAvatar : `${API_BASE_URL}${video.uploaderAvatar}`} className="w-full h-full object-cover" alt="" />
                      ) : (
                        video.uploaderName?.substring(0, 2).toUpperCase() || 'AD'
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-black text-xl text-white group-hover:text-honey transition-colors uppercase tracking-tight line-clamp-2 mb-2">{video.title}</h4>
                      <div className="flex items-center gap-2 text-gray-500 text-xs font-black uppercase tracking-widest opacity-60">
                        <span>{video.uploaderName || 'Honey Academy'}</span>
                        <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                        <span>{video.views} ko'rilgan</span>
                        <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                        <span className={video.isLiked ? 'text-honey' : ''}>{video.likes} likes</span>
                      </div>
                      {(user?.is_superuser || user?.is_staff || user?.username === 'admin') && (
                        <button
                          onClick={(e) => handleDelete(video.id, e)}
                          className="mt-2 text-red-500 hover:text-red-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1 transition-colors"
                        >
                          <i className="fas fa-trash-alt"></i> O'chirish
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Navbatdagi Darslar</h3>
            <div className="space-y-6 overflow-y-auto max-h-[800px] pr-2 custom-scrollbar">
              {filteredVideos.slice(0, 8).map((v, i) => (
                <div key={v.id} onClick={() => setSelectedVideo(v)} className="flex flex-col gap-3 group cursor-pointer">
                  <div className="aspect-video rounded-3xl overflow-hidden border border-white/10 relative">
                    {v.thumbnail ? (
                      <img src={v.thumbnail} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt={v.title} />
                    ) : (
                      <div className="w-full h-full bg-white/5 flex items-center justify-center">
                        <i className="fas fa-play text-white/10"></i>
                      </div>
                    )}
                    <div className="absolute bottom-2 right-2 bg-black/80 px-3 py-1 rounded-lg text-[8px] font-black text-white uppercase line-clamp-1 max-w-[80%]">{v.title}</div>
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white uppercase tracking-tight group-hover:text-honey transition-colors">{v.title}</h4>
                    <p className="text-[9px] text-gray-600 font-bold uppercase mt-1">Honey Academy</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Media;
