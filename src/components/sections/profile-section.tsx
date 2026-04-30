'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin,
  Link as LinkIcon,
  Calendar,
  Settings,
  Edit3,
  Camera,
  Share2,
  MessageCircle,
  UserPlus,
  Check,
  Shield,
  Eye,
  EyeOff,
  Monitor,
  Smartphone,
  Globe,
  Lock,
  ChevronRight,
  Image as ImageIcon,
  FileText,
  Info,
  X,
  Heart,
  Music,
  Film,
} from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { mockUsers, mockPosts, mockFiles, mockStreams } from '@/lib/mock-data'
import { generateAvatar, formatNumber, formatDate } from '@/lib/utils'
import type { User } from '@/types'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import SettingsSection from '@/components/sections/settings-section'

// ============================================
// Profile Section
// ============================================
export default function ProfileSection() {
  const { user: storeUser } = useAppStore()
  const user = storeUser ?? mockUsers[0]
  const [view, setView] = useState<'profile' | 'settings'>('profile')
  const [activeTab, setActiveTab] = useState('posts')

  if (view === 'settings') {
    return <SettingsSection onBack={() => setView('profile')} />
  }

  return (
    <div className="space-y-0 pb-24 md:pb-6 overflow-x-hidden">
      <ProfileHeader user={user} onOpenSettings={() => setView('settings')} />
      <ProfileTabs user={user} activeTab={activeTab} setActiveTab={setActiveTab} />
      <TabContent user={user} activeTab={activeTab} onOpenSettings={() => setView('settings')} />
    </div>
  )
}

