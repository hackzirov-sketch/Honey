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
} from 'lucide-react'
import { mockChats, mockMessages, mockUsers } from '@/lib/mock-data'
import { cn, generateAvatar, formatTime, getInitials, generateId, truncateText } from '@/lib/utils'
import type { Chat, Message, MessageReaction } from '@/types'
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

// ============================================
// Constants
// ============================================
const CURRENT_USER_ID = 'u1'
const STORAGE_KEY_CHATS = 'honey_chats'
const STORAGE_KEY_MESSAGES = 'honey_messages'
const MAX_CACHED_MESSAGES = 10
const QUICK_EMOJIS = ['👍', '❤️', '🔥', '😂', '😍', '😮', '🎉', '💯']
const TYPING_TIMEOUT = 3000
const SIMULATED_TYPING_INTERVAL = 8000

type FilterTab = 'all' | 'private' | 'groups' | 'channels' | 'unread'
type MobileView = 'list' | 'chat' | 'info'

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
// Message Reactions Component
// ============================================
function MessageReactions({
  reactions,
  onToggle,
}: {
  reactions: MessageReaction[]
  onToggle: (emoji: string) => void
}) {
  if (reactions.length === 0) return null
  return (
    <div className="flex flex-wrap gap-1 mt-1">
      {reactions.map((r) => (
        <motion.button
          key={r.emoji}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation()
            onToggle(r.emoji)
          }}
          className={cn(
            'inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs transition-colors',
            r.userIds.includes(CURRENT_USER_ID)
              ? 'bg-honey/20 border border-honey/30 text-honey'
              : 'glass-card text-muted-foreground hover:text-foreground',
          )}
        >
          <span>{r.emoji}</span>
          <span className="text-[10px]">{r.userIds.length}</span>
        </motion.button>
      ))}
    </div>
  )
}

// ============================================
// Quick Emoji Picker
// ============================================
function EmojiPicker({ onPick, onClose }: { onPick: (emoji: string) => void; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 5 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 5 }}
      className="absolute bottom-full right-0 mb-2 p-2 rounded-xl glass-premium shadow-lg z-50"
    >
      <div className="flex flex-wrap gap-1">
        {QUICK_EMOJIS.map((emoji) => (
          <motion.button
            key={emoji}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onPick(emoji)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-accent/50 transition-colors text-base"
          >
            {emoji}
          </motion.button>
        ))}
      </div>
      <button
        onClick={onClose}
        className="absolute -top-1 -right-1 w-4 h-4 bg-muted rounded-full flex items-center justify-center"
      >
        <X className="w-2.5 h-2.5 text-muted-foreground" />
      </button>
    </motion.div>
  )
}

// ============================================
// Status Checks for Message
// ============================================
function MessageStatus({ status }: { status: Message['status'] }) {
  if (status === 'sent') return <Check className="w-3.5 h-3.5 text-muted-foreground" />
  if (status === 'delivered') return <CheckCheck className="w-3.5 h-3.5 text-muted-foreground" />
  if (status === 'read') return <CheckCheck className="w-3.5 h-3.5 text-honey" />
  if (status === 'failed') return <X className="w-3.5 h-3.5 text-destructive" />
  return null
}

