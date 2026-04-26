
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
    <div className="container mx-auto px-6 py-12">
      <div className="mb-20">
        <div className="inline-flex items-center space-x-2 text-honey mb-4">
          <i className="fas fa-building-columns"></i>
          <span className="text-xs font-bold uppercase tracking-widest">O'quv Markazlari & Bilim Markazi</span>
        </div>
        <h1 className="text-5xl font-black mb-6 honey-gradient-text">O'zbekistondagi Top O'quv Markazlari</h1>
        <p className="text-gray-400 max-w-3xl text-lg font-light leading-relaxed">
          Honey nafaqat muloqot va kontent platformasi — u raqamli bilim markaziga aylanmoqda. O'zbekistondagi eng nufuzli o'quv markazlari bilan integratsiya orqali ta'lim endi yanada yaqin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
        {centers.map((center, i) => (
          <div key={center.name} className="glass p-10 rounded-[3rem] border border-honey/10 hover:border-honey/50 transition-all duration-500 group relative overflow-hidden">
             <div className="absolute -right-4 -top-4 w-24 h-24 bg-honey/5 rounded-full blur-2xl group-hover:bg-honey/10 transition-all"></div>
             <div className={`w-16 h-16 ${center.color} text-white rounded-2xl flex items-center justify-center font-black text-xl mb-8 shadow-xl`}>
               {center.icon}
             </div>
             <h3 className="text-2xl font-bold mb-4">{center.name}</h3>
             <p className="text-gray-500 text-sm mb-8 leading-relaxed">{center.desc}</p>
             <button className="text-honey text-xs font-black uppercase tracking-widest flex items-center space-x-2 group-hover:translate-x-2 transition-all">
               <span>Batafsil</span>
               <i className="fas fa-arrow-right"></i>
             </button>
          </div>
        ))}
      </div>

      {/* Slide 8 content adapted */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 items-center">
        <div className="relative group">
           <img 
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800" 
            alt="Library" 
            className="rounded-[4rem] w-full h-[600px] object-cover border border-honey/10 shadow-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-[4rem]"></div>
          <div className="absolute bottom-12 left-12 right-12">
            <span className="text-honey text-xs font-bold uppercase tracking-widest mb-2 block">Premium Library</span>
            <h2 className="text-4xl font-black mb-4">Raqamli Kutubxona</h2>
            <p className="text-gray-300 text-lg font-light">Minglab kitoblar va audio darsliklar endi sizning qo'lingizda.</p>
          </div>
        </div>

        <div className="space-y-8">
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
            <div key={i} className="glass p-8 rounded-[2.5rem] border border-honey/10 hover:bg-honey/5 transition-all flex items-start space-x-6">
              <div className="w-16 h-16 rounded-2xl bg-honey/10 flex items-center justify-center text-3xl text-honey shrink-0">
                <i className={`fas ${item.icon}`}></i>
              </div>
              <div>
                <h4 className="font-bold text-xl mb-2">{item.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-honey p-16 rounded-[4rem] text-center shadow-[0_20px_60px_rgba(255,184,0,0.2)]">
        <h2 className="text-4xl font-black text-black mb-8">Bilim — Bu Kuch!</h2>
        <p className="text-xl max-w-4xl mx-auto text-black/80 font-medium leading-relaxed mb-10">
          Honey platformasi orqali o'rganish endi shunchaki majburiyat emas, balki aqlli tarzda bog'langan ekotizimning bir qismidir.
        </p>
        <button className="bg-black text-honey px-12 py-5 rounded-3xl font-black text-lg hover:scale-105 transition-all shadow-2xl uppercase tracking-widest">
          Kursni Boshlash
        </button>
      </div>
    </div>
  );
};

export default KnowledgeBase;
