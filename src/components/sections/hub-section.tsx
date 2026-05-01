'use client'

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Send,
  Smile,
  Paperclip,
  Mic,
  ArrowLeft,
  MoreVertical,
  Menu,
  Phone,
  Video,
  Pin,
  BellOff,
  Bell,
  Ban,
  Trash2,
  Copy,
  Reply,
  Forward,
  Check,
  CheckCheck,
  ChevronDown,
  ImageIcon,
  FileText,
  Link2,
  Users,
  ShieldCheck,
  Clock,
  X,
  StickyNote,
  MessageCircle,
  Play,
  Pause,
  Download,
  Square,
} from 'lucide-react'
import { mockChats, mockMessages, mockUsers } from '@/lib/mock-data'
import { cn, generateAvatar, formatTime, getInitials, generateId, truncateText } from '@/lib/utils'
import type { Attachment, Chat, Message, MessageReaction } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { messageBubble, reactionPop, buttonHover, staggerContainer, staggerItem, springPresets } from '@/lib/motion'

// ============================================
// Constants
// ============================================
const CURRENT_USER_ID = 'u1'
const STORAGE_KEY_CHATS = 'honey_chats'
const STORAGE_KEY_MESSAGES = 'honey_messages'
const MAX_CACHED_MESSAGES = 10
const QUICK_EMOJIS = ['👍', '❤️', '🔥', '😂', '😍', '😮', '🎉', '💯', '👏', '🥰', '😎', '🤝']
const EMOJI_GROUPS: { label: string; emojis: string[] }[] = [
  { label: 'Popular', emojis: ['👍', '❤️', '🔥', '😂', '😍', '😮', '🎉', '💯', '👏', '🤝', '🙏', '✨'] },
  { label: 'Mood', emojis: ['😊', '😎', '🥹', '🤩', '😴', '🤯', '😇', '🥳', '😤', '😢', '🤔', '🤗'] },
  { label: 'Telegram Style', emojis: ['👌', '🤍', '💙', '⚡', '🫡', '🥰', '👀', '💔', '🤣', '🤌', '🙌', '🚀'] },
  { label: 'Extra', emojis: ['🍯', '📌', '🎧', '🎬', '📸', '🫶', '🌙', '☀️', '🏆', '💬', '🧠', '🎯'] },
]
const TYPING_TIMEOUT = 3000
const SIMULATED_TYPING_INTERVAL = 8000
const WAVEFORM_BAR_COUNT = 36
const MAX_VOICE_RECORDING_SECONDS = 300
const VOICE_MIME_CANDIDATES = [
  'audio/webm;codecs=opus',
  'audio/webm',
  'audio/ogg;codecs=opus',
] as const

type FilterTab = 'all' | 'private' | 'groups' | 'channels' | 'unread'
type MobileView = 'list' | 'chat' | 'info'
type EmojiPickerMode = 'reaction' | 'composer'

// ============================================
// Helper Functions
// ============================================
function getChatDisplayName(chat: Chat): string {
  if (chat.name) return chat.name
  const other = chat.participants.find((p) => p.userId !== CURRENT_USER_ID)
  if (!other) return 'Unknown'
  const user = mockUsers.find((u) => u.id === other.userId)
  return user?.displayName ?? other.nickname ?? 'Unknown'
}

function getChatAvatarUrl(chat: Chat): string {
  if (chat.type !== 'private') return generateAvatar(chat.name ?? 'Group')
  const other = chat.participants.find((p) => p.userId !== CURRENT_USER_ID)
  if (!other) return generateAvatar('Unknown')
  const user = mockUsers.find((u) => u.id === other.userId)
  return generateAvatar(user?.displayName ?? 'Unknown')
}

function getChatInitials(chat: Chat): string {
  return getInitials(getChatDisplayName(chat))
}

function getOtherUser(chat: Chat) {
  if (chat.type !== 'private') return null
  const other = chat.participants.find((p) => p.userId !== CURRENT_USER_ID)
  if (!other) return null
  return mockUsers.find((u) => u.id === other.userId) ?? null
}

function getOnlineStatusText(chat: Chat): string {
  if (chat.type !== 'private') {
    if (chat.memberCount) return `${chat.memberCount} members`
    return `${chat.participants.length} members`
  }
  const other = getOtherUser(chat)
  if (!other) return ''
  if (other.status === 'online') return 'online'
  if (other.lastSeen) return `last seen ${formatTime(other.lastSeen)}`
  return 'offline'
}

function isOnline(chat: Chat): boolean {
  if (chat.type !== 'private') return false
  const other = getOtherUser(chat)
  return other?.status === 'online'
}

function formatDateSeparator(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const yesterday = new Date(today.getTime() - 86400000)
  const msgDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  if (msgDate.getTime() === today.getTime()) return 'Today'
  if (msgDate.getTime() === yesterday.getTime()) return 'Yesterday'
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

function needsDateSeparator(msgs: Message[], index: number): boolean {
  if (index === 0) return true
  const prev = new Date(msgs[index - 1].createdAt)
  const curr = new Date(msgs[index].createdAt)
  return prev.toDateString() !== curr.toDateString()
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function formatDurationLabel(totalSeconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds))
  const mins = Math.floor(safeSeconds / 60)
  const secs = safeSeconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

function getVoiceRecorderMimeType(): string {
  if (typeof window === 'undefined' || typeof MediaRecorder === 'undefined') return ''
  return VOICE_MIME_CANDIDATES.find((type) => MediaRecorder.isTypeSupported(type)) ?? ''
}

function resolveAttachmentType(file: File): Attachment['type'] {
  if (file.type.startsWith('image/')) return 'image'
  if (file.type.startsWith('video/')) return 'video'
  if (file.type.startsWith('audio/')) return 'audio'
  return 'file'
}

function resolveMessageTypeFromAttachment(type: Attachment['type']): Message['type'] {
  if (type === 'image') return 'image'
  if (type === 'video') return 'video'
  if (type === 'audio') return 'audio'
  return 'file'
}

function getMessagePreviewText(message: Message): string {
  const trimmedContent = message.content.trim()
  if (trimmedContent.length > 0 && !trimmedContent.startsWith('Attachment ')) {
    return trimmedContent
  }

  if (message.type === 'voice') return 'Voice message'

  const primaryAttachment = message.attachments[0]
  if (!primaryAttachment) return 'Message'
  if (primaryAttachment.type === 'image') return 'Photo'
  if (primaryAttachment.type === 'video') return 'Video'
  if (primaryAttachment.type === 'audio') return 'Audio'
  return primaryAttachment.name || 'File'
}

// ============================================
// LocalStorage helpers
// ============================================
function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : fallback
  } catch {
    return fallback
  }
}

function saveToStorage<T>(key: string, data: T) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch {
    // localStorage might be full
  }
}

// ============================================
// Typing Indicator Component
// ============================================
function TypingDots() {
  return (
    <span className="inline-flex items-center gap-0.5 px-1">
      <motion.span
        className="w-1.5 h-1.5 rounded-full bg-muted-foreground"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
      />
      <motion.span
        className="w-1.5 h-1.5 rounded-full bg-muted-foreground"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
      />
      <motion.span
        className="w-1.5 h-1.5 rounded-full bg-muted-foreground"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
      />
    </span>
  )
}

// ============================================
// Typing Indicator Bar Component
// ============================================
function TypingBar({ names }: { names: string[] }) {
  const displayText = names.length === 1 ? `${names[0]} is typing` : `${names.join(', ')} are typing`
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 5 }}
      className="flex items-center gap-1.5 px-4 py-1 text-xs text-muted-foreground"
    >
      <TypingDots />
      <span>{displayText}</span>
    </motion.div>
  )
}

