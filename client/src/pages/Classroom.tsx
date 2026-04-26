
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { API_BASE_URL, API_ENDPOINTS, getAuthToken, authHeaders } from '@/config/api.config';
import { resolveAvatar } from '@/lib/utils';
import { getLiveSocket, disconnectLiveSocket } from '@/lib/liveSocket';

const ICE_SERVERS: RTCConfiguration = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
  ],
};

interface RemotePeer {
  userId: string;
  stream: MediaStream;
}

const RemoteVideo: React.FC<{ stream: MediaStream; muted?: boolean; className?: string; mirror?: boolean }> = ({ stream, muted = false, className = '', mirror = false }) => {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (ref.current && ref.current.srcObject !== stream) {
      ref.current.srcObject = stream;
    }
  }, [stream]);
  return (
    <video
      ref={ref}
      autoPlay
      playsInline
      muted={muted}
      className={`${mirror ? 'mirror-mode' : ''} ${className}`}
    />
  );
};

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

// Audio oqim darajasini (0-255) o'lchaydigan hook — visualizer va "gapirmoqda" effekti uchun
const useAudioLevel = (stream: MediaStream | null, active: boolean) => {
  const [level, setLevel] = useState(0);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!stream || !active) {
      setLevel(0);
      return;
    }
    const audioTracks = stream.getAudioTracks();
    if (audioTracks.length === 0 || !audioTracks.some(t => t.enabled && t.readyState === 'live')) {
      setLevel(0);
      return;
    }

    let audioContext: AudioContext | null = null;
    let cancelled = false;
    try {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      analyser.fftSize = 64;
      analyser.smoothingTimeConstant = 0.6;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const tick = () => {
        if (cancelled) return;
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) sum += dataArray[i];
        setLevel(sum / bufferLength);
        animationRef.current = requestAnimationFrame(tick);
      };
      tick();
    } catch (e) {
      // ba'zi brauzerlar masofaviy oqimdan AudioContext ochishni rad etishi mumkin
      setLevel(0);
    }

    return () => {
      cancelled = true;
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      try { audioContext && audioContext.close(); } catch {}
    };
  }, [stream, active]);

  return level;
};

const SPEAKING_THRESHOLD = 18;

const AudioVisualizer = ({ stream, active, size = 'md' }: { stream: MediaStream | null; active: boolean; size?: 'sm' | 'md' }) => {
  const level = useAudioLevel(stream, active);
  const bars = size === 'sm' ? [1, 2, 3, 4] : [1, 2, 3, 4, 5];
  const containerH = size === 'sm' ? 'h-3' : 'h-5';
  const containerW = size === 'sm' ? 'w-6' : 'w-10';
  const barW = size === 'sm' ? 'w-[2px]' : 'w-[3px]';
  return (
    <div className={`flex items-end gap-[2px] ${containerH} ${containerW} justify-center`}>
      {bars.map((i, idx) => {
        const center = (bars.length - 1) / 2;
        const distFromCenter = Math.abs(idx - center);
        const phase = (i * 0.6);
        const wave = active
          ? Math.max(20, Math.min(100, (level / 255) * 100 * (0.7 + 0.3 * Math.sin((Date.now() / 120) + phase)) * (1 - distFromCenter * 0.12)))
          : 18;
        return (
          <div
            key={i}
            className={`${barW} rounded-full transition-[height,opacity] duration-100 ${active && level > SPEAKING_THRESHOLD ? 'bg-honey shadow-[0_0_8px_#FFB800]' : 'bg-white/30'}`}
            style={{
              height: `${wave}%`,
              opacity: active ? 0.5 + (level / 255) * 0.5 : 0.35,
            }}
          />
        );
      })}
    </div>
  );
};

