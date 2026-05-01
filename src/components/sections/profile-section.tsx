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
import { cn, generateAvatar, formatNumber, formatDate } from '@/lib/utils'
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

const profileShellClass =
  'rounded-[32px] border border-honey/16 bg-[linear-gradient(180deg,rgba(14,11,8,0.92),rgba(25,19,13,0.84))] text-[#F6E3B2] shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-[22px]'

const profileCardClass =
  'rounded-[24px] border border-honey/12 bg-[linear-gradient(180deg,rgba(12,10,8,0.88),rgba(20,16,12,0.8))] text-[#F6E3B2] shadow-[0_18px_48px_rgba(0,0,0,0.2)] backdrop-blur-[20px]'

const profileSoftCardClass =
  'rounded-[20px] border border-honey/10 bg-[linear-gradient(180deg,rgba(10,9,8,0.72),rgba(18,14,10,0.6))] text-[#F6E3B2] shadow-[0_14px_34px_rgba(0,0,0,0.16)] backdrop-blur-[18px]'

const profileIconButtonClass =
  'flex h-10 w-10 items-center justify-center rounded-2xl border border-honey/18 bg-black/35 text-[#D5BC87] transition-all hover:border-honey/35 hover:bg-honey/14 hover:text-honey'

const profileMutedTextClass = 'text-[#BFA676]'

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
    <div className="space-y-4 px-3 pb-24 pt-3 md:px-5 md:pb-8 md:pt-4 overflow-x-hidden">
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
      <div className={cn(profileShellClass, 'overflow-hidden')}>
        <div className="relative h-48 overflow-hidden rounded-t-[32px] md:h-60">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(8,7,6,0.95),rgba(36,26,16,0.86)_58%,rgba(90,60,10,0.68))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,215,0,0.22),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,184,0,0.18),transparent_34%)]" />
          <div className="absolute -left-8 top-10 h-36 w-36 rounded-full bg-honey/10 blur-[72px]" />
          <div className="absolute right-8 top-6 h-28 w-28 rounded-full bg-gold/12 blur-[60px]" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0d0a08] to-transparent" />
          <div className="absolute left-5 top-5 rounded-full border border-honey/16 bg-black/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#E4C574]">
            Honey Identity
          </div>
        </div>

        <div className="relative z-10 -mt-16 px-4 pb-5 md:-mt-18 md:px-6 md:pb-6">
          <div className={cn(profileCardClass, 'p-4 md:p-5')}>
            <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
              <div className="flex min-w-0 items-end gap-4">
                <div className="relative shrink-0">
                  <div className="h-24 w-24 overflow-hidden rounded-[28px] border border-honey/22 bg-black/35 p-1 shadow-[0_18px_40px_rgba(0,0,0,0.28)] md:h-28 md:w-28">
                    <img
                      src={generateAvatar(user.displayName)}
                      alt={user.displayName}
                      className="h-full w-full rounded-[24px] object-cover"
                    />
                  </div>
                  <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-[3px] border-[#1a140f] bg-emerald-500 shadow-[0_0_18px_rgba(16,185,129,0.5)]" />
                </div>

                <div className="min-w-0 flex-1 pb-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="truncate text-xl font-semibold tracking-tight md:text-2xl">
                      {user.displayName}
                    </h1>
                    {user.isVerified && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-gold to-amber shadow-[0_0_14px_rgba(255,184,0,0.35)]">
                        <Check className="h-3 w-3 text-[#241606]" strokeWidth={3} />
                      </span>
                    )}
                    {user.isPremium && (
                      <Badge className="border border-honey/25 bg-honey/15 px-2.5 py-0.5 text-[9px] font-bold tracking-[0.28em] text-[#F6D98D]">
                        PREMIUM
                      </Badge>
                    )}
                  </div>
                  <p className={cn('mt-1 text-xs', profileMutedTextClass)}>@{user.username}</p>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#F5E7C0]/88">
                    {user.bio}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 xl:justify-end">
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setEditOpen(true)}
                  className="inline-flex items-center gap-2 rounded-2xl border border-honey/20 bg-black/35 px-4 py-2 text-xs font-medium text-[#F6D98D] transition-all hover:border-honey/34 hover:bg-honey/12"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                  Edit Profile
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-honey to-amber px-4 py-2 text-xs font-semibold text-[#2B1A00] shadow-[0_12px_28px_rgba(255,184,0,0.22)] transition-transform hover:scale-[1.01]"
                >
                  <UserPlus className="h-3.5 w-3.5" />
                  Follow
                </motion.button>
                <motion.button whileTap={{ scale: 0.95 }} className={profileIconButtonClass}>
                  <MessageCircle className="h-4 w-4" />
                </motion.button>
                <motion.button whileTap={{ scale: 0.95 }} className={profileIconButtonClass}>
                  <Share2 className="h-4 w-4" />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={onOpenSettings}
                  className={profileIconButtonClass}
                >
                  <Settings className="h-4 w-4" />
                </motion.button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {user.profile?.location && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-honey/12 bg-black/24 px-3 py-1 text-[11px] text-[#D8C08E]">
                  <MapPin className="h-3 w-3 text-honey" />
                  {user.profile.location}
                </span>
              )}
              {user.profile?.website && (
                <a
                  href={user.profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-honey/12 bg-black/24 px-3 py-1 text-[11px] text-[#E4C574] transition-colors hover:border-honey/28 hover:text-honey"
                >
                  <LinkIcon className="h-3 w-3 text-honey" />
                  {user.profile.website.replace('https://', '').replace('http://', '')}
                </a>
              )}
              <span className="inline-flex items-center gap-1.5 rounded-full border border-honey/12 bg-black/24 px-3 py-1 text-[11px] text-[#D8C08E]">
                <Calendar className="h-3 w-3 text-honey" />
                Joined {new Date(user.joinedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-4">
              {stats.map((stat) => (
                <button
                  key={stat.label}
                  className={cn(
                    profileSoftCardClass,
                    'px-3 py-3 text-left transition-transform hover:-translate-y-0.5',
                  )}
                >
                  <span className="block text-lg font-semibold leading-none text-[#F7E6BA] md:text-xl">
                    {stat.value}
                  </span>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.24em] text-[#9F8555]">
                    {stat.label}
                  </p>
                </button>
              ))}
            </div>
          </div>
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
    { id: 'likes', label: 'Likes', icon: Heart },
    { id: 'files', label: 'Files', icon: Film },
    { id: 'about', label: 'About', icon: Info },
  ]

  return (
    <div>
      <div className={cn(profileSoftCardClass, 'flex flex-wrap gap-2 p-2')}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'relative inline-flex items-center gap-1.5 rounded-2xl px-4 py-3 text-xs font-medium transition-all',
                isActive
                  ? 'bg-honey text-[#2B1A00] shadow-[0_12px_24px_rgba(255,184,0,0.18)]'
                  : 'bg-transparent text-[#BFA676] hover:bg-honey/10 hover:text-[#F0D89E]',
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="profile-tab-indicator"
                  className="absolute inset-0 -z-10 rounded-2xl bg-honey"
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
    <div>
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
          {activeTab === 'likes' && <LikesTab user={user} />}
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
      <div className={cn(profileCardClass, 'py-12 text-center')}>
        <FileText className="mx-auto mb-3 h-10 w-10 text-[#80683E] opacity-60" />
        <p className="text-sm text-[#C8AF79]">No posts yet</p>
      </div>
    )
  }

  const gradients = [
    'from-honey/15 via-amber/10 to-gold/5',
    'from-rose-500/15 via-orange-500/10 to-amber/5',
    'from-violet-500/15 via-purple-500/10 to-honey/5',
    'from-emerald-500/15 via-teal-500/10 to-cyan/5',
    'from-sky-500/15 via-blue-500/10 to-indigo/5',
    'from-pink-500/15 via-rose-500/10 to-red-500/5',
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {userPosts.map((post, i) => (
        <motion.div
          key={post.id}
          whileHover={{ scale: 1.02, y: -2 }}
          className={cn(profileCardClass, 'relative aspect-square overflow-hidden group cursor-pointer transition-all')}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center`}>
            <FileText className="w-10 h-10 text-[#F8E8BF]/18" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/35 group-hover:opacity-100">
            <div className="flex items-center gap-3 text-white text-xs font-semibold">
              <span className="flex items-center gap-1"><Heart className="w-4 h-4 fill-white" />{formatNumber(post.likes)}</span>
              <span className="flex items-center gap-1"><MessageCircle className="w-4 h-4" />{post.commentCount}</span>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-2">
            <p className="line-clamp-2 text-[10px] leading-tight text-[#F6E7C4]/84">{post.content.slice(0, 80)}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// ============================================
// Likes Tab
// ============================================
function LikesTab({ user }: { user: User }) {
  const likedPosts = mockPosts.filter((p) => p.isLiked)
  const gradients = [
    'from-honey/15 via-amber/10 to-gold/5',
    'from-rose-500/15 via-orange-500/10 to-amber/5',
    'from-violet-500/15 via-purple-500/10 to-honey/5',
    'from-emerald-500/15 via-teal-500/10 to-cyan/5',
    'from-sky-500/15 via-blue-500/10 to-indigo/5',
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {likedPosts.map((post, i) => {
        const author = mockUsers.find((u) => u.id === post.authorId)
        return (
          <motion.div
            key={post.id}
            whileHover={{ scale: 1.02, y: -2 }}
            className={cn(profileCardClass, 'relative aspect-square overflow-hidden group cursor-pointer transition-all')}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center`}>
              <Heart className="w-10 h-10 text-red-400/40" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/35 group-hover:opacity-100">
              <div className="text-white text-xs font-semibold">
                {formatNumber(post.likes)} likes
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-2">
              {author && <p className="text-[10px] text-[#F6E7C4]/84">{author.displayName}</p>}
            </div>
          </motion.div>
        )
      })}
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
          className={cn(profileCardClass, 'relative aspect-square overflow-hidden rounded-[20px] group cursor-pointer')}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${colors[i % colors.length]} flex items-center justify-center`}>
            <ImageIcon className="w-8 h-8 text-[#F8E8BF]/18" />
          </div>
          <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-[9px] text-[#F6E7C4]/76">{formatDate(new Date().toISOString())}</span>
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
          className={cn(profileSoftCardClass, 'flex cursor-pointer items-center gap-3 p-3')}
        >
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl border border-honey/12 bg-black/26">
            {getFileIcon(file.type)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-[#F6E6BD]">{file.name}</p>
            <p className="text-[10px] text-[#A88C59]">
              {(file.size / (1024 * 1024)).toFixed(1)} MB · {file.folder}
            </p>
          </div>
          <ChevronRight className="h-4 w-4 flex-shrink-0 text-[#A88C59]" />
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
        <div className={cn(profileCardClass, 'p-4')}>
          <h3 className="mb-2 text-sm font-semibold text-[#F6E7C1]">About</h3>
          <p className="text-sm leading-relaxed text-[#C9B07A]">{user.profile.bio}</p>
        </div>
      )}

      {/* Info Items */}
      <div className={cn(profileCardClass, 'divide-y divide-honey/10 overflow-hidden')}>
        {user.profile?.location && (
          <div className="flex items-center gap-3 px-4 py-3">
            <MapPin className="w-4 h-4 text-honey flex-shrink-0" />
            <div>
              <p className="text-[10px] text-[#9E8455]">Location</p>
              <p className="text-sm text-[#F6E7C1]">{user.profile.location}</p>
            </div>
          </div>
        )}
        {user.profile?.website && (
          <div className="flex items-center gap-3 px-4 py-3">
            <LinkIcon className="w-4 h-4 text-honey flex-shrink-0" />
            <div>
              <p className="text-[10px] text-[#9E8455]">Website</p>
              <p className="text-sm text-honey">{user.profile.website}</p>
            </div>
          </div>
        )}
        {user.profile?.birthday && (
          <div className="flex items-center gap-3 px-4 py-3">
            <Calendar className="w-4 h-4 text-honey flex-shrink-0" />
            <div>
              <p className="text-[10px] text-[#9E8455]">Birthday</p>
              <p className="text-sm text-[#F6E7C1]">{new Date(user.profile.birthday).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
          </div>
        )}
        <div className="flex items-center gap-3 px-4 py-3">
          <Calendar className="w-4 h-4 text-honey flex-shrink-0" />
          <div>
            <p className="text-[10px] text-[#9E8455]">Joined</p>
            <p className="text-sm text-[#F6E7C1]">{formatDate(user.joinedAt)}</p>
          </div>
        </div>
      </div>

      {/* Interests */}
      {user.profile?.interests && user.profile.interests.length > 0 && (
        <div className={cn(profileCardClass, 'p-4')}>
          <h3 className="mb-3 text-sm font-semibold text-[#F6E7C1]">Interests</h3>
          <div className="flex gap-2 flex-wrap">
            {user.profile.interests.map((interest) => (
              <Badge
                key={interest}
                variant="outline"
                className="border-honey/20 bg-honey/8 text-xs text-[#F0D89E]"
              >
                {interest}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Social Links */}
      {user.profile?.socialLinks && (
        <div className={cn(profileCardClass, 'p-4')}>
          <h3 className="mb-3 text-sm font-semibold text-[#F6E7C1]">Social Links</h3>
          <div className="space-y-2">
            {user.profile.socialLinks.twitter && (
              <div className="flex items-center gap-2 text-sm text-[#BFA676]">
                <Globe className="w-3.5 h-3.5" />
                <span>@{user.profile.socialLinks.twitter}</span>
              </div>
            )}
            {user.profile.socialLinks.github && (
              <div className="flex items-center gap-2 text-sm text-[#BFA676]">
                <Globe className="w-3.5 h-3.5" />
                <span>{user.profile.socialLinks.github}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Privacy Quick Settings */}
      <div className={cn(profileCardClass, 'p-4')}>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-[#F6E7C1]">
            <Shield className="w-4 h-4 text-honey" />
            Privacy
          </h3>
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-1 text-[10px] text-honey hover:underline"
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
        <span className="text-xs text-[#BFA676]">Last Seen</span>
        <Select value={lastSeen} onValueChange={setLastSeen}>
          <SelectTrigger className="h-8 w-32 border-honey/18 bg-black/28 text-[11px] text-[#F6E7C1]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="border-honey/18 bg-[rgba(12,10,8,0.96)] text-[#F6E7C1]">
            <SelectItem value="everyone">Everyone</SelectItem>
            <SelectItem value="contacts">Contacts</SelectItem>
            <SelectItem value="nobody">Nobody</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-[#BFA676]">Profile Photo</span>
        <Select value={photoVisibility} onValueChange={setPhotoVisibility}>
          <SelectTrigger className="h-8 w-32 border-honey/18 bg-black/28 text-[11px] text-[#F6E7C1]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="border-honey/18 bg-[rgba(12,10,8,0.96)] text-[#F6E7C1]">
            <SelectItem value="everyone">Everyone</SelectItem>
            <SelectItem value="contacts">Contacts</SelectItem>
            <SelectItem value="nobody">Nobody</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator className="my-2 bg-honey/10" />

      {/* Blocked Users */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium flex items-center gap-1.5">
            <X className="w-3 h-3" />
            Blocked Users
          </span>
          <Badge variant="outline" className="border-honey/18 bg-honey/8 text-[10px] text-[#F6D98D]">{blockedUsers.length}</Badge>
        </div>
        <div className="space-y-1.5">
          {blockedUsers.map((u) => (
            <div key={u.id} className="flex items-center gap-2 rounded-2xl border border-transparent px-2 py-2 transition-colors hover:border-honey/12 hover:bg-honey/8">
              <img src={generateAvatar(u.displayName)} alt="" className="w-6 h-6 rounded-full" />
              <span className="flex-1 truncate text-xs text-[#F6E7C1]">{u.displayName}</span>
              <button className="text-[10px] text-honey hover:underline">Unblock</button>
            </div>
          ))}
        </div>
      </div>

      <Separator className="my-2 bg-honey/10" />

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
              <div key={i} className="flex items-center gap-2 rounded-2xl border border-transparent px-2 py-2 transition-colors hover:border-honey/12 hover:bg-honey/8">
                <Icon className="h-4 w-4 flex-shrink-0 text-[#A88C59]" />
                <div className="flex-1 min-w-0">
                  <p className="truncate text-xs text-[#F6E7C1]">{session.device}</p>
                  <p className="text-[10px] text-[#A88C59]">{session.location}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className={`text-[10px] ${session.current ? 'text-emerald-400' : 'text-[#A88C59]'}`}>
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
      <DialogContent className="glass-premium max-h-[90vh] border-honey/18 text-[#F6E7C1] sm:max-w-md overflow-y-auto">
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
                className="h-16 w-16 rounded-full border-2 border-honey/14"
              />
              <button className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#15110d] bg-honey">
                <Camera className="w-3 h-3 text-background" />
              </button>
            </div>
            <div>
              <p className="text-sm font-medium text-[#F6E7C1]">Profile Photo</p>
              <p className="text-[10px] text-[#A88C59]">Click the camera to change</p>
            </div>
          </div>

          {/* Banner Change */}
          <div className="relative flex h-20 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-honey/16 bg-[linear-gradient(135deg,rgba(10,8,7,0.94),rgba(62,43,15,0.78))] transition-opacity hover:opacity-90">
            <span className="text-xs text-[#D2B885]">Cover Photo</span>
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
              <Camera className="w-5 h-5 text-white" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-[#D9BF89]">Display Name</Label>
              <Input
                value={form.displayName}
                onChange={(e) => setForm({ ...form, displayName: e.target.value })}
                className="h-9 border-honey/16 bg-black/28 text-sm text-[#F6E7C1]"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-[#D9BF89]">Username</Label>
              <Input
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="h-9 border-honey/16 bg-black/28 text-sm text-[#F6E7C1]"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-[#D9BF89]">Bio</Label>
              <Textarea
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                className="min-h-[80px] resize-none border-honey/16 bg-black/28 text-sm text-[#F6E7C1]"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-[#D9BF89]">Location</Label>
              <Input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="h-9 border-honey/16 bg-black/28 text-sm text-[#F6E7C1]"
                placeholder="City, Country"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-[#D9BF89]">Website</Label>
              <Input
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                className="h-9 border-honey/16 bg-black/28 text-sm text-[#F6E7C1]"
                placeholder="https://"
              />
            </div>
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" size="sm" onClick={() => onOpenChange(false)} className="flex-1 border-honey/18 bg-black/24 text-[#D5BC87] hover:bg-honey/10 hover:text-honey">
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
