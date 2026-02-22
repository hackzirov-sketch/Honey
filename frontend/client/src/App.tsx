
import React, { useState, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Messenger from './pages/Messenger';
import Media from './pages/Media';
import Classroom from './pages/Classroom';
import Library from './pages/Library';
import Security from './pages/Security';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Auth from './pages/Auth';
import { API_BASE_URL, API_ENDPOINTS, setAuthToken, clearAuthTokens } from './config/api.config';

const ThemeToggle = ({ theme, setTheme }: { theme: 'dark' | 'light', setTheme: (t: 'dark' | 'light') => void }) => {
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={`relative w-16 h-8 rounded-full flex items-center p-1 group transition-all duration-700 hover:scale-105 backdrop-blur-xl ${theme === 'dark'
        ? 'bg-white/10 border border-blue-400/30 shadow-[0_0_20px_rgba(100,150,255,0.3),inset_0_0_15px_rgba(100,150,255,0.1)]'
        : 'bg-white/20 border border-yellow-400/40 shadow-[0_0_20px_rgba(255,200,0,0.3),inset_0_0_15px_rgba(255,200,0,0.1)]'
        }`}
      data-testid="button-theme-toggle"
    >
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500 ${theme === 'dark'
          ? 'translate-x-0 bg-gradient-to-br from-blue-400 to-purple-500 shadow-[0_0_15px_rgba(100,150,255,0.8)]'
          : 'translate-x-8 bg-gradient-to-br from-yellow-300 to-orange-400 shadow-[0_0_15px_rgba(255,200,0,0.8)]'
          }`}
      >
        <i className={`fas ${theme === 'dark' ? 'fa-moon' : 'fa-sun'} text-[10px] text-white drop-shadow-lg`}></i>
      </div>

      <div className={`absolute right-2 transition-all duration-500 ${theme === 'dark' ? 'opacity-40' : 'opacity-0'}`}>
        <i className="fas fa-sun text-[8px] text-yellow-300/50"></i>
      </div>
      <div className={`absolute left-2 transition-all duration-500 ${theme === 'light' ? 'opacity-40' : 'opacity-0'}`}>
        <i className="fas fa-moon text-[8px] text-blue-300/50"></i>
      </div>
    </button>
  );
};

const VideoBackground = ({ theme }: { theme: 'dark' | 'light' }) => {
  const darkVideoRef = useRef<HTMLVideoElement>(null);
  const lightVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (darkVideoRef.current) darkVideoRef.current.play().catch(() => { });
    if (lightVideoRef.current) lightVideoRef.current.play().catch(() => { });
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      <video
        ref={darkVideoRef}
        className={`absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover transition-opacity duration-1000 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`}
        src="/background-dark.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <video
        ref={lightVideoRef}
        className={`absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover transition-opacity duration-1000 ${theme === 'light' ? 'opacity-100' : 'opacity-0'}`}
        src="/background-light.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className={`absolute inset-0 transition-colors duration-1000 ${theme === 'dark' ? 'bg-black/40' : 'bg-white/10'}`}></div>
    </div>
  );
};

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
        <span className={`${isSmall ? "text-sm" : "text-4xl"} font-extrabold text-white tracking-[0.3em] uppercase group-hover:text-[#FFB800] transition-colors drop-shadow-lg`}>HONEY</span>
      </div>
    </div>
  );
};

const BottomNav = ({ theme }: { theme: 'dark' | 'light' }) => {
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
    <div className={`fixed bottom-0 sm:bottom-8 left-1/2 -translate-x-1/2 z-[200] w-full sm:w-auto max-w-full sm:max-w-[95vw] transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'}`}>
      <div className={`glass-premium p-1.5 sm:p-2 flex items-center justify-around sm:justify-start gap-0.5 sm:gap-1 shadow-2xl overflow-hidden rounded-t-[1.5rem] sm:rounded-[2.5rem]`}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const isAccent = item.accent === 'cyan';

          return (
            <Link key={item.path} to={item.path} className={`flex flex-col items-center justify-center w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-3xl transition-all duration-300 relative group`} data-testid={`link-nav-${item.label.toLowerCase()}`}>
              {isActive && (
                <div className={`absolute inset-0 ${isAccent ? 'bg-cyan-500/30' : 'bg-honey/30'} rounded-xl sm:rounded-3xl border border-white/20 backdrop-blur-sm`}></div>
              )}
              <i className={`fas ${item.icon} text-base sm:text-xl ${isActive ? (isAccent ? 'text-cyan-400 drop-shadow-[0_0_12px_#00F0FF]' : 'text-honey drop-shadow-[0_0_12px_#FFB800]') : (theme === 'dark' ? 'text-gray-300' : 'text-gray-800') + ' group-hover:text-white'} transition-all duration-300`}></i>

              <span className={`text-[8px] sm:text-[10px] font-black tracking-widest mt-1 sm:mt-2 transition-all duration-300 ${isActive
                ? (isAccent ? 'text-cyan-400 opacity-100 scale-105' : 'text-honey opacity-100 scale-105')
                : (theme === 'dark' ? 'text-gray-300' : 'text-gray-800') + ' opacity-80 group-hover:opacity-100'
                }`}>
                {item.label}
              </span>

              {isActive && (
                <div className={`absolute -bottom-0.5 sm:-bottom-1 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${isAccent ? 'bg-cyan-400 shadow-[0_0_10px_#00F0FF]' : 'bg-honey shadow-[0_0_10px_#FFB800]'}`}></div>
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
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      // Agar kishi avval Profilga kirmoqchi bo'lgan bo'lsa, o'sha yerga qaytarish yaxshiroq
      window.location.hash = '/profile';
    } else {
      window.location.hash = '/';
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('honey_user');
    localStorage.removeItem('honey_profile');
    localStorage.removeItem('honey_access_token');
    localStorage.removeItem('honey_refresh_token');
    setUser(null);
    window.location.hash = '/auth';
  };

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('honey_theme', theme);
  }, [theme]);

  const isClassroom = location.pathname === '/classroom';
  const isMessenger = location.pathname === '/messenger';
  const hideBottomNav = (isMessenger || isClassroom) && localStorage.getItem('honey_user');
  const glassBg = theme === 'dark' ? 'bg-black/30' : 'bg-white/40';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-800';

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500`}>
      <VideoBackground theme={theme} />

      <div className={`fixed top-0 left-0 right-0 z-[100] flex justify-center pointer-events-none transition-all duration-700 ${(isMessenger || isClassroom) ? '-translate-y-full opacity-0 scale-95' : 'translate-y-0 opacity-100 scale-100'
        }`}>
        <nav className={`transition-all duration-700 pointer-events-auto flex items-center justify-between ${scrolled
          ? `mt-6 w-[90%] lg:w-[85%] max-w-screen-xl py-4 px-10 ${glassBg} backdrop-blur-xl rounded-[3rem] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)]`
          : 'mt-0 w-full py-10 px-10 lg:px-20 bg-transparent'
          }`}>
          <Link to="/" className="flex items-center transform transition-all duration-500 hover:scale-105 shrink-0">
            <HoneyLogo size="sm" scrolled={scrolled} />
          </Link>

          <div className="flex items-center gap-3 md:gap-4 lg:gap-8">
            <div className="hidden lg:flex items-center gap-6 mr-4 shrink-0">
              {['AKADEMIYA', 'HAMJAMIYAT', 'XAVFSIZLIK'].map((link) => (
                <span key={link} className={`text-[9px] font-black tracking-[0.3em] ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'} hover:text-honey cursor-pointer transition-colors uppercase pointer-events-auto`}>
                  {link}
                </span>
              ))}
              {(user?.is_superuser || user?.is_staff || user?.username === 'admin') && (
                <Link to="/admin" className={`text-[9px] font-black tracking-[0.3em] text-red-500 hover:text-red-400 cursor-pointer transition-colors uppercase pointer-events-auto`}>
                  ADMIN
                </Link>
              )}
            </div>

            <div className="scale-75 sm:scale-100">
              <ThemeToggle theme={theme} setTheme={setTheme} />
            </div>

            {user ? (
              <Link to="/profile" className={`flex items-center gap-2 sm:gap-3 ${glassBg} backdrop-blur-xl px-2 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl border border-white/20 hover:border-honey/40 transition-all pointer-events-auto shrink-0`}>
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl overflow-hidden border border-white/30">
                  <img src={user.picture} alt="P" className="w-full h-full object-cover" />
                </div>
                <span className={`hidden xs:inline text-[8px] sm:text-[10px] font-bold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} tracking-widest uppercase truncate max-w-[60px] sm:max-w-none`}>{user.name.split(' ')[0]}</span>
              </Link>
            ) : (
              <Link to="/auth" className="bg-[#FFB800] text-[#1A1100] px-4 sm:px-8 py-2 sm:py-3 text-[9px] sm:text-[10px] font-black rounded-xl sm:rounded-2xl pointer-events-auto hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,184,0,0.5)] uppercase tracking-widest border border-white/20 z-[110] relative shrink-0" data-testid="link-auth">KIRISH</Link>
            )}
          </div>
        </nav>
      </div>

      <main className={`flex-1 transition-all duration-700 ${isMessenger ? 'pt-0' : 'pt-24 sm:pt-40 lg:pt-52'}`}>
        <Routes>
          <Route path="/" element={<Home onStart={() => { }} />} />
          <Route path="/auth" element={user ? <Home onStart={() => { }} /> : <Auth onAuth={handleAuth} />} />
          <Route path="/messenger" element={<Messenger />} />
          <Route path="/media" element={<Media />} />
          <Route path="/classroom" element={<Classroom />} />
          <Route path="/library" element={<Library />} />
          <Route path="/security" element={<Security />} />
          <Route path="/profile" element={user ? <Profile onLogout={handleLogout} /> : <Auth onAuth={handleAuth} />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>

      {!hideBottomNav && <BottomNav theme={theme} />}
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
