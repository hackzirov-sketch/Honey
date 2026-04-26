
import React, { useState, useEffect } from 'react';
import { API_BASE_URL, API_ENDPOINTS, authHeaders } from '@/config/api.config';
import { useNavigate } from 'react-router-dom';

const Admin: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'video' | 'book' | 'users'>('video');
    const [adminUsers, setAdminUsers] = useState<any[]>([]);
    const [adminPending, setAdminPending] = useState<any[]>([]);
    const [adminStats, setAdminStats] = useState<any>(null);
    const [adminLoading, setAdminLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem('honey_user') || '{}');
    const navigate = useNavigate();

    // Form states for Video
    const [videoData, setVideoData] = useState({ title: '', description: '', category: '' });
    const [videoSource, setVideoSource] = useState<'file' | 'youtube' | 'instagram'>('file');
    const [videoUrl, setVideoUrl] = useState('');
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [videoCover, setVideoCover] = useState<File | null>(null);

    // Form states for Book
    const [bookData, setBookData] = useState({
        title: '', author: '', description: '', genre: '', category: '',
        year: new Date().getFullYear(), pages: 0
    });
    const [bookFile, setBookFile] = useState<File | null>(null);
    const [bookCover, setBookCover] = useState<File | null>(null);

    const [genres, setGenres] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [videoCategories, setVideoCategories] = useState<any[]>([]);

    useEffect(() => {
        if (!user.is_superuser && !user.is_staff && user.username !== 'admin') {
            alert("Sizda admin huquqlari yo'q!");
            navigate('/');
        }
        fetchMeta();
    }, []);

    const fetchAdminData = async () => {
        setAdminLoading(true);
        try {
            const [uRes, pRes, sRes] = await Promise.all([
                fetch(`${API_BASE_URL}${API_ENDPOINTS.ADMIN.USERS}`, { headers: authHeaders() }),
                fetch(`${API_BASE_URL}${API_ENDPOINTS.ADMIN.PENDING}`, { headers: authHeaders() }),
                fetch(`${API_BASE_URL}${API_ENDPOINTS.ADMIN.STATS}`, { headers: authHeaders() }),
            ]);
            if (uRes.ok) setAdminUsers(await uRes.json());
            if (pRes.ok) setAdminPending(await pRes.json());
            if (sRes.ok) setAdminStats(await sRes.json());
        } catch (e) { console.error(e); }
        finally { setAdminLoading(false); }
    };

    useEffect(() => {
        if (activeTab === 'users') fetchAdminData();
    }, [activeTab]);

    const deleteUser = async (id: string, label: string) => {
        if (!confirm(`"${label}" foydalanuvchini va uning barcha ma'lumotlarini butunlay o'chirmoqchimisiz?`)) return;
        const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ADMIN.USER_DELETE(id)}`, {
            method: 'DELETE', headers: authHeaders(),
        });
        if (res.ok) {
            setAdminUsers(prev => prev.filter(u => u.id !== id));
            fetchAdminData();
        } else {
            const err = await res.json().catch(() => ({}));
            alert(`Xato: ${err.message || res.status}`);
        }
    };

    const deletePending = async (id: string, email: string) => {
        if (!confirm(`"${email}" tasdiqlanmagan ro'yxatdan o'tishni o'chirmoqchimisiz?`)) return;
        const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ADMIN.PENDING_DELETE(id)}`, {
            method: 'DELETE', headers: authHeaders(),
        });
        if (res.ok) {
            setAdminPending(prev => prev.filter(p => p.id !== id));
            fetchAdminData();
        } else {
            const err = await res.json().catch(() => ({}));
            alert(`Xato: ${err.message || res.status}`);
        }
    };

    const fetchMeta = async () => {
        try {
            const [gRes, cRes, vcRes] = await Promise.all([
                fetch(`${API_BASE_URL}${API_ENDPOINTS.LIBRARY.GENRES}`),
                fetch(`${API_BASE_URL}${API_ENDPOINTS.LIBRARY.CATEGORIES}`),
                fetch(`${API_BASE_URL}${API_ENDPOINTS.VIDEO.CATEGORIES}`)
            ]);
            if (gRes.ok) {
                const data = await gRes.json();
                setGenres(data.results || data);
            }
            if (cRes.ok) {
                const data = await cRes.json();
                setCategories(data.results || data);
            }
            if (vcRes.ok) {
                const data = await vcRes.json();
                setVideoCategories(data.results || data);
            }
        } catch (e) { console.error(e); }
    };

    const handleUploadVideo = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!videoData.title) return alert("Video sarlavhasini kiriting!");
        if (!videoData.category) return alert("Kategoriyani tanlang!");
        if (videoSource === 'file' && !videoFile) return alert("Video faylini tanlang!");
        if (videoSource !== 'file' && !videoUrl.trim()) return alert("YouTube yoki Instagram havolasini kiriting!");

        setIsLoading(true);
        const formData = new FormData();
        formData.append('title', videoData.title);
        formData.append('description', videoData.description);
        formData.append('category', videoData.category);
        formData.append('category_id', videoData.category);
        formData.append('source_type', videoSource);
        if (videoSource === 'file' && videoFile) {
            formData.append('file', videoFile);
        } else {
            formData.append('video_url', videoUrl.trim());
            formData.append(videoSource === 'youtube' ? 'youtube_url' : 'instagram_url', videoUrl.trim());
        }
        if (videoCover) formData.append('cover', videoCover);

        try {
            const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.VIDEO.LIST}`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('honey_access_token')}` },
                body: formData
            });
            if (res.ok) {
                alert("Video muvaffaqiyatli yuklandi!");
                setVideoData({ title: '', description: '', category: '' });
                setVideoSource('file');
                setVideoUrl('');
                setVideoFile(null);
                setVideoCover(null);
            } else {
                const err = await res.json();
                alert(`Xato: ${JSON.stringify(err)}`);
            }
        } catch (e) { alert("Server xatosi!"); }
        finally { setIsLoading(false); }
    };

    const handleUploadBook = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!bookFile || !bookCover || !bookData.title) return alert("Title, PDF va Muqova majburiy!");

        setIsLoading(true);
        const formData = new FormData();
        Object.entries(bookData).forEach(([k, v]) => formData.append(k, String(v)));
        formData.append('file', bookFile);
        formData.append('image', bookCover);

        try {
            const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.LIBRARY.BOOKS}`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('honey_access_token')}` },
                body: formData
            });
            if (res.ok) {
                alert("Kitob muvaffaqiyatli yuklandi!");
                setBookData({ title: '', author: '', description: '', genre: '', category: '', year: 2024, pages: 0 });
                setBookFile(null);
                setBookCover(null);
            } else {
                const err = await res.json();
                alert(`Xato: ${JSON.stringify(err)}`);
            }
        } catch (e) { alert("Server xatosi!"); }
        finally { setIsLoading(false); }
    };

    return (
        <div className="container mx-auto px-6 py-12 max-w-4xl">
            <h1 className="text-4xl font-black mb-8 bg-gradient-to-r from-honey to-white bg-clip-text text-transparent italic">
                ADMIN PANEL
            </h1>

            <div className="flex gap-4 mb-8">
                <button
                    onClick={() => setActiveTab('video')}
                    className={`px-8 py-3 rounded-2xl font-bold transition-all ${activeTab === 'video' ? 'bg-honey text-black scale-105 shadow-lg shadow-honey/20' : 'bg-white/5 text-white'}`}
                >
                    Video Yuklash
                </button>
                <button
                    onClick={() => setActiveTab('book')}
                    className={`px-8 py-3 rounded-2xl font-bold transition-all ${activeTab === 'book' ? 'bg-honey text-black scale-105 shadow-lg shadow-honey/20' : 'bg-white/5 text-white'}`}
                >
                    Kitob Yuklash
                </button>
                <button
                    onClick={() => setActiveTab('users')}
                    data-testid="tab-users"
                    className={`px-8 py-3 rounded-2xl font-bold transition-all ${activeTab === 'users' ? 'bg-honey text-black scale-105 shadow-lg shadow-honey/20' : 'bg-white/5 text-white'}`}
                >
                    Foydalanuvchilar
                </button>
            </div>

            {activeTab === 'video' ? (
                <form onSubmit={handleUploadVideo} className="glass p-8 rounded-3xl space-y-6">
                    <div>
                        <label className="block text-gray-400 mb-2 text-sm font-bold uppercase tracking-widest">Video Sarlavhasi</label>
                        <input
                            value={videoData.title}
                            onChange={e => setVideoData({ ...videoData, title: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-honey outline-none transition-all"
                            placeholder="Video nomini kiriting..."
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2 text-sm font-bold uppercase tracking-widest">Tavsif</label>
                        <textarea
                            value={videoData.description}
                            onChange={e => setVideoData({ ...videoData, description: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-honey outline-none transition-all h-32"
                            placeholder="Video haqida qisqacha..."
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2 text-sm font-bold uppercase tracking-widest">Kategoriya</label>
                        <select
                            value={videoData.category}
                            onChange={e => setVideoData({ ...videoData, category: e.target.value })}
                            className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 focus:border-honey outline-none"
                        >
                            <option value="">Tanlang...</option>
                            {videoCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-3 text-sm font-bold uppercase tracking-widest">Video Manbasi</label>
                        <div className="grid grid-cols-3 gap-3">
                            {([
                                { id: 'file', label: 'Fayl', icon: 'fa-file-video', brand: 'fas' },
                                { id: 'youtube', label: 'YouTube', icon: 'fa-youtube', brand: 'fab' },
                                { id: 'instagram', label: 'Instagram', icon: 'fa-instagram', brand: 'fab' },
                            ] as const).map(source => (
                                <button
                                    key={source.id}
                                    type="button"
                                    onClick={() => {
                                        setVideoSource(source.id);
                                        if (source.id !== 'file') setVideoFile(null);
                                    }}
                                    className={`py-4 rounded-2xl border font-black text-[10px] uppercase tracking-widest transition-all flex flex-col items-center gap-2 ${videoSource === source.id ? 'bg-honey text-black border-honey shadow-lg shadow-honey/20' : 'bg-white/5 text-white border-white/10 hover:bg-white/10'}`}
                                >
                                    <i className={`${source.brand || 'fas'} ${source.icon} text-lg`}></i>
                                    <span>{source.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    {videoSource === 'file' ? (
                        <div>
                            <label className="block text-gray-400 mb-2 text-sm font-bold uppercase tracking-widest">Video Fayli (MP4)</label>
                            <input type="file" accept="video/*" onChange={e => setVideoFile(e.target.files?.[0] || null)} className="w-full" />
                        </div>
                    ) : (
                        <div>
                            <label className="block text-gray-400 mb-2 text-sm font-bold uppercase tracking-widest">
                                {videoSource === 'youtube' ? 'YouTube Havolasi' : 'Instagram Post/Reel Havolasi'}
                            </label>
                            <input
                                value={videoUrl}
                                onChange={e => setVideoUrl(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-honey outline-none transition-all"
                                placeholder={videoSource === 'youtube' ? 'https://www.youtube.com/watch?v=...' : 'https://www.instagram.com/reel/...'}
                            />
                        </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-400 mb-2 text-sm font-bold uppercase tracking-widest">Muqova (Rasm)</label>
                            <input type="file" accept="image/*" onChange={e => setVideoCover(e.target.files?.[0] || null)} className="w-full" />
                        </div>
                    </div>
                    <button
                        disabled={isLoading}
                        className="w-full bg-honey text-black py-4 rounded-2xl font-black uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-honey/20"
                    >
                        {isLoading ? 'Yuklanmoqda...' : 'VIDEONI YUKLASH'}
                    </button>
                </form>
            ) : (
                <form onSubmit={handleUploadBook} className="glass p-8 rounded-3xl space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-400 mb-2 text-sm font-bold uppercase tracking-widest">Kitob Nomi</label>
                            <input value={bookData.title} onChange={e => setBookData({ ...bookData, title: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-honey outline-none" />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2 text-sm font-bold uppercase tracking-widest">Muallif</label>
                            <input value={bookData.author} onChange={e => setBookData({ ...bookData, author: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-honey outline-none" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2 text-sm font-bold uppercase tracking-widest">Janr</label>
                        <select value={bookData.genre} onChange={e => setBookData({ ...bookData, genre: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 focus:border-honey outline-none">
                            <option value="">Tanlang...</option>
                            {genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2 text-sm font-bold uppercase tracking-widest">Kategoriya</label>
                        <select value={bookData.category} onChange={e => setBookData({ ...bookData, category: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 focus:border-honey outline-none">
                            <option value="">Tanlang...</option>
                            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-400 mb-2 text-sm font-bold uppercase tracking-widest">PDF Fayl</label>
                            <input type="file" accept=".pdf,.epub" onChange={e => setBookFile(e.target.files?.[0] || null)} className="w-full" />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2 text-sm font-bold uppercase tracking-widest">Muqova</label>
                            <input type="file" accept="image/*" onChange={e => setBookCover(e.target.files?.[0] || null)} className="w-full" />
                        </div>
                    </div>
                    <button
                        disabled={isLoading}
                        className="w-full bg-honey text-black py-4 rounded-2xl font-black uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-honey/20"
                    >
                        {isLoading ? 'Yuklanmoqda...' : 'KITOBNI YUKLASH'}
                    </button>
                </form>
            )}

            {activeTab === 'users' && (
                <div className="space-y-8">
                    {adminStats && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { label: "Foydalanuvchilar", value: adminStats.users_total, icon: 'fa-users' },
                                { label: "Tasdiqlangan", value: adminStats.users_verified, icon: 'fa-circle-check' },
                                { label: "Adminlar", value: adminStats.users_admin, icon: 'fa-user-shield' },
                                { label: "Kutayotganlar", value: adminStats.pending_registrations, icon: 'fa-hourglass-half' },
                            ].map((s) => (
                                <div key={s.label} className="glass p-5 rounded-2xl border border-white/10" data-testid={`stat-${s.label}`}>
                                    <div className="flex items-center gap-3 mb-2 text-honey">
                                        <i className={`fas ${s.icon} text-xl`}></i>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{s.label}</span>
                                    </div>
                                    <div className="text-3xl font-black text-white">{s.value}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="glass p-6 md:p-8 rounded-3xl">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-xl font-black uppercase tracking-widest text-honey">
                                <i className="fas fa-users mr-3"></i>Foydalanuvchilar ({adminUsers.length})
                            </h2>
                            <button onClick={fetchAdminData} className="text-xs text-gray-400 hover:text-honey" data-testid="button-refresh-users">
                                <i className={`fas fa-rotate ${adminLoading ? 'fa-spin' : ''}`}></i>
                            </button>
                        </div>
                        {adminUsers.length === 0 ? (
                            <p className="text-center text-gray-500 py-6">Hech kim yo'q</p>
                        ) : (
                            <div className="space-y-3">
                                {adminUsers.map(u => (
                                    <div key={u.id} className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white/5 hover:bg-white/10 transition-all border border-white/10 rounded-2xl p-4" data-testid={`row-user-${u.id}`}>
                                        <div className="flex items-center gap-4 min-w-0">
                                            <div className="w-11 h-11 rounded-full bg-honey/20 text-honey flex items-center justify-center font-black shrink-0">
                                                {u.username?.[0]?.toUpperCase() || '?'}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className="font-bold text-white" data-testid={`text-username-${u.id}`}>{u.username}</span>
                                                    {u.is_superuser && <span className="text-[9px] px-2 py-0.5 rounded-full bg-honey text-black font-black uppercase">Super</span>}
                                                    {u.is_staff && !u.is_superuser && <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/20 text-white font-black uppercase">Admin</span>}
                                                    {!u.is_verified && <span className="text-[9px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 font-black uppercase">Tasdiqlanmagan</span>}
                                                </div>
                                                <div className="text-xs text-gray-400 truncate">{u.email}</div>
                                                {u.phone && <div className="text-xs text-gray-500 truncate">{u.phone}</div>}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 text-xs text-gray-500 md:text-right shrink-0">
                                            <span className="hidden md:inline">{new Date(u.created_at).toLocaleDateString('uz-UZ')}</span>
                                            <button
                                                onClick={() => deleteUser(u.id, u.username)}
                                                disabled={u.is_superuser || u.id === user.id}
                                                data-testid={`button-delete-user-${u.id}`}
                                                className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold uppercase tracking-widest transition-all"
                                            >
                                                <i className="fas fa-trash mr-2"></i>O'chirish
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="glass p-6 md:p-8 rounded-3xl">
                        <h2 className="text-xl font-black uppercase tracking-widest text-honey mb-5">
                            <i className="fas fa-hourglass-half mr-3"></i>Kutayotgan ro'yxatdan o'tishlar ({adminPending.length})
                        </h2>
                        {adminPending.length === 0 ? (
                            <p className="text-center text-gray-500 py-6">Kutayotgan yo'q</p>
                        ) : (
                            <div className="space-y-3">
                                {adminPending.map(p => {
                                    const expired = new Date(p.expires_at).getTime() <= Date.now();
                                    return (
                                        <div key={p.id} className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white/5 border border-white/10 rounded-2xl p-4" data-testid={`row-pending-${p.id}`}>
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className="font-bold text-white">{p.username}</span>
                                                    {expired
                                                        ? <span className="text-[9px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 font-black uppercase">Eskirgan</span>
                                                        : <span className="text-[9px] px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 font-black uppercase">Kutmoqda</span>
                                                    }
                                                </div>
                                                <div className="text-xs text-gray-400 truncate">{p.email}</div>
                                                {p.phone && <div className="text-xs text-gray-500">{p.phone}</div>}
                                                <div className="text-[10px] text-gray-600 mt-1">Yaratilgan: {new Date(p.created_at).toLocaleString('uz-UZ')}</div>
                                            </div>
                                            <button
                                                onClick={() => deletePending(p.id, p.email)}
                                                data-testid={`button-delete-pending-${p.id}`}
                                                className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest transition-all"
                                            >
                                                <i className="fas fa-trash mr-2"></i>O'chirish
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
