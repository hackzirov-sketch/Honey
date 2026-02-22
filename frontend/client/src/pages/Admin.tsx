
import React, { useState, useEffect } from 'react';
import { API_BASE_URL, API_ENDPOINTS, authHeaders } from '@/config/api.config';
import { useNavigate } from 'react-router-dom';

const Admin: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'video' | 'book'>('video');
    const [isLoading, setIsLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem('honey_user') || '{}');
    const navigate = useNavigate();

    // Form states for Video
    const [videoData, setVideoData] = useState({ title: '', description: '', category: '' });
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
        if (!videoFile) return alert("Video faylini tanlang!");

        setIsLoading(true);
        const formData = new FormData();
        formData.append('title', videoData.title);
        formData.append('description', videoData.description);
        formData.append('category', videoData.category);
        formData.append('file', videoFile);
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-400 mb-2 text-sm font-bold uppercase tracking-widest">Video Fayli (MP4)</label>
                            <input type="file" accept="video/*" onChange={e => setVideoFile(e.target.files?.[0] || null)} className="w-full" />
                        </div>
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
        </div>
    );
};

export default Admin;
