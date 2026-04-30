'use client'

import { useState, useEffect, useRef, useCallback, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  MonitorUp,
  MessageSquare,
  Users,
  Hand,
  CircleStop,
  PhoneOff,
  Copy,
  Check,
  MoreHorizontal,
  Search,
  Send,
  Paperclip,
  Crown,
  Shield,
  X,
  Maximize2,
  Minimize2,
  Volume2,
  MonitorSpeaker,
  Camera,
  Phone,
  Plus,
  ChevronDown,
  ArrowLeft,
  CircleDot,
  Lock,
  Unlock,
  UserPlus,
  Sparkles,
  Clock,
  Signal,
  Pin,
  ThumbsUp,
  Heart,
  Laugh,
  PartyPopper,
  AlertTriangle,
  Fullscreen,
  Settings,
  ShieldAlert,
  LogOut,
} from 'lucide-react'
import { mockUsers, mockMeetings } from '@/lib/mock-data'
import { cn, generateAvatar, getInitials, generateId } from '@/lib/utils'
import type { MeetingParticipant } from '@/types'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { toast } from 'sonner'

// ============================================
// Types & Constants
// ============================================
type MeetingState = 'lobby' | 'room' | 'ended'
type ViewLayout = 'grid' | 'speaker'
type SidePanel = 'none' | 'chat' | 'participants'

interface MockParticipant {
  id: string
  userId: string
  displayName: string
  role: 'host' | 'co-host' | 'participant'
  isMuted: boolean
  isVideoOn: boolean
  isScreenSharing: boolean
  isHandRaised: boolean
  networkQuality: number // 1-4
  avatar: string
  initials: string
}

interface ChatMessage {
  id: string
  senderId: string
  senderName: string
  content: string
  isSystem: boolean
  isHost: boolean
  timestamp: Date
}

interface Reactions {
  id: string
  emoji: string
  timestamp: number
}

const MOCK_DEVICES = {
  cameras: ['Built-in FaceTime HD Camera', 'Logitech C920', 'External Webcam'],
  mics: ['Built-in Microphone', 'AirPods Pro', 'Logitech Headset'],
  speakers: ['Built-in Speakers', 'AirPods Pro', 'External Monitor'],
}

const REACTION_EMOJIS = ['👍', '❤️', '😂', '🎉', '🤔', '👏', '🔥', '💯']

const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  { id: 'mc1', senderId: 'u2', senderName: 'Dilnoza Rakhimova', content: 'Hey everyone! Can you see my screen?', isSystem: false, isHost: false, timestamp: new Date(Date.now() - 120000) },
  { id: 'mc2', senderId: 'system', senderName: 'System', content: 'Sardor Mirzayev joined the meeting', isSystem: true, isHost: false, timestamp: new Date(Date.now() - 90000) },
  { id: 'mc3', senderId: 'u1', senderName: 'Jasur Karimov', content: 'Yes! The designs look amazing 🔥', isSystem: false, isHost: true, timestamp: new Date(Date.now() - 60000) },
  { id: 'mc4', senderId: 'u6', senderName: 'Sardor Mirzayev', content: 'Should we go over the API changes first?', isSystem: false, isHost: false, timestamp: new Date(Date.now() - 30000) },
  { id: 'mc5', senderId: 'u3', senderName: 'Timur Aliyev', content: '+1 on that, I have some questions about the new endpoints', isSystem: false, isHost: false, timestamp: new Date(Date.now() - 15000) },
]

function generateMeetingCode(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz'
  const seg = () => Array.from({ length: 3 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  return `${seg()}-${seg()}-${seg()}`
}

// ============================================
// Sub-components
// ============================================

function AvatarFallback({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-20 h-20 text-2xl',
    xl: 'w-28 h-28 text-4xl',
  }
  return (
    <div className={cn('rounded-full bg-honey/20 flex items-center justify-center text-honey font-bold', sizeClasses[size])}>
      {getInitials(name)}
    </div>
  )
}

function NetworkQualityDots({ quality }: { quality: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4].map((level) => (
        <div
          key={level}
          className={cn(
            'w-1 h-1 rounded-full',
            level <= quality
              ? quality >= 3
                ? 'bg-green-400'
                : quality >= 2
                  ? 'bg-amber-400'
                  : 'bg-red-400'
              : 'bg-white/20'
          )}
        />
      ))}
    </div>
  )
}

function MicLevelIndicator({ isMuted }: { isMuted: boolean }) {
  const [level, setLevel] = useState(0)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    if (isMuted) return
    const animate = () => {
      setLevel(Math.random() * 0.7 + (Math.random() > 0.8 ? 0.3 : 0))
      frameRef.current = requestAnimationFrame(animate)
    }
    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [isMuted])

  return (
    <div className="flex items-end gap-[2px] h-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          className={cn('w-[3px] rounded-full', isMuted ? 'bg-muted-foreground/30' : 'bg-honey')}
          animate={{ height: isMuted ? 3 : `${Math.max(3, level * 20 * (i / 5))}px` }}
          transition={{ duration: 0.1 }}
        />
      ))}
    </div>
  )
}

