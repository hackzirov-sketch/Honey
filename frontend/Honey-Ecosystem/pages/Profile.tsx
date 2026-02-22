
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [user, setUser] = useState<{ name: string, email: string, picture: string } | null>(null);
  const [stats, setStats] = useState({ chats: 0, media: 0, likes: 0, hours: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('honey_user');
    const chatHistory = JSON.parse(localStorage.getItem('honey_chat_history') || '[]');
    const mediaCache = JSON.parse(localStorage.getItem('honey_media_cache') || '[]');
    const interactions = JSON.parse(localStorage.getItem('honey_user_interactions') || '{}');
    
    let likeCount = 0;
    Object.values(interactions).forEach((inter: any) => {
      if (inter.liked) likeCount++;
    });

    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setStats({
        chats: chatHistory.length,
        media: mediaCache.length,
        likes: likeCount,
        hours: Math.floor(Math.random() * 20) + 5
      });
    }
  }, []);

  const handleLogout = () => {
    onLogout();
  };

  if (!user) {
    return (
      <div className="container mx-auto px-6 py-32 text-center animate-fadeIn">
         <div className="glass p-20 rounded-[4rem] border border-honey/20 max-w-2xl mx-auto shadow-[0_0_100px_rgba(255,184,0,0.1)]">
            <i className="fas fa-lock text-6xl text-honey mb-10 drop-shadow-[0_0_15px_#FFB800]"></i>
            <h2 className="text-4xl font-black mb-8 uppercase tracking-tighter">Premium Hisob Kerak</h2>
            <button onClick={() => navigate('/')} className="btn-honey-neon px-12 py-5 uppercase tracking-widest font-black">Bosh sahifaga o'tish</button>
         </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030614] text-white animate-fadeIn p-4 md:p-10 pb-32">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Profile Card */}
        <div className="bg-white/[0.03] backdrop-blur-2xl rounded-[3rem] p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl border border-white/10">
           <div className="flex flex-col md:flex-row items-center gap-8 relative z-10 w-full">
              <div className="relative">
                 <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/[0.05] backdrop-blur-3xl flex items-center justify-center border-4 border-white/10 text-4xl font-black text-white shadow-2xl">
                    {user.name.substring(0, 2).toUpperCase()}
                 </div>
                 <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-full border-4 border-[#030614] shadow-lg"></div>
              </div>
              <div className="text-center md:text-left space-y-4 flex-1">
                 <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-sm">{user.name}</h2>
                 <p className="text-white/40 font-medium text-lg uppercase tracking-widest">+998 90 123 45 67</p>
                 <button className="bg-honey text-black px-8 py-3 rounded-2xl text-sm font-black flex items-center gap-3 hover:scale-105 transition-all shadow-lg shadow-honey/20">
                    <i className="fas fa-crown"></i> Premiumga o'tish
                 </button>
              </div>
              <button className="w-14 h-14 rounded-2xl bg-white/[0.03] backdrop-blur-xl flex items-center justify-center text-white border border-white/10 hover:bg-white/[0.08] self-start md:self-center transition-all">
                 <i className="fas fa-cog text-xl"></i>
              </button>
           </div>
           
           {/* Decorative elements */}
           <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[120px] -z-0 rounded-full"></div>
           <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-honey/5 blur-[100px] -z-0 rounded-full"></div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[
             { label: 'Kitoblar', val: stats.media, icon: 'fa-book', color: 'text-emerald-400' },
             { label: 'Vaqt', val: `${stats.hours} soat`, icon: 'fa-clock', color: 'text-blue-400' },
             { label: 'Sharhlar', val: stats.likes, icon: 'fa-star', color: 'text-yellow-400' }
           ].map((stat, i) => (
             <div key={i} className="bg-white/[0.02] backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 flex flex-col items-center justify-center text-center gap-3 hover:bg-white/[0.05] transition-all shadow-xl group cursor-default">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.05] flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition-transform shadow-inner">
                   <i className={`fas ${stat.icon} ${stat.color}`}></i>
                </div>
                <span className="text-4xl font-black text-white">{stat.val}</span>
                <span className="text-white/40 font-black text-[10px] uppercase tracking-[0.2em]">{stat.label}</span>
             </div>
           ))}
        </div>

        {/* Settings List */}
        <div className="bg-white/[0.02] backdrop-blur-2xl rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl">
           {[
             { label: 'Til / Language', sub: 'Ilova tilini o\'zgartirish', icon: 'fa-globe', extra: <span className="bg-white/[0.05] px-4 py-1.5 rounded-xl text-[10px] font-black text-blue-400 border border-white/10 uppercase tracking-widest">uzbek</span> },
             { label: 'Bildirishnomalar', sub: 'Yangiliklar va xabarlar', icon: 'fa-bell', extra: <div className="w-12 h-6 bg-emerald-500/20 border border-emerald-500/30 rounded-full relative"><div className="absolute right-1 top-1 w-4 h-4 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div></div> },
             { label: 'Maxfiylik siyosati', icon: 'fa-shield-halved' },
             { label: 'Yordam markazi', icon: 'fa-info-circle' }
           ].map((item, i) => (
             <button key={i} className="w-full flex items-center justify-between p-8 hover:bg-white/[0.03] transition-all group border-b border-white/5 last:border-0 text-left">
                <div className="flex items-center gap-6">
                   <div className="w-14 h-14 rounded-2xl bg-white/[0.03] flex items-center justify-center text-white/70 border border-white/10 group-hover:text-honey transition-colors">
                      <i className={`fas ${item.icon} text-xl`}></i>
                   </div>
                   <div>
                      <h4 className="text-xl font-black text-white group-hover:text-honey transition-colors tracking-tight">{item.label}</h4>
                      {item.sub && <p className="text-white/30 text-xs font-bold mt-1 uppercase tracking-wider">{item.sub}</p>}
                   </div>
                </div>
                <div className="flex items-center gap-4">
                   {item.extra}
                   <i className="fas fa-chevron-right text-white/10 text-xs group-hover:translate-x-1 transition-transform"></i>
                </div>
             </button>
           ))}
        </div>

        <button onClick={handleLogout} className="w-full bg-red-500/5 border border-red-500/10 text-red-500/60 py-7 rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs hover:bg-red-500 hover:text-white transition-all shadow-lg active:scale-95">
           Tizimdan Chiqish
        </button>
      </div>
    </div>
  );
};

export default Profile;
