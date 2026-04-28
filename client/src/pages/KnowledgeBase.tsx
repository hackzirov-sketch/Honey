
import React from 'react';

const KnowledgeBase: React.FC = () => {
  const centers = [
    { name: 'Najot Ta\'lim', desc: 'Sifatli IT ta\'lim va kuchli community.', icon: 'NT', color: 'bg-[#00BFA5]' },
    { name: 'PDP Academy', desc: 'Professional dasturlash kurslari.', icon: 'PDP', color: 'bg-[#F44336]' },
    { name: 'Cambridge', desc: 'Ingliz tili va IELTS markazi.', icon: 'CA', color: 'bg-[#1A237E]' },
    { name: 'Astrum', desc: 'IT Academy va innovatsion muhit.', icon: 'AS', color: 'bg-[#FFC107]' },
    { name: 'Proweb', desc: 'Web-dizayn va dasturlash kurslari.', icon: 'PW', color: 'bg-[#2196F3]' },
    { name: 'Merit', desc: 'Sifatli maktab va o\'quv markazi.', icon: 'ME', color: 'bg-[#4CAF50]' },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-12 animate-fadeIn">
      <div className="mb-20">
        <div className="inline-flex items-center space-x-3 text-honey mb-6 bg-honey/5 px-6 py-2 rounded-full border border-honey/20">
          <i className="fas fa-building-columns"></i>
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">O'quv Markazlari & Bilim Markazi</span>
        </div>
        <h1 className="text-4xl md:text-7xl font-black mb-8 honey-text-gradient uppercase leading-tight tracking-tighter">O'zbekistondagi <br /> Top O'quv Markazlari</h1>
        <p className="text-gray-300 max-w-3xl text-lg md:text-xl font-bold leading-relaxed opacity-80">
          Honey nafaqat muloqot va kontent platformasi — u raqamli bilim markaziga aylanmoqda. O'zbekistondagi eng nufuzli o'quv markazlari bilan integratsiya orqali ta'lim endi yanada yaqin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
        {centers.map((center, i) => (
          <div key={center.name} className="glass-premium p-10 rounded-[3rem] border border-white/5 hover:border-honey/30 transition-all duration-500 group relative overflow-hidden shadow-2xl">
             <div className="absolute -right-4 -top-4 w-24 h-24 bg-honey/5 rounded-full blur-2xl group-hover:bg-honey/10 transition-all"></div>
             <div className={`w-16 h-16 ${center.color} text-white rounded-2xl flex items-center justify-center font-black text-xl mb-8 shadow-xl border border-white/10 group-hover:scale-110 transition-transform duration-500`}>
               {center.icon}
             </div>
             <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">{center.name}</h3>
             <p className="text-gray-400 text-sm mb-8 leading-relaxed font-bold">{center.desc}</p>
             <button className="text-honey text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 group-hover:translate-x-2 transition-all">
               <span>BATAFSIL O'RGANISH</span>
               <i className="fas fa-arrow-right"></i>
             </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 items-center">
        <div className="relative group">
           <img 
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800" 
            alt="Library" 
            className="rounded-[3rem] md:rounded-[4rem] w-full h-[500px] md:h-[600px] object-cover border border-white/10 shadow-[0_0_80px_rgba(255,184,0,0.1)] group-hover:scale-[1.02] transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-[3rem] md:rounded-[4rem]"></div>
          <div className="absolute bottom-12 left-12 right-12">
            <span className="text-honey text-[10px] font-black uppercase tracking-[0.3em] mb-3 block">Premium Library</span>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">Raqamli Kutubxona</h2>
            <p className="text-gray-300 text-lg font-bold opacity-80 leading-relaxed">Minglab kitoblar va audio darsliklar endi sizning qo'lingizda.</p>
          </div>
        </div>

        <div className="space-y-6 md:space-y-8">
          {[
            { 
              title: "Kitob do'konlari integratsiyasi", 
              icon: "fa-shopping-cart", 
              desc: "To'g'ridan-to'g'ri kitoblarni xarid qilish va ulashish imkoniyati" 
            },
            { 
              title: "Elektron va audio kitoblar", 
              icon: "fa-headphones-simple", 
              desc: "Har qanday joyda — metro, mashina yoki uyda tinglash" 
            },
            { 
              title: "Universitetlar bilan hamkorlik", 
              icon: "fa-graduation-cap", 
              desc: "Xalqaro va mahalliy universitet darslariga kirish" 
            },
          ].map((item, i) => (
            <div key={i} className="glass-premium p-8 rounded-[2.5rem] border border-white/5 hover:border-honey/20 transition-all flex items-start space-x-6 shadow-xl group">
              <div className="w-16 h-16 rounded-2xl bg-honey/10 flex items-center justify-center text-3xl text-honey shrink-0 group-hover:scale-110 transition-transform">
                <i className={`fas ${item.icon}`}></i>
              </div>
              <div>
                <h4 className="font-black text-xl text-white uppercase tracking-tight mb-2">{item.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed font-bold opacity-70">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-honey p-12 md:p-20 rounded-[3rem] md:rounded-[4rem] text-center shadow-[0_20px_80px_rgba(255,184,0,0.3)] relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <h2 className="text-4xl md:text-6xl font-black text-black mb-8 uppercase tracking-tighter relative z-10">Bilim — Bu Kuch!</h2>
        <p className="text-lg md:text-2xl max-w-4xl mx-auto text-black/70 font-black leading-relaxed mb-12 relative z-10">
          Honey platformasi orqali o'rganish endi shunchaki majburiyat emas, balki aqlli tarzda bog'langan ekotizimning bir qismidir.
        </p>
        <button className="bg-black text-honey px-12 md:px-16 py-5 md:py-6 rounded-2xl md:rounded-3xl font-black text-sm md:text-lg hover:scale-105 transition-all shadow-2xl uppercase tracking-[0.2em] relative z-10 border border-white/10">
          KURSNI BOSHLASH
        </button>
      </div>
    </div>
  );
};

export default KnowledgeBase;
