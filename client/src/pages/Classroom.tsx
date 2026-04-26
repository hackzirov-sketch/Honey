
import React, { useState, useEffect, useRef } from 'react';
import { API_BASE_URL, API_ENDPOINTS, getAuthToken } from '@/config/api.config';

interface LiveSession {
  id: string;
  title: string;
  description: string;
  streamer: any;
  status: 'scheduled' | 'live' | 'finished';
  participants_count: number;
  cover?: string;
  uploaderName?: string;
}

const AudioVisualizer = ({ stream, active }: { stream: MediaStream | null; active: boolean }) => {
  const [level, setLevel] = useState(0);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!stream || !active) {
      setLevel(0);
      return;
    }

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);
    analyser.fftSize = 32;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const updateLevel = () => {
      analyser.getByteFrequencyData(dataArray);
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i];
      }
      const average = sum / bufferLength;
      setLevel(average);
      animationRef.current = requestAnimationFrame(updateLevel);
    };

    updateLevel();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      audioContext.close();
    };
  }, [stream, active]);

  return (
    <div className="flex items-end gap-1 h-6 w-12 justify-center">
      {[1, 2, 3, 4, 5, 6].map((i) => {
        const height = active ? Math.max(15, (level / 255) * 100 * (0.5 + Math.random() * 0.5)) : 10;
        return (
          <div
            key={i}
            className={`w-1 rounded-full transition-all duration-150 ${active ? 'bg-honey shadow-[0_0_10px_#FFB800]' : 'bg-white/20'}`}
            style={{
              height: `${height}%`,
              opacity: active ? 0.4 + (level / 255) * 0.6 : 0.2
            }}
          ></div>
        );
      })}
    </div>
  );
};

interface Participant {
  id: string;
  user: any;
  status: 'pending' | 'approved' | 'rejected';
  is_muted: boolean;
  is_camera_off: boolean;
}

interface Message {
  id: string;
  user: any;
  text: string;
  created_at: string;
}

