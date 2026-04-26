
import React, { useState, useEffect, useRef } from 'react';
import { API_BASE_URL, API_ENDPOINTS, getAuthToken } from '@/config/api.config';
import { resolveAvatar } from '@/lib/utils';

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
    setParticipants([]);
    setMessages([]);
    fetchSessions();
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
      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-20 flex flex-col items-center justify-center text-center space-y-8 sm:space-y-12 animate-fadeIn pb-32 sm:pb-64">
        <div className="w-full flex justify-start">
          <a href="#/" className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 text-white/80 hover:bg-honey hover:text-black hover:border-honey transition-all font-black uppercase text-[10px] sm:text-xs tracking-widest">
            <i className="fas fa-arrow-left"></i>
            <span>Orqaga</span>
          </a>
        </div>
        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-honey/10 rounded-[2rem] sm:rounded-[3rem] border border-honey/20 flex items-center justify-center text-4xl sm:text-5xl text-honey animate-float-soft">
          <i className="fas fa-video"></i>
        </div>
        <div className="max-w-3xl space-y-4 sm:space-y-6 px-2">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white uppercase tracking-tighter honey-glow-text">Jonli Efirlar</h1>
          <p className="text-base sm:text-xl md:text-2xl text-gray-200 font-bold leading-relaxed">
            Honey Academy platformasida mutaxassislar tomonidan o'tiladigan jonli darslar va vebinarlarda ishtirok eting.
          </p>
          <a href="#/auth" className="bg-honey text-white px-8 sm:px-12 py-4 sm:py-6 rounded-xl sm:rounded-2xl font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] shadow-lg shadow-honey/20 hover:scale-105 transition-all inline-block">
            KIRISH
          </a>
        </div>
      </div>
    );
  }

  if (!activeSession) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-12 max-w-6xl animate-fadeIn pb-32">
        {/* Back button */}
        <a href="#/" className="inline-flex items-center gap-2 mb-6 sm:mb-8 px-4 py-2 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 text-white/80 hover:bg-honey hover:text-black hover:border-honey transition-all font-black uppercase text-[10px] sm:text-xs tracking-widest">
          <i className="fas fa-arrow-left"></i>
          <span>Orqaga</span>
        </a>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div>
            <h1 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">Jonli Efirlar</h1>
            <p className="text-gray-400 font-bold mt-2 text-xs sm:text-base">Hozirda bo'layotgan yoki rejalashtirilgan efirlar</p>
          </div>
          {(user.is_superuser || user.is_staff) && (
            <button
              onClick={() => setIsCreating(true)}
              className="bg-honey text-white px-5 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-[10px] sm:text-xs uppercase tracking-widest shadow-xl shadow-honey/20 hover:scale-105 transition-all w-full sm:w-auto"
            >
              <i className="fas fa-plus mr-2"></i>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {sessions.filter(s => s.status !== 'finished').map(s => (
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

  const approvedParticipants = participants.filter(p => p.status === 'approved');
  const pendingCount = participants.filter(p => p.status === 'pending').length;

  return (
    <div className="fixed inset-0 z-[999] flex bg-[#1f1f1f] overflow-hidden animate-fadeIn select-none text-white">
      {/* Permission Warning */}
      {permissionError && (
        <div className="fixed top-4 left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:max-w-2xl z-[1200] bg-red-600/95 backdrop-blur-xl text-white px-4 sm:px-5 py-3 rounded-xl border border-red-400/30 shadow-2xl animate-slideInDown">
          <div className="flex items-start gap-3">
            <i className="fas fa-exclamation-triangle text-base sm:text-lg mt-0.5 shrink-0"></i>
            <p className="font-semibold text-xs sm:text-sm flex-1 leading-snug">{permissionError}</p>
            <button onClick={() => setPermissionError(null)} className="hover:opacity-70 shrink-0"><i className="fas fa-times"></i></button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3 pl-7 sm:pl-8">
            <button onClick={requestPermissions} className="bg-white text-red-600 px-3 py-1.5 rounded-lg font-bold text-[11px] hover:scale-105 transition-all">
              <i className="fas fa-redo mr-1.5"></i>Qayta urinish
            </button>
            <button onClick={openInNewTab} className="bg-black/30 text-white px-3 py-1.5 rounded-lg font-bold text-[11px] hover:bg-black/50 transition-all border border-white/20">
              <i className="fas fa-external-link-alt mr-1.5"></i>Yangi tabda ochish
            </button>
          </div>
        </div>
      )}

      {/* Main video area */}
      <div className="flex-1 flex flex-col relative h-full min-w-0">
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 z-[200] flex items-center justify-between px-3 sm:px-5 py-3 bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 pointer-events-auto">
            <div className="flex items-center gap-2 bg-red-600 px-2.5 py-1 rounded-md">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              <span className="text-[10px] font-bold tracking-wider">LIVE</span>
            </div>
            <div className="text-white/90 font-semibold text-sm sm:text-base truncate max-w-[40vw] sm:max-w-md">{activeSession.title}</div>
          </div>
          <div className="flex items-center gap-2 pointer-events-auto">
            <div className="hidden sm:flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2.5 py-1.5 rounded-md text-[11px] font-medium">
              <i className="fas fa-users text-white/70"></i>
              <span>{approvedParticipants.length + 1}</span>
            </div>
          </div>
        </div>

        {!isApproved ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 p-8">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-3xl text-honey animate-pulse">
              <i className="fas fa-clock"></i>
            </div>
            <div className="max-w-md">
              <h2 className="text-white font-bold text-xl mb-2">So'rov yuborildi</h2>
              <p className="text-white/60 text-sm">Mentor sizni efirga qo'shishini kuting.</p>
            </div>
            <button onClick={() => setActiveSession(null)} className="text-white/50 font-semibold text-sm hover:text-white">
              <i className="fas fa-arrow-left mr-2"></i>Orqaga
            </button>
          </div>
        ) : (
          <>
            {/* Main speaker view (full bleed) */}
            <div className="flex-1 relative bg-[#0e0e0e] flex items-center justify-center overflow-hidden">
              {isStreamer ? (
                <>
                  <video
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`w-full h-full object-cover mirror-mode ${isCameraOff || !localStream ? 'opacity-0' : 'opacity-100'}`}
                  />
                  {(isCameraOff || !localStream) && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
                      <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-honey/40 shadow-2xl bg-white">
                        <img src={resolveAvatar(activeSession.streamer?.avatar)} className="w-full h-full object-cover" alt="" onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/default-avatar.png'; }} />
                      </div>
                      <div>
                        <p className="text-white font-bold text-base sm:text-lg">{activeSession.streamer?.username}</p>
                        <p className="text-white/50 text-xs sm:text-sm mt-1">{!localStream ? "Kamera ulanmagan" : "Kamera o'chirilgan"}</p>
                      </div>
                      {!localStream && (
                        <button onClick={requestPermissions} className="mt-2 bg-honey text-black px-5 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-all shadow-lg">
                          <i className="fas fa-video mr-2"></i>Kamerani yoqish
                        </button>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center gap-4 p-6 text-center">
                  <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-honey/40 shadow-2xl bg-white">
                    <img src={resolveAvatar(activeSession.streamer?.avatar)} className="w-full h-full object-cover" alt="" onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/default-avatar.png'; }} />
                  </div>
                  <p className="text-white font-bold text-lg">{activeSession.streamer?.username}</p>
                  <p className="text-white/50 text-xs">Mentor</p>
                </div>
              )}

              {/* Speaker name plate (bottom-left) */}
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 flex items-center gap-2 bg-black/55 backdrop-blur-md px-3 py-1.5 rounded-md">
                {isMuted && <i className="fas fa-microphone-slash text-red-400 text-xs"></i>}
                <span className="text-white text-xs sm:text-sm font-semibold">
                  {isStreamer ? `${activeSession.streamer?.username} (Siz)` : activeSession.streamer?.username}
                </span>
              </div>
            </div>

            {/* Self-view PiP (only for non-streamer to see themselves) */}
            {!isStreamer && (
              <div className="absolute bottom-24 sm:bottom-28 right-3 sm:right-5 w-28 h-40 sm:w-40 sm:h-52 rounded-xl overflow-hidden border border-white/15 shadow-2xl bg-[#2a2a2a] z-[150]">
                {!isCameraOff && localStream ? (
                  <video
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover mirror-mode"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-center p-2">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-white">
                      <img src="/default-avatar.png" className="w-full h-full object-cover" alt="" />
                    </div>
                    <p className="text-white/70 text-[10px] font-semibold leading-tight">{!localStream ? "Kamera yoq" : "Kamera o'chiq"}</p>
                    {!localStream && (
                      <button onClick={requestPermissions} className="bg-honey text-black px-2 py-1 rounded text-[9px] font-bold mt-1">
                        Yoqish
                      </button>
                    )}
                  </div>
                )}
                <div className="absolute bottom-1 left-1 right-1 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded">
                  {isMuted && <i className="fas fa-microphone-slash text-red-400 text-[9px]"></i>}
                  <span className="text-white text-[10px] font-semibold truncate">Siz</span>
                </div>
              </div>
            )}

            {/* Pending request banner for streamer */}
            {isStreamer && pendingCount > 0 && (
              <button
                onClick={() => { setActiveTab('participants'); setShowSidebar(true); }}
                className="absolute top-14 right-3 sm:top-16 sm:right-5 z-[150] bg-honey text-black px-3 py-2 rounded-lg font-bold text-xs shadow-2xl flex items-center gap-2 hover:scale-105 transition-all animate-pulse"
              >
                <i className="fas fa-hand-paper"></i>
                {pendingCount} ta so'rov
              </button>
            )}

            {/* Bottom control bar (Meet/Zoom style) */}
            <div className="absolute bottom-0 left-0 right-0 z-[200] flex items-center justify-center gap-2 sm:gap-3 px-3 py-3 sm:py-4 bg-gradient-to-t from-black/80 to-transparent">
              <button
                onClick={toggleMute}
                disabled={!localStream}
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed ${isMuted ? 'bg-red-500 text-white' : 'bg-white/15 text-white hover:bg-white/25 backdrop-blur-md'}`}
                title={isMuted ? "Ovozni yoqish" : "Ovozni o'chirish"}
              >
                <i className={`fas ${isMuted ? 'fa-microphone-slash' : 'fa-microphone'} text-base sm:text-lg`}></i>
              </button>

              <button
                onClick={toggleCamera}
                disabled={!localStream}
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed ${isCameraOff ? 'bg-red-500 text-white' : 'bg-white/15 text-white hover:bg-white/25 backdrop-blur-md'}`}
                title={isCameraOff ? "Kamerani yoqish" : "Kamerani o'chirish"}
              >
                <i className={`fas ${isCameraOff ? 'fa-video-slash' : 'fa-video'} text-base sm:text-lg`}></i>
              </button>

              {!localStream && (
                <button
                  onClick={requestPermissions}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center bg-honey text-black hover:scale-105 transition-all shadow-lg"
                  title="Kamera/Mikrofonni yoqish"
                >
                  <i className="fas fa-plug text-base sm:text-lg"></i>
                </button>
              )}

              <button
                onClick={() => { setActiveTab('chat'); setShowSidebar(s => !s); }}
                className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all active:scale-90 backdrop-blur-md ${showSidebar && activeTab === 'chat' ? 'bg-honey text-black' : 'bg-white/15 text-white hover:bg-white/25'}`}
                title="Suhbat"
              >
                <i className="fas fa-comment-dots text-base sm:text-lg"></i>
              </button>

              <button
                onClick={() => { setActiveTab('participants'); setShowSidebar(s => !s); }}
                className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all active:scale-90 backdrop-blur-md ${showSidebar && activeTab === 'participants' ? 'bg-honey text-black' : 'bg-white/15 text-white hover:bg-white/25'}`}
                title="Ishtirokchilar"
              >
                <i className="fas fa-users text-base sm:text-lg"></i>
                {pendingCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-honey text-black text-[10px] font-black flex items-center justify-center border-2 border-[#1f1f1f]">{pendingCount}</span>
                )}
              </button>

              {isStreamer ? (
                <button
                  onClick={handleEndStream}
                  className="ml-2 sm:ml-3 h-12 sm:h-14 px-4 sm:px-6 rounded-full bg-red-600 text-white font-bold text-xs sm:text-sm hover:bg-red-700 transition-all active:scale-95 flex items-center gap-2 shadow-xl"
                  title="Efirni tugatish"
                >
                  <i className="fas fa-phone-slash text-base sm:text-lg rotate-[135deg]"></i>
                  <span className="hidden sm:inline">Tugatish</span>
                </button>
              ) : (
                <button
                  onClick={handleLeave}
                  className="ml-2 sm:ml-3 h-12 sm:h-14 px-4 sm:px-6 rounded-full bg-red-600 text-white font-bold text-xs sm:text-sm hover:bg-red-700 transition-all active:scale-95 flex items-center gap-2 shadow-xl"
                  title="Chiqish"
                >
                  <i className="fas fa-phone-slash text-base sm:text-lg rotate-[135deg]"></i>
                  <span className="hidden sm:inline">Chiqish</span>
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* Sidebar overlay backdrop (mobile) */}
      {showSidebar && (
        <div
          onClick={() => setShowSidebar(false)}
          className="lg:hidden fixed inset-0 z-[1050] bg-black/60 backdrop-blur-sm"
        />
      )}

      {/* Sidebar (chat / participants) */}
      <div className={`fixed lg:relative inset-y-0 right-0 z-[1060] lg:z-auto w-[88%] sm:w-[380px] lg:w-[360px] max-w-full flex flex-col bg-[#2a2a2a] border-l border-white/5 transition-transform duration-300 ${showSidebar ? 'translate-x-0' : 'translate-x-full lg:translate-x-full lg:hidden'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-3 py-1.5 rounded-md font-semibold text-xs transition-all ${activeTab === 'chat' ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white'}`}
            >
              <i className="fas fa-comment-dots mr-1.5"></i>Suhbat
            </button>
            <button
              onClick={() => setActiveTab('participants')}
              className={`px-3 py-1.5 rounded-md font-semibold text-xs transition-all ${activeTab === 'participants' ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white'}`}
            >
              <i className="fas fa-users mr-1.5"></i>{participants.length + 1}
            </button>
          </div>
          <button
            onClick={() => setShowSidebar(false)}
            className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/70 transition-all"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
          {activeTab === 'chat' ? (
            <div className="space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-12 text-white/40">
                  <i className="fas fa-comments text-3xl mb-3 opacity-50"></i>
                  <p className="text-xs font-medium">Hozircha xabar yo'q</p>
                </div>
              )}
              {messages.map(m => {
                const isMine = m.user?.username === user.username;
                const isMentor = m.user?.username === activeSession.streamer?.username;
                return (
                  <div key={m.id} className="flex gap-2.5 animate-slideInRight">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-white shrink-0">
                      <img src={resolveAvatar(m.user?.avatar)} className="w-full h-full object-cover" alt="" onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/default-avatar.png'; }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-0.5">
                        <span className={`font-semibold text-xs ${isMentor ? 'text-honey' : isMine ? 'text-emerald-400' : 'text-blue-300'}`}>
                          {m.user?.username}{isMine && ' (Siz)'}
                        </span>
                        <span className="text-white/40 text-[10px]">{new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <p className="text-white/90 text-sm leading-snug break-words">{m.text}</p>
                    </div>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>
          ) : (
            <div className="space-y-2">
              {/* Streamer first */}
              <div className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-all">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-honey/40 bg-white shrink-0">
                  <img src={resolveAvatar(activeSession.streamer?.avatar)} className="w-full h-full object-cover" alt="" onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/default-avatar.png'; }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold truncate">{activeSession.streamer?.username}</p>
                  <p className="text-honey text-[10px] font-bold uppercase">Mentor</p>
                </div>
              </div>
              {/* Pending */}
              {participants.filter(p => p.status === 'pending').map(p => (
                <div key={p.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-white shrink-0">
                    <img src={resolveAvatar(p.user?.avatar)} className="w-full h-full object-cover" alt="" onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/default-avatar.png'; }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-semibold truncate">{p.user?.username}</p>
                    <p className="text-amber-400 text-[10px] font-bold uppercase">Kutmoqda</p>
                  </div>
                  {isStreamer && (
                    <button
                      onClick={() => handleApprove(p.id)}
                      className="bg-honey text-black px-3 py-1.5 rounded-md font-bold text-[11px] hover:scale-105 transition-all"
                    >
                      Qabul
                    </button>
                  )}
                </div>
              ))}
              {/* Approved */}
              {approvedParticipants.map(p => (
                <div key={p.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-all">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-white shrink-0">
                    <img src={resolveAvatar(p.user?.avatar)} className="w-full h-full object-cover" alt="" onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/default-avatar.png'; }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-semibold truncate">{p.user?.username}</p>
                    <p className="text-emerald-400 text-[10px] font-bold uppercase">Online</p>
                  </div>
                  <div className="flex gap-1.5 text-white/60">
                    {p.is_muted && <i className="fas fa-microphone-slash text-red-400 text-xs"></i>}
                    {p.is_camera_off && <i className="fas fa-video-slash text-red-400 text-xs"></i>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Chat input */}
        {activeTab === 'chat' && isApproved && (
          <div className="p-3 border-t border-white/5 bg-[#1f1f1f]">
            <div className="flex items-center gap-2 bg-[#3a3a3a] rounded-full pl-4 pr-1 py-1">
              <input
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                placeholder="Xabar yozing..."
                className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-white/40 py-2"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="w-9 h-9 rounded-full bg-honey text-black flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all"
              >
                <i className="fas fa-paper-plane text-sm"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Classroom;