// ============================================
// Message Bubble Component
// ============================================
function MessageBubble({
  message,
  isOwn,
  onReply,
  onReaction,
  onContextMenu,
  replyingTo,
}: {
  message: Message
  isOwn: boolean
  onReply: (msg: Message) => void
  onReaction: (msgId: string, emoji: string) => void
  onContextMenu: (e: React.MouseEvent, msg: Message) => void
  replyingTo?: Message
}) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const sender = mockUsers.find((u) => u.id === message.senderId)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={cn('flex w-full px-3', isOwn ? 'justify-end' : 'justify-start')}
    >
      <div className={cn('flex flex-col max-w-[85%] md:max-w-[70%]', isOwn ? 'items-end' : 'items-start')}>
        {/* Sender name for groups */}
        {!isOwn && (
          <span className="text-[10px] text-muted-foreground mb-0.5 ml-2 font-medium">
            {sender?.displayName ?? 'Unknown'}
          </span>
        )}
        <div
          onContextMenu={(e) => onContextMenu(e, message)}
          className={cn(
            'relative group rounded-2xl px-3 py-2 transition-colors',
            isOwn
              ? 'bg-honey/90 text-background rounded-br-md'
              : 'glass-card text-foreground rounded-bl-md',
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
                <p className="text-xs opacity-60 truncate">{truncateText(replyingTo.content, 40)}</p>
              </div>
            </div>
          )}

          {/* Message text */}
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.content}</p>

          {/* Time and status */}
          <div className={cn('flex items-center gap-1 mt-0.5', isOwn ? 'justify-end' : 'justify-end')}>
            {message.editedAt && (
              <span className="text-[9px] opacity-50">edited</span>
            )}
            <span className={cn('text-[10px] opacity-50', isOwn && 'text-background/70')}>
              {formatTime(message.createdAt)}
            </span>
            {isOwn && <MessageStatus status={message.status} />}
          </div>

          {/* Reactions */}
          <MessageReactions
            reactions={message.reactions}
            onToggle={(emoji) => onReaction(message.id, emoji)}
          />

          {/* Hover actions */}
          <div className="absolute -top-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-0.5">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowEmojiPicker(!showEmojiPicker)
                    }}
                    className={cn(
                      'w-6 h-6 rounded-full glass-premium flex items-center justify-center shadow-md',
                      isOwn ? '-left-8' : '-right-8',
                    )}
                  >
                    <Smile className="w-3 h-3 text-muted-foreground" />
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent>React</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Emoji Picker */}
          <AnimatePresence>
            {showEmojiPicker && (
              <EmojiPicker
                onPick={(emoji) => {
                  onReaction(message.id, emoji)
                  setShowEmojiPicker(false)
                }}
                onClose={() => setShowEmojiPicker(false)}
              />
            )}
          </AnimatePresence>
        </div>
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
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="w-8 h-8 rounded-full glass-premium shadow-lg flex items-center justify-center"
      >
        <ChevronDown className="w-4 h-4 text-honey" />
      </motion.button>
    </motion.div>
  )
}