// ---- Participant Video Tile ----
function ParticipantTile({
  participant,
  isActiveSpeaker,
  size = 'normal',
}: {
  participant: MockParticipant
  isActiveSpeaker: boolean
  size?: 'normal' | 'large' | 'small'
}) {
  const sizeClasses = {
    small: 'aspect-video min-h-[80px]',
    normal: 'aspect-video min-h-[160px] md:min-h-[200px]',
    large: 'aspect-video min-h-[300px] md:min-h-[400px]',
  }

  const nameSizeClasses = {
    small: 'text-[9px]',
    normal: 'text-[11px]',
    large: 'text-sm',
  }

  return (
    <motion.div
      layout
      className={cn(
        'relative rounded-xl overflow-hidden bg-warm-gray group',
        sizeClasses[size],
        isActiveSpeaker && 'ring-2 ring-honey shadow-honey-glow'
      )}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Video / Avatar */}
      {participant.isVideoOn ? (
        <div className="absolute inset-0 bg-gradient-to-br from-warm-gray to-warm-gray-light flex items-center justify-center">
          <img
            src={participant.avatar}
            alt={participant.displayName}
            className="w-full h-full object-cover opacity-80"
          />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-warm-gray via-stone-800 to-warm-gray-light flex items-center justify-center">
          <AvatarFallback name={participant.displayName} size={size === 'small' ? 'sm' : size === 'large' ? 'xl' : 'lg'} />
        </div>
      )}

      {/* Bottom info bar */}
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {participant.role === 'host' && <Crown className="w-3 h-3 text-honey shrink-0" />}
            {participant.role === 'co-host' && <Shield className="w-3 h-3 text-honey/70 shrink-0" />}
            <span className={cn('font-medium text-white truncate', nameSizeClasses[size])}>
              {participant.displayName}
            </span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {participant.isHandRaised && (
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
              >
                <Hand className="w-3 h-3 text-honey" />
              </motion.div>
            )}
            {participant.isMuted && <MicOff className="w-3 h-3 text-red-400" />}
            {!participant.isMuted && size !== 'small' && <NetworkQualityDots quality={participant.networkQuality} />}
          </div>
        </div>
      </div>

      {/* Screen sharing indicator */}
      {participant.isScreenSharing && (
        <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 bg-honey/90 rounded-full text-[10px] font-semibold text-background">
          <MonitorUp className="w-3 h-3" />
          Sharing
        </div>
      )}
    </motion.div>
  )
}

// ---- Reaction Bubble ----
function FloatingReaction({ emoji }: { emoji: string }) {
  return (
    <motion.div
      className="absolute bottom-24 left-1/2 pointer-events-none text-3xl z-50"
      initial={{ opacity: 1, y: 0, x: '-50%', scale: 0.5 }}
      animate={{ opacity: 0, y: -200, x: `${(Math.random() - 0.5) * 100}px`, scale: 1.2 }}
      transition={{ duration: 2, ease: 'easeOut' }}
    >
      {emoji}
    </motion.div>
  )
}

