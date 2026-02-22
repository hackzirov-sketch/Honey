
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  const features = [
    { path: '/messenger', title: 'Intelligence Hub', desc: 'Sun\'iy intellekt tomonidan boshqariladigan premium muloqot muhiti.', icon: 'fa-brain', color: 'text-blue-400' },
    { path: '/media', title: 'Immersive Media', desc: '4K darsliklar va interaktiv bilimlar oqimi.', icon: 'fa-vr-cardboard', color: 'text-honey' },
    { path: '/classroom', title: 'Jonli Mentorlik', desc: 'Real-vaqtda mutaxassislar bilan yuzma-yuz muloqot.', icon: 'fa-user-tie', color: 'text-emerald-400' },
    { path: '/library', title: 'Prism Kutubxonasi', desc: 'Dunyodagi eng sara bilimlar to\'plami bitta ekotizimda.', icon: 'fa-book-atlas', color: 'text-cyan-400', isSpecial: true },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-10 pb-64">
      {/* Dramatic Hero */}
      <section className="flex flex-col items-center text-center mb-64 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-honey/5 blur-[120px] rounded-full -z-10 animate-pulse"></div>
        
        <div className="inline-flex items-center gap-3 glass-premium px-6 py-2.5 rounded-full border-honey/20 mb-12">
           <span className="w-1.5 h-1.5 rounded-full bg-honey shadow-[0_0_10px_#FFB800]"></span>
           <span className="text-[10px] font-extrabold text-honey tracking-[0.4em] uppercase">The Future is Honey</span>
        </div>

        <h1 className="text-7xl lg:text-[110px] font-black leading-tight tracking-tighter mb-10 honey-text-gradient uppercase">
          WELCOME TO <br /> <span className="mt-4 block">HONEY ECOSYSTEM</span>
        </h1>

        <p className="text-xl lg:text-2xl text-gray-400 max-w-2xl leading-relaxed font-medium mb-16 opacity-80">
          Cheksiz imkoniyatlar, aqlli filtrlar va premium tajriba. <br /> Sizning shaxsiy raqamli saltanatingiz.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
           <Link to="/auth" className="bg-honey text-black px-16 py-6 text-xs font-black tracking-[0.2em] rounded-2xl hover:scale-105 transition-all shadow-lg shadow-honey/20 uppercase">HOZIROQ BOSHLASH</Link>
           <Link to="/security" className="glass-premium px-12 py-6 text-xs font-bold rounded-2xl hover:bg-white/5 transition-all flex items-center gap-4">
             EKOTIZIMNI O'RGANING <i className="fas fa-arrow-right-long text-honey"></i>
           </Link>
        </div>
      </section>

      {/* Modern Bento Grid Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {features.map((item, i) => (
           <Link key={i} to={item.path} className={`glass-premium p-12 rounded-[3rem] group hover:border-white/20 transition-all duration-500 overflow-hidden relative`}>
              <div className="flex items-center justify-between mb-10">
                 <div className={`w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center text-4xl ${item.color} group-hover:scale-110 transition-transform duration-700`}>
                    <i className={`fas ${item.icon} icon-3d-prism`}></i>
                 </div>
                 <i className="fas fa-arrow-up-right text-white/20 group-hover:text-honey transition-colors"></i>
              </div>
              <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">{item.title}</h3>
              <p className="text-gray-500 text-lg font-bold leading-relaxed max-w-[80%]">{item.desc}</p>
              
              {/* Subtle background glow */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/[0.02] blur-3xl rounded-full"></div>
           </Link>
         ))}
      </div>
    </div>
  );
};

export default Home;