// ============================================
// Chat List Item Component
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
        'w-full flex items-center gap-3 p-2.5 rounded-xl transition-all text-left',
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
            <span className="text-sm font-semibold truncate">{displayName}</span>
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
              <span className="text-xs text-muted-foreground truncate">
                {lastMsg
                  ? (lastMsg.senderId === CURRENT_USER_ID ? 'You: ' : '') + truncateText(lastMsg.content, 35)
                  : 'No messages yet'}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {chat.isMuted && (
              <BellOff className="w-3 h-3 text-muted-foreground/50" />
            )}
            {chat.unreadCount > 0 && (
              <span className="min-w-[18px] h-[18px] px-1 bg-honey rounded-full flex items-center justify-center text-[10px] font-bold text-background">
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
    <div className="flex items-center gap-1 px-2 pb-2 overflow-x-auto no-scrollbar-x">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-all shrink-0',
            active === tab.id
              ? 'bg-honey text-background shadow-honey'
              : 'text-muted-foreground hover:text-foreground hover:bg-accent/30',
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
  const [replyTo, setReplyTo] = useState<Message | null>(null)
  const [mobileView, setMobileView] = useState<MobileView>('list')
  const [showInfoPanel, setShowInfoPanel] = useState(false)
  const [showMobileInfo, setShowMobileInfo] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [typingUsers, setTypingUsers] = useState<Record<string, string[]>>({})
  const [showScrollBtn, setShowScrollBtn] = useState(false)
  const [contextMessage, setContextMessage] = useState<Message | null>(null)
  const [contextPos, setContextPos] = useState({ x: 0, y: 0 })

  // ---- Refs ----
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const simulatedTypingRef = useRef<ReturnType<typeof setInterval> | null>(null)

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

  // ---- Send message ----
  const sendMessage = useCallback(() => {
    if (!messageText.trim() || !activeChatId) return
    const newMsg: Message = {
      id: generateId(),
      chatId: activeChatId,
      senderId: CURRENT_USER_ID,
      content: messageText.trim(),
      type: 'text',
      status: 'sent',
      replyTo: replyTo?.id,
      reactions: [],
      attachments: [],
      mentions: [],
      createdAt: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, newMsg])
    setChats((prev) =>
      prev.map((c) =>
        c.id === activeChatId
          ? { ...c, lastMessage: newMsg, updatedAt: newMsg.createdAt, unreadCount: 0 }
          : c,
      ),
    )
    setMessageText('')
    setReplyTo(null)

    // Simulate "delivered" then "read" after a delay
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
  }, [messageText, activeChatId, replyTo, scrollToBottom])

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
      setActiveChatId(chatId)
      setMobileView('chat')
      setShowInfoPanel(false)
      // Clear unread
      setChats((prev) =>
        prev.map((c) => (c.id === chatId ? { ...c, unreadCount: 0 } : c)),
      )
    },
    [],
  )

  // ---- Context menu actions ----
  const handleContextMenu = useCallback((e: React.MouseEvent, msg: Message) => {
    e.preventDefault()
    setContextMessage(msg)
    setContextPos({ x: e.clientX, y: e.clientY })
  }, [])

  const handleContextAction = useCallback(
    (action: string) => {
      if (!contextMessage) return
      switch (action) {
        case 'reply':
          setReplyTo(contextMessage)
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

  // ---- Back to list (mobile) ----
  const goBack = useCallback(() => {
    setMobileView('list')
    setActiveChatId(null)
    setShowInfoPanel(false)
  }, [])

  // ---- Keyboard send ----
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        sendMessage()
      }
    },
    [sendMessage],
  )

  // ---- Render ----
  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex h-[calc(100vh-3rem)] md:h-screen md:max-h-screen overflow-hidden -m-4 md:-m-6 w-[calc(100%+2rem)] md:w-[calc(100%+3rem)]">
        {/* ==========================================
            LEFT PANEL: Chat List
            ========================================== */}
        <div
          className={cn(
            'w-full md:w-[320px] lg:w-[340px] md:min-w-[300px] h-full flex flex-col border-r border-border/50 glass-subtle',
            mobileView !== 'list' ? 'hidden md:flex' : 'flex',
          )}
        >
          {/* Header */}
          <div className="px-4 pt-4 pb-2 flex items-center justify-between shrink-0">
            <h2 className="text-lg font-bold text-gradient-honey">Messages</h2>
            <div className="flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-honey">
                    <Users className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>New Group</TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Search */}
          <div className="px-3 pb-1 shrink-0">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="pl-8 h-9 text-xs rounded-xl glass-card bg-transparent border-0 focus-visible:ring-1 focus-visible:ring-honey/30"
              />
            </div>
          </div>

          {/* Filter tabs */}
          <FilterTabs active={filter} onChange={setFilter} />

          {/* Chat list */}
          <ScrollArea className="flex-1 px-2">
            <div className="space-y-0.5 pb-4">
              {filteredChats.map((chat, index) => (
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
            'flex-1 h-full flex flex-col bg-background/50',
            mobileView !== 'chat' ? 'hidden md:flex' : 'flex',
          )}
        >
          {activeChat ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center gap-3 px-3 py-2.5 glass-subtle border-b border-border/50 shrink-0">
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
                    <h3 className="text-sm font-semibold truncate">{getChatDisplayName(activeChat)}</h3>
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
                          isOnline(activeChat) ? 'text-green-500' : 'text-muted-foreground',
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
                          onReply={setReplyTo}
                          onReaction={toggleReaction}
                          onContextMenu={handleContextMenu}
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
                        {truncateText(replyTo.content, 50)}
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
              <div className="px-3 py-2 border-t border-border/30 glass-subtle shrink-0">
                <div className="flex items-end gap-2">
                  {/* Emoji button */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0 text-muted-foreground hover:text-honey rounded-full">
                        <Smile className="w-5 h-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Emoji</TooltipContent>
                  </Tooltip>

                  {/* Text input */}
                  <div className="flex-1 relative">
                    <textarea
                      value={messageText}
                      onChange={(e) => handleTextChange(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type a message..."
                      rows={1}
                      className="w-full resize-none rounded-2xl glass-card bg-transparent border-0 text-sm px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-honey/30 max-h-32 overflow-y-auto"
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
                      <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0 text-muted-foreground hover:text-honey rounded-full">
                        <Paperclip className="w-5 h-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Attach</TooltipContent>
                  </Tooltip>

                  {/* Send / Mic button */}
                  {messageText.trim() ? (
                    <motion.div whileTap={{ scale: 0.9 }}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={sendMessage}
                            size="icon"
                            className="h-9 w-9 shrink-0 rounded-full bg-honey hover:bg-honey-dark text-background shadow-honey"
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
                        <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0 text-muted-foreground hover:text-honey rounded-full">
                          <Mic className="w-5 h-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Voice Message</TooltipContent>
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
                  className="glass-premium rounded-xl shadow-lg p-1 min-w-[160px]"
                  onClick={(e) => e.stopPropagation()}
                >
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