// ============================================
// LOBBY SCREEN
// ============================================
function LobbyScreen({ onJoin, onCreate }: { onJoin: () => void; onCreate: () => void }) {
  const [username, setUsername] = useState('Jasur Karimov')
  const [meetingCode, setMeetingCode] = useState('')
  const [cameraOn, setCameraOn] = useState(true)
  const [micOn, setMicOn] = useState(true)
  const [selectedCamera, setSelectedCamera] = useState(MOCK_DEVICES.cameras[0])
  const [selectedMic, setSelectedMic] = useState(MOCK_DEVICES.mics[0])
  const [selectedSpeaker, setSelectedSpeaker] = useState(MOCK_DEVICES.speakers[0])
  const [copied, setCopied] = useState(false)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-honey/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md space-y-6"
      >
        {/* Title */}
        <div className="text-center space-y-2">
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="inline-flex"
          >
            <div className="w-14 h-14 rounded-2xl bg-honey/10 flex items-center justify-center">
              <Video className="w-7 h-7 text-honey" />
            </div>
          </motion.div>
          <h1 className="text-2xl font-bold text-foreground">
            <span className="text-gradient-honey">Honey</span> Meet
          </h1>
          <p className="text-sm text-muted-foreground">Premium video meetings for everyone</p>
        </div>

        {/* Camera Preview */}
        <div className="glass-premium rounded-2xl overflow-hidden">
          <div className="relative aspect-video bg-warm-gray flex items-center justify-center">
            {cameraOn ? (
              <div className="absolute inset-0 bg-gradient-to-br from-warm-gray to-stone-800">
                <div className="absolute inset-0 flex items-center justify-center">
                  <AvatarFallback name={username} size="xl" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <AvatarFallback name={username} size="xl" />
                <span className="text-sm text-muted-foreground">Camera is off</span>
              </div>
            )}

            {/* Bottom controls */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMicOn(!micOn)}
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center transition-colors',
                  micOn ? 'glass-premium text-foreground hover:bg-white/10' : 'bg-red-500 text-white hover:bg-red-600'
                )}
              >
                {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setCameraOn(!cameraOn)}
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center transition-colors',
                  cameraOn ? 'glass-premium text-foreground hover:bg-white/10' : 'bg-red-500 text-white hover:bg-red-600'
                )}
              >
                {cameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </motion.button>
            </div>

            {/* Mic level */}
            <div className="absolute top-3 right-3">
              <MicLevelIndicator isMuted={!micOn} />
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="glass-premium rounded-2xl p-5 space-y-4">
          {/* Username */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Your Name</label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
              className="bg-transparent"
            />
          </div>

          {/* Device Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="text-[10px] font-medium text-muted-foreground flex items-center gap-1">
                <Camera className="w-3 h-3" /> Camera
              </label>
              <Select value={selectedCamera} onValueChange={setSelectedCamera}>
                <SelectTrigger size="sm" className="w-full bg-transparent text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_DEVICES.cameras.map((c) => (
                    <SelectItem key={c} value={c} className="text-xs">{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-medium text-muted-foreground flex items-center gap-1">
                <Mic className="w-3 h-3" /> Microphone
              </label>
              <Select value={selectedMic} onValueChange={setSelectedMic}>
                <SelectTrigger size="sm" className="w-full bg-transparent text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_DEVICES.mics.map((m) => (
                    <SelectItem key={m} value={m} className="text-xs">{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-medium text-muted-foreground flex items-center gap-1">
                <Volume2 className="w-3 h-3" /> Speaker
              </label>
              <Select value={selectedSpeaker} onValueChange={setSelectedSpeaker}>
                <SelectTrigger size="sm" className="w-full bg-transparent text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_DEVICES.speakers.map((s) => (
                    <SelectItem key={s} value={s} className="text-xs">{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Meeting Code */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Meeting Code (optional)</label>
            <div className="relative">
              <Input
                value={meetingCode}
                onChange={(e) => setMeetingCode(e.target.value.toUpperCase())}
                placeholder="abc-def-ghi"
                className="bg-transparent pr-10 font-mono tracking-wider"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={onCreate}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-honey text-background rounded-xl text-sm font-semibold hover:bg-honey-light transition-colors shadow-honey"
            >
              <Plus className="w-4 h-4" />
              Create Meeting
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={onJoin}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 glass-card text-foreground rounded-xl text-sm font-semibold hover:bg-accent/30 transition-colors"
            >
              <Phone className="w-4 h-4" />
              Join Meeting
            </motion.button>
          </div>
        </div>

        {/* Upcoming Meetings Quick Access */}
        <div className="glass-card rounded-2xl p-4 space-y-3">
          <h3 className="text-xs font-semibold text-muted-foreground">Upcoming Meetings</h3>
          <div className="space-y-2">
            {mockMeetings.filter(m => m.status === 'scheduled').slice(0, 3).map((meeting) => {
              const host = mockUsers.find(u => u.id === meeting.hostId)
              return (
                <div key={meeting.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/20 transition-colors">
                  <div className="min-w-0">
                    <p className="text-xs font-medium truncate">{meeting.title}</p>
                    <p className="text-[10px] text-muted-foreground">{host?.displayName} &middot; {meeting.participants.length} people</p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setMeetingCode(generateMeetingCode())
                      onJoin()
                    }}
                    className="shrink-0 ml-2 px-2.5 py-1 bg-honey/10 text-honey rounded-lg text-[10px] font-semibold hover:bg-honey/20 transition-colors"
                  >
                    Join
                  </motion.button>
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// ============================================
// MEETING ROOM
// ============================================
function MeetingRoom({
  meetingTitle,
  meetingCode,
  isHost,
  onEnd,
  onLeave,
}: {
  meetingTitle: string
  meetingCode: string
  isHost: boolean
  onEnd: () => void
  onLeave: () => void
}) {
  // ---- State ----
  const [micOn, setMicOn] = useState(true)
  const [cameraOn, setCameraOn] = useState(true)
  const [isRecording, setIsRecording] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isHandRaised, setIsHandRaised] = useState(false)
  const [isLocked, setIsLocked] = useState(false)
  const [layout, setLayout] = useState<ViewLayout>('grid')
  const [sidePanel, setSidePanel] = useState<SidePanel>('none')
  const [meetingDuration, setMeetingDuration] = useState(0)
  const [recordingDuration, setRecordingDuration] = useState(0)
  const [showEndDialog, setShowEndDialog] = useState(false)
  const [showReactions, setShowReactions] = useState(false)
  const [reactions, setReactions] = useState<Reactions[]>([])
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)

  // Participants state
  const [participants, setParticipants] = useState<MockParticipant[]>(() => {
    const me: MockParticipant = {
      id: 'p-me',
      userId: 'u1',
      displayName: 'Jasur Karimov',
      role: isHost ? 'host' : 'participant',
      isMuted: false,
      isVideoOn: true,
      isScreenSharing: false,
      isHandRaised: false,
      networkQuality: 4,
      avatar: generateAvatar('Jasur Karimov'),
      initials: 'JK',
    }
    const mockParts: MockParticipant[] = [
      { id: 'p2', userId: 'u2', displayName: 'Dilnoza Rakhimova', role: 'participant', isMuted: true, isVideoOn: true, isScreenSharing: false, isHandRaised: false, networkQuality: 3, avatar: generateAvatar('Dilnoza Rakhimova'), initials: 'DR' },
      { id: 'p3', userId: 'u6', displayName: 'Sardor Mirzayev', role: 'participant', isMuted: true, isVideoOn: true, isScreenSharing: false, isHandRaised: false, networkQuality: 4, avatar: generateAvatar('Sardor Mirzayev'), initials: 'SM' },
      { id: 'p4', userId: 'u3', displayName: 'Timur Aliyev', role: 'participant', isMuted: false, isVideoOn: false, isScreenSharing: false, isHandRaised: false, networkQuality: 2, avatar: generateAvatar('Timur Aliyev'), initials: 'TA' },
      { id: 'p5', userId: 'u4', displayName: 'Nodira Ushakova', role: 'participant', isMuted: false, isVideoOn: true, isScreenSharing: false, isHandRaised: false, networkQuality: 3, avatar: generateAvatar('Nodira Ushakova'), initials: 'NU' },
    ]
    return [me, ...mockParts]
  })

  const [activeSpeakerId, setActiveSpeakerId] = useState('p-me')
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(MOCK_CHAT_MESSAGES)
  const [chatInput, setChatInput] = useState('')
  const [participantSearch, setParticipantSearch] = useState('')
  const chatEndRef = useRef<HTMLDivElement>(null)
  const meetingContainerRef = useRef<HTMLDivElement>(null)

  // ---- Timers ----
  useEffect(() => {
    const timer = setInterval(() => setMeetingDuration(d => d + 1), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!isRecording) { setRecordingDuration(0); return }
    const timer = setInterval(() => setRecordingDuration(d => d + 1), 1000)
    return () => clearInterval(timer)
  }, [isRecording])

  // ---- Auto-scroll chat ----
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  // ---- Mock behavior ----
  useEffect(() => {
    // Rotate active speaker
    const speakerInterval = setInterval(() => {
      setActiveSpeakerId(prev => {
        const ids = participants.map(p => p.id)
        const idx = ids.indexOf(prev)
        return ids[(idx + 1) % ids.length]
      })
    }, 5000)
    return () => clearInterval(speakerInterval)
  }, [participants])

  useEffect(() => {
    // Simulate someone raising hand after 12s
    const timer = setTimeout(() => {
      setParticipants(prev => prev.map(p =>
        p.id === 'p2' ? { ...p, isHandRaised: true } : p
      ))
      toast.info('Dilnoza Rakhimova raised their hand ✋')
    }, 12000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Simulate a new participant joining after 20s
    const timer = setTimeout(() => {
      const newParticipant: MockParticipant = {
        id: 'p-new',
        userId: 'u7',
        displayName: 'Maria Garcia',
        role: 'participant',
        isMuted: true,
        isVideoOn: false,
        isScreenSharing: false,
        isHandRaised: false,
        networkQuality: 3,
        avatar: generateAvatar('Maria Garcia'),
        initials: 'MG',
      }
      setParticipants(prev => [...prev, newParticipant])
      setChatMessages(prev => [...prev, {
        id: generateId(),
        senderId: 'system',
        senderName: 'System',
        content: 'Maria Garcia joined the meeting',
        isSystem: true,
        isHost: false,
        timestamp: new Date(),
      }])
      toast.success('Maria Garcia joined the meeting')
    }, 20000)
    return () => clearTimeout(timer)
  }, [])

  // ---- Fullscreen ----
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      meetingContainerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }, [])

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [])

  // ---- Handlers ----
  const toggleMic = () => {
    setMicOn(!micOn)
    setParticipants(prev => prev.map(p => p.id === 'p-me' ? { ...p, isMuted: micOn } : p))
    toast(micOn ? 'Microphone muted' : 'Microphone unmuted')
  }

  const toggleCamera = () => {
    setCameraOn(!cameraOn)
    setParticipants(prev => prev.map(p => p.id === 'p-me' ? { ...p, isVideoOn: !cameraOn } : p))
    toast(cameraOn ? 'Camera turned off' : 'Camera turned on')
  }

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing)
    setParticipants(prev => prev.map(p => p.id === 'p-me' ? { ...p, isScreenSharing: !isScreenSharing } : p))
    toast(isScreenSharing ? 'Screen sharing stopped' : 'Screen sharing started')
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    toast(isRecording ? 'Recording stopped' : 'Recording started 🔴')
  }

  const sendReaction = (emoji: string) => {
    const r: Reactions = { id: generateId(), emoji, timestamp: Date.now() }
    setReactions(prev => [...prev, r])
    setShowReactions(false)
    setTimeout(() => {
      setReactions(prev => prev.filter(x => x.id !== r.id))
    }, 2500)
  }

  const sendChat = (e: FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return
    setChatMessages(prev => [...prev, {
      id: generateId(),
      senderId: 'u1',
      senderName: 'Jasur Karimov',
      content: chatInput.trim(),
      isSystem: false,
      isHost: isHost,
      timestamp: new Date(),
    }])
    setChatInput('')
  }

  const copyMeetingCode = () => {
    navigator.clipboard.writeText(meetingCode).catch(() => {})
    setCopiedCode(true)
    toast.success('Meeting code copied!')
    setTimeout(() => setCopiedCode(false), 2000)
  }

  const toggleParticipantMute = (participantId: string) => {
    setParticipants(prev => prev.map(p =>
      p.id === participantId ? { ...p, isMuted: !p.isMuted } : p
    ))
  }

  const removeParticipant = (participantId: string) => {
    const p = participants.find(x => x.id === participantId)
    setParticipants(prev => prev.filter(x => x.id !== participantId))
    if (p) {
      setChatMessages(prev => [...prev, {
        id: generateId(),
        senderId: 'system',
        senderName: 'System',
        content: `${p.displayName} was removed from the meeting`,
        isSystem: true,
        isHost: false,
        timestamp: new Date(),
      }])
      toast.info(`${p.displayName} was removed from the meeting`)
    }
  }

  const muteAll = () => {
    setParticipants(prev => prev.map(p => ({ ...p, isMuted: true })))
    setMicOn(false)
    toast.info('All participants muted')
  }

  // ---- Format time ----
  const formatTimer = (s: number) => {
    const h = Math.floor(s / 3600)
    const m = Math.floor((s % 3600) / 60)
    const sec = s % 60
    if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
  }

  // ---- Compute layout ----
  const filteredParticipants = participantSearch
    ? participants.filter(p => p.displayName.toLowerCase().includes(participantSearch.toLowerCase()))
    : participants

  const visibleParticipants = layout === 'speaker'
    ? [participants.find(p => p.id === activeSpeakerId) || participants[0]]
    : participants

  const getGridClass = () => {
    const count = visibleParticipants.length
    if (isScreenSharing) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
    if (count <= 1) return 'grid-cols-1'
    if (count <= 2) return 'grid-cols-1 sm:grid-cols-2'
    if (count <= 4) return 'grid-cols-2'
    if (count <= 9) return 'grid-cols-2 sm:grid-cols-3'
    return 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
  }

  const panelOpen = sidePanel !== 'none'

  return (
    <div ref={meetingContainerRef} className="h-screen flex flex-col bg-[#111] overflow-hidden">
      {/* ---- FLOATING REACTIONS ---- */}
      {reactions.map(r => <FloatingReaction key={r.id} emoji={r.emoji} />)}

      {/* ---- MEETING INFO BAR ---- */}
      <div className="flex items-center justify-between px-3 md:px-5 py-2 glass-premium border-b border-border z-20">
        <div className="flex items-center gap-2 md:gap-3 min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <h2 className="text-xs md:text-sm font-semibold truncate">{meetingTitle}</h2>
            {isRecording && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-1 px-1.5 py-0.5 bg-red-500/20 rounded-full"
              >
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="w-1.5 h-1.5 rounded-full bg-red-500"
                />
                <span className="text-[10px] font-medium text-red-400">{formatTimer(recordingDuration)}</span>
              </motion.div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          {/* Meeting Timer */}
          <div className="hidden sm:flex items-center gap-1 text-[11px] text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span className="font-mono">{formatTimer(meetingDuration)}</span>
          </div>

          {/* Meeting Code */}
          <button
            onClick={copyMeetingCode}
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-accent/20 transition-colors"
          >
            <span className="text-[11px] font-mono text-muted-foreground">{meetingCode}</span>
            {copiedCode ? (
              <Check className="w-3 h-3 text-green-400" />
            ) : (
              <Copy className="w-3 h-3 text-muted-foreground" />
            )}
          </button>

          {/* Participant Count */}
          <button
            onClick={() => setSidePanel(sidePanel === 'participants' ? 'none' : 'participants')}
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-accent/20 transition-colors"
          >
            <Users className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-[11px] text-muted-foreground">{participants.length}</span>
          </button>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="hidden md:flex p-1 rounded-lg hover:bg-accent/20 transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5 text-muted-foreground" /> : <Maximize2 className="w-3.5 h-3.5 text-muted-foreground" />}
          </button>
        </div>
      </div>

      {/* ---- MAIN AREA ---- */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Video Grid */}
        <div className={cn(
          'flex-1 p-2 md:p-3 transition-all duration-300',
          panelOpen && 'md:mr-[340px]'
        )}>
          {/* Screen Share Placeholder */}
          {isScreenSharing && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-2 rounded-xl overflow-hidden aspect-video bg-gradient-to-br from-stone-800 to-stone-900 flex items-center justify-center relative"
            >
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-honey/20 rounded-full backdrop-blur-sm">
                <MonitorUp className="w-3.5 h-3.5 text-honey" />
                <span className="text-[11px] font-semibold text-honey">You are sharing your screen</span>
              </div>
              <div className="text-center space-y-2">
                <MonitorSpeaker className="w-12 h-12 text-muted-foreground/30 mx-auto" />
                <p className="text-sm text-muted-foreground">Screen share preview</p>
              </div>
            </motion.div>
          )}

          {/* Video Grid */}
          <div className={cn('grid gap-2 md:gap-3', getGridClass())}>
            <AnimatePresence mode="popLayout">
              {visibleParticipants.map(p => (
                <ParticipantTile
                  key={p.id}
                  participant={p}
                  isActiveSpeaker={p.id === activeSpeakerId}
                  size={layout === 'speaker' ? 'large' : isScreenSharing ? 'small' : 'normal'}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* ---- SIDE PANELS ---- */}
        <AnimatePresence>
          {panelOpen && (
            <motion.div
              initial={{ x: 340, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 340, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 bottom-0 w-[340px] max-w-[85vw] glass-premium border-l border-border z-30 flex flex-col md:relative"
            >
              {/* Panel Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <h3 className="text-sm font-semibold">
                  {sidePanel === 'chat' ? 'Meeting Chat' : `Participants (${participants.length})`}
                </h3>
                <div className="flex items-center gap-1">
                  {sidePanel === 'chat' && (
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                      Live
                    </Badge>
                  )}
                  <button
                    onClick={() => setSidePanel('none')}
                    className="p-1 rounded-lg hover:bg-accent/20 transition-colors"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Chat Panel */}
              {sidePanel === 'chat' && (
                <div className="flex-1 flex flex-col min-h-0">
                  <ScrollArea className="flex-1 px-4 py-2">
                    <div className="space-y-3">
                      {chatMessages.map(msg => (
                        <div key={msg.id}>
                          {msg.isSystem ? (
                            <div className="text-center py-1">
                              <span className="text-[10px] text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">
                                {msg.content}
                              </span>
                            </div>
                          ) : (
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-semibold">{msg.senderName}</span>
                                {msg.isHost && (
                                  <span className="px-1 py-0 bg-honey/10 rounded text-[8px] font-bold text-honey">HOST</span>
                                )}
                                <span className="text-[10px] text-muted-foreground">
                                  {msg.timestamp.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                                </span>
                              </div>
                              <p className="text-sm text-foreground/90">{msg.content}</p>
                            </div>
                          )}
                        </div>
                      ))}
                      <div ref={chatEndRef} />
                    </div>
                  </ScrollArea>
                  <div className="px-4 py-3 border-t border-border">
                    <form onSubmit={sendChat} className="flex items-center gap-2">
                      <button type="button" className="p-1.5 rounded-lg hover:bg-accent/20 transition-colors shrink-0">
                        <Paperclip className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <input
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                      />
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        type="submit"
                        disabled={!chatInput.trim()}
                        className="p-1.5 rounded-lg bg-honey/10 text-honey hover:bg-honey/20 transition-colors disabled:opacity-30 shrink-0"
                      >
                        <Send className="w-4 h-4" />
                      </motion.button>
                    </form>
                  </div>
                </div>
              )}

              {/* Participants Panel */}
              {sidePanel === 'participants' && (
                <div className="flex-1 flex flex-col min-h-0">
                  {/* Search */}
                  <div className="px-4 py-2 border-b border-border">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                      <Input
                        value={participantSearch}
                        onChange={(e) => setParticipantSearch(e.target.value)}
                        placeholder="Search participants..."
                        className="pl-8 bg-transparent h-8 text-xs"
                      />
                    </div>
                  </div>

                  {/* Host Actions */}
                  {isHost && (
                    <div className="px-4 py-2 border-b border-border flex items-center gap-2">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={muteAll}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-medium hover:bg-accent/20 transition-colors text-muted-foreground"
                      >
                        <MicOff className="w-3 h-3" />
                        Mute All
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsLocked(!isLocked)}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-medium hover:bg-accent/20 transition-colors text-muted-foreground"
                      >
                        {isLocked ? <Lock className="w-3 h-3 text-honey" /> : <Unlock className="w-3 h-3" />}
                        {isLocked ? 'Locked' : 'Lock'}
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toast.info('No one in waiting room')}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-medium hover:bg-accent/20 transition-colors text-muted-foreground"
                      >
                        <UserPlus className="w-3 h-3" />
                        Admit
                      </motion.button>
                    </div>
                  )}

                  {/* Participants List */}
                  <ScrollArea className="flex-1">
                    <div className="px-2 py-1 space-y-0.5">
                      {filteredParticipants.map(p => (
                        <div
                          key={p.id}
                          className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-accent/10 transition-colors group"
                        >
                          <img
                            src={p.avatar}
                            alt={p.displayName}
                            className="w-8 h-8 rounded-full shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-medium truncate">{p.displayName}</span>
                              {p.role === 'host' && <Crown className="w-3 h-3 text-honey shrink-0" />}
                              {p.role === 'co-host' && <Shield className="w-3 h-3 text-honey/70 shrink-0" />}
                              {p.isHandRaised && (
                                <motion.div animate={{ y: [0, -2, 0] }} transition={{ repeat: Infinity, duration: 0.8 }}>
                                  <Hand className="w-3 h-3 text-honey shrink-0" />
                                </motion.div>
                              )}
                            </div>
                            <span className="text-[10px] text-muted-foreground capitalize">{p.role === 'co-host' ? 'Co-host' : p.role}</span>
                          </div>

                          {/* Action buttons for host */}
                          {isHost && p.id !== 'p-me' && (
                            <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => toggleParticipantMute(p.id)}
                                className="p-1 rounded hover:bg-accent/20 transition-colors"
                              >
                                {p.isMuted ? (
                                  <MicOff className="w-3 h-3 text-red-400" />
                                ) : (
                                  <Mic className="w-3 h-3 text-muted-foreground" />
                                )}
                              </button>
                              <button
                                onClick={() => removeParticipant(p.id)}
                                className="p-1 rounded hover:bg-red-500/10 transition-colors"
                              >
                                <X className="w-3 h-3 text-red-400" />
                              </button>
                            </div>
                          )}

                          {/* Self indicators */}
                          {p.id === 'p-me' && (
                            <span className="text-[10px] text-muted-foreground">(You)</span>
                          )}

                          <NetworkQualityDots quality={p.networkQuality} />
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  {/* Invite button */}
                  <div className="px-4 py-3 border-t border-border">
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        navigator.clipboard.writeText(meetingCode).catch(() => {})
                        toast.success('Meeting code copied! Share it to invite others.')
                      }}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 glass-card rounded-xl text-xs font-medium hover:bg-accent/20 transition-colors"
                    >
                      <UserPlus className="w-3.5 h-3.5 text-honey" />
                      Invite People
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ---- BOTTOM CONTROL BAR ---- */}
      <div className="relative z-20">
        <div className="flex items-center justify-center px-3 md:px-6 py-2.5 glass-premium border-t border-border">
          <div className="flex items-center gap-1 md:gap-2">
            {/* Mic */}
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleMic}
                  className={cn(
                    'w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all',
                    micOn
                      ? 'bg-foreground/10 text-foreground hover:bg-foreground/20'
                      : 'bg-red-500 text-white hover:bg-red-600'
                  )}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={micOn ? 'on' : 'off'}
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 90 }}
                      transition={{ duration: 0.15 }}
                    >
                      {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                    </motion.div>
                  </AnimatePresence>
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="top" className="bg-popover text-popover-foreground">
                {micOn ? 'Mute' : 'Unmute'}
              </TooltipContent>
            </Tooltip>

            {/* Camera */}
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleCamera}
                  className={cn(
                    'w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all',
                    cameraOn
                      ? 'bg-foreground/10 text-foreground hover:bg-foreground/20'
                      : 'bg-red-500 text-white hover:bg-red-600'
                  )}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={cameraOn ? 'on' : 'off'}
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 90 }}
                      transition={{ duration: 0.15 }}
                    >
                      {cameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                    </motion.div>
                  </AnimatePresence>
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="top" className="bg-popover text-popover-foreground">
                {cameraOn ? 'Stop Video' : 'Start Video'}
              </TooltipContent>
            </Tooltip>

            {/* Screen Share */}
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleScreenShare}
                  className={cn(
                    'w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all',
                    isScreenSharing
                      ? 'bg-honey text-background'
                      : 'bg-foreground/10 text-foreground hover:bg-foreground/20'
                  )}
                >
                  <MonitorUp className="w-5 h-5" />
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="top" className="bg-popover text-popover-foreground">
                {isScreenSharing ? 'Stop Sharing' : 'Share Screen'}
              </TooltipContent>
            </Tooltip>

            {/* Divider */}
            <div className="w-px h-6 bg-border mx-1 hidden md:block" />

            {/* Chat */}
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSidePanel(sidePanel === 'chat' ? 'none' : 'chat')}
                  className={cn(
                    'w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all',
                    sidePanel === 'chat'
                      ? 'bg-honey/20 text-honey'
                      : 'bg-foreground/10 text-foreground hover:bg-foreground/20'
                  )}
                >
                  <MessageSquare className="w-5 h-5" />
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="top" className="bg-popover text-popover-foreground">
                Chat
              </TooltipContent>
            </Tooltip>

            {/* Participants */}
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSidePanel(sidePanel === 'participants' ? 'none' : 'participants')}
                  className={cn(
                    'relative w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all',
                    sidePanel === 'participants'
                      ? 'bg-honey/20 text-honey'
                      : 'bg-foreground/10 text-foreground hover:bg-foreground/20'
                  )}
                >
                  <Users className="w-5 h-5" />
                  {participants.some(p => p.isHandRaised) && (
                    <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-honey rounded-full flex items-center justify-center">
                      <Hand className="w-2 h-2 text-background" />
                    </span>
                  )}
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="top" className="bg-popover text-popover-foreground">
                Participants
              </TooltipContent>
            </Tooltip>

            {/* Raise Hand */}
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setIsHandRaised(!isHandRaised)
                    setParticipants(prev => prev.map(p =>
                      p.id === 'p-me' ? { ...p, isHandRaised: !isHandRaised } : p
                    ))
                    toast(isHandRaised ? 'Hand lowered' : 'Hand raised ✋')
                  }}
                  className={cn(
                    'w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all',
                    isHandRaised
                      ? 'bg-honey text-background'
                      : 'bg-foreground/10 text-foreground hover:bg-foreground/20'
                  )}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isHandRaised ? 'up' : 'down'}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Hand className={cn('w-5 h-5', isHandRaised && 'rotate-[-30deg]')} />
                    </motion.div>
                  </AnimatePresence>
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="top" className="bg-popover text-popover-foreground">
                {isHandRaised ? 'Lower Hand' : 'Raise Hand'}
              </TooltipContent>
            </Tooltip>

            {/* Reactions */}
            <div className="relative">
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowReactions(!showReactions)}
                    className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-foreground/10 text-foreground hover:bg-foreground/20 flex items-center justify-center transition-all"
                  >
                    <Sparkles className="w-5 h-5" />
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-popover text-popover-foreground">
                  Reactions
                </TooltipContent>
              </Tooltip>

              <AnimatePresence>
                {showReactions && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 flex items-center gap-1 p-1.5 glass-premium rounded-xl z-50"
                  >
                    {REACTION_EMOJIS.map(emoji => (
                      <motion.button
                        key={emoji}
                        whileHover={{ scale: 1.3 }}
                        whileTap={{ scale: 0.8 }}
                        onClick={() => sendReaction(emoji)}
                        className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-accent/20 transition-colors text-lg"
                      >
                        {emoji}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Record */}
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleRecording}
                  className={cn(
                    'w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all',
                    isRecording
                      ? 'bg-red-500 text-white'
                      : 'bg-foreground/10 text-foreground hover:bg-foreground/20'
                  )}
                >
                  {isRecording ? (
                    <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                      <CircleStop className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <CircleDot className="w-5 h-5" />
                  )}
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="top" className="bg-popover text-popover-foreground">
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </TooltipContent>
            </Tooltip>

            {/* Layout Toggle */}
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setLayout(layout === 'grid' ? 'speaker' : 'grid')}
                  className="hidden md:flex w-10 h-10 md:w-11 md:h-11 rounded-full bg-foreground/10 text-foreground hover:bg-foreground/20 items-center justify-center transition-all"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="w-5 h-5">
                    {layout === 'grid' ? (
                      <>
                        <rect x="0.5" y="0.5" width="7.5" height="7.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
                        <rect x="10" y="0.5" width="7.5" height="7.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
                        <rect x="0.5" y="10" width="7.5" height="7.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
                        <rect x="10" y="10" width="7.5" height="7.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
                      </>
                    ) : (
                      <>
                        <rect x="0.5" y="0.5" width="17" height="11" rx="1" stroke="currentColor" strokeWidth="1.5" />
                        <rect x="0.5" y="13" width="5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
                        <rect x="6.5" y="13" width="5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
                        <rect x="12.5" y="13" width="5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
                      </>
                    )}
                  </svg>
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="top" className="bg-popover text-popover-foreground">
                {layout === 'grid' ? 'Speaker View' : 'Grid View'}
              </TooltipContent>
            </Tooltip>

            {/* More Menu */}
            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-foreground/10 text-foreground hover:bg-foreground/20 flex items-center justify-center transition-all"
                    >
                      <MoreHorizontal className="w-5 h-5" />
                    </motion.button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-popover text-popover-foreground">
                  More Options
                </TooltipContent>
              </Tooltip>
              <DropdownMenuContent side="top" align="end" className="w-48">
                <DropdownMenuLabel className="text-xs text-muted-foreground">Options</DropdownMenuLabel>
                <DropdownMenuItem onClick={toggleFullscreen} className="text-xs cursor-pointer">
                  <Fullscreen className="w-4 h-4" />
                  {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLayout(layout === 'grid' ? 'speaker' : 'grid')} className="text-xs cursor-pointer">
                  <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                    {layout === 'grid' ? (
                      <>
                        <rect x="0.5" y="0.5" width="17" height="11" rx="1" stroke="currentColor" strokeWidth="1.5" />
                        <rect x="0.5" y="13" width="5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
                        <rect x="6.5" y="13" width="5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
                        <rect x="12.5" y="13" width="5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
                      </>
                    ) : (
                      <>
                        <rect x="0.5" y="0.5" width="7.5" height="7.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
                        <rect x="10" y="0.5" width="7.5" height="7.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
                        <rect x="0.5" y="10" width="7.5" height="7.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
                        <rect x="10" y="10" width="7.5" height="7.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
                      </>
                    )}
                  </svg>
                  {layout === 'grid' ? 'Speaker View' : 'Grid View'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.info('Background blur enabled')} className="text-xs cursor-pointer">
                  <Settings className="w-4 h-4" />
                  Background Blur
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => toast.info('Report submitted')} variant="destructive" className="text-xs cursor-pointer">
                  <ShieldAlert className="w-4 h-4" />
                  Report
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Divider */}
            <div className="w-px h-6 bg-border mx-1" />

            {/* Leave */}
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={onLeave}
                  className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-amber-600 text-white hover:bg-amber-700 flex items-center justify-center transition-all"
                >
                  <PhoneOff className="w-5 h-5" />
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="top" className="bg-popover text-popover-foreground">
                Leave
              </TooltipContent>
            </Tooltip>

            {/* End for Host */}
            {isHost && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowEndDialog(true)}
                    className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-red-500 text-white hover:bg-red-600 flex items-center justify-center transition-all"
                  >
                    <Phone className="w-5 h-5" />
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-popover text-popover-foreground">
                  End Meeting for All
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>

        {/* Mobile safe area */}
        <div className="h-[env(safe-area-inset-bottom)]" />
      </div>

      {/* ---- END MEETING DIALOG ---- */}
      <Dialog open={showEndDialog} onOpenChange={setShowEndDialog}>
        <DialogContent className="glass-premium border-border max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" />
              End Meeting?
            </DialogTitle>
            <DialogDescription className="text-sm">
              Are you sure you want to end this meeting for all participants? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-row gap-2 sm:justify-end">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowEndDialog(false)}
              className="flex-1 px-4 py-2.5 glass-card rounded-xl text-sm font-medium hover:bg-accent/20 transition-colors"
            >
              Cancel
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={onEnd}
              className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-xl text-sm font-semibold hover:bg-red-600 transition-colors"
            >
              End for All
            </motion.button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// ============================================