// ============================================
// Voice Message Bubble Component
// ============================================
function VoiceMessageBubble({
  isOwn,
  attachment,
  duration = 24,
}: {
  isOwn: boolean
  attachment?: Attachment
  duration?: number
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [resolvedDuration, setResolvedDuration] = useState(duration)
  const waveformSeeds = useRef<number[]>(
    Array.from({ length: WAVEFORM_BAR_COUNT }, () => 20 + Math.random() * 80),
  )
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const formattedDuration = useMemo(() => {
    return formatDurationLabel(isPlaying ? currentTime : resolvedDuration)
  }, [currentTime, isPlaying, resolvedDuration])

  const progress = resolvedDuration > 0 ? Math.min(1, currentTime / resolvedDuration) : 0

  useEffect(() => {
    setResolvedDuration(duration)
  }, [duration])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadedMetadata = () => {
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        setResolvedDuration(Math.round(audio.duration))
      }
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
      audio.currentTime = 0
    }

    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [attachment?.url])

  const togglePlayback = useCallback(() => {
    const audio = audioRef.current
    if (!audio) {
      setIsPlaying((prev) => !prev)
      return
    }

    if (audio.paused) {
      void audio.play()
      setIsPlaying(true)
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }, [])

  return (
    <div className="flex items-center gap-3 min-w-[200px] max-w-[280px]">
      {attachment?.url && (
        <audio
          ref={audioRef}
          src={attachment.url}
          preload="metadata"
          className="hidden"
        />
      )}
      {/* Play / Pause button */}
      <motion.button
        onClick={togglePlayback}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.88 }}
        data-no-open-actions="true"
        className={cn(
          'w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors',
          isOwn
            ? 'bg-black/10 hover:bg-black/20 text-[#2B1A00]'
            : 'bg-honey/20 hover:bg-honey/30 text-honey',
        )}
      >
        {isPlaying ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-[2px]"
          >
            <span className="w-[3px] h-3.5 rounded-full bg-current" />
            <span className="w-[3px] h-3.5 rounded-full bg-current" />
          </motion.div>
        ) : (
          <Play className="w-3.5 h-3.5 ml-0.5" fill="currentColor" />
        )}
      </motion.button>

      {/* Waveform visualization */}
      <div className="relative flex-1 h-6 overflow-hidden rounded-full">
        <div
          className={cn(
            'absolute inset-y-0 left-0 rounded-full transition-[width] duration-200',
            isOwn ? 'bg-black/10' : 'bg-honey/12',
          )}
          style={{ width: `${progress * 100}%` }}
        />
        <div className="relative flex h-full items-center gap-[2px]">
        {waveformSeeds.current.map((height, i) => (
          <motion.div
            key={i}
            className="waveform-bar w-[3px] rounded-full"
            style={
              {
                '--wave-height': `${height}%`,
                '--wave-delay': `${i * 0.04}s`,
              } as React.CSSProperties
            }
            animate={
              isPlaying
                ? { height: ['20%', `${height}%`, '20%'] }
                : { height: `${height}%` }
            }
            transition={
              isPlaying
                ? {
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.04,
                    ease: 'easeInOut',
                  }
                : { duration: 0.3 }
            }
          />
        ))}
        </div>
      </div>

      {/* Duration display */}
      <span className={cn(
        'text-[10px] shrink-0 tabular-nums',
        isOwn ? 'text-[#5C3C03]/85' : 'text-muted-foreground',
      )}>
        {formattedDuration}
      </span>
    </div>
  )
}

// ============================================
// Message Reactions Component (Enhanced)
// ============================================
function MessageReactions({
  reactions,
  onToggle,
  isOwn,
}: {
  reactions: MessageReaction[]
  onToggle: (emoji: string) => void
  isOwn: boolean
}) {
  const [poppedEmojis, setPoppedEmojis] = useState<Set<string>>(new Set())

  const handleToggle = useCallback(
    (emoji: string) => {
      const reaction = reactions.find((r) => r.emoji === emoji)
      const wasAlreadyActive = reaction?.userIds.includes(CURRENT_USER_ID) ?? false
      onToggle(emoji)
      // Trigger pop animation when toggling ON
      if (!wasAlreadyActive) {
        setPoppedEmojis((prev) => {
          const next = new Set(prev)
          next.add(emoji)
          return next
        })
        setTimeout(() => {
          setPoppedEmojis((prev) => {
            const next = new Set(prev)
            next.delete(emoji)
            return next
          })
        }, 500)
      }
    },
    [reactions, onToggle],
  )

  if (reactions.length === 0) return null
  return (
    <motion.div
      layout
      className={cn(
        'inline-flex max-w-[230px] flex-wrap items-center gap-1 rounded-2xl px-1.5 py-1 backdrop-blur-xl border shadow-lg',
        isOwn
          ? 'bg-[rgba(255,255,255,0.8)] dark:bg-[rgba(58,38,4,0.6)] border-white/50 dark:border-honey/20'
          : 'bg-[rgba(255,255,255,0.72)] dark:bg-[rgba(22,18,15,0.72)] border-white/45 dark:border-white/10',
      )}
    >
      {reactions.map((r) => {
        const isUserReacted = r.userIds.includes(CURRENT_USER_ID)
        const justPopped = poppedEmojis.has(r.emoji)
        return (
          <motion.button
            key={r.emoji}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation()
              handleToggle(r.emoji)
            }}
            className={cn(
              'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border transition-all',
              isUserReacted
                ? 'bg-honey/25 border-honey/50 text-[#2B1A00] dark:text-honey shadow-[0_0_12px_rgba(255,184,0,0.22)]'
                : 'bg-background/65 border-border/60 text-muted-foreground hover:text-foreground hover:border-honey/40',
              justPopped && 'animate-heart-pop',
            )}
          >
            <span>{r.emoji}</span>
            <span className="text-[10px]">{r.userIds.length}</span>
          </motion.button>
        )
      })}
    </motion.div>
  )
}

