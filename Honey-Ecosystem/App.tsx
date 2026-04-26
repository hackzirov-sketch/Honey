
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Messenger from './pages/Messenger';
import Media from './pages/Media';
import AIAssistant from './pages/AIAssistant';
import Analytics from './pages/Analytics';
import KnowledgeBase from './pages/KnowledgeBase';
import Security from './pages/Security';
import Profile from './pages/Profile';
import Classroom from './pages/Classroom';
import Library from './pages/Library';
import Auth from './pages/Auth';

const HoneyLogo = ({ size = "sm", scrolled = false }: { size?: "sm" | "lg", scrolled?: boolean }) => {
  const isSmall = size === "sm" || scrolled;
  const hexSize = isSmall ? "w-5 h-6" : "w-10 h-12";
  const gap = isSmall ? "gap-0.5" : "gap-1";
  const mb = isSmall ? "mb-[-0.7rem]" : "lg:mb-[-1.8rem]";
  
  return (
    <div className="flex flex-col items-center select-none group cursor-pointer">
      <div className="flex flex-col items-center animate-float-soft">
        <div className={`flex ${gap} ${mb}`}>
           <div className={`${hexSize} bg-[#FFB800] clip-hexagon shadow-[0_0_25px_#FFB800] group-hover:brightness-125 transition-all duration-500`}></div>
        </div>
        <div className={`flex ${gap} ${mb}`}>
          <div className={`${hexSize} bg-[#E1A200] clip-hexagon transition-all duration-500`}></div>
          <div className={`${hexSize} bg-[#D28100] clip-hexagon transition-all duration-500`}></div>
        </div>
        <div className={`flex ${gap}`}>
          <div className={`${hexSize} bg-[#3E2413] clip-hexagon opacity-60 transition-all duration-500`}></div>
          <div className={`${hexSize} bg-[#3E2413] clip-hexagon opacity-60 transition-all duration-500`}></div>
          <div className={`${hexSize} bg-[#3E2413] clip-hexagon opacity-60 transition-all duration-500`}></div>
        </div>
      </div>
      <div className={`mt-2 text-center transition-all duration-500 ${isSmall ? 'scale-75' : 'scale-100'}`}>
        <span className={`${isSmall ? "text-sm" : "text-4xl"} font-extrabold text-white tracking-[0.3em] uppercase group-hover:text-[#FFB800] transition-colors`}>HONEY</span>
      </div>
    </div>
  );
};