// ============================================
// Profile Header
// ============================================
function ProfileHeader({
  user,
  onOpenSettings,
}: {
  user: User
  onOpenSettings: () => void
}) {
  const [editOpen, setEditOpen] = useState(false)
  const [editForm, setEditForm] = useState({
    displayName: user.displayName,
    username: user.username,
    bio: user.bio ?? '',
    location: user.profile?.location ?? '',
    website: user.profile?.website ?? '',
  })

  const userPosts = useMemo(() => mockPosts.filter((p) => p.authorId === user.id), [user.id])
  const userStreams = useMemo(
    () => mockStreams.filter((s) => s.streamerId === user.id),
    [user.id],
  )

  const stats = [
    { label: 'Posts', value: userPosts.length || user.postsCount },
    { label: 'Followers', value: formatNumber(user.followers) },
    { label: 'Following', value: formatNumber(user.following) },
    { label: 'Streams', value: userStreams.length || 12 },
  ]

  const handleSave = () => {
    setEditOpen(false)
  }

  return (
    <>
      {/* Cover Image */}
      <div className="relative h-40 md:h-52 bg-gradient-to-br from-honey/30 via-amber/20 to-honey-dark/30 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-32 h-32 rounded-full bg-honey/5 blur-2xl" />
        <div className="absolute bottom-8 left-8 w-24 h-24 rounded-full bg-honey/10 blur-xl" />
      </div>

      {/* Profile Info */}
      <div className="px-4 md:px-6 -mt-14 relative z-10">
        <div className="flex items-end gap-4">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-background overflow-hidden shadow-honey">
              <img
                src={generateAvatar(user.displayName)}
                alt={user.displayName}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Online Indicator */}
            <span className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 rounded-full border-[3px] border-background" />
          </div>

          {/* Name & Actions */}
          <div className="flex-1 pb-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-lg md:text-xl font-bold truncate">{user.displayName}</h1>
              {user.isVerified && (
                <span className="w-5 h-5 bg-gradient-to-br from-gold to-amber rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-background" strokeWidth={3} />
                </span>
              )}
              {user.isPremium && (
                <Badge className="bg-gradient-to-r from-honey to-amber text-background text-[9px] font-bold px-2 py-0 border-0">
                  PREMIUM
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">@{user.username}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pb-1 flex-shrink-0">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setEditOpen(true)}
              className="px-3 py-1.5 rounded-xl text-xs font-medium bg-honey/10 text-honey hover:bg-honey/20 transition-colors flex items-center gap-1.5"
            >
              <Edit3 className="w-3 h-3" />
              <span className="hidden sm:inline">Edit Profile</span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1.5 rounded-xl text-xs font-medium bg-honey text-background hover:bg-honey-light transition-colors flex items-center gap-1.5"
            >
              <UserPlus className="w-3 h-3" />
              <span className="hidden sm:inline">Follow</span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-1.5 rounded-xl glass-card hover:bg-accent/50 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-muted-foreground" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-1.5 rounded-xl glass-card hover:bg-accent/50 transition-colors"
            >
              <Share2 className="w-4 h-4 text-muted-foreground" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onOpenSettings}
              className="p-1.5 rounded-xl glass-card hover:bg-accent/50 transition-colors"
            >
              <Settings className="w-4 h-4 text-muted-foreground" />
            </motion.button>
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm mt-3 leading-relaxed">{user.bio}</p>

        {/* Meta */}
        <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
          {user.profile?.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-honey" />
              {user.profile.location}
            </span>
          )}
          {user.profile?.website && (
            <a
              href={user.profile.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-honey hover:underline"
            >
              <LinkIcon className="w-3 h-3" />
              {user.profile.website.replace('https://', '').replace('http://', '')}
            </a>
          )}
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            Joined {new Date(user.joinedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-0 mt-4 border-y border-border divide-x divide-border">
          {stats.map((stat) => (
            <button
              key={stat.label}
              className="flex-1 text-center py-3 hover:bg-accent/20 transition-colors"
            >
              <span className="text-sm md:text-base font-bold">{stat.value}</span>
              <p className="text-[10px] text-muted-foreground mt-0.5">{stat.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <EditProfileDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        form={editForm}
        setForm={setEditForm}
        onSave={handleSave}
        user={user}
      />
    </>
  )
}

// ============================================
// Profile Tabs
// ============================================
function ProfileTabs({
  activeTab,
  setActiveTab,
}: {
  user: User
  activeTab: string
  setActiveTab: (tab: string) => void
}) {
  const tabs = [
    { id: 'posts', label: 'Posts', icon: FileText },
    { id: 'media', label: 'Media', icon: ImageIcon },
    { id: 'files', label: 'Files', icon: Film },
    { id: 'about', label: 'About', icon: Info },
  ]

  return (
    <div className="px-4 md:px-6 mt-4">
      <div className="flex border-b border-border">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative flex items-center gap-1.5 px-4 py-3 text-xs font-medium transition-colors"
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-honey' : 'text-muted-foreground'}`} />
              <span className={isActive ? 'text-honey' : 'text-muted-foreground'}>{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="profile-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-honey rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ============================================
// Tab Content
// ============================================
function TabContent({
  user,
  activeTab,
  onOpenSettings,
}: {
  user: User
  activeTab: string
  onOpenSettings: () => void
}) {
  return (
    <div className="px-4 md:px-6 mt-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'posts' && <PostsTab user={user} />}
          {activeTab === 'media' && <MediaTab user={user} />}
          {activeTab === 'files' && <FilesTab />}
          {activeTab === 'about' && <AboutTab user={user} onOpenSettings={onOpenSettings} />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ============================================
// Posts Tab - Grid
// ============================================
function PostsTab({ user }: { user: User }) {
  const userPosts = mockPosts.filter((p) => p.authorId === user.id)

  if (userPosts.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-40" />
        <p className="text-sm text-muted-foreground">No posts yet</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-1">
      {userPosts.map((post) => (
        <motion.div
          key={post.id}
          whileHover={{ scale: 1.02 }}
          className="aspect-square rounded-lg overflow-hidden bg-card border border-border relative group cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-honey/10 to-amber/5 flex items-center justify-center">
            <FileText className="w-8 h-8 text-honey/30" />
          </div>
          <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="text-[10px] text-white truncate">{post.content.slice(0, 50)}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[9px] text-white/70 flex items-center gap-0.5">
                <Heart className="w-2.5 h-2.5" />{formatNumber(post.likes)}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// ============================================
// Media Tab
// ============================================
function MediaTab({ user }: { user: User }) {
  const colors = [
    'from-honey/20 to-amber/10',
    'from-rose-500/20 to-orange-500/10',
    'from-emerald-500/20 to-teal-500/10',
    'from-violet-500/20 to-purple-500/10',
    'from-sky-500/20 to-cyan-500/10',
    'from-amber-500/20 to-yellow-500/10',
  ]

  return (
    <div className="grid grid-cols-3 gap-1">
      {Array.from({ length: 9 }).map((_, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.02 }}
          className="aspect-square rounded-lg overflow-hidden bg-card border border-border relative group cursor-pointer"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${colors[i % colors.length]} flex items-center justify-center`}>
            <ImageIcon className="w-8 h-8 text-foreground/20" />
          </div>
          <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-[9px] text-white/70">{formatDate(new Date().toISOString())}</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// ============================================
// Files Tab
// ============================================
function FilesTab() {
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return <ImageIcon className="w-4 h-4 text-emerald-400" />
      case 'video': return <Film className="w-4 h-4 text-sky-400" />
      case 'audio': return <Music className="w-4 h-4 text-violet-400" />
      default: return <FileText className="w-4 h-4 text-honey" />
    }
  }

  return (
    <div className="space-y-2">
      {mockFiles.map((file) => (
        <motion.div
          key={file.id}
          whileHover={{ x: 2 }}
          className="flex items-center gap-3 p-3 rounded-xl glass-card cursor-pointer"
        >
          <div className="w-10 h-10 rounded-lg bg-accent/30 flex items-center justify-center flex-shrink-0">
            {getFileIcon(file.type)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{file.name}</p>
            <p className="text-[10px] text-muted-foreground">
              {(file.size / (1024 * 1024)).toFixed(1)} MB · {file.folder}
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        </motion.div>
      ))}
    </div>
  )
}

// ============================================
// About Tab
// ============================================
function AboutTab({
  user,
  onOpenSettings,
}: {
  user: User
  onOpenSettings: () => void
}) {
  return (
    <div className="space-y-4">
      {/* Bio */}
      {user.profile && (
        <div className="glass-card rounded-xl p-4">
          <h3 className="text-sm font-semibold mb-2">About</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{user.profile.bio}</p>
        </div>
      )}

      {/* Info Items */}
      <div className="glass-card rounded-xl divide-y divide-border overflow-hidden">
        {user.profile?.location && (
          <div className="flex items-center gap-3 px-4 py-3">
            <MapPin className="w-4 h-4 text-honey flex-shrink-0" />
            <div>
              <p className="text-[10px] text-muted-foreground">Location</p>
              <p className="text-sm">{user.profile.location}</p>
            </div>
          </div>
        )}
        {user.profile?.website && (
          <div className="flex items-center gap-3 px-4 py-3">
            <LinkIcon className="w-4 h-4 text-honey flex-shrink-0" />
            <div>
              <p className="text-[10px] text-muted-foreground">Website</p>
              <p className="text-sm text-honey">{user.profile.website}</p>
            </div>
          </div>
        )}
        {user.profile?.birthday && (
          <div className="flex items-center gap-3 px-4 py-3">
            <Calendar className="w-4 h-4 text-honey flex-shrink-0" />
            <div>
              <p className="text-[10px] text-muted-foreground">Birthday</p>
              <p className="text-sm">{new Date(user.profile.birthday).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
          </div>
        )}
        <div className="flex items-center gap-3 px-4 py-3">
          <Calendar className="w-4 h-4 text-honey flex-shrink-0" />
          <div>
            <p className="text-[10px] text-muted-foreground">Joined</p>
            <p className="text-sm">{formatDate(user.joinedAt)}</p>
          </div>
        </div>
      </div>

      {/* Interests */}
      {user.profile?.interests && user.profile.interests.length > 0 && (
        <div className="glass-card rounded-xl p-4">
          <h3 className="text-sm font-semibold mb-3">Interests</h3>
          <div className="flex gap-2 flex-wrap">
            {user.profile.interests.map((interest) => (
              <Badge
                key={interest}
                variant="outline"
                className="border-honey/20 text-honey bg-honey/5 text-xs"
              >
                {interest}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Social Links */}
      {user.profile?.socialLinks && (
        <div className="glass-card rounded-xl p-4">
          <h3 className="text-sm font-semibold mb-3">Social Links</h3>
          <div className="space-y-2">
            {user.profile.socialLinks.twitter && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Globe className="w-3.5 h-3.5" />
                <span>@{user.profile.socialLinks.twitter}</span>
              </div>
            )}
            {user.profile.socialLinks.github && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Globe className="w-3.5 h-3.5" />
                <span>{user.profile.socialLinks.github}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Privacy Quick Settings */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <Shield className="w-4 h-4 text-honey" />
            Privacy
          </h3>
          <button
            onClick={onOpenSettings}
            className="text-[10px] text-honey hover:underline flex items-center gap-1"
          >
            More <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <PrivacySection />
      </div>
    </div>
  )
}

// ============================================
// Privacy Section
// ============================================
function PrivacySection() {
  const [lastSeen, setLastSeen] = useState('everyone')
  const [photoVisibility, setPhotoVisibility] = useState('everyone')

  const blockedUsers = mockUsers.slice(3, 6)
  const sessions = [
    { device: 'MacBook Pro', location: 'Tashkent, UZ', time: 'Active now', icon: Monitor, current: true },
    { device: 'iPhone 15 Pro', location: 'Tashkent, UZ', time: '2 hours ago', icon: Smartphone, current: false },
    { device: 'iPad Air', location: 'Tashkent, UZ', time: '3 days ago', icon: Smartphone, current: false },
  ]

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Last Seen</span>
        <Select value={lastSeen} onValueChange={setLastSeen}>
          <SelectTrigger className="w-32 h-7 text-[11px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="everyone">Everyone</SelectItem>
            <SelectItem value="contacts">Contacts</SelectItem>
            <SelectItem value="nobody">Nobody</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Profile Photo</span>
        <Select value={photoVisibility} onValueChange={setPhotoVisibility}>
          <SelectTrigger className="w-32 h-7 text-[11px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="everyone">Everyone</SelectItem>
            <SelectItem value="contacts">Contacts</SelectItem>
            <SelectItem value="nobody">Nobody</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator className="my-2" />

      {/* Blocked Users */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium flex items-center gap-1.5">
            <X className="w-3 h-3" />
            Blocked Users
          </span>
          <Badge variant="outline" className="text-[10px]">{blockedUsers.length}</Badge>
        </div>
        <div className="space-y-1.5">
          {blockedUsers.map((u) => (
            <div key={u.id} className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-accent/20 transition-colors">
              <img src={generateAvatar(u.displayName)} alt="" className="w-6 h-6 rounded-full" />
              <span className="text-xs flex-1 truncate">{u.displayName}</span>
              <button className="text-[10px] text-honey hover:underline">Unblock</button>
            </div>
          ))}
        </div>
      </div>

      <Separator className="my-2" />

      {/* Active Sessions */}
      <div>
        <span className="text-xs font-medium flex items-center gap-1.5 mb-2">
          <Monitor className="w-3 h-3" />
          Active Sessions
        </span>
        <div className="space-y-1.5">
          {sessions.map((session, i) => {
            const Icon = session.icon
            return (
              <div key={i} className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-accent/20 transition-colors">
                <Icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs truncate">{session.device}</p>
                  <p className="text-[10px] text-muted-foreground">{session.location}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className={`text-[10px] ${session.current ? 'text-emerald-400' : 'text-muted-foreground'}`}>
                    {session.time}
                  </p>
                  {session.current && (
                    <span className="text-[9px] text-emerald-400">Current</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ============================================
// Edit Profile Dialog
// ============================================
function EditProfileDialog({
  open,
  onOpenChange,
  form,
  setForm,
  onSave,
  user,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  form: { displayName: string; username: string; bio: string; location: string; website: string }
  setForm: (f: typeof form) => void
  onSave: () => void
  user: User
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-premium sm:max-w-md border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-gradient-honey">Edit Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          {/* Avatar Change */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={generateAvatar(user.displayName)}
                alt=""
                className="w-16 h-16 rounded-full border-2 border-border"
              />
              <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-honey rounded-full flex items-center justify-center border-2 border-background">
                <Camera className="w-3 h-3 text-background" />
              </button>
            </div>
            <div>
              <p className="text-sm font-medium">Profile Photo</p>
              <p className="text-[10px] text-muted-foreground">Click the camera to change</p>
            </div>
          </div>

          {/* Banner Change */}
          <div className="h-20 rounded-xl bg-gradient-to-br from-honey/20 to-amber/10 flex items-center justify-center relative overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
            <span className="text-xs text-muted-foreground">Cover Photo</span>
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
              <Camera className="w-5 h-5 text-white" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Display Name</Label>
              <Input
                value={form.displayName}
                onChange={(e) => setForm({ ...form, displayName: e.target.value })}
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Username</Label>
              <Input
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Bio</Label>
              <Textarea
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                className="text-sm min-h-[80px] resize-none"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Location</Label>
              <Input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="h-9 text-sm"
                placeholder="City, Country"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Website</Label>
              <Input
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                className="h-9 text-sm"
                placeholder="https://"
              />
            </div>
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" size="sm" onClick={() => onOpenChange(false)} className="flex-1">
            Cancel
          </Button>
          <Button size="sm" onClick={onSave} className="flex-1 bg-honey text-background hover:bg-honey-light">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