// ============================================
// Quick Emoji Picker (Enhanced)
// ============================================
function EmojiPicker({
  onPick,
  onClose,
  mode = 'reaction',
}: {
  onPick: (emoji: string) => void
  onClose: () => void
  mode?: EmojiPickerMode
}) {
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null)

  const handlePick = useCallback(
    (emoji: string) => {
      setSelectedEmoji(emoji)
      onPick(emoji)
      setTimeout(() => setSelectedEmoji(null), 400)
    },
    [onPick],
  )

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 5 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 5 }}
      className={cn(
        'absolute bottom-full mb-2 rounded-2xl border border-honey/20 bg-[rgba(10,9,8,0.94)] p-3 shadow-2xl backdrop-blur-3xl z-50',
        mode === 'reaction' ? 'right-0 w-[320px]' : 'left-0 w-[340px]',
      )}
      data-no-open-actions="true"
    >
      <div className="mb-2 flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f7c464]">
            {mode === 'reaction' ? 'Reactions' : 'Emoji'}
          </p>
          <p className="text-[11px] text-[#bca77b]">
            {mode === 'reaction' ? 'Pick a Telegram-style reaction' : 'Add emotion to your message'}
          </p>
        </div>
        <button
          onClick={onClose}
          className="flex h-6 w-6 items-center justify-center rounded-full border border-honey/20 bg-white/5 text-[#c7b28a] transition-colors hover:bg-honey/12 hover:text-honey"
        >
          <X className="w-3 h-3" />
        </button>
      </div>

      <div className="max-h-[280px] space-y-3 overflow-y-auto pr-1">
        {EMOJI_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-[#8f7a54]">
              {group.label}
            </p>
            <motion.div
              className="flex flex-wrap gap-1"
              variants={staggerContainer(0.015)}
              initial="hidden"
              animate="visible"
            >
              {group.emojis.map((emoji) => (
                <motion.button
                  key={`${group.label}-${emoji}`}
                  variants={staggerItem}
                  whileHover={{ scale: 1.18, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => handlePick(emoji)}
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-xl border border-transparent bg-white/4 text-lg transition-colors hover:border-honey/20 hover:bg-honey/10',
                    selectedEmoji === emoji && 'animate-heart-pop border-honey/35 bg-honey/12',
                  )}
                >
                  {emoji}
                </motion.button>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function MediaLightbox({
  attachment,
  onClose,
}: {
  attachment: Attachment
  onClose: () => void
}) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 px-4 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 18 }}
        transition={{ type: 'spring', stiffness: 220, damping: 22 }}
        className="relative w-full max-w-4xl overflow-hidden rounded-[32px] border border-honey/20 bg-[rgba(10,9,8,0.92)] shadow-[0_28px_90px_rgba(0,0,0,0.55)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-honey/15 px-4 py-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#F6E3B2]">{attachment.name}</p>
            <p className="text-[11px] text-[#BFA676]">{formatFileSize(attachment.size)}</p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={attachment.url}
              download={attachment.name}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-honey/20 bg-white/5 text-honey transition-colors hover:bg-honey hover:text-[#2B1A00]"
            >
              <Download className="h-4 w-4" />
            </a>
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-honey/20 bg-white/5 text-[#d6c197] transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex max-h-[78vh] items-center justify-center bg-[radial-gradient(circle_at_top,rgba(255,184,0,0.08),transparent_28%),linear-gradient(180deg,rgba(16,14,12,0.96),rgba(8,7,6,0.98))] p-4">
          {attachment.type === 'image' ? (
            <img
              src={attachment.url}
              alt={attachment.name}
              className="max-h-[70vh] w-auto rounded-[24px] object-contain"
            />
          ) : (
            <video
              src={attachment.url}
              controls
              autoPlay
              playsInline
              preload="metadata"
              className="max-h-[70vh] w-full rounded-[24px] bg-black object-contain"
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

function AttachmentCard({
  attachment,
  isOwn,
  onPreview,
}: {
  attachment: Attachment
  isOwn: boolean
  onPreview: (attachment: Attachment) => void
}) {
  const cardClassName = cn(
    'block overflow-hidden rounded-[22px] border transition-colors',
    isOwn ? 'border-[#876000]/25 bg-black/10' : 'border-border/60 bg-background/40',
  )

  const footer = (
    <div className="flex items-center gap-2 px-3 py-2">
      <div
        className={cn(
          'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg',
          isOwn ? 'bg-black/10' : 'bg-honey/10',
        )}
      >
        {attachment.type === 'image' && <ImageIcon className="h-3.5 w-3.5" />}
        {attachment.type === 'video' && <Play className="h-3.5 w-3.5" />}
        {attachment.type === 'audio' && <Mic className="h-3.5 w-3.5" />}
        {attachment.type === 'file' && <FileText className="h-3.5 w-3.5" />}
      </div>
      <div className="min-w-0">
        <p className="truncate text-xs font-medium">{attachment.name}</p>
        <p className={cn('text-[10px]', isOwn ? 'text-[#5C3C03]/75' : 'text-muted-foreground')}>
          {formatFileSize(attachment.size)}
          {typeof attachment.duration === 'number' && attachment.duration > 0 ? ` · ${formatDurationLabel(attachment.duration)}` : ''}
        </p>
      </div>
    </div>
  )

  if (attachment.type === 'image') {
    return (
      <motion.button
        type="button"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={(event) => {
          event.stopPropagation()
          onPreview(attachment)
        }}
        data-no-open-actions="true"
        className={cn(cardClassName, 'w-full text-left')}
      >
        <div className="relative">
          <img
            src={attachment.url}
            alt={attachment.name}
            className="max-h-64 w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-3 py-2">
            <p className="text-[11px] font-medium text-white/95">Tap to preview</p>
          </div>
        </div>
        {footer}
      </motion.button>
    )
  }

  if (attachment.type === 'video') {
    return (
      <motion.div
        whileHover={{ scale: 1.005 }}
        className={cardClassName}
        data-no-open-actions="true"
      >
        <div className="relative">
          <video
            src={attachment.url}
            controls
            playsInline
            preload="metadata"
            className="max-h-72 w-full bg-black object-contain"
          />
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              onPreview(attachment)
            }}
            className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/45 px-3 py-1 text-[11px] font-medium text-white/85 backdrop-blur-xl transition-colors hover:bg-black/60"
          >
            Expand
          </button>
        </div>
        {footer}
      </motion.div>
    )
  }

  if (attachment.type === 'audio') {
    return (
      <motion.div
        whileHover={{ scale: 1.005 }}
        className={cn(cardClassName, 'p-3')}
        data-no-open-actions="true"
      >
        <div className="mb-3 flex items-center gap-2">
          <div
            className={cn(
              'flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
              isOwn ? 'bg-black/10 text-[#2B1A00]' : 'bg-honey/12 text-honey',
            )}
          >
            <Mic className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-medium">{attachment.name}</p>
            <p className={cn('text-[10px]', isOwn ? 'text-[#5C3C03]/75' : 'text-muted-foreground')}>
              {formatFileSize(attachment.size)}
            </p>
          </div>
        </div>
        <audio
          src={attachment.url}
          controls
          preload="metadata"
          className="h-10 w-full"
        />
      </motion.div>
    )
  }

  return (
    <motion.a
      href={attachment.url}
      target="_blank"
      rel="noreferrer"
      download={attachment.name}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      data-no-open-actions="true"
      className={cardClassName}
    >
      {footer}
    </motion.a>
  )
}

// ============================================
// Status Checks for Message
// ============================================
function MessageStatus({ status, isOwn }: { status: Message['status']; isOwn?: boolean }) {
  if (status === 'sent') return <Check className={cn('w-3.5 h-3.5', isOwn ? 'text-[#5C3C03]/70' : 'text-muted-foreground')} />
  if (status === 'delivered') return <CheckCheck className={cn('w-3.5 h-3.5', isOwn ? 'text-[#5C3C03]/70' : 'text-muted-foreground')} />
  if (status === 'read') return <CheckCheck className={cn('w-3.5 h-3.5', isOwn ? 'text-sky-700 dark:text-sky-300' : 'text-honey')} />
  if (status === 'failed') return <X className="w-3.5 h-3.5 text-destructive" />
  return null
}

// ============================================
// Message Bubble Component (Enhanced)
// ============================================
function MessageBubble({
  message,
  isOwn,
  isNew,
  onReply,
  onReaction,
  onContextMenu,
  onOpenActions,
  onPreviewAttachment,
  replyingTo,
}: {
  message: Message
  isOwn: boolean
  isNew: boolean
  onReply: (msg: Message) => void
  onReaction: (msgId: string, emoji: string) => void
  onContextMenu: (e: React.MouseEvent, msg: Message) => void
  onOpenActions: (msg: Message, anchorRect: DOMRect) => void
  onPreviewAttachment: (attachment: Attachment) => void
  replyingTo?: Message
}) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const bubbleRef = useRef<HTMLDivElement>(null)
  const sender = mockUsers.find((u) => u.id === message.senderId)
  const hasReactions = message.reactions.length > 0

  const openActionsOnClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement
    if (target.closest('button, a, input, textarea, audio, video, [data-no-open-actions="true"]')) {
      return
    }
    if (window.getSelection?.().toString()) return
    const rect = bubbleRef.current?.getBoundingClientRect()
    if (!rect) return
    onOpenActions(message, rect)
  }, [message, onOpenActions])

  const voiceAttachment = message.attachments.find((attachment) => attachment.type === 'audio')

  // Render voice message content for voice type messages
  const renderContent = () => {
    if (message.type === 'voice') {
      return (
        <VoiceMessageBubble
          isOwn={isOwn}
          attachment={voiceAttachment}
          duration={voiceAttachment?.duration ?? 24}
        />
      )
    }

    if (message.attachments.length > 0) {
      return (
        <div className="space-y-2">
          {message.attachments.map((attachment) => (
            <AttachmentCard
              key={attachment.id}
              attachment={attachment}
              isOwn={isOwn}
              onPreview={onPreviewAttachment}
            />
          ))}
          {message.content.trim().length > 0 && !message.content.startsWith('Attachment ') && (
            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.content}</p>
          )}
        </div>
      )
    }

    return (
      <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.content}</p>
    )
  }

  return (
    <motion.div
      variants={messageBubble}
      initial="hidden"
      animate="visible"
      className={cn(
        'flex w-full px-3',
        isOwn ? 'justify-end' : 'justify-start',
        isNew && 'animate-message-bounce',
      )}
    >
      <div className={cn('flex flex-col max-w-[85%] md:max-w-[70%]', isOwn ? 'items-end' : 'items-start')}>
        {/* Sender name for groups */}
        {!isOwn && (
          <span className="text-[10px] text-[#CDB88A] mb-0.5 ml-2 font-medium">
            {sender?.displayName ?? 'Unknown'}
          </span>
        )}
        <div
          ref={bubbleRef}
          onContextMenu={(e) => onContextMenu(e, message)}
          onClick={openActionsOnClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={cn(
            'relative group rounded-2xl px-3 py-2 transition-all',
            isOwn
              ? 'bg-honey/90 text-[#2B1A00] rounded-br-md shadow-honey'
              : 'glass-card text-[#F8E7C3] rounded-bl-md',
            isHovered && 'gradient-border',
          )}
        >
          {/* Reply preview */}
          {replyingTo && (
            <div className="flex items-start gap-2 mb-1.5 pb-1.5 border-b border-current/10">
              <div className="w-0.5 self-stretch rounded-full bg-current/20 shrink-0" />
              <div className="min-w-0">
                <p className="text-[10px] font-semibold opacity-70">
                  {replyingTo.senderId === CURRENT_USER_ID ? 'You' : mockUsers.find((u) => u.id === replyingTo.senderId)?.displayName ?? 'Unknown'}
                </p>
                <p className="text-xs opacity-60 truncate">{truncateText(getMessagePreviewText(replyingTo), 40)}</p>
              </div>
            </div>
          )}

          {/* Message content */}
          {renderContent()}

          {/* Time and status */}
          <div className={cn('flex items-center gap-1 mt-0.5', isOwn ? 'justify-end' : 'justify-end')}>
            {message.editedAt && (
              <span className="text-[9px] opacity-50">edited</span>
            )}
            <span className={cn('text-[10px] opacity-50', isOwn && 'text-[#5C3C03]/80')}>
              {formatTime(message.createdAt)}
            </span>
            {isOwn && <MessageStatus status={message.status} isOwn />}
          </div>

          {/* Hover actions */}
          <div
            className={cn(
              'absolute -top-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1',
              isOwn ? '-left-2 -translate-x-full' : '-right-2 translate-x-full',
            )}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.button
                    {...buttonHover}
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowEmojiPicker(!showEmojiPicker)
                    }}
                    data-no-open-actions="true"
                    className="w-6 h-6 rounded-full glass-premium flex items-center justify-center shadow-md"
                  >
                    <Smile className="w-3 h-3 text-muted-foreground" />
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent>React</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.button
                    {...buttonHover}
                    onClick={(e) => {
                      e.stopPropagation()
                      onReply(message)
                    }}
                    data-no-open-actions="true"
                    className="w-6 h-6 rounded-full glass-premium flex items-center justify-center shadow-md"
                  >
                    <Reply className="w-3 h-3 text-muted-foreground" />
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent>Reply</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Emoji Picker */}
          <AnimatePresence>
            {showEmojiPicker && (
              <EmojiPicker
                mode="reaction"
                onPick={(emoji) => {
                  onReaction(message.id, emoji)
                  setShowEmojiPicker(false)
                }}
                onClose={() => setShowEmojiPicker(false)}
              />
            )}
          </AnimatePresence>

        </div>

        {hasReactions && (
          <div className={cn(
            'relative z-10 -mt-1',
            isOwn ? 'mr-2 self-end' : 'ml-2 self-start',
          )}>
            <MessageReactions
              reactions={message.reactions}
              onToggle={(emoji) => onReaction(message.id, emoji)}
              isOwn={isOwn}
            />
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ============================================
// Scroll to Bottom Button
// ============================================
function ScrollToBottomBtn({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20"
    >
      <motion.button
        {...buttonHover}
        onClick={onClick}
        className="w-8 h-8 rounded-full glass-premium shadow-lg flex items-center justify-center"
      >
        <ChevronDown className="w-4 h-4 text-honey" />
      </motion.button>
    </motion.div>
  )
}

// ============================================
// Chat List Item Component (Enhanced)
// ============================================
function ChatListItem({
  chat,
  isActive,
  onClick,
  typingNames,
}: {
  chat: Chat
  isActive: boolean
  onClick: () => void
  typingNames: string[]
}) {
  const displayName = getChatDisplayName(chat)
  const avatarUrl = getChatAvatarUrl(chat)
  const initials = getChatInitials(chat)
  const online = isOnline(chat)
  const other = getOtherUser(chat)
  const lastMsg = chat.lastMessage
  const isTyping = typingNames.length > 0

  return (
    <motion.button
      whileHover={{ backgroundColor: 'rgba(255, 184, 0, 0.06)' }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-3 p-2.5 rounded-xl transition-all text-left hover-lift hover-glow-border',
        isActive && 'bg-honey/10',
      )}
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        <Avatar className="w-11 h-11 border border-border/50">
          <AvatarImage src={avatarUrl} alt={displayName} />
          <AvatarFallback className="bg-honey/20 text-honey text-xs font-bold">
            {initials}
          </AvatarFallback>
        </Avatar>
        {online && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 min-w-0">
            <span className="text-sm font-semibold truncate text-[#F6E3B2]">{displayName}</span>
            {other?.isVerified && (
              <ShieldCheck className="w-3.5 h-3.5 text-honey shrink-0" />
            )}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {chat.isPinned && (
              <StickyNote className="w-3 h-3 text-muted-foreground/50" />
            )}
            {lastMsg && (
              <span className="text-[10px] text-muted-foreground">
                {formatTime(lastMsg.createdAt)}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 mt-0.5">
          <div className="flex items-center gap-1 min-w-0">
            {isTyping ? (
              <span className="text-xs text-honey flex items-center gap-1">
                <TypingDots />
              </span>
            ) : (
              <span className="text-xs text-[#BFA676] truncate">
                {lastMsg
                  ? (lastMsg.senderId === CURRENT_USER_ID ? 'You: ' : '') + truncateText(getMessagePreviewText(lastMsg), 35)
                  : 'No messages yet'}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {chat.isMuted && (
              <BellOff className="w-3 h-3 text-muted-foreground/50" />
            )}
            {chat.unreadCount > 0 && (
              <span className="min-w-[18px] h-[18px] px-1 bg-honey rounded-full flex items-center justify-center text-[10px] font-bold text-[#2B1A00]">
                {chat.unreadCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.button>
  )
}

// ============================================
// Filter Tabs Component
// ============================================
function FilterTabs({
  active,
  onChange,
}: {
  active: FilterTab
  onChange: (tab: FilterTab) => void
}) {
  const tabs: { id: FilterTab; label: string; icon?: React.ReactNode }[] = [
    { id: 'all', label: 'All' },
    { id: 'private', label: 'Private' },
    { id: 'groups', label: 'Groups' },
    { id: 'channels', label: 'Channels' },
    { id: 'unread', label: 'Unread' },
  ]
  return (
    <div className="flex items-center gap-1.5 px-2 pb-2 overflow-x-auto no-scrollbar-x">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-all shrink-0 border',
            active === tab.id
              ? 'bg-honey text-[#2B1A00] border-honey/70 shadow-[0_4px_14px_rgba(255,184,0,0.35)]'
              : 'bg-black/40 border-honey/20 text-[#C5A96D] hover:text-honey hover:border-honey/40 hover:bg-black/55',
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

// ============================================
// Info Panel Content Component
// ============================================
function InfoPanelContent({
  chat,
  chats,
  setChats,
  onClose,
}: {
  chat: Chat
  chats: Chat[]
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>
  onClose: () => void
}) {
  const [isMuted, setIsMuted] = useState(chat.isMuted)
  const displayName = getChatDisplayName(chat)
  const avatarUrl = getChatAvatarUrl(chat)
  const initials = getChatInitials(chat)
  const other = getOtherUser(chat)
  const online = isOnline(chat)

  const toggleMute = () => {
    const newValue = !isMuted
    setIsMuted(newValue)
    setChats((prev) => prev.map((c) => (c.id === chat.id ? { ...c, isMuted: newValue } : c)))
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 flex items-center justify-between">
        <h3 className="text-base font-semibold">Info</h3>
        <Button variant="ghost" size="icon" className="h-8 w-8 md:hidden" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="flex flex-col items-center px-4 pb-4">
          <Avatar className="w-20 h-20 border-2 border-honey/30 mb-3">
            <AvatarImage src={avatarUrl} alt={displayName} />
            <AvatarFallback className="bg-honey/20 text-honey text-xl font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <h4 className="text-base font-semibold">{displayName}</h4>
          {other && (
            <p className="text-xs text-muted-foreground">@{other.username}</p>
          )}
          <p className={cn(
            'text-xs mt-1 flex items-center gap-1.5',
            online ? 'text-green-500' : 'text-muted-foreground',
          )}>
            {online && <span className="w-2 h-2 bg-green-500 rounded-full" />}
            {getOnlineStatusText(chat)}
          </p>
          {other?.bio && (
            <p className="text-xs text-muted-foreground mt-2 text-center max-w-[240px]">
              {other.bio}
            </p>
          )}
          {chat.description && (
            <p className="text-xs text-muted-foreground mt-2 text-center max-w-[240px]">
              {chat.description}
            </p>
          )}
        </div>

        <Separator className="bg-border/50" />

        {/* Quick actions */}
        <div className="grid grid-cols-3 gap-2 p-4">
          {[
            { icon: <ImageIcon className="w-4 h-4" />, label: 'Media' },
            { icon: <FileText className="w-4 h-4" />, label: 'Files' },
            { icon: <Link2 className="w-4 h-4" />, label: 'Links' },
          ].map((item) => (
            <button
              key={item.label}
              className="flex flex-col items-center gap-1.5 py-3 rounded-xl glass-card hover:bg-accent/30 transition-colors"
            >
              <span className="text-muted-foreground">{item.icon}</span>
              <span className="text-[10px] text-muted-foreground">{item.label}</span>
            </button>
          ))}
        </div>

        <Separator className="bg-border/50" />

        {/* Settings */}
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isMuted ? <BellOff className="w-4 h-4 text-muted-foreground" /> : <Bell className="w-4 h-4 text-muted-foreground" />}
              <span className="text-sm">Notifications</span>
            </div>
            <Switch checked={!isMuted} onCheckedChange={toggleMute} />
          </div>

          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10 h-9"
          >
            <Ban className="w-4 h-4" />
            <span className="text-sm">Block User</span>
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10 h-9"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm">Clear History</span>
          </Button>
        </div>
      </ScrollArea>
    </div>
  )
}

// ============================================
// Main Hub Section Component
// ============================================
export default function HubSection() {
  // ---- State ----
  // Lazy state initialization — avoids setState-in-effect
  const [chats, setChats] = useState<Chat[]>(() => {
    if (typeof window === 'undefined') return mockChats
    const stored = loadFromStorage<Chat[]>(STORAGE_KEY_CHATS, [])
    return mockChats.map((mc) => {
      const sc = stored.find((s) => s.id === mc.id)
      return sc ? { ...mc, ...sc } : mc
    })
  })
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window === 'undefined') return mockMessages
    const stored = loadFromStorage<Message[]>(STORAGE_KEY_MESSAGES, [])
    const merged = [...mockMessages]
    stored.forEach((sm) => {
      if (!merged.find((m) => m.id === sm.id)) merged.push(sm)
    })
    return merged
  })
  const [activeChatId, setActiveChatId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState<FilterTab>('all')
  const [messageText, setMessageText] = useState('')
  const [pendingAttachments, setPendingAttachments] = useState<Attachment[]>([])
  const [replyTo, setReplyTo] = useState<Message | null>(null)
  const [showComposerEmojiPicker, setShowComposerEmojiPicker] = useState(false)
  const [mobileView, setMobileView] = useState<MobileView>('list')
  const [showInfoPanel, setShowInfoPanel] = useState(false)
  const [showMobileInfo, setShowMobileInfo] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [typingUsers, setTypingUsers] = useState<Record<string, string[]>>({})
  const [showScrollBtn, setShowScrollBtn] = useState(false)
  const [contextMessage, setContextMessage] = useState<Message | null>(null)
  const [contextPos, setContextPos] = useState({ x: 0, y: 0 })
  const [forwardMessage, setForwardMessage] = useState<Message | null>(null)
  const [newMessageIds, setNewMessageIds] = useState<Set<string>>(new Set())
  const [previewAttachment, setPreviewAttachment] = useState<Attachment | null>(null)
  const [isRecordingVoice, setIsRecordingVoice] = useState(false)
  const [recordingDuration, setRecordingDuration] = useState(0)
  const [recorderError, setRecorderError] = useState<string | null>(null)

  // ---- Refs ----
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const simulatedTypingRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const initialMessageIdsRef = useRef<Set<string>>(new Set())
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const recordingChunksRef = useRef<Blob[]>([])
  const recordingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const recordingStreamRef = useRef<MediaStream | null>(null)
  const recordingShouldSendRef = useRef(true)
  const recordingDurationRef = useRef(0)

  // ---- Track initial message IDs (for isNew detection) ----
  useEffect(() => {
    const ids = new Set(messages.map((m) => m.id))
    initialMessageIdsRef.current = ids
  }, []) // Run once on mount to capture initial IDs

  // ---- Active Chat ----
  const activeChat = useMemo(
    () => chats.find((c) => c.id === activeChatId) ?? null,
    [chats, activeChatId],
  )

  const chatMessages = useMemo(
    () => messages.filter((m) => m.chatId === activeChatId),
    [messages, activeChatId],
  )

  // ---- Initialize data (lazy state initializer to avoid setState in effect) ----
  // Initialization is done via useState factory functions defined above component.

  // ---- Persist to localStorage ----
  useEffect(() => {
    if (chats.length > 0) {
      saveToStorage(STORAGE_KEY_CHATS, chats.map((c) => ({
        ...c,
        lastMessage: messages.find((m) => m.id === c.lastMessage?.id) ?? c.lastMessage,
      })))
    }
  }, [chats, messages])

  useEffect(() => {
    if (messages.length > 0) {
      // Save last MAX_CACHED_MESSAGES per chat
      const chatIds = [...new Set(messages.map((m) => m.chatId))]
      const toCache: Message[] = []
      chatIds.forEach((cid) => {
        const msgs = messages.filter((m) => m.chatId === cid).slice(-MAX_CACHED_MESSAGES)
        toCache.push(...msgs)
      })
      saveToStorage(STORAGE_KEY_MESSAGES, toCache)
    }
  }, [messages])

  // ---- Auto scroll to bottom ----
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (chatMessages.length > 0) {
      scrollToBottom()
    }
  }, [chatMessages.length, scrollToBottom])

  // ---- Scroll detection ----
  useEffect(() => {
    const el = scrollAreaRef.current
    if (!el) return
    const handleScroll = () => {
      if (!el) return
      const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80
      setShowScrollBtn(!isAtBottom)
    }
    el.addEventListener('scroll', handleScroll)
    return () => el.removeEventListener('scroll', handleScroll)
  }, [activeChatId])

  // ---- Typing detection (user typing) - handled via ref timer in onChangeText ----
  const handleTextChange = useCallback(
    (text: string) => {
      setMessageText(text)
      if (text && activeChatId) {
        setIsTyping(true)
        if (typingTimerRef.current) clearTimeout(typingTimerRef.current)
        typingTimerRef.current = setTimeout(() => {
          setIsTyping(false)
        }, TYPING_TIMEOUT)
      } else {
        setIsTyping(false)
      }
    },
    [activeChatId],
  )

  // ---- Simulated typing from other users ----
  useEffect(() => {
    if (!activeChatId) return
    simulatedTypingRef.current = setInterval(() => {
      if (Math.random() < 0.3) {
        const chat = chats.find((c) => c.id === activeChatId)
        if (!chat) return
        const others = chat.participants.filter((p) => p.userId !== CURRENT_USER_ID)
        if (others.length === 0) return
        const randomUser = others[Math.floor(Math.random() * others.length)]
        const user = mockUsers.find((u) => u.id === randomUser.userId)
        if (!user) return
        setTypingUsers((prev) => ({
          ...prev,
          [activeChatId]: [user.displayName],
        }))
        setTimeout(() => {
          setTypingUsers((prev) => ({
            ...prev,
            [activeChatId]: [],
          }))
        }, 2000 + Math.random() * 3000)
      }
    }, SIMULATED_TYPING_INTERVAL)
    return () => {
      if (simulatedTypingRef.current) clearInterval(simulatedTypingRef.current)
    }
  }, [activeChatId, chats])

  // ---- Filter chats ----
  const filteredChats = useMemo(() => {
    let result = chats

    // Filter tab
    if (filter === 'private') result = result.filter((c) => c.type === 'private')
    else if (filter === 'groups') result = result.filter((c) => c.type === 'group')
    else if (filter === 'channels') result = result.filter((c) => c.type === 'channel')
    else if (filter === 'unread') result = result.filter((c) => c.unreadCount > 0)

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter((c) => {
        const name = getChatDisplayName(c).toLowerCase()
        return name.includes(q)
      })
    }

    // Sort: pinned first, then by updatedAt
    return result.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1
      if (!a.isPinned && b.isPinned) return 1
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    })
  }, [chats, filter, searchQuery])

  const appendOutgoingMessage = useCallback((draft: {
    content: string
    type: Message['type']
    attachments: Attachment[]
    replyTo?: string
  }) => {
    if (!activeChatId) return

    const newMsg: Message = {
      id: generateId(),
      chatId: activeChatId,
      senderId: CURRENT_USER_ID,
      content: draft.content,
      type: draft.type,
      status: 'sent',
      replyTo: draft.replyTo,
      reactions: [],
      attachments: draft.attachments,
      mentions: [],
      createdAt: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, newMsg])
    setNewMessageIds((prev) => new Set(prev).add(newMsg.id))
    setChats((prev) =>
      prev.map((c) =>
        c.id === activeChatId
          ? { ...c, lastMessage: newMsg, updatedAt: newMsg.createdAt, unreadCount: 0 }
          : c,
      ),
    )

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) => (m.id === newMsg.id ? { ...m, status: 'delivered' as const } : m)),
      )
    }, 1000)

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) => (m.id === newMsg.id ? { ...m, status: 'read' as const } : m)),
      )
    }, 2500)

    scrollToBottom()
  }, [activeChatId, scrollToBottom])

  const clearVoiceRecorder = useCallback(() => {
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current)
      recordingTimerRef.current = null
    }

    if (recordingStreamRef.current) {
      recordingStreamRef.current.getTracks().forEach((track) => track.stop())
      recordingStreamRef.current = null
    }

    mediaRecorderRef.current = null
  }, [])

  const stopVoiceRecording = useCallback((shouldSend: boolean) => {
    const recorder = mediaRecorderRef.current
    recordingShouldSendRef.current = shouldSend
    setIsRecordingVoice(false)

    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current)
      recordingTimerRef.current = null
    }

    if (!recorder || recorder.state === 'inactive') {
      clearVoiceRecorder()
      return
    }

    recorder.stop()
  }, [clearVoiceRecorder])

  const startVoiceRecording = useCallback(async () => {
    if (!activeChatId) return
    if (messageText.trim() || pendingAttachments.length > 0) return

    setRecorderError(null)

    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      setRecorderError('Voice recording is not supported in this browser yet.')
      return
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mimeType = getVoiceRecorderMimeType()
      const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream)

      recordingChunksRef.current = []
      recordingStreamRef.current = stream
      mediaRecorderRef.current = recorder
      recordingShouldSendRef.current = true
      recordingDurationRef.current = 0
      setRecordingDuration(0)
      setIsRecordingVoice(true)

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordingChunksRef.current.push(event.data)
        }
      }

      recorder.onstop = () => {
        const durationSeconds = recordingDurationRef.current
        const chunks = recordingChunksRef.current

        if (!recordingShouldSendRef.current || chunks.length === 0) {
          recordingChunksRef.current = []
          recordingDurationRef.current = 0
          setRecordingDuration(0)
          clearVoiceRecorder()
          return
        }

        const blob = new Blob(chunks, {
          type: recorder.mimeType || mimeType || 'audio/webm',
        })

        const attachment: Attachment = {
          id: generateId(),
          type: 'audio',
          url: URL.createObjectURL(blob),
          name: `Voice message ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.webm`,
          size: blob.size,
          mimeType: recorder.mimeType || mimeType || 'audio/webm',
          duration: durationSeconds,
        }

        appendOutgoingMessage({
          content: '',
          type: 'voice',
          attachments: [attachment],
          replyTo: replyTo?.id,
        })

        setReplyTo(null)
        recordingChunksRef.current = []
        recordingDurationRef.current = 0
        setRecordingDuration(0)
        clearVoiceRecorder()
      }

      recorder.start(200)
      recordingTimerRef.current = setInterval(() => {
        recordingDurationRef.current += 1
        setRecordingDuration(recordingDurationRef.current)

        if (recordingDurationRef.current >= MAX_VOICE_RECORDING_SECONDS) {
          stopVoiceRecording(true)
        }
      }, 1000)
    } catch {
      setRecorderError('Microphone access was blocked. Allow microphone permission to send voice notes.')
      clearVoiceRecorder()
      setIsRecordingVoice(false)
    }
  }, [
    activeChatId,
    appendOutgoingMessage,
    clearVoiceRecorder,
    messageText,
    pendingAttachments.length,
    replyTo?.id,
    stopVoiceRecording,
  ])

  // ---- Send message ----
  const sendMessage = useCallback(() => {
    if (!activeChatId) return
    const trimmedText = messageText.trim()
    const hasAttachments = pendingAttachments.length > 0
    if (!trimmedText && !hasAttachments) return

    const primaryAttachment = pendingAttachments[0]
    const messageType: Message['type'] = hasAttachments && primaryAttachment
      ? resolveMessageTypeFromAttachment(primaryAttachment.type)
      : 'text'

    appendOutgoingMessage({
      content: trimmedText || `Attachment ${pendingAttachments.length}`,
      type: messageType,
      attachments: pendingAttachments,
      replyTo: replyTo?.id,
    })

    setMessageText('')
    setPendingAttachments([])
    setReplyTo(null)
    setShowComposerEmojiPicker(false)
  }, [activeChatId, appendOutgoingMessage, messageText, pendingAttachments, replyTo?.id])

  const insertComposerEmoji = useCallback((emoji: string) => {
    setMessageText((prev) => `${prev}${emoji}`)
    setShowComposerEmojiPicker(false)
  }, [])

  const cancelVoiceRecording = useCallback(() => {
    stopVoiceRecording(false)
    recordingChunksRef.current = []
    recordingDurationRef.current = 0
    setRecordingDuration(0)
    setRecorderError(null)
  }, [stopVoiceRecording])

  const handleVoiceRecorderButton = useCallback(() => {
    if (isRecordingVoice) {
      stopVoiceRecording(true)
      return
    }

    void startVoiceRecording()
  }, [isRecordingVoice, startVoiceRecording, stopVoiceRecording])

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current?.state === 'recording') {
        recordingShouldSendRef.current = false
        mediaRecorderRef.current.stop()
      }
      clearVoiceRecorder()
    }
  }, [clearVoiceRecorder])

  const openFilePicker = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const onAttachFiles = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    const nextAttachments: Attachment[] = Array.from(files).map((file) => ({
      id: generateId(),
      type: resolveAttachmentType(file),
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
      mimeType: file.type || 'application/octet-stream',
    }))

    setPendingAttachments((prev) => [...prev, ...nextAttachments].slice(0, 8))
    event.target.value = ''
  }, [])

  const removePendingAttachment = useCallback((attachmentId: string) => {
    setPendingAttachments((prev) => prev.filter((attachment) => attachment.id !== attachmentId))
  }, [])

  // ---- Reaction toggle ----
  const toggleReaction = useCallback((messageId: string, emoji: string) => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id !== messageId) return m
        const existing = m.reactions.find((r) => r.emoji === emoji)
        if (existing) {
          if (existing.userIds.includes(CURRENT_USER_ID)) {
            // Remove
            if (existing.userIds.length === 1) {
              return { ...m, reactions: m.reactions.filter((r) => r.emoji !== emoji) }
            }
            return {
              ...m,
              reactions: m.reactions.map((r) =>
                r.emoji === emoji
                  ? { ...r, userIds: r.userIds.filter((u) => u !== CURRENT_USER_ID) }
                  : r,
              ),
            }
          } else {
            // Add
            return {
              ...m,
              reactions: m.reactions.map((r) =>
                r.emoji === emoji ? { ...r, userIds: [...r.userIds, CURRENT_USER_ID] } : r,
              ),
            }
          }
        } else {
          return {
            ...m,
            reactions: [...m.reactions, { emoji, userIds: [CURRENT_USER_ID] }],
          }
        }
      }),
    )
  }, [])

  // ---- Open chat ----
  const openChat = useCallback(
    (chatId: string) => {
      if (isRecordingVoice) {
        cancelVoiceRecording()
      }
      setActiveChatId(chatId)
      setMobileView('chat')
      setShowInfoPanel(false)
      setShowComposerEmojiPicker(false)
      setPreviewAttachment(null)
      // Clear unread
      setChats((prev) =>
        prev.map((c) => (c.id === chatId ? { ...c, unreadCount: 0 } : c)),
      )
    },
    [cancelVoiceRecording, isRecordingVoice],
  )

  const openContextAt = useCallback((msg: Message, rawX: number, rawY: number) => {
    const menuWidth = 220
    const menuHeight = 240
    const maxX = window.innerWidth - menuWidth - 12
    const maxY = window.innerHeight - menuHeight - 12
    const x = Math.max(12, Math.min(rawX, maxX))
    const y = Math.max(12, Math.min(rawY, maxY))
    setContextMessage(msg)
    setContextPos({ x, y })
  }, [])

  const openMessageActions = useCallback((msg: Message, rect: DOMRect) => {
    const x = rect.left + rect.width / 2 - 90
    const y = rect.bottom + 8
    openContextAt(msg, x, y)
  }, [openContextAt])

  // ---- Context menu actions ----
  const handleContextMenu = useCallback((e: React.MouseEvent, msg: Message) => {
    e.preventDefault()
    openContextAt(msg, e.clientX, e.clientY)
  }, [openContextAt])

  const handleContextAction = useCallback(
    (action: string) => {
      if (!contextMessage) return
      switch (action) {
        case 'reply':
          setReplyTo(contextMessage)
          break
        case 'forward':
          setForwardMessage(contextMessage)
          break
        case 'copy':
          navigator.clipboard?.writeText(contextMessage.content)
          break
        case 'pin':
          // Mock pin action
          break
        case 'delete':
          setMessages((prev) => prev.filter((m) => m.id !== contextMessage.id))
          break
      }
      setContextMessage(null)
    },
    [contextMessage],
  )

  const forwardToChat = useCallback((targetChatId: string) => {
    if (!forwardMessage) return

    const forwardedMessage: Message = {
      ...forwardMessage,
      id: generateId(),
      chatId: targetChatId,
      senderId: CURRENT_USER_ID,
      status: 'sent',
      replyTo: undefined,
      reactions: [],
      mentions: [],
      attachments: forwardMessage.attachments.map((attachment) => ({
        ...attachment,
        id: generateId(),
      })),
      content: forwardMessage.content
        ? `Forwarded: ${forwardMessage.content}`
        : 'Forwarded message',
      createdAt: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, forwardedMessage])
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === targetChatId
          ? { ...chat, lastMessage: forwardedMessage, updatedAt: forwardedMessage.createdAt }
          : chat,
      ),
    )

    if (activeChatId === targetChatId) {
      scrollToBottom()
    } else {
      openChat(targetChatId)
    }

    setForwardMessage(null)
  }, [forwardMessage, activeChatId, openChat, scrollToBottom])

  // ---- Back to list (mobile) ----
  const goBack = useCallback(() => {
    if (isRecordingVoice) {
      cancelVoiceRecording()
    }
    setMobileView('list')
    setActiveChatId(null)
    setShowInfoPanel(false)
    setShowComposerEmojiPicker(false)
    setPreviewAttachment(null)
  }, [cancelVoiceRecording, isRecordingVoice])

  // ---- Keyboard send ----
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (isRecordingVoice) return
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        sendMessage()
      }
    },
    [isRecordingVoice, sendMessage],
  )

  // ---- Helper: check if a message was created during this session ----
  const isSessionMessage = useCallback(
    (msgId: string) => {
      // A message is "new" if it was sent during this session OR is not in the initial snapshot
      return newMessageIds.has(msgId)
    },
    [newMessageIds],
  )

  // ---- Render ----
  return (
    <TooltipProvider delayDuration={300}>
      <div className="relative z-10 flex h-[calc(100vh-3rem)] md:h-screen md:max-h-screen w-full overflow-hidden">
        {/* ==========================================
            LEFT PANEL: Chat List
            ========================================== */}
        <div
          className={cn(
            'w-full md:w-[320px] lg:w-[340px] md:min-w-[300px] h-full flex flex-col border-r border-border/50 glass-subtle',
            mobileView !== 'list' ? 'hidden md:flex' : 'flex',
          )}
        >
          <div className="animated-gold-border sticky top-0 z-20 shrink-0 rounded-b-[1.35rem] border-b border-honey/20 bg-[linear-gradient(180deg,rgba(10,9,8,0.86),rgba(18,15,11,0.72))] backdrop-blur-3xl shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
            {/* Header */}
            <div className="px-4 pt-4 pb-2 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gradient-honey">Messages</h2>
              <div className="flex items-center gap-1">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-xl border border-honey/35 bg-black/45 text-honey hover:bg-honey hover:text-[#2B1A00] transition-all"
                    >
                      <Menu className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-44 border-honey/25 bg-[rgba(12,10,9,0.94)] text-[#F6E3B2] backdrop-blur-2xl"
                  >
                    <DropdownMenuItem>New Chat</DropdownMenuItem>
                    <DropdownMenuItem>Archived Chats</DropdownMenuItem>
                    <DropdownMenuItem>Saved Messages</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Message Settings</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-xl border border-honey/35 bg-black/45 text-honey hover:bg-honey hover:text-[#2B1A00] transition-all"
                    >
                      <Users className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>New Group</TooltipContent>
                </Tooltip>
              </div>
            </div>

            {/* Search */}
            <div className="px-3 pb-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-honey/75" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search conversations..."
                  className="pl-9 h-10 text-sm rounded-2xl border border-honey/25 bg-black/45 text-[#F6E3B2] placeholder:text-[#9C8A63] focus-visible:ring-1 focus-visible:ring-honey/40 focus-visible:border-honey/45"
                />
              </div>
            </div>

            {/* Filter tabs */}
            <FilterTabs active={filter} onChange={setFilter} />
          </div>

          {/* Chat list */}
          <ScrollArea className="flex-1 px-2 pt-1">
            <div className="space-y-0.5 pb-4">
              {filteredChats.map((chat) => (
                <ChatListItem
                  key={chat.id}
                  chat={chat}
                  isActive={chat.id === activeChatId}
                  onClick={() => openChat(chat.id)}
                  typingNames={typingUsers[chat.id] ?? []}
                />
              ))}
              {filteredChats.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                  <MessageCircle className="w-8 h-8 mb-2 opacity-40" />
                  <p className="text-xs">No conversations found</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* ==========================================
            MIDDLE PANEL: Chat Window
            ========================================== */}
        <div
          className={cn(
            'flex-1 h-full flex flex-col bg-[rgba(26,22,18,0.42)] backdrop-blur-sm',
            mobileView !== 'chat' ? 'hidden md:flex' : 'flex',
          )}
        >
          {activeChat ? (
            <>
              {/* Chat Header */}
              <div className="animated-gold-border flex items-center gap-3 px-3 py-2.5 shrink-0 rounded-b-[1.15rem] border-b border-[rgba(255,184,0,0.26)] bg-[linear-gradient(180deg,rgba(18,14,10,0.86),rgba(30,22,16,0.76))] backdrop-blur-[30px] shadow-[0_10px_24px_rgba(0,0,0,0.48)]">
                {/* Back button (mobile) */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 md:hidden shrink-0"
                  onClick={goBack}
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>

                {/* Avatar */}
                <Avatar className="w-9 h-9 border border-border/50 cursor-pointer" onClick={() => { setShowMobileInfo(true); setShowInfoPanel(true) }}>
                  <AvatarImage src={getChatAvatarUrl(activeChat)} alt={getChatDisplayName(activeChat)} />
                  <AvatarFallback className="bg-honey/20 text-honey text-xs font-bold">
                    {getChatInitials(activeChat)}
                  </AvatarFallback>
                </Avatar>

                {/* Name & Status */}
                <div className="flex-1 min-w-0 cursor-pointer" onClick={() => { setShowMobileInfo(true); setShowInfoPanel(true) }}>
                  <div className="flex items-center gap-1">
                    <h3 className="text-sm font-semibold truncate text-[#F6E3B2]">{getChatDisplayName(activeChat)}</h3>
                    {getOtherUser(activeChat)?.isVerified && (
                      <ShieldCheck className="w-3.5 h-3.5 text-honey shrink-0" />
                    )}
                  </div>
                  <AnimatePresence mode="wait">
                    {(typingUsers[activeChat.id]?.length ?? 0) > 0 ? (
                      <TypingBar key="typing" names={typingUsers[activeChat.id]} />
                    ) : (
                      <motion.p
                        key="status"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={cn(
                          'text-[11px]',
                          isOnline(activeChat) ? 'text-green-400' : 'text-[#CDB88A]',
                        )}
                      >
                        {getOnlineStatusText(activeChat)}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-0.5">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-honey">
                        <Phone className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Voice Call</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-honey">
                        <Video className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Video Call</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-honey"
                        onClick={() => { setShowInfoPanel(!showInfoPanel); setShowMobileInfo(true) }}
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>More</TooltipContent>
                  </Tooltip>
                </div>
              </div>

              {/* Messages Area */}
              <div
                ref={scrollAreaRef}
                className="flex-1 overflow-y-auto relative"
              >
                <div className="py-4 space-y-1 min-h-full">
                  {chatMessages.map((msg, index) => {
                    const isOwn = msg.senderId === CURRENT_USER_ID
                    const replyingTo = msg.replyTo
                      ? messages.find((m) => m.id === msg.replyTo)
                      : undefined
                    const isNew = isSessionMessage(msg.id)

                    return (
                      <React.Fragment key={msg.id}>
                        {/* Date separator */}
                        {needsDateSeparator(chatMessages, index) && (
                          <div className="flex items-center justify-center py-3">
                            <span className="px-3 py-1 rounded-full glass-card text-[10px] text-muted-foreground font-medium">
                              {formatDateSeparator(msg.createdAt)}
                            </span>
                          </div>
                        )}
                        {/* Message */}
                        <MessageBubble
                          message={msg}
                          isOwn={isOwn}
                          isNew={isNew}
                          onReply={setReplyTo}
                          onReaction={toggleReaction}
                          onContextMenu={handleContextMenu}
                          onOpenActions={openMessageActions}
                          onPreviewAttachment={setPreviewAttachment}
                          replyingTo={replyingTo}
                        />
                      </React.Fragment>
                    )
                  })}
                  {chatMessages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                      <MessageCircle className="w-10 h-10 mb-3 opacity-30" />
                      <p className="text-sm font-medium">No messages yet</p>
                      <p className="text-xs mt-1">Start a conversation!</p>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Scroll to bottom button */}
                <AnimatePresence>
                  {showScrollBtn && <ScrollToBottomBtn onClick={scrollToBottom} />}
                </AnimatePresence>
              </div>

              {/* Typing indicator in composer area */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-4 py-1 text-[10px] text-muted-foreground flex items-center gap-1.5"
                  >
                    <TypingDots />
                    <span>You are typing...</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Reply Preview Bar */}
              <AnimatePresence>
                {replyTo && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-3 py-2 glass-card border-l-2 border-honey mx-3 mb-1 rounded-lg flex items-center gap-2"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-semibold text-honey">
                        {replyTo.senderId === CURRENT_USER_ID
                          ? 'You'
                          : mockUsers.find((u) => u.id === replyTo.senderId)?.displayName ?? 'Unknown'}
                      </p>
                      <p className="text-[11px] text-muted-foreground truncate">
                        {truncateText(getMessagePreviewText(replyTo), 50)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 shrink-0"
                      onClick={() => setReplyTo(null)}
                    >
                      <X className="w-3 h-3 text-muted-foreground" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Message Composer */}
              <div className="animated-gold-border px-3 py-2 shrink-0 rounded-t-[1.15rem] border-t border-[rgba(255,184,0,0.26)] bg-[linear-gradient(0deg,rgba(18,14,10,0.88),rgba(30,22,16,0.78))] backdrop-blur-[30px] shadow-[0_-10px_24px_rgba(0,0,0,0.5)]">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={onAttachFiles}
                  className="hidden"
                />

                <AnimatePresence>
                  {pendingAttachments.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="mb-2 flex flex-wrap gap-1.5"
                    >
                      {pendingAttachments.map((attachment) => (
                        <motion.div
                          key={attachment.id}
                          layout
                          className="group flex items-center gap-1.5 rounded-xl border border-border/60 bg-background/65 px-2 py-1"
                        >
                          <span className="text-[9px] font-semibold text-honey">
                            {attachment.type === 'image' && 'IMG'}
                            {attachment.type === 'video' && 'VID'}
                            {attachment.type === 'audio' && 'AUD'}
                            {attachment.type === 'file' && 'DOC'}
                          </span>
                          <span className="max-w-[120px] truncate text-[10px] text-foreground">
                            {attachment.name}
                          </span>
                          <span className="text-[10px] text-muted-foreground">
                            {formatFileSize(attachment.size)}
                          </span>
                          <button
                            onClick={() => removePendingAttachment(attachment.id)}
                            className="w-4 h-4 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {recorderError && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      className="mb-2 rounded-2xl border border-amber-500/20 bg-amber-500/8 px-3 py-2 text-[11px] text-amber-200/90"
                    >
                      {recorderError}
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {isRecordingVoice && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="mb-2 flex items-center gap-3 rounded-[22px] border border-honey/20 bg-black/35 px-3 py-2 backdrop-blur-xl"
                    >
                      <button
                        type="button"
                        onClick={cancelVoiceRecording}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-red-400/20 bg-red-500/10 text-red-300 transition-colors hover:bg-red-500/18"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                      <div className="flex min-w-0 flex-1 items-center gap-3">
                        <span className="flex h-2.5 w-2.5 shrink-0 rounded-full bg-red-400 shadow-[0_0_14px_rgba(248,113,113,0.8)] animate-pulse" />
                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f7c464]">
                            Recording voice note
                          </p>
                          <div className="mt-1 flex items-center gap-[3px]">
                            {Array.from({ length: 20 }).map((_, index) => (
                              <motion.span
                                key={`rec-wave-${index}`}
                                className="h-2 w-[3px] rounded-full bg-honey/75"
                                animate={{ height: ['8px', `${12 + (index % 5) * 4}px`, '8px'] }}
                                transition={{
                                  duration: 0.9,
                                  repeat: Infinity,
                                  delay: index * 0.04,
                                  ease: 'easeInOut',
                                }}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm font-semibold tabular-nums text-[#F6E3B2]">
                          {formatDurationLabel(recordingDuration)}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={handleVoiceRecorderButton}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-honey text-[#2B1A00] shadow-honey transition-transform hover:scale-[1.03]"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-end gap-2">
                  {/* Emoji button */}
                  <div className="relative shrink-0">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setShowComposerEmojiPicker((prev) => !prev)}
                          className="h-9 w-9 shrink-0 rounded-full text-muted-foreground hover:text-honey"
                        >
                          <Smile className="w-5 h-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Emoji</TooltipContent>
                    </Tooltip>

                    <AnimatePresence>
                      {showComposerEmojiPicker && (
                        <EmojiPicker
                          mode="composer"
                          onPick={insertComposerEmoji}
                          onClose={() => setShowComposerEmojiPicker(false)}
                        />
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Text input */}
                  <div className="flex-1 relative">
                    <textarea
                      value={messageText}
                      onChange={(e) => handleTextChange(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type a message..."
                      rows={1}
                      disabled={isRecordingVoice}
                      className="w-full resize-none rounded-2xl border border-honey/20 bg-black/35 text-sm px-4 py-2.5 text-[#F6E3B2] placeholder:text-[#A9966C] focus:outline-none focus:ring-1 focus:ring-honey/30 max-h-32 overflow-y-auto"
                      style={{ minHeight: '40px' }}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement
                        target.style.height = 'auto'
                        target.style.height = Math.min(target.scrollHeight, 128) + 'px'
                      }}
                    />
                  </div>

                  {/* Attach button */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={openFilePicker}
                        disabled={isRecordingVoice}
                        className="h-9 w-9 shrink-0 text-muted-foreground hover:text-honey rounded-full"
                      >
                        <Paperclip className="w-5 h-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Attach</TooltipContent>
                  </Tooltip>

                  {/* Send / Mic button */}
                  {messageText.trim() || pendingAttachments.length > 0 ? (
                    <motion.div {...buttonHover}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                              onClick={sendMessage}
                              size="icon"
                              className="h-9 w-9 shrink-0 rounded-full bg-honey hover:bg-honey-dark text-[#2B1A00] shadow-honey"
                            >
                              <Send className="w-4 h-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Send</TooltipContent>
                      </Tooltip>
                    </motion.div>
                  ) : (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={handleVoiceRecorderButton}
                          className={cn(
                            'h-9 w-9 shrink-0 rounded-full text-muted-foreground hover:text-honey',
                            isRecordingVoice && 'bg-honey text-[#2B1A00] hover:text-[#2B1A00]',
                          )}
                        >
                          {isRecordingVoice ? <Square className="w-4 h-4" /> : <Mic className="w-5 h-5" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>{isRecordingVoice ? 'Send voice message' : 'Voice Message'}</TooltipContent>
                    </Tooltip>
                  )}
                </div>
              </div>
            </>
          ) : (
            /* Empty state */
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-16 h-16 rounded-full bg-honey/10 flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-honey/50" />
                </div>
                <h3 className="text-sm font-medium text-foreground">Select a conversation</h3>
                <p className="text-xs text-center max-w-[200px]">
                  Choose from your existing conversations or start a new one
                </p>
              </motion.div>
            </div>
          )}
        </div>

        {/* ==========================================
            RIGHT PANEL: Info (Desktop)
            ========================================== */}
        <div
          className={cn(
            'w-[300px] lg:w-[320px] h-full border-l border-border/50 glass-subtle shrink-0 overflow-hidden',
            !showInfoPanel ? 'hidden md:flex' : 'hidden',
          )}
        >
          {activeChat ? (
            <InfoPanelContent
              chat={activeChat}
              chats={chats}
              setChats={setChats}
              onClose={() => setShowInfoPanel(false)}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Clock className="w-6 h-6 opacity-30" />
                <p className="text-xs">Select a chat to view info</p>
              </div>
            </div>
          )}
        </div>

        {/* ==========================================
            Media Preview
            ========================================== */}
        <AnimatePresence>
          {previewAttachment && (
            <MediaLightbox
              attachment={previewAttachment}
              onClose={() => setPreviewAttachment(null)}
            />
          )}
        </AnimatePresence>

        {/* ==========================================
            Mobile Info Sheet
            ========================================== */}
        {activeChat && (
          <Sheet open={showMobileInfo} onOpenChange={setShowMobileInfo}>
            <SheetContent side="right" className="w-[300px] p-0 glass-premium">
              <InfoPanelContent
                chat={activeChat}
                chats={chats}
                setChats={setChats}
                onClose={() => setShowMobileInfo(false)}
              />
            </SheetContent>
          </Sheet>
        )}

        {/* ==========================================
            Forward Message Sheet
            ========================================== */}
        <Sheet
          open={Boolean(forwardMessage)}
          onOpenChange={(open) => {
            if (!open) setForwardMessage(null)
          }}
        >
          <SheetContent side="right" className="w-full sm:w-[360px] p-0 glass-premium">
            <SheetHeader className="p-4 border-b border-border/50">
              <SheetTitle className="text-gradient-honey">Forward Message</SheetTitle>
            </SheetHeader>
            <div className="px-4 py-3 border-b border-border/40">
              <p className="text-[11px] text-muted-foreground">
                Select chat to forward this message
              </p>
              <p className="text-xs text-foreground/80 mt-1 break-words">
                {forwardMessage ? getMessagePreviewText(forwardMessage) : 'Media message'}
              </p>
            </div>
            <ScrollArea className="h-[calc(100vh-160px)]">
              <div className="p-2 space-y-1">
                {chats
                  .filter((chat) => chat.id !== forwardMessage?.chatId)
                  .map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => forwardToChat(chat.id)}
                      className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-honey/10 transition-colors text-left"
                    >
                      <Avatar className="w-10 h-10 border border-border/50">
                        <AvatarImage src={getChatAvatarUrl(chat)} alt={getChatDisplayName(chat)} />
                        <AvatarFallback className="bg-honey/20 text-honey text-xs font-bold">
                          {getChatInitials(chat)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{getChatDisplayName(chat)}</p>
                        <p className="text-[11px] text-muted-foreground truncate">
                          {chat.type === 'private' ? 'Private chat' : chat.type === 'group' ? 'Group' : 'Channel'}
                        </p>
                      </div>
                    </button>
                  ))}
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>

        {/* ==========================================
            Context Menu (Message Actions)
            ========================================== */}
        <AnimatePresence>
          {contextMessage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50"
              onClick={() => setContextMessage(null)}
            >
              <div
                className="fixed z-50"
                style={{ left: contextPos.x, top: contextPos.y }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="glass-premium rounded-xl shadow-lg p-1.5 min-w-[220px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-1 p-1 pb-2 border-b border-border/40 mb-1">
                    {QUICK_EMOJIS.slice(0, 8).map((emoji) => (
                      <motion.button
                        key={`ctx-${emoji}`}
                        {...buttonHover}
                        onClick={() => {
                          if (!contextMessage) return
                          toggleReaction(contextMessage.id, emoji)
                          setContextMessage(null)
                        }}
                        className="h-7 w-7 rounded-full glass-card text-[13px] flex items-center justify-center"
                      >
                        {emoji}
                      </motion.button>
                    ))}
                  </div>
                  {[
                    { action: 'reply', icon: <Reply className="w-4 h-4" />, label: 'Reply' },
                    { action: 'forward', icon: <Forward className="w-4 h-4" />, label: 'Forward' },
                    { action: 'copy', icon: <Copy className="w-4 h-4" />, label: 'Copy' },
                    { action: 'pin', icon: <Pin className="w-4 h-4" />, label: 'Pin' },
                    { action: 'delete', icon: <Trash2 className="w-4 h-4 text-destructive" />, label: 'Delete', destructive: true },
                  ].map((item) => (
                    <button
                      key={item.action}
                      onClick={() => handleContextAction(item.action)}
                      className={cn(
                        'w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-colors',
                        item.destructive
                          ? 'text-destructive hover:bg-destructive/10'
                          : 'text-foreground hover:bg-accent/30',
                      )}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </TooltipProvider>
  )
}