// Ishtirokchi kartochkasi — gapirayotganda asalrang chegara bilan porlaydi
const ParticipantTile: React.FC<{
  stream: MediaStream;
  username: string;
  avatar?: string;
  hasVideo: boolean;
  audioActive: boolean;
  isMuted: boolean;
}> = ({ stream, username, avatar, hasVideo, audioActive, isMuted }) => {
  const level = useAudioLevel(stream, audioActive);
  const isSpeaking = audioActive && level > SPEAKING_THRESHOLD;
  return (
    <div
      className={`relative w-24 h-32 sm:w-32 sm:h-40 rounded-xl overflow-hidden shadow-2xl bg-[#2a2a2a] transition-all duration-150 ${isSpeaking ? 'border-2 border-honey shadow-[0_0_20px_rgba(255,184,0,0.6)] scale-[1.02]' : 'border border-white/15'}`}
    >
      <RemoteVideo stream={stream} className={`w-full h-full object-cover ${hasVideo ? 'opacity-100' : 'opacity-0'}`} />
      {!hasVideo && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-center p-2">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-white">
            <img src={resolveAvatar(avatar)} className="w-full h-full object-cover" alt="" onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/default-avatar.png'; }} />
          </div>
          <p className="text-white/70 text-[9px] sm:text-[10px] font-semibold leading-tight">Kamera o'chiq</p>
        </div>
      )}
      <div className="absolute bottom-1 left-1 right-1 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded">
        {isMuted ? (
          <i className="fas fa-microphone-slash text-red-400 text-[9px]"></i>
        ) : (
          <AudioVisualizer stream={stream} active={audioActive} size="sm" />
        )}
        <span className="text-white text-[10px] font-semibold truncate">{username}</span>
      </div>
    </div>
  );
};