const BottomNav = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = React.useState(true);
  const lastScrollY = React.useRef(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      
      const isNearBottom = currentScrollY + clientHeight >= scrollHeight - 100;
      const isScrollingDown = currentScrollY > lastScrollY.current;

      if (isNearBottom && isScrollingDown) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'ASOSIY', icon: 'fa-shapes' },
    { path: '/messenger', label: 'HUB', icon: 'fa-compass' },
    { path: '/media', label: 'STREAM', icon: 'fa-play-circle' },
    { path: '/classroom', label: 'LIVE', icon: 'fa-podcast' },
    { path: '/library', label: 'KITOB', icon: 'fa-book-atlas', accent: 'cyan' },
    { path: '/profile', label: 'MEN', icon: 'fa-fingerprint' },
  ];

  return (
    <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] w-auto max-w-[95vw] transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'}`}>
      <div className="glass-premium rounded-[2.5rem] p-2 flex items-center gap-1 shadow-[0_25px_60px_rgba(0,0,0,0.7)] border-white/10">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const isAccent = item.accent === 'cyan';
          
          return (
            <Link key={item.path} to={item.path} className={`flex flex-col items-center justify-center w-20 h-20 rounded-3xl transition-all duration-300 relative group`}>
               {isActive && (
                 <div className={`absolute inset-0 ${isAccent ? 'bg-cyan-500/20' : 'bg-honey/20'} rounded-3xl border border-white/10 shadow-inner`}></div>
               )}
               <i className={`fas ${item.icon} text-xl ${isActive ? (isAccent ? 'text-cyan-400 drop-shadow-[0_0_12px_#00F0FF]' : 'text-honey drop-shadow-[0_0_12px_#FFB800]') : 'text-gray-400 group-hover:text-white'} transition-all duration-300`}></i>
               
               <span className={`text-[10px] font-black tracking-widest mt-2 text-shadow-premium transition-all duration-300 ${
                 isActive 
                  ? (isAccent ? 'text-cyan-400 opacity-100 scale-105' : 'text-honey opacity-100 scale-105') 
                  : 'text-gray-400 opacity-60 group-hover:opacity-100'
               }`}>
                 {item.label}
               </span>

               {isActive && (
                 <div className={`absolute -bottom-1 w-2 h-2 rounded-full ${isAccent ? 'bg-cyan-400 shadow-[0_0_10px_#00F0FF]' : 'bg-honey shadow-[0_0_10px_#FFB800]'}`}></div>
               )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('honey_theme') as 'dark' | 'light') || 'dark';
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('honey_user');
    if (savedUser) setUser(JSON.parse(savedUser));
    
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAuth = () => {
    const savedUser = localStorage.getItem('honey_user');
    if (savedUser) setUser(JSON.parse(savedUser));
    window.location.hash = '/';
  };

  const handleLogout = () => {
    localStorage.removeItem('honey_user');
    localStorage.removeItem('honey_profile');
    setUser(null);
    window.location.hash = '/auth';
  };

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('honey_theme', theme);
  }, [theme]);

  const isMessenger = location.pathname === '/messenger';

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 bg-[#030303]`}>
      {/* Elite Floating Top Nav */}
      <div className={`fixed top-0 left-0 right-0 z-[100] flex justify-center pointer-events-none transition-all duration-700 ${
        isMessenger ? '-translate-y-full opacity-0 scale-95' : 'translate-y-0 opacity-100 scale-100'
      }`}>
        <nav className={`transition-all duration-700 pointer-events-auto flex items-center justify-between ${
          scrolled 
            ? 'mt-6 w-[90%] lg:w-[85%] max-w-screen-xl py-4 px-10 glass-premium rounded-[3rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]' 
            : 'mt-0 w-full py-10 px-10 lg:px-20 bg-transparent'
        }`}>
          <Link to="/" className="flex items-center transform transition-all duration-500 hover:scale-105">
            <HoneyLogo size="sm" scrolled={scrolled} />
          </Link>
          
          <div className="flex items-center gap-4 lg:gap-8">
            <div className="hidden lg:flex items-center gap-6 mr-4">
              {['AKADEMIYA', 'HAMJAMIYAT', 'XAVFSIZLIK'].map((link) => (
                <span key={link} className="text-[9px] font-black tracking-[0.3em] text-gray-500 hover:text-honey cursor-pointer transition-colors uppercase pointer-events-auto">
                  {link}
                </span>
              ))}
            </div>
            
            {user ? (
              <Link to="/profile" className="flex items-center gap-3 glass-premium px-4 py-2 rounded-2xl border-white/10 hover:border-honey/40 transition-all pointer-events-auto">
                 <div className="w-8 h-8 rounded-xl overflow-hidden border border-white/20">
                    <img src={user.picture} alt="P" className="w-full h-full object-cover" />
                 </div>
                 <span className="hidden sm:inline text-[10px] font-bold text-gray-300 tracking-widest uppercase">{user.name.split(' ')[0]}</span>
              </Link>
            ) : (
              <Link to="/auth" className="bg-[#FFB800] text-black px-8 py-3 text-[10px] font-black rounded-2xl pointer-events-auto hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,184,0,0.5)] uppercase tracking-widest border border-white/20 z-[110] relative">KIRISH</Link>
            )}
          </div>
        </nav>
      </div>

      <main className={`flex-1 transition-all duration-700 ${isMessenger ? 'pt-0' : 'pt-40 lg:pt-52'}`}>
        <Routes>
          <Route path="/" element={<Home onStart={() => {}} />} />
          <Route path="/auth" element={user ? <Home onStart={() => {}} /> : <Auth onAuth={handleAuth} />} />
          <Route path="/messenger" element={<Messenger />} />
          <Route path="/media" element={<Media />} />
          <Route path="/classroom" element={<Classroom />} />
          <Route path="/library" element={<Library />} />
          <Route path="/security" element={<Security />} />
          <Route path="/profile" element={<Profile onLogout={handleLogout} />} />
        </Routes>
      </main>
      
      <BottomNav />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;
