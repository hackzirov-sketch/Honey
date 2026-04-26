
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  const features = [
    { path: '/messenger', title: 'Intelligence Hub', desc: 'Sun\'iy intellekt tomonidan boshqariladigan premium muloqot muhiti.', icon: 'fa-brain', color: 'text-blue-400' },
    { path: '/media', title: 'Immersive Media', desc: '4K darsliklar va interaktiv bilimlar oqimi.', icon: 'fa-vr-cardboard', color: 'text-amber-400' },
    { path: '/classroom', title: 'Jonli Mentorlik', desc: 'Real-vaqtda mutaxassislar bilan yuzma-yuz muloqot.', icon: 'fa-user-tie', color: 'text-emerald-400' },
    { path: '/library', title: 'Prism Kutubxonasi', desc: 'Dunyodagi eng sara bilimlar to\'plami bitta ekotizimda.', icon: 'fa-book-atlas', color: 'text-cyan-400', isSpecial: true },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-6 sm:px-10 pb-32 md:pb-64">
      {/* Dramatic Hero */}
      <section className="flex flex-col items-center text-center mb-32 md:mb-64 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] md:h-[400px] bg-honey/5 blur-[80px] md:blur-[120px] rounded-full -z-10 animate-pulse"></div>
        
        <div className="inline-flex items-center gap-2 md:gap-3 glass-premium px-4 md:px-6 py-2 md:py-2.5 rounded-full border-honey/20 mb-8 md:mb-12">
           <span className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-honey shadow-[0_0_10px_#FFB800]"></span>
           <span className="text-[8px] md:text-[10px] font-extrabold text-honey tracking-[0.3em] md:tracking-[0.4em] uppercase">The Future is Honey</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[110px] font-black leading-[1.1] tracking-tighter mb-8 md:mb-10 honey-text-gradient uppercase">
          WELCOME TO <br /> <span className="mt-2 md:mt-4 block">HONEY ECOSYSTEM</span>
        </h1>

        <p className="text-base sm:text-xl lg:text-2xl text-gray-200 max-w-2xl leading-relaxed font-medium mb-12 md:mb-16 opacity-90 px-4">
          Cheksiz imkoniyatlar, aqlli filtrlar va premium tajriba. <br className="hidden sm:block" /> Sizning shaxsiy raqamli saltanatingiz.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 w-full sm:w-auto px-6 sm:px-0">
           <Link to="/auth" className="bg-honey text-white px-8 md:px-16 py-4 md:py-6 text-[10px] md:text-xs font-bold tracking-[0.2em] rounded-xl md:rounded-2xl hover:scale-105 transition-all shadow-lg shadow-honey/20 uppercase border border-white/20">HOZIROQ BOSHLASH</Link>
           <Link to="/security" className="glass-premium px-8 md:px-12 py-4 md:py-6 text-[10px] md:text-xs font-bold rounded-xl md:rounded-2xl hover:scale-105 transition-all flex items-center justify-center gap-3 md:gap-4 text-white">
             EKOTIZIMNI O'RGANING <i className="fas fa-arrow-right-long text-honey"></i>
           </Link>
        </div>
      </section>
      {/* Modern Bento Grid Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-2 sm:px-0">
         {features.map((item, i) => (
           <Link key={i} to={item.path} className={`glass-premium p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] group hover:border-white/20 transition-all duration-500 overflow-hidden relative`}>
              <div className="flex items-center justify-between mb-8 md:mb-10">
                 <div className={`w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-white/5 flex items-center justify-center text-3xl md:text-4xl ${item.color} group-hover:scale-110 transition-transform duration-700`}>
                    <i className={`fas ${item.icon} icon-3d-prism`}></i>
                 </div>
                 <i className="fas fa-arrow-up-right text-white/20 group-hover:text-honey transition-colors"></i>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-3 md:mb-4 uppercase tracking-tighter">{item.title}</h3>
              <p className="text-gray-300 text-base md:text-lg font-bold leading-relaxed max-w-full md:max-w-[80%]">{item.desc}</p>
              
              {/* Subtle background glow */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/[0.02] blur-3xl rounded-full"></div>
           </Link>
         ))}
      </div>
    </div>
  );
};

export default Home;