// O'zining oynachasi (PiP) — gapirayotganida porlash effekti bilan
const SelfViewPiP: React.FC<{
  localStream: MediaStream | null;
  isCameraOff: boolean;
  isMuted: boolean;
  attachLocalVideo: (el: HTMLVideoElement | null) => void;
  requestPermissions: () => void;
}> = ({ localStream, isCameraOff, isMuted, attachLocalVideo, requestPermissions }) => {
  const audioActive = !!localStream && !isMuted;
  const level = useAudioLevel(localStream, audioActive);
  const isSpeaking = audioActive && level > SPEAKING_THRESHOLD;
  return (
    <div
      className={`absolute bottom-24 sm:bottom-28 right-3 sm:right-5 w-28 h-40 sm:w-40 sm:h-52 rounded-xl overflow-hidden shadow-2xl bg-[#2a2a2a] z-[150] transition-all duration-150 ${isSpeaking ? 'border-2 border-honey shadow-[0_0_20px_rgba(255,184,0,0.6)]' : 'border border-white/15'}`}
    >
      {!isCameraOff && localStream ? (
        <video
          ref={attachLocalVideo}
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
        {isMuted ? (
          <i className="fas fa-microphone-slash text-red-400 text-[9px]"></i>
        ) : (
          <AudioVisualizer stream={localStream} active={audioActive} size="sm" />
        )}
        <span className="text-white text-[10px] font-semibold truncate">Siz</span>
      </div>
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
  const [user, setUser] = useState<any>(() => JSON.parse(localStorage.getItem('honey_user') || 'null'));

  // Eski sessiyalarda saqlangan foydalanuvchida id/username bo'lmasligi mumkin —
  // profilni qaytadan yuklab localStorage'ni to'ldiramiz, aks holda Live ekranida
  // "men kimman" ni topa olmaymiz va qabul qilingan bo'lsak ham kira olmaymiz.
  useEffect(() => {
    if (user && user.id && user.username) return;
    (async () => {
      try {
        const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.PROFILE.ME}`, {
          headers: authHeaders(),
        });
        if (!res.ok) return;
        const prof = await res.json();
        const merged = {
          ...(user || {}),
          id: prof?.id ?? user?.id,
          name: prof?.name || prof?.username || user?.name,
          username: prof?.username || user?.username,
          email: prof?.email || user?.email,
          picture: prof?.avatar || prof?.picture || user?.picture || '',
          is_verified: prof?.is_verified,
          is_superuser: prof?.is_superuser,
          is_staff: prof?.is_staff,
        };
        localStorage.setItem('honey_user', JSON.stringify(merged));
        setUser(merged);
      } catch { /* offline */ }
    })();
  }, []);

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
  const [remotePeers, setRemotePeers] = useState<Map<string, RemotePeer>>(new Map());
  const peersRef = useRef<Map<string, { userId: string; pc: RTCPeerConnection; stream: MediaStream }>>(new Map());
  const socketRef = useRef<any>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => { localStreamRef.current = localStream; }, [localStream]);

  useEffect(() => {
    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [localStream]);

  // Callback ref: video elementi mount bo'lgan zahoti srcObject ni ulab, play() chaqiramiz.
  // Bu konditsional render qilingan video elementlar uchun ishonchli ishlaydi.
  const attachLocalVideo = useCallback((el: HTMLVideoElement | null) => {
    localVideoRef.current = el;
    if (!el) return;
    const s = localStreamRef.current;
    if (s && el.srcObject !== s) {
      el.srcObject = s;
    }
    if (s) {
      const playPromise = el.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => { /* autoplay bloklanishi mumkin, e'tibor bermaymiz */ });
      }
    }
  }, []);

  // localStream o'zgarganda mavjud video elementga ham qayta ulaymiz
  useEffect(() => {
    const el = localVideoRef.current;
    if (!el) return;
    if (localStream && el.srcObject !== localStream) {
      el.srcObject = localStream;
      const playPromise = el.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {});
      }
    }
  }, [localStream]);

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
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [activeSession]);

  // Auto-request camera/mic when viewer becomes approved
  useEffect(() => {
    if (!activeSession) return;
    const me = participants.find(p => p.user?.id === user?.id || p.user?.username === user?.username);
    const justApproved = me?.status === 'approved';
    if (justApproved && !localStream && !permissionError) {
      requestPermissions();
    }
  }, [participants, activeSession]);

  // ---------- WebRTC mesh signaling ----------
  const isStreamerEarly = activeSession?.streamer?.id === user?.id || activeSession?.streamer?.username === user?.username;
  const myParticipantEarly = participants.find(p => p.user?.id === user?.id || p.user?.username === user?.username);
  const isApprovedEarly = isStreamerEarly || myParticipantEarly?.status === 'approved';
  const rtcReady = !!activeSession && !!isApprovedEarly && (!!localStream || !!permissionError);

  const createPeerConnection = useCallback((peerSocketId: string, peerUserId: string, initiator: boolean) => {
    if (peersRef.current.has(peerSocketId)) {
      return peersRef.current.get(peerSocketId)!.pc;
    }
    const pc = new RTCPeerConnection(ICE_SERVERS);
    const remoteStream = new MediaStream();
    peersRef.current.set(peerSocketId, { userId: peerUserId, pc, stream: remoteStream });

    // Add our local tracks if we have a stream
    const localStreamNow = localStreamRef.current;
    if (localStreamNow) {
      localStreamNow.getTracks().forEach(track => {
        try { pc.addTrack(track, localStreamNow); } catch (e) { console.warn('addTrack failed', e); }
      });
    }

    pc.onicecandidate = (e) => {
      if (e.candidate && socketRef.current) {
        socketRef.current.emit('live_signal', {
          to: peerSocketId,
          data: { type: 'ice', candidate: e.candidate },
        });
      }
    };

    pc.ontrack = (e) => {
      const incoming = e.streams && e.streams[0] ? e.streams[0] : null;
      if (incoming) {
        incoming.getTracks().forEach(t => {
          if (!remoteStream.getTracks().find(existing => existing.id === t.id)) {
            remoteStream.addTrack(t);
          }
        });
      } else {
        remoteStream.addTrack(e.track);
      }
      setRemotePeers(prev => {
        const next = new Map(prev);
        next.set(peerSocketId, { userId: peerUserId, stream: remoteStream });
        return next;
      });
    };

    pc.onconnectionstatechange = () => {
      if (pc.connectionState === 'failed' || pc.connectionState === 'closed') {
        const entry = peersRef.current.get(peerSocketId);
        if (entry) {
          try { entry.pc.close(); } catch {}
          peersRef.current.delete(peerSocketId);
        }
        setRemotePeers(prev => {
          const next = new Map(prev);
          next.delete(peerSocketId);
          return next;
        });
      }
    };

    if (initiator) {
      (async () => {
        try {
          const offer = await pc.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: true });
          await pc.setLocalDescription(offer);
          socketRef.current?.emit('live_signal', {
            to: peerSocketId,
            data: { type: 'offer', sdp: offer },
          });
        } catch (err) {
          console.error('createOffer failed', err);
        }
      })();
    }

    return pc;
  }, []);

  useEffect(() => {
    if (!rtcReady || !activeSession) return;
    let cancelled = false;
    let socket: any = null;
    const sessionId = activeSession.id;

    const cleanupPeer = (peerSocketId: string) => {
      const entry = peersRef.current.get(peerSocketId);
      if (entry) {
        try { entry.pc.close(); } catch {}
        peersRef.current.delete(peerSocketId);
      }
      setRemotePeers(prev => {
        const next = new Map(prev);
        next.delete(peerSocketId);
        return next;
      });
    };

    (async () => {
      try {
        socket = await getLiveSocket();
        if (cancelled) return;
        socketRef.current = socket;

        socket.on('live_existing_peers', (peers: { socketId: string; userId: string }[]) => {
          peers.forEach(({ socketId, userId }) => {
            createPeerConnection(socketId, userId, true);
          });
        });

        socket.on('live_peer_joined', ({ socketId, userId }: { socketId: string; userId: string }) => {
          createPeerConnection(socketId, userId, false);
        });

        socket.on('live_signal', async ({ from, fromUserId, data }: { from: string; fromUserId: string; data: any }) => {
          let entry = peersRef.current.get(from);
          if (!entry) {
            createPeerConnection(from, fromUserId, false);
            entry = peersRef.current.get(from)!;
          }
          const pc = entry.pc;
          try {
            if (data.type === 'offer') {
              await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
              const answer = await pc.createAnswer();
              await pc.setLocalDescription(answer);
              socket.emit('live_signal', { to: from, data: { type: 'answer', sdp: answer } });
            } else if (data.type === 'answer') {
              await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
            } else if (data.type === 'ice' && data.candidate) {
              try { await pc.addIceCandidate(new RTCIceCandidate(data.candidate)); } catch (err) { console.warn('addIceCandidate failed', err); }
            }
          } catch (err) {
            console.error('live_signal handler error', err);
          }
        });

        socket.on('live_peer_left', ({ socketId }: { socketId: string }) => {
          cleanupPeer(socketId);
        });

        socket.emit('live_join', { sessionId });
      } catch (err) {
        console.error('Live socket setup failed', err);
      }
    })();

    return () => {
      cancelled = true;
      if (socket) {
        try { socket.emit('live_leave'); } catch {}
        socket.off('live_existing_peers');
        socket.off('live_peer_joined');
        socket.off('live_signal');
        socket.off('live_peer_left');
      }
      peersRef.current.forEach(({ pc }) => { try { pc.close(); } catch {} });
      peersRef.current.clear();
      setRemotePeers(new Map());
      socketRef.current = null;
    };
  }, [rtcReady, activeSession?.id, createPeerConnection]);

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

  // Ilova Replit/canvas iframe ichida ochilganmi? Iframe ichida getUserMedia
  // odatda Permission Policy tomonidan bloklanadi (parent `allow="camera; microphone"`
  // o'rnatmagan bo'lsa). Bu holda foydalanuvchini yangi tabga yo'naltiramiz.
  const isInIframe = typeof window !== 'undefined' && window.self !== window.top;

  const requestPermissions = async () => {
    console.log("[Live] requestPermissions called", {
      hasNavigator: !!navigator,
      hasMediaDevices: !!navigator?.mediaDevices,
      hasGetUserMedia: !!navigator?.mediaDevices?.getUserMedia,
      isInIframe,
      protocol: window.location.protocol,
      origin: window.location.origin,
    });

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setPermissionError("Brauzeringiz kamera kirishini qo'llab-quvvatlamaydi. Iltimos sahifani yangi tabda oching (HTTPS talab qilinadi).");
      return;
    }
    if (isInIframe) {
      setPermissionError("Kamera/mikrofon ushbu oyna (iframe) ichida bloklangan. Iltimos pastdagi tugma orqali ilovani yangi tabda oching.");
      return;
    }

    // 1-urinish: video + audio. Agar muvaffaqiyatsiz bo'lsa, alohida-alohida sinab ko'ramiz.
    const tryGet = async (label: string, constraints: MediaStreamConstraints) => {
      console.log(`[Live] getUserMedia attempt: ${label}`, constraints);
      const s = await navigator.mediaDevices.getUserMedia(constraints);
      console.log(`[Live] ${label} OK — tracks:`,
        s.getTracks().map(t => ({ kind: t.kind, label: t.label, enabled: t.enabled, readyState: t.readyState }))
      );
      return s;
    };

    let stream: MediaStream | null = null;
    let lastError: any = null;
    try {
      stream = await tryGet("video+audio", {
        video: { width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: true,
      });
    } catch (e: any) {
      lastError = e;
      console.warn("[Live] video+audio failed:", e?.name, e?.message);
      // 2-urinish: faqat video (mikrofonsiz)
      try {
        stream = await tryGet("video-only", { video: true, audio: false });
      } catch (e2: any) {
        lastError = e2;
        console.warn("[Live] video-only failed:", e2?.name, e2?.message);
        // 3-urinish: faqat audio (kamerasiz)
        try {
          stream = await tryGet("audio-only", { video: false, audio: true });
        } catch (e3: any) {
          lastError = e3;
          console.error("[Live] audio-only failed:", e3?.name, e3?.message);
        }
      }
    }

    if (stream) {
      setLocalStream(stream);
      setPermissionError(null);
      if (isCameraOff) stream.getVideoTracks().forEach(t => t.enabled = false);
      if (isMuted) stream.getAudioTracks().forEach(t => t.enabled = false);
      // Ogohlantirish: agar video yo'q bo'lsa, foydalanuvchiga bildiramiz
      if (stream.getVideoTracks().length === 0) {
        setPermissionError("Faqat mikrofon ulandi (kamera mavjud emas yoki bloklangan).");
      }
      return;
    }

    const e = lastError;
    console.error("Permission error:", { name: e?.name, message: e?.message, error: e });
    const name = e?.name || '';
    const message = String(e?.message || '');
    let msg = "Kamera yoki mikrofonga ruxsat berilmadi.";
    if (/permissions policy|permission policy|disallowed by permissions policy/i.test(message)) {
      msg = "Kamera/mikrofon ushbu oyna (iframe) ichida bloklangan. Iltimos ilovani yangi tabda oching.";
    } else if (name === 'NotAllowedError' || name === 'PermissionDeniedError') {
      msg = "Siz kamera/mikrofonga ruxsat bermadingiz. Brauzer manzil qatori yonidagi qulfni bosib \"Allow\" tugmasini tanlang va qayta urinib ko'ring.";
    } else if (name === 'NotFoundError' || name === 'DevicesNotFoundError') {
      msg = "Kamera yoki mikrofon topilmadi. Qurilma ulanganligini va boshqa ilova bilan band emasligini tekshiring.";
    } else if (name === 'NotReadableError' || name === 'TrackStartError') {
      msg = "Kamera band — boshqa dastur (Zoom, Meet, OBS, Skype va h.k.) foydalanmoqda. Ularni yopib qayta urinib ko'ring.";
    } else if (name === 'OverconstrainedError') {
      msg = "Kamera so'ralgan formatda ishlamaydi. Boshqa kamera tanlang yoki sahifani yangilang.";
    } else if (name === 'SecurityError' || (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost')) {
      msg = "Xavfsiz ulanish (HTTPS) kerak. Sahifani yangi tabda HTTPS orqali oching.";
    } else if (message) {
      msg = `Kamera/mikrofon xatosi (${name || 'noma\'lum'}): ${message}`;
    }
    setPermissionError(msg);
  };

  const openInNewTab = () => {
    // window.top mavjud bo'lsa unda ochish — Replit iframe konteynerida turibmiz va biz haqiqiy URLga o'tmoqchimiz.
    const url = window.location.href;
    try {
      const w = window.open(url, '_blank', 'noopener,noreferrer');
      if (!w) {
        // Pop-up bloklangan bo'lsa, mavjud tabni yangilash
        window.location.href = url;
      }
    } catch {
      window.location.href = url;
    }
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

        {isInIframe && (
          <div className="mb-6 sm:mb-8 bg-gradient-to-r from-honey/15 to-amber-400/10 border border-honey/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-honey/20 text-honey flex items-center justify-center text-xl sm:text-2xl shrink-0">
              <i className="fas fa-triangle-exclamation"></i>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-black uppercase tracking-wide text-sm sm:text-base">Kamera/mikrofon ushbu oynada ishlamaydi</h3>
              <p className="text-gray-300 text-xs sm:text-sm mt-1 leading-snug">
                Jonli efirda kamera va mikrofondan foydalanish uchun ilovani <b>yangi tabda</b> oching. Bu yerda u Replit ko'rish oynasi (iframe) ichida ishlayapti — brauzer xavfsizlik uchun media-qurilmalarni bloklaydi.
              </p>
            </div>
            <button
              onClick={openInNewTab}
              data-testid="button-open-new-tab-lobby"
              className="bg-honey text-black px-5 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-honey/30 shrink-0 whitespace-nowrap"
            >
              <i className="fas fa-external-link-alt mr-2"></i>Yangi tabda ochish
            </button>
          </div>
        )}

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
                    ref={attachLocalVideo}
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
              ) : (() => {
                const streamerEntry = Array.from(remotePeers.values()).find(p => p.userId === activeSession.streamer?.id);
                const hasVideo = streamerEntry && streamerEntry.stream.getVideoTracks().some(t => t.enabled && t.readyState === 'live');
                if (streamerEntry) {
                  return (
                    <>
                      <RemoteVideo stream={streamerEntry.stream} className={`w-full h-full object-cover ${hasVideo ? 'opacity-100' : 'opacity-0'}`} />
                      {!hasVideo && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
                          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-honey/40 shadow-2xl bg-white">
                            <img src={resolveAvatar(activeSession.streamer?.avatar)} className="w-full h-full object-cover" alt="" onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/default-avatar.png'; }} />
                          </div>
                          <p className="text-white font-bold text-base sm:text-lg">{activeSession.streamer?.username}</p>
                          <p className="text-white/50 text-xs sm:text-sm mt-1">Kamera o'chirilgan</p>
                        </div>
                      )}
                    </>
                  );
                }
                return (
                  <div className="flex flex-col items-center gap-4 p-6 text-center">
                    <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-honey/40 shadow-2xl bg-white">
                      <img src={resolveAvatar(activeSession.streamer?.avatar)} className="w-full h-full object-cover" alt="" onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/default-avatar.png'; }} />
                    </div>
                    <p className="text-white font-bold text-lg">{activeSession.streamer?.username}</p>
                    <p className="text-white/50 text-xs">Mentor ulanmoqda...</p>
                  </div>
                );
              })()}

              {/* Speaker name plate (bottom-left) — ovoz darajasi vizualizatori bilan */}
              {(() => {
                const speakerStream: MediaStream | null = isStreamer
                  ? localStream
                  : (Array.from(remotePeers.values()).find(p => p.userId === activeSession.streamer?.id)?.stream ?? null);
                const speakerActive = isStreamer ? !isMuted : true;
                return (
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 flex items-center gap-2 bg-black/55 backdrop-blur-md px-3 py-1.5 rounded-md">
                    {(isStreamer ? isMuted : false) ? (
                      <i className="fas fa-microphone-slash text-red-400 text-xs"></i>
                    ) : (
                      <AudioVisualizer stream={speakerStream} active={speakerActive} size="md" />
                    )}
                    <span className="text-white text-xs sm:text-sm font-semibold">
                      {isStreamer ? `${activeSession.streamer?.username} (Siz)` : activeSession.streamer?.username}
                    </span>
                  </div>
                );
              })()}
            </div>

            {/* Other participants' video tiles (excluding the streamer who's already in main view, and self) */}
            {(() => {
              const others = Array.from(remotePeers.entries())
                .filter(([_, p]) => p.userId !== activeSession.streamer?.id);
              if (others.length === 0) return null;
              return (
                <div className="absolute top-14 left-3 sm:left-5 z-[140] flex flex-col gap-2 max-h-[60vh] overflow-y-auto custom-scrollbar pr-1">
                  {others.map(([sid, p]) => {
                    const partInfo = participants.find(pp => pp.user?.id === p.userId);
                    const username = partInfo?.user?.username || 'Mehmon';
                    const avatar = partInfo?.user?.avatar;
                    const hasVideo = p.stream.getVideoTracks().some(t => t.enabled && t.readyState === 'live');
                    const audioActive = !partInfo?.is_muted && p.stream.getAudioTracks().some(t => t.enabled && t.readyState === 'live');
                    return (
                      <ParticipantTile
                        key={sid}
                        stream={p.stream}
                        username={username}
                        avatar={avatar}
                        hasVideo={hasVideo}
                        audioActive={audioActive}
                        isMuted={!!partInfo?.is_muted}
                      />
                    );
                  })}
                </div>
              );
            })()}

            {/* Self-view PiP (only for non-streamer to see themselves) */}
            {!isStreamer && (
              <SelfViewPiP
                localStream={localStream}
                isCameraOff={isCameraOff}
                isMuted={isMuted}
                attachLocalVideo={attachLocalVideo}
                requestPermissions={requestPermissions}
              />
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