// MEETING ENDED SCREEN
// ============================================
function MeetingEndedScreen({
  meetingTitle,
  duration,
  participantCount,
  wasHost,
  onNewMeeting,
  onBackToLobby,
}: {
  meetingTitle: string
  duration: number
  participantCount: number
  wasHost: boolean
  onNewMeeting: () => void
  onBackToLobby: () => void
}) {
  const formatTimer = (s: number) => {
    const h = Math.floor(s / 3600)
    const m = Math.floor((s % 3600) / 60)
    const sec = s % 60
    if (h > 0) return `${h}h ${m}m ${sec}s`
    return `${m}m ${sec}s`
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-honey/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-amber/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-sm space-y-6"
      >
        {/* Icon */}
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-honey/10 flex items-center justify-center mx-auto mb-4"
          >
            <Video className="w-10 h-10 text-honey" />
          </motion.div>
          <h1 className="text-xl font-bold">Meeting Ended</h1>
          <p className="text-sm text-muted-foreground mt-1">{meetingTitle}</p>
        </div>

        {/* Stats */}
        <div className="glass-premium rounded-2xl p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 glass-card rounded-xl">
              <Clock className="w-5 h-5 text-honey mx-auto mb-1.5" />
              <p className="text-lg font-bold">{formatTimer(duration)}</p>
              <p className="text-[10px] text-muted-foreground">Duration</p>
            </div>
            <div className="text-center p-3 glass-card rounded-xl">
              <Users className="w-5 h-5 text-honey mx-auto mb-1.5" />
              <p className="text-lg font-bold">{participantCount}</p>
              <p className="text-[10px] text-muted-foreground">Participants</p>
            </div>
          </div>

          {wasHost && (
            <div className="flex items-center gap-2 px-3 py-2 bg-honey/5 rounded-lg">
              <Crown className="w-4 h-4 text-honey shrink-0" />
              <span className="text-xs text-muted-foreground">You ended this meeting as host</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onNewMeeting}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-honey text-background rounded-xl text-sm font-semibold hover:bg-honey-light transition-colors shadow-honey"
          >
            <Plus className="w-4 h-4" />
            New Meeting
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onBackToLobby}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 glass-card text-foreground rounded-xl text-sm font-semibold hover:bg-accent/20 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Lobby
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

// ============================================
// MAIN COMPONENT - STATE MACHINE
// ============================================
export default function MeetSection() {
  const [meetingState, setMeetingState] = useState<MeetingState>('lobby')
  const [meetingCode, setMeetingCode] = useState('')
  const [meetingTitle, setMeetingTitle] = useState('')
  const [isHost, setIsHost] = useState(false)
  const [meetingDuration, setMeetingDuration] = useState(0)
  const [participantCount, setParticipantCount] = useState(0)

  const handleCreate = () => {
    setMeetingCode(generateMeetingCode())
    setMeetingTitle('Honey Meeting')
    setIsHost(true)
    setMeetingState('room')
    setMeetingDuration(0)
    setParticipantCount(5)
  }

  const handleJoin = () => {
    if (!meetingCode) setMeetingCode(generateMeetingCode())
    setMeetingTitle('Honey Meeting')
    setIsHost(false)
    setMeetingState('room')
    setMeetingDuration(0)
    setParticipantCount(5)
  }

  const handleEnd = () => {
    setMeetingState('ended')
  }

  const handleLeave = () => {
    setMeetingState('ended')
  }

  const handleNewMeeting = () => {
    setMeetingState('lobby')
  }

  const handleBackToLobby = () => {
    setMeetingState('lobby')
  }

  // Capture duration on leave/end (approximate for demo)
  useEffect(() => {
    if (meetingState === 'room') {
      const timer = setInterval(() => {
        setMeetingDuration(d => d + 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [meetingState])

  return (
    <div className="h-full overflow-hidden">
      {meetingState === 'lobby' && (
        <LobbyScreen onJoin={handleJoin} onCreate={handleCreate} />
      )}
      {meetingState === 'room' && (
        <MeetingRoom
          meetingTitle={meetingTitle}
          meetingCode={meetingCode}
          isHost={isHost}
          onEnd={handleEnd}
          onLeave={handleLeave}
        />
      )}
      {meetingState === 'ended' && (
        <MeetingEndedScreen
          meetingTitle={meetingTitle}
          duration={meetingDuration}
          participantCount={participantCount}
          wasHost={isHost}
          onNewMeeting={handleNewMeeting}
          onBackToLobby={handleBackToLobby}
        />
      )}
    </div>
  )
}
