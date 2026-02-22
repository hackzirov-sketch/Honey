import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, API_ENDPOINTS, getAuthToken, clearAuthTokens } from '@/config/api.config';

interface UserProfile {
  username: string;
  email: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  is_active?: boolean;
}

interface UserStats {
  books_read: number;
  books_downloaded: number;
  chats_count: number;
  messages_sent: number;
}

const Profile: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats>({ books_read: 0, books_downloaded: 0, chats_count: 0, messages_sent: 0 });
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ username: '', bio: '', phone: '' });
  const [saveLoading, setSaveLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const authHeaders = (isJson = true) => ({
    ...(isJson ? { 'Content-Type': 'application/json' } : {}),
    'Authorization': `Bearer ${getAuthToken()}`,
  });

  // Profilni yuklash
  const fetchProfile = async () => {
    setProfileLoading(true);
    const savedUser = JSON.parse(localStorage.getItem('honey_user') || 'null');

    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.PROFILE.ME}`, {
        headers: authHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
        setEditData({ username: data.username || '', bio: data.bio || '', phone: data.phone || '' });
        // localStorage ni ham yangilash
        localStorage.setItem('honey_user', JSON.stringify({
          ...savedUser,
          name: data.username,
          email: data.email,
          picture: data.avatar || (savedUser ? savedUser.picture : '') || '',
        }));
      } else {
        // Agar status 401 yoki 403 bo'lsa, lekin localStorage da user bo'lsa - fallback ishlatamiz
        if (savedUser) {
          setProfile({ username: savedUser.name, email: savedUser.email, avatar: savedUser.picture });
          setEditData({ username: savedUser.name || '', bio: '', phone: '' });
        }
      }
    } catch {
      if (savedUser) {
        setProfile({ username: savedUser.name, email: savedUser.email, avatar: savedUser.picture });
        setEditData({ username: savedUser.name || '', bio: '', phone: '' });
      }
    } finally {
      setProfileLoading(false);
    }
  };

  // Statistika yuklash
  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.PROFILE.STATS}`, {
        headers: authHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch { /* offline */ }
  };

  useEffect(() => {
    fetchProfile();
    fetchStats();
  }, []);

  // Profilni yangilash
  const handleSaveProfile = async () => {
    setSaveLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.PROFILE.UPDATE}`, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify({
          username: editData.username,
          bio: editData.bio,
          ...(editData.phone ? { phone: editData.phone } : {}),
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
        setIsEditing(false);
        const savedUser = JSON.parse(localStorage.getItem('honey_user') || '{}');
        localStorage.setItem('honey_user', JSON.stringify({ ...savedUser, name: data.username }));
      }
    } catch { /* offline */ } finally {
      setSaveLoading(false);
    }
  };

  // Avatar yuklash
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarUploading(true);
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.PROFILE.UPDATE}`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${getAuthToken()}` },
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        setProfile(prev => prev ? { ...prev, avatar: data.avatar } : prev);
        const savedUser = JSON.parse(localStorage.getItem('honey_user') || '{}');
        localStorage.setItem('honey_user', JSON.stringify({ ...savedUser, picture: data.avatar }));
      }
    } catch { /* ignore */ } finally {
      setAvatarUploading(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    const accessToken = getAuthToken();
    const refreshToken = localStorage.getItem('honey_refresh_token');
    if (accessToken && refreshToken) {
      try {
        await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.LOGOUT}`, {
          method: 'POST',
          headers: authHeaders(),
          body: JSON.stringify({ access_token: accessToken, refresh_token: refreshToken }),
        });
      } catch { /* ignore - lokaldan tozalash */ }
    }
    clearAuthTokens();
    onLogout();
  };

  if (profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-honey border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-20 text-center animate-fadeIn">
        <div className="glass p-12 rounded-3xl border border-honey/20 max-w-md mx-auto">
          <i className="fas fa-lock text-4xl text-honey mb-6"></i>
          <h2 className="text-2xl font-bold mb-4">Kirish kerak</h2>
          <button
            onClick={() => navigate('/auth')}
            className="bg-honey text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest active:scale-95 transition-all shadow-lg"
          >
            Kirish
          </button>
        </div>
      </div>
    );
  }

  const menuItems = [
    { label: 'Til Sozlamalari', value: "O'zbekcha", icon: 'fa-globe', color: 'text-blue-400' },
    { label: 'Bildirishnomalar', value: 'Yoqilgan', icon: 'fa-bell', color: 'text-emerald-400', hasToggle: true, isOn: true },
    { label: 'Maxfiylik Siyosati', icon: 'fa-shield-halved', color: 'text-purple-400' },
    { label: 'Yordam Markazi', icon: 'fa-circle-question', color: 'text-orange-400' },
  ];

  return (
    <div className="min-h-screen text-white animate-fadeIn pb-32">
      <div className="max-w-2xl mx-auto px-4 py-10 space-y-8">

        {/* Profile Card */}
        <div className="glass-premium rounded-[2.5rem] p-10 relative overflow-hidden border border-white/10 shadow-2xl group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-honey/10 blur-[100px] -z-10 group-hover:bg-honey/20 transition-all duration-700"></div>

          <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
            {/* Avatar */}
            <div className="relative shrink-0 group/avatar">
              <div
                className="w-32 h-32 rounded-full bg-gradient-to-br from-honey/40 to-honey/10 flex items-center justify-center text-4xl font-black text-white border-4 border-honey/50 shadow-[0_0_50px_rgba(255,184,0,0.3)] overflow-hidden cursor-pointer"
                onClick={() => avatarInputRef.current?.click()}
                title="Avatarni o'zgartirish"
              >
                {avatarUploading ? (
                  <div className="w-8 h-8 border-4 border-honey border-t-transparent rounded-full animate-spin" />
                ) : profile.avatar ? (
                  <img
                    src={profile.avatar.startsWith('http') ? profile.avatar : `${API_BASE_URL}${profile.avatar}`}
                    alt={profile.username}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  profile.username.substring(0, 2).toUpperCase()
                )}
              </div>
              {/* Camera overlay */}
              <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity cursor-pointer" onClick={() => avatarInputRef.current?.click()}>
                <i className="fas fa-camera text-white text-xl"></i>
              </div>
              <div className="absolute bottom-2 right-2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-[#0a0a0a] shadow-xl"></div>
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left min-w-0">
              {isEditing ? (
                <div className="space-y-3">
                  <input
                    value={editData.username}
                    onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2 text-white font-black text-lg outline-none focus:border-honey/50"
                    placeholder="Foydalanuvchi nomi"
                  />
                  <input
                    value={editData.phone}
                    onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2 text-white font-bold text-sm outline-none focus:border-honey/50"
                    placeholder="Telefon raqam (+998901234567)"
                  />
                  <textarea
                    value={editData.bio}
                    onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2 text-white font-bold text-sm outline-none focus:border-honey/50 resize-none"
                    placeholder="Bio (o'zingiz haqida)"
                    rows={2}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveProfile}
                      disabled={saveLoading}
                      className="flex-1 bg-honey text-[#1A1100] py-2 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all disabled:opacity-50"
                    >
                      {saveLoading ? 'Saqlanmoqda...' : 'Saqlash'}
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex-1 bg-white/5 text-white py-2 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
                    >
                      Bekor
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-black text-white uppercase tracking-tighter truncate mb-2">{profile.username}</h2>
                  <p className="text-gray-400 text-lg font-bold truncate mb-1">{profile.email}</p>
                  {profile.phone && <p className="text-gray-600 text-sm font-bold mb-3">{profile.phone}</p>}
                  {profile.bio && <p className="text-gray-400 text-sm font-bold mb-3 opacity-70">{profile.bio}</p>}
                  <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    <span className="px-4 py-1.5 rounded-full bg-honey/10 text-honey text-[10px] font-black uppercase tracking-[0.2em] border border-honey/30">
                      Premium Student
                    </span>
                    <span className="px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] border border-blue-500/30">
                      Verified ✓
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Edit tugmasi */}
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 hover:bg-honey hover:text-white transition-all duration-500 shrink-0 border border-white/5 active:scale-90"
              >
                <i className="fas fa-edit text-xl"></i>
              </button>
            )}
          </div>

          {/* Premium Banner */}
          <button className="mt-10 w-full bg-gradient-to-r from-honey via-amber-500 to-honey/80 text-white rounded-3xl p-6 flex items-center justify-between hover:scale-[1.02] active:scale-95 transition-all duration-500 group shadow-2xl shadow-honey/20">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center shadow-inner backdrop-blur-md">
                <i className="fas fa-crown text-2xl drop-shadow-lg"></i>
              </div>
              <div className="text-left">
                <span className="text-lg font-black uppercase tracking-widest block">Premiumga o'tish</span>
                <span className="text-white/70 text-xs font-bold uppercase tracking-tighter">Barcha eksklyuziv darslar va AI mentorlar</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-black bg-white/20 px-3 py-1.5 rounded-xl backdrop-blur-md">-50% OFF</span>
              <i className="fas fa-chevron-right group-hover:translate-x-2 transition-transform"></i>
            </div>
          </button>
        </div>

        {/* Stats Grid — real Django data */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { label: 'Kitoblar', val: stats.books_downloaded, icon: 'fa-book-open', iconColor: 'text-blue-400' },
            { label: 'O\'qilgan', val: stats.books_read, icon: 'fa-check-circle', iconColor: 'text-emerald-400' },
            { label: 'Chatlar', val: stats.chats_count, icon: 'fa-comments', iconColor: 'text-purple-400' },
            { label: 'Xabarlar', val: stats.messages_sent, icon: 'fa-paper-plane', iconColor: 'text-honey' },
          ].map((stat, i) => (
            <div
              key={i}
              className="glass-premium rounded-3xl p-6 text-center hover:bg-white/5 transition-all cursor-default border border-white/5 shadow-xl group"
            >
              <div className="w-12 h-12 mx-auto rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <i className={`fas ${stat.icon} ${stat.iconColor} text-xl`}></i>
              </div>
              <span className="text-2xl md:text-3xl font-black text-white block mb-1 tracking-tighter">{stat.val}</span>
              <span className="text-gray-500 text-[10px] uppercase tracking-[0.3em] font-black">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Settings Menu */}
        <div className="glass-premium rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl divide-y divide-white/5">
          {menuItems.map((item, i) => (
            <button
              key={i}
              className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-all group text-left active:scale-[0.99]"
            >
              <div className="flex items-center gap-5">
                <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                  <i className={`fas ${item.icon} text-lg`}></i>
                </div>
                <span className="text-sm md:text-base font-black uppercase tracking-widest text-white/80 group-hover:text-white transition-colors">{item.label}</span>
              </div>
              <div className="flex items-center gap-4">
                {item.value && !item.hasToggle && (
                  <span className="text-honey/60 font-black text-xs uppercase tracking-widest">{item.value}</span>
                )}
                {item.hasToggle && (
                  <div className={`w-12 h-6 rounded-full relative transition-all duration-500 ${item.isOn ? 'bg-honey/30 shadow-[0_0_15px_rgba(255,184,0,0.2)]' : 'bg-white/10'}`}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full transition-all duration-500 ${item.isOn ? 'right-1 bg-honey shadow-[0_0_10px_#FFB800]' : 'left-1 bg-white/40'}`}></div>
                  </div>
                )}
                {!item.hasToggle && (
                  <i className="fas fa-chevron-right text-white/10 text-xs group-hover:translate-x-1 transition-transform"></i>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/security')}
            className="glass-premium rounded-3xl p-6 flex items-center justify-between hover:bg-white/5 transition-all group border border-white/5 active:scale-95"
          >
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform shadow-inner">
                <i className="fas fa-shield-halved text-xl"></i>
              </div>
              <div>
                <span className="text-sm font-black uppercase tracking-widest text-white block">Xavfsizlik</span>
                <span className="text-gray-600 text-[10px] font-bold uppercase tracking-tighter">Parol va himoya</span>
              </div>
            </div>
            <i className="fas fa-arrow-right text-white/10 group-hover:translate-x-1 transition-transform"></i>
          </button>

          <button
            onClick={handleLogout}
            className="flex-1 bg-gradient-to-r from-red-600 to-red-500 text-white p-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 shadow-xl shadow-red-500/20 border border-red-400/20"
          >
            <i className="fas fa-power-off text-lg"></i>
            Tizimdan chiqish
          </button>
        </div>

        {/* Footer */}
        <div className="text-center space-y-2 opacity-30">
          <p className="text-[10px] font-black uppercase tracking-[0.5em]">Honey Ecosystem Premium</p>
          <p className="text-[8px] font-bold uppercase tracking-widest">Version 2.5.0 • © 2026 Honey AI</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
