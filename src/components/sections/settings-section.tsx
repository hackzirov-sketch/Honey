'use client'

import { useState, useCallback, useSyncExternalStore } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Shield,
  Bell,
  MessageSquare,
  Palette,
  HardDrive,
  Video,
  Radio,
  Languages,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Monitor,
  Trash2,
  Volume2,
  Moon,
  Sun,
  MonitorDot,
  MessageCircle,
  VolumeX,
  Image as ImageIcon,
  Youtube,
  Instagram,
  FileText,
  ShieldCheck,
  Check,
  type LucideIcon,
} from 'lucide-react'
import { mockUsers } from '@/lib/mock-data'
import { generateAvatar } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Progress } from '@/components/ui/progress'

// ============================================
// Settings Storage Helper
// ============================================
const SETTINGS_KEY = 'honey-settings'

interface HoneySettings {
  msgNotif: boolean
  groupNotif: boolean
  channelNotif: boolean
  callNotif: boolean
  streamNotif: boolean
  mentionNotif: boolean
  dnd: boolean
  twoFA: boolean
  passcode: boolean
  profileVis: string
  onlineStatus: string
  whoMessage: string
  whoGroups: string
  chatTheme: string
  fontSize: string
  msgPreview: boolean
  enterSend: boolean
  autoDownload: boolean
  glassEffect: boolean
  compactMode: boolean
  animLevel: string
  accentColor: string
  noiseSuppress: boolean
  bgBlur: boolean
  joinMuted: boolean
  cameraOffDefault: boolean
  streamQuality: string
  chatModeration: boolean
  youtubeConnected: boolean
  instaConnected: boolean
}

const defaultSettings: HoneySettings = {
  msgNotif: true,
  groupNotif: true,
  channelNotif: true,
  callNotif: true,
  streamNotif: true,
  mentionNotif: true,
  dnd: false,
  twoFA: false,
  passcode: false,
  profileVis: 'public',
  onlineStatus: 'everyone',
  whoMessage: 'everyone',
  whoGroups: 'everyone',
  chatTheme: 'default',
  fontSize: 'medium',
  msgPreview: true,
  enterSend: true,
  autoDownload: true,
  glassEffect: true,
  compactMode: false,
  animLevel: 'normal',
  accentColor: 'honey',
  noiseSuppress: true,
  bgBlur: false,
  joinMuted: false,
  cameraOffDefault: false,
  streamQuality: '1080p',
  chatModeration: true,
  youtubeConnected: false,
  instaConnected: false,
}

function loadSettings(): HoneySettings {
  if (typeof window === 'undefined') return defaultSettings
  try {
    const stored = localStorage.getItem(SETTINGS_KEY)
    if (stored) return { ...defaultSettings, ...JSON.parse(stored) }
  } catch {
    // ignore
  }
  return defaultSettings
}

function saveSettings(s: HoneySettings) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(s))
  } catch {
    // ignore
  }
}

// ============================================
// Reusable Sub-Components (declared outside render)
// ============================================
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-4 mb-1">
      {children}
    </h4>
  )
}

function ToggleRow({
  label,
  value,
  onChange,
}: {
  label: string
  value: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <span className="text-sm">{label}</span>
      <Switch checked={value} onCheckedChange={onChange} />
    </div>
  )
}

