
import React, { useState } from 'react';

const Classroom: React.FC = () => {
  const [isLive, setIsLive] = useState(true);
  const participants = [
    { name: 'Sardorbek (O\'qituvchi)', role: 'Teacher', img: 'https://i.pravatar.cc/150?u=sardor' },
    { name: 'Nilufar M.', role: 'Student', img: 'https://i.pravatar.cc/150?u=nilu' },
    { name: 'Javohir K.', role: 'Student', img: 'https://i.pravatar.cc/150?u=java' },
  ];

  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col lg:flex-row bg-transparent animate-fadeIn p-2 md:p-4 gap-4 overflow-x-hidden">
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        {/* Main Video Area */}
        <div className="aspect-video lg:flex-1 bg-black/40 backdrop-blur-xl rounded-2xl md:rounded-3xl relative overflow-hidden group border border-white/5">
           <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="flex flex-col items-center gap-4 md:gap-6 text-center">
                 <div className="w-24 h-24 md:w-48 md:h-48 rounded-full bg-[#333333] flex items-center justify-center border-2 md:border-4 border-[#FFB800]/20 relative">
                    <i className="fas fa-user text-3xl md:text-7xl text-gray-500"></i>
                    <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 w-6 h-6 md:w-10 md:h-10 bg-red-500 rounded-full flex items-center justify-center text-white border-2 md:border-4 border-[#242424]">
                       <i className="fas fa-microphone-slash text-[8px] md:text-xs"></i>
                    </div>
                 </div>
                 <div className="max-w-full truncate px-2">
                    <h2 className="text-lg md:text-2xl font-black text-white uppercase tracking-tighter truncate">Azizbek K.</h2>
                    <p className="text-honey/60 font-black text-[8px] md:text-[10px] uppercase tracking-widest mt-1">Siz</p>
                 </div>
              </div>
           </div>
           
           {/* Top Controls */}
           <div className="absolute top-4 left-4 md:top-6 md:left-6 flex gap-2 md:gap-3">
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500"></div>
           </div>
           
           <div className="absolute top-4 right-4 md:top-6 md:right-6 flex items-center gap-2 md:gap-4">
              <button className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/10 transition-all border border-white/5">
                 <i className="fas fa-bars text-xs md:text-base"></i>
              </button>
           </div>

           {/* In-Call Picture */}
           <div className="absolute top-16 right-4 md:top-20 md:right-8 w-32 h-20 md:w-64 md:h-40 bg-[#333333] rounded-lg md:rounded-2xl border-2 border-white/10 shadow-2xl overflow-hidden group/mini hidden sm:block">
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                 <i className="fas fa-user text-xl md:text-3xl text-gray-600"></i>
              </div>
              <div className="absolute bottom-2 left-2 md:bottom-3 md:left-3 flex items-center gap-1 md:gap-2 bg-black/60 px-2 py-0.5 md:px-3 md:py-1 rounded-lg">
                 <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-emerald-500"></div>
                 <span className="text-[6px] md:text-[8px] font-black text-white uppercase">Mentor</span>
              </div>
           </div>

           {/* Call Controls Bar */}
           <div className="absolute bottom-4 md:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-6 px-4 py-3 md:px-10 md:py-5 bg-[#2B2B2B]/90 backdrop-blur-md rounded-2xl md:rounded-full border border-white/10 shadow-2xl w-[90%] md:w-auto justify-center">
              <button className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-all border border-white/5 shrink-0"><i className="fas fa-desktop text-xs md:text-base"></i></button>
              <button className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-all border border-white/5 shrink-0"><i className="fas fa-microphone text-xs md:text-base"></i></button>
              <button className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-all border border-white/5 shrink-0"><i className="fas fa-video text-xs md:text-base"></i></button>
              <button className="w-10 h-8 md:w-16 md:h-12 rounded-lg md:rounded-2xl bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-all shadow-lg shrink-0"><i className="fas fa-phone-slash text-xs md:text-base"></i></button>
              <button className="w-10 h-8 md:w-16 md:h-12 rounded-lg md:rounded-2xl bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 transition-all shadow-lg shrink-0"><i className="fas fa-phone text-xs md:text-base"></i></button>
              <button className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-all border border-white/5 shrink-0"><i className="fas fa-plus text-xs md:text-base"></i></button>
           </div>

           {/* Bottom Right Controls */}
           <div className="absolute bottom-20 md:bottom-10 right-4 md:right-10 flex flex-col gap-2 md:gap-4 hidden md:flex">
              <button className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-2xl bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/10 border border-white/5 transition-all"><i className="fas fa-cog"></i></button>
              <button className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-2xl bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/10 border border-white/5 transition-all"><i className="fas fa-comment"></i></button>
           </div>
        </div>
      </div>

      {/* Sidebar for Participants/Groups */}
      <div className="w-full lg:w-[350px] flex flex-col gap-4 h-auto lg:h-full overflow-hidden shrink-0">
         <div className="flex-1 bg-black/40 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-white/5 p-4 md:p-6 flex flex-col gap-4 md:gap-6 overflow-hidden shadow-2xl min-h-[300px]">
            <div className="flex items-center justify-between">
               <h3 className="text-[8px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest">Guruhlar & Kontaktlar</h3>
               <span className="bg-honey text-black text-[8px] font-black px-2 py-1 rounded-lg">4 ON</span>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-2 md:space-y-4 custom-scrollbar">
               {[
                 { name: 'VIP Darslar', icon: 'fa-crown', color: 'text-honey' },
                 { name: 'Loyiha Guruhi', icon: 'fa-users', color: 'text-blue-400' },
                 { name: 'Mentor Chat', icon: 'fa-user-tie', color: 'text-emerald-400' },
                 { name: 'Arxiv', icon: 'fa-archive', color: 'text-gray-500' }
               ].map((item, i) => (
                 <button key={i} className="w-full flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all text-left group">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-black flex items-center justify-center text-sm md:text-lg shrink-0 group-hover:scale-110 transition-transform">
                       <i className={`fas ${item.icon} ${item.color}`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                       <p className="text-[10px] md:text-[11px] font-black text-white uppercase tracking-tight truncate">{item.name}</p>
                       <p className="text-[8px] md:text-[9px] text-gray-600 font-bold uppercase truncate mt-0.5">Jonli dars mavjud</p>
                    </div>
                 </button>
               ))}
            </div>

            <div className="pt-4 md:pt-6 border-t border-white/5">
               <button onClick={() => setIsLive(true)} className="w-full bg-honey text-black py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-[8px] md:text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-honey/20 hover:scale-105 active:scale-95 transition-all">
                  YANGI QO'NG'IROQ <i className="fas fa-video ml-2 md:ml-3"></i>
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Classroom;
