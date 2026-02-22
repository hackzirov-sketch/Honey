import React, { useState } from 'react';

const Auth: React.FC<{ onAuth: () => void }> = ({ onAuth }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });

  return (
    <div className="min-h-screen bg-[#030614] flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
      <div className="w-full max-w-md bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 shadow-2xl relative overflow-hidden my-8">
        {/* Subtle decorative glow */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full"></div>
        
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tighter mb-2">Kirish</h2>
          <p className="text-gray-500 font-bold text-[8px] sm:text-[10px] uppercase tracking-[0.2em]">Dasturdan foydalanish uchun ro'yxatdan o'ting</p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <div>
            <label className="text-orange-400 font-black text-[10px] uppercase tracking-widest mb-2 sm:mb-3 block">ISM</label>
            <div className="relative">
              <input 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="Ismingiz" 
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl sm:rounded-2xl px-10 sm:px-12 py-3 sm:py-4 text-sm font-bold text-white outline-none focus:border-orange-400/40 focus:bg-white/[0.05] transition-all"
              />
              <i className="fas fa-user absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-gray-600 text-xs"></i>
            </div>
          </div>

          <div>
            <label className="text-pink-500 font-black text-[10px] uppercase tracking-widest mb-2 sm:mb-3 block">EMAIL</label>
            <div className="relative">
              <input 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                placeholder="example@mail.com" 
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl sm:rounded-2xl px-10 sm:px-12 py-3 sm:py-4 text-sm font-bold text-white outline-none focus:border-pink-500/40 focus:bg-white/[0.05] transition-all"
              />
              <i className="fas fa-envelope absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-gray-600 text-xs"></i>
            </div>
          </div>

          <div>
            <label className="text-emerald-400 font-black text-[10px] uppercase tracking-widest mb-2 sm:mb-3 block">TELEFON RAQAM</label>
            <div className="flex gap-2">
               <div className="bg-white/[0.03] border border-white/10 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-3 sm:py-4 flex items-center gap-2 text-white font-black text-[10px] sm:text-xs min-w-[70px] sm:min-w-[80px]">
                  <span>UZ</span> <i className="fas fa-chevron-down text-[8px] text-gray-500"></i>
               </div>
               <div className="relative flex-1">
                  <input 
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    placeholder="+998" 
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl sm:rounded-2xl px-10 sm:px-12 py-3 sm:py-4 text-sm font-bold text-white outline-none focus:border-emerald-400/40 focus:bg-white/[0.05] transition-all"
                  />
                  <i className="fas fa-phone absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-gray-600 text-xs"></i>
               </div>
            </div>
          </div>

          <div>
            <label className="text-orange-400 font-black text-[10px] uppercase tracking-widest mb-2 sm:mb-3 block">PAROL</label>
            <div className="relative">
              <input 
                type="password"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                placeholder="******" 
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl sm:rounded-2xl px-10 sm:px-12 py-3 sm:py-4 text-sm font-bold text-white outline-none focus:border-orange-400/40 focus:bg-white/[0.05] transition-all"
              />
              <i className="fas fa-lock absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-gray-600 text-xs"></i>
            </div>
          </div>

          <button 
            onClick={() => {
              const user = { name: formData.name || 'Mehmon', email: formData.email, picture: 'https://i.pravatar.cc/150' };
              localStorage.setItem('honey_user', JSON.stringify(user));
              onAuth();
            }}
            className="w-full bg-honey text-black py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-honey/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 mt-4"
          >
            Kod olish <i className="fas fa-chevron-right text-xs"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