function SelectRow({
  label,
  value,
  onValueChange,
  options,
}: {
  label: string
  value: string
  onValueChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <span className="text-sm">{label}</span>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-36 h-8 text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

// ============================================
// Settings Categories
// ============================================
const categories = [
  { id: 'account', label: 'Account', icon: User },
  { id: 'privacy', label: 'Privacy & Security', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'chat', label: 'Chat Settings', icon: MessageSquare },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'storage', label: 'Data & Storage', icon: HardDrive },
  { id: 'meeting', label: 'Meeting Settings', icon: Video },
  { id: 'stream', label: 'Stream Settings', icon: Radio },
  { id: 'language', label: 'Language', icon: Languages },
  { id: 'help', label: 'Help & Support', icon: HelpCircle },
]

// ============================================
// Settings Section Component
// ============================================
export default function SettingsSection({ onBack }: { onBack?: () => void }) {
  const [activeCategory, setActiveCategory] = useState('account')
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [settingsVersion, setSettingsVersion] = useState(0)

  // Load settings from localStorage safely
  const [s, setS] = useState<HoneySettings>(defaultSettings)

  // Load on mount
  useState(() => {
    setS(loadSettings())
  })

  const update = useCallback((key: keyof HoneySettings, value: string | boolean) => {
    setS((prev) => {
      const next = { ...prev, [key]: value }
      saveSettings(next)
      return next
    })
  }, [])

  const settingContent = (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeCategory}
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -12 }}
        transition={{ duration: 0.15 }}
        className="pb-6"
      >
        {/* ACCOUNT */}
        {activeCategory === 'account' && (
          <div className="space-y-1">
            <SectionTitle>Personal Information</SectionTitle>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Display Name</Label>
                <Input defaultValue="Jasur Karimov" className="h-9 text-sm" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Username</Label>
                <Input defaultValue="jasur_karimov" className="h-9 text-sm" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Email</Label>
                <Input defaultValue="jasur@example.com" className="h-9 text-sm" type="email" />
              </div>
            </div>
            <SectionTitle>Security</SectionTitle>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Current Password</Label>
                <Input type="password" placeholder="••••••••" className="h-9 text-sm" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">New Password</Label>
                <Input type="password" placeholder="••••••••" className="h-9 text-sm" />
              </div>
            </div>
            <SectionTitle>Danger Zone</SectionTitle>
            <Button
              variant="ghost"
              className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10 h-9 text-sm"
              onClick={() => setDeleteDialog(true)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </div>
        )}

        {/* PRIVACY & SECURITY */}
        {activeCategory === 'privacy' && (
          <div className="space-y-1">
            <SectionTitle>Authentication</SectionTitle>
            <ToggleRow label="Two-Factor Authentication" value={s.twoFA} onChange={(v) => update('twoFA', v)} />
            <ToggleRow label="App Lock Passcode" value={s.passcode} onChange={(v) => update('passcode', v)} />

            <SectionTitle>Visibility</SectionTitle>
            <SelectRow
              label="Profile Visibility"
              value={s.profileVis}
              onValueChange={(v) => update('profileVis', v)}
              options={[
                { value: 'public', label: 'Public' },
                { value: 'friends', label: 'Friends Only' },
                { value: 'private', label: 'Private' },
              ]}
            />
            <SelectRow
              label="Online Status"
              value={s.onlineStatus}
              onValueChange={(v) => update('onlineStatus', v)}
              options={[
                { value: 'everyone', label: 'Everyone' },
                { value: 'contacts', label: 'Contacts' },
                { value: 'nobody', label: 'Nobody' },
              ]}
            />
            <SelectRow
              label="Who Can Message Me"
              value={s.whoMessage}
              onValueChange={(v) => update('whoMessage', v)}
              options={[
                { value: 'everyone', label: 'Everyone' },
                { value: 'contacts', label: 'Contacts' },
                { value: 'nobody', label: 'Nobody' },
              ]}
            />
            <SelectRow
              label="Who Can Add to Groups"
              value={s.whoGroups}
              onValueChange={(v) => update('whoGroups', v)}
              options={[
                { value: 'everyone', label: 'Everyone' },
                { value: 'contacts', label: 'Contacts' },
                { value: 'nobody', label: 'Nobody' },
              ]}
            />

            <SectionTitle>Blocked Users</SectionTitle>
            <div className="space-y-1">
              {mockUsers.slice(3, 6).map((u) => (
                <div key={u.id} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent/20 transition-colors">
                  <img src={generateAvatar(u.displayName)} alt="" className="w-7 h-7 rounded-full" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{u.displayName}</p>
                    <p className="text-[10px] text-muted-foreground">@{u.username}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="h-7 text-[10px] text-honey hover:text-honey-light">
                    Unblock
                  </Button>
                </div>
              ))}
            </div>

            <SectionTitle>Active Sessions</SectionTitle>
            <div className="space-y-1">
              {[
                { device: 'MacBook Pro', loc: 'Tashkent, UZ', time: 'Active now', icon: Monitor, current: true },
                { device: 'iPhone 15 Pro', loc: 'Tashkent, UZ', time: '2h ago', icon: Smartphone, current: false },
                { device: 'iPad Air', loc: 'Tashkent, UZ', time: '3d ago', icon: Smartphone, current: false },
              ].map((session, i) => {
                const Icon = session.icon
                return (
                  <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent/20 transition-colors">
                    <Icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">{session.device}</p>
                      <p className="text-[10px] text-muted-foreground">{session.loc}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className={`text-[10px] ${session.current ? 'text-emerald-400' : 'text-muted-foreground'}`}>
                        {session.time}
                      </p>
                      {session.current && <span className="text-[9px] text-emerald-400">Current</span>}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* NOTIFICATIONS */}
        {activeCategory === 'notifications' && (
          <div className="space-y-1">
            <SectionTitle>Notification Types</SectionTitle>
            <ToggleRow label="Direct Messages" value={s.msgNotif} onChange={(v) => update('msgNotif', v)} />
            <ToggleRow label="Group Messages" value={s.groupNotif} onChange={(v) => update('groupNotif', v)} />
            <ToggleRow label="Channel Updates" value={s.channelNotif} onChange={(v) => update('channelNotif', v)} />
            <ToggleRow label="Voice & Video Calls" value={s.callNotif} onChange={(v) => update('callNotif', v)} />
            <ToggleRow label="Live Streams" value={s.streamNotif} onChange={(v) => update('streamNotif', v)} />
            <ToggleRow label="Mentions" value={s.mentionNotif} onChange={(v) => update('mentionNotif', v)} />

            <SectionTitle>Quiet Mode</SectionTitle>
            <ToggleRow label="Do Not Disturb" value={s.dnd} onChange={(v) => update('dnd', v)} />
            {s.dnd && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-[10px] text-muted-foreground pl-1 flex items-center gap-1"
              >
                <VolumeX className="w-3 h-3" />
                All notifications are silenced
              </motion.p>
            )}
          </div>
        )}

        {/* CHAT SETTINGS */}
        {activeCategory === 'chat' && (
          <div className="space-y-1">
            <SectionTitle>Chat Appearance</SectionTitle>
            <SelectRow
              label="Chat Theme"
              value={s.chatTheme}
              onValueChange={(v) => update('chatTheme', v)}
              options={[
                { value: 'default', label: 'Default' },
                { value: 'dark', label: 'Dark' },
                { value: 'light', label: 'Light' },
                { value: 'midnight', label: 'Midnight' },
              ]}
            />
            <SelectRow
              label="Font Size"
              value={s.fontSize}
              onValueChange={(v) => update('fontSize', v)}
              options={[
                { value: 'small', label: 'Small' },
                { value: 'medium', label: 'Medium' },
                { value: 'large', label: 'Large' },
              ]}
            />

            <SectionTitle>Behavior</SectionTitle>
            <ToggleRow label="Message Preview" value={s.msgPreview} onChange={(v) => update('msgPreview', v)} />
            <ToggleRow label="Enter to Send" value={s.enterSend} onChange={(v) => update('enterSend', v)} />
            <ToggleRow label="Auto-download Media" value={s.autoDownload} onChange={(v) => update('autoDownload', v)} />

            <SectionTitle>Chat Background</SectionTitle>
            <div className="grid grid-cols-4 gap-2 py-2">
              {[
                { id: 'none', label: 'None', color: 'bg-card' },
                { id: 'gradient1', label: 'Warm', color: 'bg-gradient-to-br from-honey/20 to-amber/10' },
                { id: 'gradient2', label: 'Ocean', color: 'bg-gradient-to-br from-sky-500/20 to-cyan-500/10' },
                { id: 'gradient3', label: 'Forest', color: 'bg-gradient-to-br from-emerald-500/20 to-teal-500/10' },
              ].map((bg) => (
                <motion.button
                  key={bg.id}
                  whileTap={{ scale: 0.95 }}
                  className="aspect-square rounded-xl border border-border flex flex-col items-center justify-center gap-1 text-[9px] text-muted-foreground hover:border-honey/40 transition-colors"
                >
                  <div className={`w-full h-full rounded-lg ${bg.color} flex items-center justify-center`}>
                    <ImageIcon className="w-5 h-5 opacity-20" />
                  </div>
                  <span className="text-[9px]">{bg.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* APPEARANCE */}
        {activeCategory === 'appearance' && (
          <div className="space-y-1">
            <SectionTitle>Theme</SectionTitle>
            <div className="grid grid-cols-3 gap-2 py-2">
              {[
                { id: 'dark', label: 'Dark', icon: Moon },
                { id: 'light', label: 'Light', icon: Sun },
                { id: 'system', label: 'System', icon: MonitorDot },
              ].map((theme) => {
                const Icon = theme.icon
                return (
                  <motion.button
                    key={theme.id}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center gap-2 py-3 rounded-xl border border-border hover:border-honey/40 transition-colors"
                  >
                    <Icon className="w-5 h-5 text-muted-foreground" />
                    <span className="text-xs">{theme.label}</span>
                  </motion.button>
                )
              })}
            </div>

            <SectionTitle>Accent Color</SectionTitle>
            <div className="flex items-center gap-3 py-2 flex-wrap">
              {[
                { id: 'honey', color: '#FFB800' },
                { id: 'rose', color: '#F43F5E' },
                { id: 'emerald', color: '#10B981' },
                { id: 'sky', color: '#0EA5E9' },
                { id: 'violet', color: '#8B5CF6' },
                { id: 'orange', color: '#F97316' },
              ].map((c) => (
                <motion.button
                  key={c.id}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => update('accentColor', c.id)}
                  className={cn(
                    'w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center',
                    s.accentColor === c.id ? 'border-foreground scale-110' : 'border-transparent',
                  )}
                  style={{ backgroundColor: c.color }}
                >
                  {s.accentColor === c.id && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                </motion.button>
              ))}
            </div>

            <SectionTitle>Effects</SectionTitle>
            <ToggleRow label="Glass Effect" value={s.glassEffect} onChange={(v) => update('glassEffect', v)} />
            <ToggleRow label="Compact Mode" value={s.compactMode} onChange={(v) => update('compactMode', v)} />
            <SelectRow
              label="Animation Level"
              value={s.animLevel}
              onValueChange={(v) => update('animLevel', v)}
              options={[
                { value: 'none', label: 'None' },
                { value: 'reduced', label: 'Reduced' },
                { value: 'normal', label: 'Normal' },
                { value: 'enhanced', label: 'Enhanced' },
              ]}
            />
          </div>
        )}

        {/* DATA & STORAGE */}
        {activeCategory === 'storage' && (
          <div className="space-y-1">
            <SectionTitle>Cache</SectionTitle>
            <div className="flex items-center justify-between py-2.5">
              <div>
                <p className="text-sm">Cache Size</p>
                <p className="text-[10px] text-muted-foreground">Temporary app data</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  124.5 MB
                </Badge>
                <Button variant="ghost" size="sm" className="h-7 text-xs text-honey hover:text-honey-light">
                  Clear
                </Button>
              </div>
            </div>

            <SectionTitle>Storage Usage</SectionTitle>
            <div className="space-y-3 py-2">
              {[
                { label: 'Photos', used: 2.4, total: 5, icon: ImageIcon, color: 'text-emerald-400' },
                { label: 'Videos', used: 4.1, total: 10, icon: Video, color: 'text-sky-400' },
                { label: 'Documents', used: 0.8, total: 2, icon: FileText, color: 'text-honey' },
                { label: 'Audio', used: 1.2, total: 5, icon: Volume2, color: 'text-violet-400' },
              ].map((item) => {
                const Icon = item.icon
                const pct = (item.used / item.total) * 100
                return (
                  <div key={item.label} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 ${item.color}`} />
                        <span className="text-sm">{item.label}</span>
                      </div>
                      <span className="text-[10px] text-muted-foreground">
                        {item.used} GB / {item.total} GB
                      </span>
                    </div>
                    <Progress value={pct} className="h-1.5" />
                  </div>
                )
              })}
            </div>

            <SectionTitle>Auto-Download</SectionTitle>
            <SelectRow
              label="Media auto-download"
              value="wifi"
              onValueChange={() => {}}
              options={[
                { value: 'wifi', label: 'Wi-Fi Only' },
                { value: 'always', label: 'Always' },
                { value: 'never', label: 'Never' },
              ]}
            />
          </div>
        )}

        {/* MEETING SETTINGS */}
        {activeCategory === 'meeting' && (
          <div className="space-y-1">
            <SectionTitle>Audio & Video</SectionTitle>
            <SelectRow
              label="Camera"
              value="default"
              onValueChange={() => {}}
              options={[
                { value: 'default', label: 'Default' },
                { value: 'front', label: 'Front Camera' },
                { value: 'back', label: 'Back Camera' },
              ]}
            />
            <SelectRow
              label="Microphone"
              value="default"
              onValueChange={() => {}}
              options={[
                { value: 'default', label: 'Default' },
                { value: 'headset', label: 'Headset' },
                { value: 'speaker', label: 'Speaker' },
              ]}
            />
            <SelectRow
              label="Speaker"
              value="default"
              onValueChange={() => {}}
              options={[
                { value: 'default', label: 'Default' },
                { value: 'earpiece', label: 'Earpiece' },
                { value: 'bluetooth', label: 'Bluetooth' },
              ]}
            />

            <SectionTitle>Features</SectionTitle>
            <ToggleRow label="Noise Suppression" value={s.noiseSuppress} onChange={(v) => update('noiseSuppress', v)} />
            <ToggleRow label="Background Blur" value={s.bgBlur} onChange={(v) => update('bgBlur', v)} />
            <ToggleRow label="Join Muted" value={s.joinMuted} onChange={(v) => update('joinMuted', v)} />
            <ToggleRow label="Camera Off by Default" value={s.cameraOffDefault} onChange={(v) => update('cameraOffDefault', v)} />
          </div>
        )}

        {/* STREAM SETTINGS */}
        {activeCategory === 'stream' && (
          <div className="space-y-1">
            <SectionTitle>Stream Quality</SectionTitle>
            <SelectRow
              label="Default Quality"
              value={s.streamQuality}
              onValueChange={(v) => update('streamQuality', v)}
              options={[
                { value: '720p', label: '720p HD' },
                { value: '1080p', label: '1080p Full HD' },
                { value: '1440p', label: '1440p 2K' },
                { value: '4k', label: '4K Ultra HD' },
              ]}
            />
            <ToggleRow label="Chat Moderation" value={s.chatModeration} onChange={(v) => update('chatModeration', v)} />

            <SectionTitle>Connected Accounts</SectionTitle>
            <div className="space-y-2 py-2">
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl glass-card">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <Youtube className="w-4 h-4 text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">YouTube</p>
                  <p className="text-[10px] text-muted-foreground">
                    {s.youtubeConnected ? 'Connected' : 'Not connected'}
                  </p>
                </div>
                <Switch
                  checked={s.youtubeConnected}
                  onCheckedChange={(v) => update('youtubeConnected', v)}
                />
              </div>
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl glass-card">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500/10 to-pink-500/10 flex items-center justify-center">
                  <Instagram className="w-4 h-4 text-pink-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Instagram</p>
                  <p className="text-[10px] text-muted-foreground">
                    {s.instaConnected ? 'Connected' : 'Not connected'}
                  </p>
                </div>
                <Switch
                  checked={s.instaConnected}
                  onCheckedChange={(v) => update('instaConnected', v)}
                />
              </div>
            </div>
          </div>
        )}

        {/* LANGUAGE */}
        {activeCategory === 'language' && (
          <div className="space-y-1">
            <SectionTitle>App Language</SectionTitle>
            <div className="space-y-2 py-2">
              {[
                { code: 'en', label: 'English', flag: '🇬🇧' },
                { code: 'uz', label: "O'zbek", flag: '🇺🇿' },
                { code: 'ru', label: 'Русский', flag: '🇷🇺' },
              ].map((lang) => (
                <motion.button
                  key={lang.code}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-accent/20 transition-colors"
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span className="text-sm flex-1 text-left">{lang.label}</span>
                  {lang.code === 'en' && (
                    <Badge className="bg-honey/10 text-honey border-0 text-[10px]">
                      Active
                    </Badge>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* HELP & SUPPORT */}
        {activeCategory === 'help' && (
          <div className="space-y-1">
            <SectionTitle>Frequently Asked Questions</SectionTitle>
            <Accordion type="single" collapsible className="space-y-1">
              {[
                {
                  q: 'How do I change my password?',
                  a: 'Go to Settings → Account → Security, then enter your current and new password.',
                },
                {
                  q: 'How do I enable two-factor authentication?',
                  a: 'Go to Settings → Privacy & Security → Two-Factor Authentication and follow the setup steps.',
                },
                {
                  q: 'How do I delete my account?',
                  a: 'Go to Settings → Account → Danger Zone → Delete Account. This action is irreversible.',
                },
                {
                  q: 'How do I report a user?',
                  a: 'Visit their profile, tap the three-dot menu, and select Report.',
                },
                {
                  q: 'How do I contact support?',
                  a: 'Use the Contact Support option below or email support@honey.app',
                },
              ].map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-border">
                  <AccordionTrigger className="text-sm py-2.5 hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-muted-foreground pb-2">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <SectionTitle>Support</SectionTitle>
            <div className="space-y-1.5 py-2">
              {[
                { label: 'Contact Support', icon: MessageCircle },
                { label: 'Report a Bug', icon: Bug },
                { label: 'Terms of Service', icon: FileText },
                { label: 'Privacy Policy', icon: ShieldCheck },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <motion.button
                    key={item.label}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-accent/20 transition-colors"
                  >
                    <Icon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
                  </motion.button>
                )
              })}
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )

  // Suppress unused variable warning
  void settingsVersion

  return (
    <div className="pb-24 md:pb-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 md:px-6 pt-1 pb-3">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="p-1.5 rounded-lg hover:bg-accent/30 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>
        <h2 className="text-lg font-bold">Settings</h2>
      </div>

      <Separator />

      {/* Desktop Layout: Sidebar + Content */}
      <div className="hidden md:flex">
        {/* Sidebar */}
        <div className="w-56 flex-shrink-0 px-4 py-4 border-r border-border">
          <nav className="space-y-0.5">
            {categories.map((cat) => {
              const Icon = cat.icon
              const isActive = activeCategory === cat.id
              return (
                <motion.button
                  key={cat.id}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all',
                    isActive
                      ? 'bg-honey/10 text-honey font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/20',
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.label}</span>
                </motion.button>
              )
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 px-6 py-4 min-w-0">{settingContent}</div>
      </div>

      {/* Mobile Layout: Accordion */}
      <div className="md:hidden px-4 py-4">
        <Accordion type="single" collapsible defaultValue={activeCategory}>
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <AccordionItem key={cat.id} value={cat.id} className="border-border">
                <AccordionTrigger
                  onClick={() => setActiveCategory(cat.id)}
                  className="text-sm py-3 hover:no-underline"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-honey" />
                    <span>{cat.label}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-2">{settingContent}</AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>

      {/* Delete Account Dialog */}
      <AlertDialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <AlertDialogContent className="glass-premium border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-400">Delete Account</AlertDialogTitle>
            <AlertDialogDescription className="text-sm">
              This action cannot be undone. All your data, messages, and media will be permanently
              deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-sm">Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500 hover:bg-red-600 text-white text-sm">
              Delete Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