const Classroom: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('honey_user') || 'null');
  const [sessions, setSessions] = useState<LiveSession[]>([]);
  const [activeSession, setActiveSession] = useState<LiveSession | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [activeTab, setActiveTab] = useState('chat');
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [localStream]);

  // Handle video element attachment
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localVideoRef.current && localStream) {
        localVideoRef.current.srcObject = localStream;
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [localStream, activeSession]);

  useEffect(() => {
    fetchSessions();
    const interval = setInterval(fetchSessions, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activeSession) {
      fetchParticipants();
      fetchMessages();
      const interval = setInterval(() => {
        fetchParticipants();
        fetchMessages();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [activeSession]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchSessions = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.LIVE.SESSIONS}`, {
        headers: { 'Authorization': `Bearer ${getAuthToken()}` }
      });
      if (res.ok) {
        const data = await res.json();
        setSessions(data.results || data);
      }
    } catch (e) { console.error(e); }
  };

  const fetchParticipants = async () => {
    if (!activeSession) return;
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.LIVE.PARTICIPANTS(activeSession.id)}`, {
        headers: { 'Authorization': `Bearer ${getAuthToken()}` }
      });
      if (res.ok) setParticipants(await res.json());
    } catch (e) { console.error(e); }
  };

  const fetchMessages = async () => {
    if (!activeSession) return;
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.LIVE.MESSAGES(activeSession.id)}`, {
        headers: { 'Authorization': `Bearer ${getAuthToken()}` }
      });
      if (res.ok) setMessages(await res.json());
    } catch (e) { console.error(e); }
  };

  const handleCreateSession = async () => {
    if (!newTitle.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.LIVE.SESSIONS}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify({ title: newTitle, status: 'live' })
      });
      if (res.ok) {
        const data = await res.json();
        setActiveSession(data);
        setIsCreating(false);
        setNewTitle('');
        requestPermissions();
      }
    } catch (e) { console.error(e); }
    setIsLoading(false);
  };

  const handleJoinRequest = async (sessionId: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.LIVE.JOIN(sessionId)}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${getAuthToken()}` }
      });
      if (res.ok) {
        const session = sessions.find(s => s.id === sessionId);
        if (session) setActiveSession(session);
        requestPermissions();
      }
    } catch (e) { console.error(e); }
  };

  const requestPermissions = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setPermissionError("Brauzeringiz kamera kirishini qo'llab-quvvatlamaydi. Iltimos sahifani yangi tabda oching (HTTPS talab qilinadi).");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
        audio: true
      });
      setLocalStream(stream);
      setPermissionError(null);

      if (isCameraOff) {
        stream.getVideoTracks().forEach(t => t.enabled = false);
      }
      if (isMuted) {
        stream.getAudioTracks().forEach(t => t.enabled = false);
      }
    } catch (e: any) {
      console.error("Permission error:", e);
      const name = e?.name || '';
      let msg = "Kamera yoki mikrofonga ruxsat berilmadi.";
      if (name === 'NotAllowedError' || name === 'PermissionDeniedError') {
        msg = "Siz kamera/mikrofonga ruxsat bermadingiz. Brauzer manzil qatori yonidagi qulfni bosib ruxsat bering va qayta urinib ko'ring.";
      } else if (name === 'NotFoundError' || name === 'DevicesNotFoundError') {
        msg = "Kamera yoki mikrofon topilmadi. Qurilmangiz ulanganligini tekshiring.";
      } else if (name === 'NotReadableError' || name === 'TrackStartError') {
        msg = "Kamera band — boshqa dastur foydalanmoqda. O'sha dasturlarni yopib qayta urinib ko'ring.";
      } else if (name === 'SecurityError' || window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
        msg = "Xavfsiz ulanish (HTTPS) kerak. Sahifani yangi tabda HTTPS orqali oching.";
      }
      setPermissionError(msg);
    }
  };

  const openInNewTab = () => {
    window.open(window.location.href, '_blank', 'noopener,noreferrer');
  };

  const toggleMute = () => {
    const newState = !isMuted;
    setIsMuted(newState);
    if (localStream) {
      localStream.getAudioTracks().forEach(t => t.enabled = !newState);
    }
  };

  const toggleCamera = () => {
    const newState = !isCameraOff;
    setIsCameraOff(newState);
    if (localStream) {
      localStream.getVideoTracks().forEach(t => t.enabled = !newState);
    }
  };

  const handleLeave = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }
    setActiveSession(null);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || !activeSession) return;
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.LIVE.SEND(activeSession.id)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify({ text: inputText })
      });
      if (res.ok) {
        setInputText('');
        fetchMessages();
      }
    } catch (e) { console.error(e); }
  };

  const handleApprove = async (participantId: string) => {
    if (!activeSession) return;
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.LIVE.APPROVE(activeSession.id, participantId)}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${getAuthToken()}` }
      });
      if (res.ok) fetchParticipants();
    } catch (e) { console.error(e); }
  };

  const handleEndStream = async () => {
    if (!activeSession) return;
    if (!window.confirm("Haqiqatan ham efirni tugatmoqchimisiz?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.LIVE.END(activeSession.id)}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${getAuthToken()}` }
      });
      if (res.ok) handleLeave();
    } catch (e) { console.error(e); }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-6 py-20 flex flex-col items-center justify-center text-center space-y-12 animate-fadeIn pb-64">
        <div className="w-32 h-32 bg-honey/10 rounded-[3rem] border border-honey/20 flex items-center justify-center text-5xl text-honey animate-float-soft">
          <i className="fas fa-video"></i>
        </div>
        <div className="max-w-3xl space-y-6">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter honey-glow-text">Jonli Efirlar</h1>
          <p className="text-xl md:text-2xl text-gray-200 font-bold leading-relaxed">
            Honey Academy platformasida mutaxassislar tomonidan o'tiladigan jonli darslar va vebinarlarda ishtirok eting.
          </p>
          <a href="#/auth" className="bg-honey text-white px-12 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-honey/20 hover:scale-105 transition-all inline-block">
            KIRISH
          </a>
        </div>
      </div>
    );
  }

  if (!activeSession) {
    return (
      <div className="container mx-auto px-6 py-12 max-w-6xl animate-fadeIn">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tight">Active Live Streams</h1>
            <p className="text-gray-400 font-bold mt-2">Hozirda bo'layotgan yoki rejalashtirilgan efirlar</p>
          </div>
          {(user.is_superuser || user.is_staff) && (
            <button
              onClick={() => setIsCreating(true)}
              className="bg-honey text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-honey/20 hover:scale-105 transition-all"
            >
              Yangi efir boshlash
            </button>
          )}
        </div>

        {isCreating && (
          <div className="glass-premium p-8 rounded-[2rem] border-white/10 mb-12 animate-scaleIn">
            <h2 className="text-xl font-black text-white uppercase mb-6">Efir Ma'lumotlari</h2>
            <div className="space-y-4">
              <input
                placeholder="Efir nomi (masalan: Backend darslari)"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-honey transition-all"
              />
              <div className="flex gap-4">
                <button
                  onClick={() => setIsCreating(false)}
                  className="flex-1 py-4 text-gray-400 font-black uppercase text-xs"
                >
                  Bekor qilish
                </button>
                <button
                  onClick={handleCreateSession}
                  disabled={isLoading}
                  className="flex-1 bg-honey text-white py-4 rounded-xl font-black uppercase text-xs shadow-lg"
                >
                  {isLoading ? 'Yaratilmoqda...' : 'Boshlash'}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sessions.map(s => (
            <div key={s.id} className="glass-premium rounded-[2.5rem] border-white/5 overflow-hidden group hover:border-honey/30 transition-all duration-500 hover:translate-y-[-10px] shadow-2xl">
              <div className="relative aspect-video">
                <img src={s.cover || "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                {s.status === 'live' && (
                  <div className="absolute top-6 left-6 flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-white"></span> LIVE
                  </div>
                )}
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-honey/10 flex items-center justify-center text-honey">
                    <i className="fas fa-video"></i>
                  </div>
                  <div>
                    <h3 className="text-white font-black uppercase text-sm tracking-tight line-clamp-1">{s.title}</h3>
                    <p className="text-gray-500 text-[10px] font-bold uppercase">{s.streamer?.username} • {s.participants_count} qatnashchi</p>
                  </div>
                </div>
                <button
                  onClick={() => handleJoinRequest(s.id)}
                  className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-black uppercase text-[10px] tracking-widest hover:bg-honey hover:border-honey transition-all"
                >
                  Qo'shilish
                </button>
              </div>
            </div>
          ))}
          {sessions.length === 0 && (
            <div className="col-span-full py-24 text-center opacity-30">
              <i className="fas fa-ghost text-5xl mb-4"></i>
              <p className="font-black uppercase tracking-widest">Hozirda efirlar mavjud emas</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  const isStreamer = activeSession.streamer?.id === user.id || activeSession.streamer?.username === user.username;
  const myParticipant = participants.find(p => p.user?.id === user.id || p.user?.username === user.username);
  const isApproved = isStreamer || myParticipant?.status === 'approved';

  return (
    <div className="fixed inset-0 z-[999] flex flex-col lg:flex-row bg-[#050505] overflow-hidden animate-fadeIn select-none">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-b from-black/80 to-transparent z-[1000] pointer-events-none flex items-center px-3 sm:px-6">
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-4 w-full">
          <button
            onClick={handleLeave}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/10 flex items-center justify-center text-white hover:bg-red-500 transition-all group shadow-2xl shrink-0"
            title="Chiqish"
          >
            <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform text-sm sm:text-base"></i>
          </button>
          <div className="bg-black/40 backdrop-blur-xl px-3 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl border border-white/10 flex-1 min-w-0">
            <h2 className="text-white font-black uppercase text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] truncate">{activeSession.title}</h2>
          </div>
        </div>
      </div>

      {/* Permission Warning */}
      {permissionError && (
        <div className="fixed top-20 sm:top-24 left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:max-w-2xl z-[300] bg-red-600/95 backdrop-blur-xl text-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border border-red-400/30 shadow-2xl animate-slideInDown">
          <div className="flex items-start gap-3">
            <i className="fas fa-exclamation-triangle text-lg sm:text-xl mt-0.5 shrink-0"></i>
            <p className="font-bold text-xs sm:text-sm flex-1 leading-snug">{permissionError}</p>
            <button onClick={() => setPermissionError(null)} className="hover:opacity-70 shrink-0"><i className="fas fa-times"></i></button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3 pl-7 sm:pl-9">
            <button
              onClick={requestPermissions}
              className="bg-white text-red-600 px-4 py-2 rounded-xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all"
            >
              <i className="fas fa-redo mr-2"></i>Qayta urinish
            </button>
            <button
              onClick={openInNewTab}
              className="bg-black/30 text-white px-4 py-2 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-black/50 transition-all border border-white/20"
            >
              <i className="fas fa-external-link-alt mr-2"></i>Yangi tabda ochish
            </button>
          </div>
        </div>
      )}

      {/* Video Call Area */}
      <div className="flex-1 flex flex-col relative pt-20 sm:pt-24 pb-28 sm:pb-32 px-3 sm:px-6 md:px-10 lg:px-16 h-full overflow-hidden">
        {!isApproved ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 glass-premium rounded-[3rem] border-white/5 p-12">
            <div className="w-24 h-24 rounded-full bg-honey/10 flex items-center justify-center text-honey text-4xl animate-pulse">
              <i className="fas fa-clock"></i>
            </div>
            <div className="max-w-md">
              <h2 className="text-white font-black uppercase text-2xl mb-2">Sorov yuborildi</h2>
              <p className="text-gray-400 font-bold">Admin sizni efirga qo'shishini kuting. Ruxsat berilgach video va ovoz ulanadi.</p>
            </div>
            <button
              onClick={() => setActiveSession(null)}
              className="text-gray-500 font-black uppercase text-[10px] tracking-widest hover:text-white"
            >
              Orqaga qaytish
            </button>
          </div>
        ) : (
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-5 lg:gap-8 h-full min-h-0">
            {/* Main Streamer Video */}
            <div className="relative rounded-2xl sm:rounded-[2rem] lg:rounded-[3rem] overflow-hidden border-2 border-honey/40 shadow-[0_0_60px_rgba(255,184,0,0.15)] group bg-black min-h-[40vh] lg:min-h-0">
              {isStreamer ? (
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`w-full h-full object-cover mirror-mode ${isCameraOff ? 'opacity-0' : 'opacity-90'}`}
                />
              ) : (
                <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover opacity-80" alt="" />
              )}

              {isCameraOff && isStreamer && (
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 px-4">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full bg-honey/10 border border-honey/20 flex items-center justify-center text-3xl sm:text-4xl lg:text-5xl text-honey animate-pulse">
                    <i className="fas fa-video-slash"></i>
                  </div>
                  <p className="text-honey font-black uppercase tracking-widest text-[10px] sm:text-xs">Kamera o'chirilgan</p>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute bottom-3 sm:bottom-6 lg:bottom-10 left-3 sm:left-6 lg:left-10 flex items-center gap-2 sm:gap-4">
                <div className="w-9 h-9 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl border-2 border-honey overflow-hidden shadow-2xl bg-black">
                  <img src={activeSession.streamer?.avatar || "https://i.pravatar.cc/150?u=admin"} className="w-full h-full object-cover" alt="" />
                </div>
                <div>
                  <h3 className="text-white font-black uppercase text-xs sm:text-base lg:text-lg tracking-tight">{activeSession.streamer?.username}</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-600 animate-pulse"></span>
                    <span className="text-honey text-[8px] sm:text-[10px] font-black uppercase tracking-widest">Mentor • Live</span>
                  </div>
                </div>
              </div>

              <div className="absolute top-3 sm:top-6 lg:top-10 right-3 sm:right-6 lg:right-10 flex gap-2 sm:gap-3">
                <div className="bg-black/60 backdrop-blur-xl border border-white/10 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-white text-[8px] sm:text-[10px] font-black uppercase flex items-center gap-1.5 sm:gap-2">
                  <i className="fas fa-users text-honey"></i> {participants.filter(p => p.status === 'approved').length}
                </div>
                <div className="bg-red-600/90 backdrop-blur-xl px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-white text-[8px] sm:text-[10px] font-black uppercase tracking-widest animate-pulse border border-red-400/30 shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                  LIVE
                </div>
              </div>
            </div>

            {/* My Cam (if not streamer) or Grid */}
            {!isStreamer ? (
              <div className="relative rounded-2xl sm:rounded-[2rem] lg:rounded-[3rem] overflow-hidden border border-white/10 bg-[#0c0c0c] flex items-center justify-center group shadow-2xl min-h-[30vh] lg:min-h-0">
                {!isCameraOff && localStream ? (
                  <div className="w-full h-full flex items-center justify-center relative">
                    <video
                      ref={localVideoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover mirror-mode opacity-80"
                    />
                    <div className="absolute top-3 sm:top-6 right-3 sm:right-6 flex items-center gap-2 bg-black/60 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl border border-white/10">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div>
                      <span className="text-[7px] sm:text-[8px] font-black text-white uppercase tracking-widest">Siz (LIVE)</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-4 sm:space-y-6 px-4">
                    <div className="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-2xl sm:rounded-[2rem] lg:rounded-[2.5rem] bg-white/5 border border-white/10 flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl text-gray-700 mx-auto shadow-inner">
                      <i className={`fas ${localStream ? 'fa-user-tie' : 'fa-video-slash'}`}></i>
                    </div>
                    <p className="text-gray-500 font-black uppercase tracking-widest text-[9px] sm:text-[10px]">{localStream ? "Kamera yopiq" : "Kamera ulanmagan"}</p>
                    {!localStream && (
                      <button
                        onClick={requestPermissions}
                        className="bg-honey text-black px-5 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all"
                      >
                        <i className="fas fa-camera mr-2"></i>Kamerani yoqish
                      </button>
                    )}
                  </div>
                )}
                <div className="absolute bottom-3 sm:bottom-6 lg:bottom-10 left-3 sm:left-6 lg:left-10 flex items-center gap-2 sm:gap-4">
                  <div className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl text-xs sm:text-sm ${isMuted ? 'bg-red-500/20 text-red-500' : 'bg-honey/20 text-honey'}`}>
                    <i className={`fas ${isMuted ? 'fa-microphone-slash' : 'fa-microphone'}`}></i>
                  </div>
                  <h3 className="text-white font-black uppercase text-xs sm:text-sm tracking-widest truncate max-w-[60vw]">{user.username}</h3>
                </div>
              </div>
            ) : (
              <div className="relative rounded-2xl sm:rounded-[2rem] lg:rounded-[3rem] overflow-hidden border border-white/10 bg-white/[0.02] flex flex-col items-center justify-center p-6 sm:p-10 lg:p-12 text-center min-h-[30vh] lg:min-h-0">
                <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-2xl sm:rounded-[2.5rem] lg:rounded-[3rem] bg-honey/10 border border-honey/20 flex items-center justify-center text-honey text-3xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6 lg:mb-8 animate-float-soft">
                  <i className="fas fa-broadcast-tower"></i>
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white uppercase tracking-tighter mb-2 sm:mb-4">Siz Efirdasiz</h2>
                <p className="text-gray-400 font-bold text-xs sm:text-sm lg:text-base max-w-sm">Darsingizni davom ettiring. Ishtirokchilar sizni ko'rib va eshitib turishibdi.</p>
                {!localStream && (
                  <button
                    onClick={requestPermissions}
                    className="mt-6 bg-honey text-black px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all"
                  >
                    <i className="fas fa-camera mr-2"></i>Kamera/Mikrofonni yoqish
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Controls */}
        {isApproved && (
          <div className="absolute bottom-3 sm:bottom-6 lg:bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-3 lg:gap-4 px-3 sm:px-6 lg:px-8 py-2.5 sm:py-4 lg:py-5 bg-black/85 backdrop-blur-3xl rounded-2xl sm:rounded-[2rem] lg:rounded-[2.5rem] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] z-[200] transition-all hover:border-honey/40 max-w-[calc(100vw-1.5rem)]">
            <div className="hidden sm:flex items-center gap-3 mr-2 lg:mr-4 border-r border-white/10 pr-3 lg:pr-6">
              <AudioVisualizer stream={localStream} active={!isMuted && !!localStream} />
            </div>

            <button
              onClick={toggleMute}
              disabled={!localStream}
              className={`w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed ${isMuted ? 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]' : 'bg-white/5 text-white hover:bg-white/10'}`}
              title={isMuted ? "Ovozni yoqish" : "Ovozni o'chirish"}
            >
              <i className={`fas ${isMuted ? 'fa-microphone-slash' : 'fa-microphone'} text-base sm:text-lg lg:text-xl`}></i>
            </button>

            <button
              onClick={toggleCamera}
              disabled={!localStream}
              className={`w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed ${isCameraOff ? 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]' : 'bg-white/5 text-white hover:bg-white/10'}`}
              title={isCameraOff ? "Kamerani yoqish" : "Kamerani o'chirish"}
            >
              <i className={`fas ${isCameraOff ? 'fa-video-slash' : 'fa-video'} text-base sm:text-lg lg:text-xl`}></i>
            </button>

            {!localStream && (
              <button
                onClick={requestPermissions}
                className="w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center bg-honey text-black hover:scale-105 transition-all"
                title="Kamera/Mikrofonni yoqish"
              >
                <i className="fas fa-plug text-base sm:text-lg lg:text-xl"></i>
              </button>
            )}

            <div className="w-px h-8 sm:h-10 bg-white/10 mx-1 sm:mx-2"></div>

            {isStreamer ? (
              <button
                onClick={handleEndStream}
                className="bg-red-600 text-white px-3 sm:px-6 lg:px-8 py-3 lg:py-4 rounded-xl sm:rounded-2xl font-black uppercase text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] hover:bg-red-700 transition-all active:scale-95 shadow-[0_10px_30px_rgba(239,68,68,0.3)] border border-white/10 flex items-center gap-2 sm:gap-3"
              >
                <i className="fas fa-stop-circle text-sm sm:text-base lg:text-lg"></i>
                <span className="hidden sm:inline">YAKUNLASH</span>
              </button>
            ) : (
              <button
                onClick={handleLeave}
                className="bg-white/10 text-white px-3 sm:px-6 lg:px-8 py-3 lg:py-4 rounded-xl sm:rounded-2xl font-black uppercase text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] hover:bg-red-600 transition-all active:scale-95 border border-white/5 flex items-center gap-2"
              >
                <i className="fas fa-sign-out-alt sm:hidden"></i>
                <span className="hidden sm:inline">TARK ETISH</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Sidebar toggle (mobile) */}
      <button
        onClick={() => setShowSidebar(s => !s)}
        className="lg:hidden fixed top-3 right-3 z-[1100] w-10 h-10 rounded-xl bg-black/70 backdrop-blur-xl border border-white/10 text-white flex items-center justify-center hover:bg-honey hover:text-black transition-all"
        title={showSidebar ? "Yopish" : "Suhbat"}
      >
        <i className={`fas ${showSidebar ? 'fa-times' : 'fa-comments'} text-base`}></i>
      </button>

      {/* Sidebar overlay backdrop (mobile) */}
      {showSidebar && (
        <div
          onClick={() => setShowSidebar(false)}
          className="lg:hidden fixed inset-0 z-[1050] bg-black/60 backdrop-blur-sm"
        />
      )}

      {/* Sidebar Section */}
      <div className={`fixed lg:relative inset-y-0 right-0 z-[1060] lg:z-auto w-[88%] sm:w-[420px] lg:w-[450px] max-w-full border-l border-white/10 flex flex-col bg-[#0a0a0a]/95 lg:bg-white/[0.01] backdrop-blur-3xl transition-transform duration-300 ${showSidebar ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
        <div className="flex p-3 sm:p-4 gap-2 sm:gap-3 bg-black/40">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${activeTab === 'chat' ? 'bg-honey text-white shadow-lg shadow-honey/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
          >
            Suhbat
          </button>
          <button
            onClick={() => setActiveTab('participants')}
            className={`flex-1 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${activeTab === 'participants' ? 'bg-honey text-white shadow-lg shadow-honey/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
          >
            Ishtirokchilar ({participants.length})
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
          {activeTab === 'chat' ? (
            <div className="space-y-8">
              {messages.map(m => (
                <div key={m.id} className="flex flex-col gap-3 animate-slideInRight">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-lg bg-honey/10 flex items-center justify-center text-honey text-[10px] font-black">
                      {m.user?.username[0].toUpperCase()}
                    </div>
                    <span className={`font-black text-[10px] uppercase ${m.user?.username === activeSession.streamer?.username ? 'text-honey' : 'text-blue-400'}`}>
                      {m.user?.username}
                    </span>
                    <span className="text-gray-600 text-[8px] font-bold">{new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className="bg-white/[0.03] p-5 rounded-[1.5rem] rounded-tl-none border border-white/5">
                    <p className="text-white/90 text-sm font-bold leading-relaxed">{m.text}</p>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          ) : (
            <div className="space-y-4">
              {participants.map(p => (
                <div key={p.id} className="flex items-center justify-between p-5 rounded-[2rem] bg-white/[0.02] border border-white/5 group hover:border-honey/20 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden border border-white/10">
                      <img src={p.user?.avatar || `https://i.pravatar.cc/150?u=${p.user?.username}`} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div>
                      <h4 className="text-white font-black uppercase text-xs tracking-tight">{p.user?.username}</h4>
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${p.status === 'approved' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                        <p className="text-gray-600 font-bold text-[9px] uppercase">{p.status}</p>
                      </div>
                    </div>
                  </div>
                  {isStreamer && p.status === 'pending' && (
                    <button
                      onClick={() => handleApprove(p.id)}
                      className="bg-honey text-white px-5 py-2.5 rounded-xl font-black uppercase text-[9px] tracking-widest shadow-lg shadow-honey/20 hover:scale-105 active:scale-95 transition-all"
                    >
                      Qabul qilish
                    </button>
                  )}
                  {p.status === 'approved' && (
                    <div className="flex gap-2">
                      {p.is_muted && <i className="fas fa-microphone-slash text-red-500 text-xs"></i>}
                      {p.is_camera_off && <i className="fas fa-video-slash text-red-500 text-xs"></i>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Input Area */}
        {activeTab === 'chat' && isApproved && (
          <div className="p-6 border-t border-white/5 bg-black/40 mb-20 lg:mb-0">
            <div className="relative flex items-center gap-4">
              <input
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                placeholder="Xabar yozing..."
                className="flex-1 bg-white/[0.03] border border-white/10 rounded-2xl py-5 px-8 text-white text-sm outline-none focus:border-honey/50 transition-all font-bold"
              />
              <button
                onClick={handleSendMessage}
                className="w-14 h-14 rounded-2xl bg-honey text-[#1A1100] flex items-center justify-center shadow-xl shadow-honey/20 active:scale-90 transition-all"
              >
                <i className="fas fa-paper-plane text-xl"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Classroom;
