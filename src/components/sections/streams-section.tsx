'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play,
  Eye,
  Radio,
  Clock,
  Users,
  TrendingUp,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Send,
  Settings,
  BarChart3,
  Zap,
  MoreVertical,
  Plus,
  X,
  Heart,
  Flame,
  Gamepad2,
  GraduationCap,
  Music,
  MonitorSmartphone,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Calendar,
} from 'lucide-react'
import { mockStreams, mockVideos, mockUsers } from '@/lib/mock-data'
import {
  generateAvatar,
  formatRelativeTime,
  formatNumber,
  truncateText,
  cn,
} from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Video, Stream } from '@/types'

// ============================================
// Category Config
// ============================================
const categories = [
  { id: 'all', label: 'All', icon: Sparkles },
  { id: 'live', label: 'Live', icon: Radio },
  { id: 'gaming', label: 'Gaming', icon: Gamepad2 },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'music', label: 'Music', icon: Music },
  { id: 'tech', label: 'Tech', icon: MonitorSmartphone },
  { id: 'lifestyle', label: 'Lifestyle', icon: Sparkles },
]

// ============================================
// Gradient configs for thumbnails
// ============================================
const gradients = [
  'from-honey/20 via-amber/10 to-orange/10',
  'from-honey-dark/20 via-brown/10 to-warm-gray/10',
  'from-gold/20 via-honey-light/10 to-amber/10',
  'from-honey/10 via-muted to-honey-dark/10',
  'from-amber-light/20 via-honey/10 to-warm-gray-light/10',
  'from-gold-light/20 via-cream/10 to-honey/10',
  'from-honey-dim/20 via-amber/10 to-gold/5',
]

function getGradient(id: string) {
  const idx =
    id.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % gradients.length
  return gradients[idx]
}

// ============================================
// Format Duration
// ============================================
function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  return `${m}:${String(s).padStart(2, '0')}`
}

// ============================================
// Mock Chat Messages
// ============================================
const mockChatMessages = [
  { id: 'lc1', user: 'Dilnoza R.', text: 'This is amazing! 🔥', time: '2m ago' },
  { id: 'lc2', user: 'Timur A.', text: 'Great explanation!', time: '1m ago' },
  { id: 'lc3', user: 'Nodira U.', text: 'Can you show that again?', time: '45s ago' },
  { id: 'lc4', user: 'Alex C.', text: 'Love the energy on this stream 💛', time: '30s ago' },
  { id: 'lc5', user: 'Sardor M.', text: 'This is next level', time: '15s ago' },
  { id: 'lc6', user: 'Maria G.', text: 'Hi from Uzbekistan! 🇺🇿', time: '10s ago' },
]

const autoChatMessages = [
  'So good! 👏',
  'Keep it up! 🚀',
  'This is fire 🔥',
  'Love this content',
  'Can you explain that part again?',
  'Amazing work! ✨',
  'First time here, this is great',
  'Subscribed! 💛',
]

// ============================================
// Stream Section Main Component
// ============================================
export default function StreamsSection() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [selectedStream, setSelectedStream] = useState<Stream | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)

  const liveStreams = mockStreams.filter((s) => s.isLive)
  const recordedStreams = mockStreams.filter((s) => s.isRecorded)

  const filteredVideos = mockVideos.filter((v) => {
    if (activeCategory === 'all') return true
    if (activeCategory === 'live') return false
    const cat = activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)
    return v.category.toLowerCase().includes(activeCategory)
  })

  const filteredLive = liveStreams.filter((s) => {
    if (activeCategory === 'all' || activeCategory === 'live') return true
    return s.category.toLowerCase().includes(activeCategory)
  })

  return (
    <div className="space-y-6 p-4 md:p-6 pb-24 md:pb-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-gradient-honey">Streams</h1>
          <Badge variant="secondary" className="text-[10px] bg-honey/10 text-honey border-honey/20">
            {liveStreams.length} Live
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAnalytics(!showAnalytics)}
            className={cn(
              'p-2 rounded-xl transition-all',
              showAnalytics ? 'glass-premium text-honey' : 'glass-card text-muted-foreground hover:text-foreground'
            )}
          >
            <BarChart3 className="w-4 h-4" />
          </motion.button>
          <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
            <DialogTrigger asChild>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 px-3 py-2 bg-honey text-background rounded-xl text-xs font-semibold shadow-honey"
              >
                <Plus className="w-3.5 h-3.5" />
                Create Stream
              </motion.button>
            </DialogTrigger>
            <DialogContent className="glass-premium sm:max-w-md border-honey/10 max-h-[90vh] overflow-y-auto">
              <CreateStreamForm onClose={() => setShowCreateModal(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      {/* Analytics Cards */}
      <AnimatePresence>
        {showAnalytics && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Total Views', value: '234.5K', icon: Eye, change: '+12.4%' },
                { label: 'Watch Time', value: '1,240h', icon: Clock, change: '+8.2%' },
                { label: 'Subscribers', value: '12.4K', icon: Users, change: '+342' },
                { label: 'Engagement', value: '8.7%', icon: Zap, change: '+1.2%' },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card rounded-xl p-3 space-y-1"
                >
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <stat.icon className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-medium">{stat.label}</span>
                  </div>
                  <p className="text-lg font-bold text-foreground">{stat.value}</p>
                  <span className="text-[10px] text-emerald-400 font-medium">{stat.change}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const Icon = cat.icon
          const isActive = activeCategory === cat.id
          return (
            <motion.button
              key={cat.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium shrink-0 transition-all',
                isActive
                  ? 'bg-honey text-background shadow-honey'
                  : 'glass-card text-muted-foreground hover:text-foreground hover:bg-honey/5'
              )}
            >
              <Icon className="w-3 h-3" />
              {cat.label}
            </motion.button>
          )
        })}
      </div>

      {/* Watch View / Live View */}
      <AnimatePresence mode="wait">
        {selectedVideo && (
          <WatchView
            video={selectedVideo}
            onBack={() => setSelectedVideo(null)}
            onVideoSelect={setSelectedVideo}
          />
        )}
        {selectedStream && (
          <LiveStreamView
            stream={selectedStream}
            onBack={() => setSelectedStream(null)}
          />
        )}
      </AnimatePresence>

      {/* Trending Section */}
      {!selectedVideo && !selectedStream && (
        <>
          {liveStreams.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-3">
                <Flame className="w-4 h-4 text-honey" />
                <h2 className="text-sm font-semibold text-foreground">Trending Now</h2>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                {liveStreams.slice(0, 5).map((stream, idx) => {
                  const streamer = mockUsers.find((u) => u.id === stream.streamerId)
                  if (!streamer) return null
                  return (
                    <motion.div
                      key={stream.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.06 }}
                      whileHover={{ scale: 1.03 }}
                      className="shrink-0 w-56 glass-card rounded-xl overflow-hidden cursor-pointer"
                      onClick={() => setSelectedStream(stream)}
                    >
                      <div className={cn('relative aspect-video flex items-center justify-center', `bg-gradient-to-br ${getGradient(stream.id)}`)}>
                        <div className="w-10 h-10 rounded-full bg-honey/20 flex items-center justify-center">
                          <Play className="w-5 h-5 text-honey" />
                        </div>
                        <div className="absolute top-2 left-2 flex items-center gap-1">
                          <span className="px-1.5 py-0.5 bg-red-500 rounded text-[9px] font-bold text-white flex items-center gap-0.5">
                            <span className="w-1 h-1 bg-white rounded-full animate-pulse" />
                            LIVE
                          </span>
                          <span className="px-1.5 py-0.5 bg-black/50 rounded text-[9px] font-medium text-white backdrop-blur-sm">
                            <Eye className="w-2.5 h-2.5 inline mr-0.5" />
                            {formatNumber(stream.viewers)}
                          </span>
                        </div>
                      </div>
                      <div className="p-2.5">
                        <p className="text-xs font-semibold truncate">{stream.title}</p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <img src={generateAvatar(streamer.displayName)} alt="" className="w-4 h-4 rounded-full" />
                          <span className="text-[10px] text-muted-foreground truncate">{streamer.displayName}</span>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </section>
          )}

          {/* Live Streams Grid */}
          {filteredLive.length > 0 && (activeCategory === 'all' || activeCategory === 'live') && (
            <section>
              <div className="flex items-center gap-2 mb-3">
                <Radio className="w-4 h-4 text-red-500" />
                <h2 className="text-sm font-semibold text-foreground">Live Now</h2>
                <span className="px-1.5 py-0.5 bg-red-500/20 text-red-400 rounded text-[10px] font-bold animate-pulse">
                  {filteredLive.length}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredLive.map((stream, idx) => (
                  <VideoCard
                    key={stream.id}
                    type="live"
                    stream={stream}
                    onClick={() => setSelectedStream(stream)}
                    index={idx}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Video Grid */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-honey" />
                <h2 className="text-sm font-semibold text-foreground">
                  {activeCategory === 'all' ? 'All Videos' : categories.find(c => c.id === activeCategory)?.label || 'Videos'}
                </h2>
              </div>
              <span className="text-[10px] text-muted-foreground">{filteredVideos.length} videos</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredVideos.map((video, idx) => (
                <VideoCard
                  key={video.id}
                  type="video"
                  video={video}
                  onClick={() => setSelectedVideo(video)}
                  index={idx}
                />
              ))}
            </div>
            {filteredVideos.length === 0 && (
              <div className="glass-card rounded-xl p-8 text-center">
                <MonitorSmartphone className="w-10 h-10 text-muted-foreground/40 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No videos in this category yet</p>
              </div>
            )}
          </section>

          {/* Recorded Streams */}
          {recordedStreams.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold text-foreground">Past Streams</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {recordedStreams.map((stream, idx) => (
                  <VideoCard
                    key={stream.id}
                    type="recorded"
                    stream={stream}
                    onClick={() => setSelectedVideo(mockVideos[0])}
                    index={idx}
                  />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  )
}

// ============================================
// Video Card Component
// ============================================
function VideoCard({
  type,
  video,
  stream,
  onClick,
  index,
}: {
  type: 'live' | 'video' | 'recorded'
  video?: Video
  stream?: Stream
  onClick: () => void
  index: number
}) {
  const [isHovered, setIsHovered] = useState(false)

  const title = video?.title || stream?.title || ''
  const authorId = video?.authorId || stream?.streamerId || ''
  const author = mockUsers.find((u) => u.id === authorId)
  const views = video?.views || stream?.viewers || 0
  const duration = video?.duration || stream?.duration
  const createdAt = video?.createdAt || stream?.startedAt || ''
  const isLive = type === 'live' && stream?.isLive
  const id = video?.id || stream?.id || ''
  const category = video?.category || stream?.category || ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 + index * 0.05 }}
      whileHover={{ y: -2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="glass-card rounded-xl overflow-hidden cursor-pointer group transition-all hover:shadow-honey"
    >
      {/* Thumbnail */}
      <div className={cn('relative aspect-video flex items-center justify-center overflow-hidden', `bg-gradient-to-br ${getGradient(id)}`)}>
        <motion.div
          animate={isHovered ? { scale: 1.1, opacity: 1 } : { scale: 1, opacity: 0.8 }}
          transition={{ duration: 0.2 }}
          className="w-12 h-12 rounded-full bg-honey/20 flex items-center justify-center"
        >
          <Play className="w-6 h-6 text-honey ml-0.5" />
        </motion.div>

        {/* Hover Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20 flex items-center justify-center"
            >
              <div className="w-14 h-14 rounded-full bg-honey/90 flex items-center justify-center shadow-honey-lg">
                <Play className="w-7 h-7 text-background ml-0.5" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* LIVE Badge */}
        {isLive && (
          <div className="absolute top-2 left-2 flex items-center gap-1.5">
            <span className="px-2 py-0.5 bg-red-500 rounded-md text-[10px] font-bold text-white flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              LIVE
            </span>
            <span className="px-2 py-0.5 bg-black/50 rounded-md text-[10px] font-medium text-white backdrop-blur-sm">
              <Eye className="w-3 h-3 inline mr-0.5" />
              {formatNumber(stream?.viewers || 0)}
            </span>
          </div>
        )}

        {/* Duration Badge */}
        {duration && !isLive && (
          <div className="absolute bottom-2 right-2">
            <span className="px-1.5 py-0.5 bg-black/60 rounded text-[10px] font-medium text-white backdrop-blur-sm">
              {formatDuration(duration)}
            </span>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute bottom-2 left-2">
          <span className="px-1.5 py-0.5 bg-honey/80 rounded text-[9px] font-medium text-background backdrop-blur-sm">
            {category}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="flex items-start gap-2.5">
          {author && (
            <img
              src={generateAvatar(author.displayName)}
              alt={author.displayName}
              className="w-8 h-8 rounded-full shrink-0 mt-0.5"
            />
          )}
          <div className="min-w-0 flex-1">
            <h3 className="text-xs font-semibold leading-tight line-clamp-2 group-hover:text-honey transition-colors">
              {title}
            </h3>
            {author && (
              <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
                {author.displayName}
                {author.isVerified && (
                  <span className="w-3 h-3 bg-honey rounded-full flex items-center justify-center">
                    <span className="text-[6px] text-background font-bold">✓</span>
                  </span>
                )}
              </p>
            )}
            <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-muted-foreground">
              <span>{formatNumber(views)} {isLive ? 'watching' : 'views'}</span>
              <span>·</span>
              <span>{isLive ? formatRelativeTime(createdAt) : formatRelativeTime(createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ============================================
// Watch View Component
// ============================================
function WatchView({
  video,
  onBack,
  onVideoSelect,
}: {
  video: Video
  onBack: () => void
  onVideoSelect: (v: Video) => void
}) {
  const [isLiked, setIsLiked] = useState(video.isLiked)
  const [isDisliked, setIsDisliked] = useState(video.isDisliked)
  const [isSaved, setIsSaved] = useState(video.isBookmarked)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [likeCount, setLikeCount] = useState(video.likes)
  const [descExpanded, setDescExpanded] = useState(false)
  const [commentText, setCommentText] = useState('')

  const author = mockUsers.find((u) => u.id === video.authorId)

  const relatedVideos = mockVideos.filter((v) => v.id !== video.id).slice(0, 5)

  const mockComments = [
    { id: 'vc1', user: 'Dilnoza R.', text: 'This is so helpful! The explanation at 12:30 was exactly what I needed.', likes: 45, time: '2h ago' },
    { id: 'vc2', user: 'Timur A.', text: 'Great production quality! 👏', likes: 23, time: '4h ago' },
    { id: 'vc3', user: 'Nodira U.', text: 'Can you make a follow-up on this topic?', likes: 18, time: '1d ago' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      {/* Back Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-honey transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Streams
      </motion.button>

      {/* Video Player */}
      <div className={cn('relative aspect-video rounded-xl overflow-hidden', `bg-gradient-to-br ${getGradient(video.id)}`)}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-honey/20 flex items-center justify-center animate-honey-glow">
            <Play className="w-10 h-10 text-honey ml-1" />
          </div>
        </div>
        {/* Duration overlay */}
        <div className="absolute bottom-3 right-3">
          <span className="px-2 py-1 bg-black/60 rounded-lg text-xs font-medium text-white backdrop-blur-sm">
            {formatDuration(video.duration)}
          </span>
        </div>
        {/* Category */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-honey/80 text-background border-0 text-[10px] backdrop-blur-sm">
            {video.category}
          </Badge>
        </div>
      </div>

      {/* Title & Actions */}
      <div className="space-y-3">
        <div>
          <h2 className="text-base font-bold leading-tight">{video.title}</h2>
          <div className="flex items-center gap-2 mt-1.5 text-xs text-muted-foreground">
            <span>{formatNumber(video.views)} views</span>
            <span>·</span>
            <span>{formatRelativeTime(video.createdAt)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setIsLiked(!isLiked)
              setLikeCount((c) => (isLiked ? c - 1 : c + 1))
              setIsDisliked(false)
            }}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
              isLiked ? 'bg-honey/20 text-honey' : 'glass-card text-muted-foreground hover:text-foreground'
            )}
          >
            <ThumbsUp className={cn('w-4 h-4', isLiked && 'fill-honey')} />
            {formatNumber(likeCount)}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => { setIsDisliked(!isDisliked); setIsLiked(false) }}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
              isDisliked ? 'bg-destructive/20 text-destructive' : 'glass-card text-muted-foreground hover:text-foreground'
            )}
          >
            <ThumbsDown className={cn('w-4 h-4', isDisliked && 'fill-destructive')} />
          </motion.button>
          <motion.button whileTap={{ scale: 0.9 }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium glass-card text-muted-foreground hover:text-foreground">
            <Share2 className="w-4 h-4" />
            Share
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSaved(!isSaved)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
              isSaved ? 'bg-honey/20 text-honey' : 'glass-card text-muted-foreground hover:text-foreground'
            )}
          >
            <Bookmark className={cn('w-4 h-4', isSaved && 'fill-honey')} />
            {isSaved ? 'Saved' : 'Save'}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSubscribed(!isSubscribed)}
            className={cn(
              'ml-auto flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all',
              isSubscribed
                ? 'glass-card text-muted-foreground'
                : 'bg-honey text-background shadow-honey'
            )}
          >
            {isSubscribed ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Subscribed
              </>
            ) : (
              'Subscribe'
            )}
          </motion.button>
        </div>

        <Separator className="bg-border" />

        {/* Channel Info */}
        {author && (
          <div className="flex items-center gap-3">
            <img src={generateAvatar(author.displayName)} alt="" className="w-10 h-10 rounded-full" />
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold">{author.displayName}</span>
                {author.isVerified && (
                  <span className="w-4 h-4 bg-honey rounded-full flex items-center justify-center">
                    <span className="text-[7px] text-background font-bold">✓</span>
                  </span>
                )}
              </div>
              <p className="text-[11px] text-muted-foreground">{formatNumber(author.followers)} subscribers</p>
            </div>
          </div>
        )}

        {/* Description */}
        <div className="glass-card rounded-xl p-3">
          <button
            onClick={() => setDescExpanded(!descExpanded)}
            className="w-full text-left"
          >
            <p className={cn('text-xs leading-relaxed text-muted-foreground', !descExpanded && 'line-clamp-2')}>
              {video.description}
            </p>
            <span className="text-[10px] text-honey font-medium mt-1 inline-block">
              {descExpanded ? 'Show less' : 'Show more'}
            </span>
          </button>
        </div>

        {/* Comments */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-semibold">{video.commentCount} Comments</span>
          </div>

          {/* Comment Input */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-honey/20 flex items-center justify-center text-[10px] font-bold text-honey shrink-0">
              JK
            </div>
            <div className="flex-1 relative">
              <Input
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="glass-card bg-transparent text-xs h-8 rounded-lg pr-8"
              />
              {commentText && (
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-honey">
                  <Send className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-3">
            {mockComments.map((comment) => (
              <div key={comment.id} className="flex items-start gap-2.5">
                <div className={cn('w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold text-background shrink-0', `bg-gradient-to-br ${getGradient(comment.id)}`)}>
                  {comment.user.split(' ').map(w => w[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold">{comment.user}</span>
                    <span className="text-[10px] text-muted-foreground">{comment.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{comment.text}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <button className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-honey">
                      <ThumbsUp className="w-3 h-3" /> {comment.likes}
                    </button>
                    <button className="text-[10px] text-muted-foreground">Reply</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-border" />

        {/* Related Videos */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">Related Videos</h3>
          <div className="space-y-2">
            {relatedVideos.map((rv) => {
              const rAuthor = mockUsers.find((u) => u.id === rv.authorId)
              return (
                <motion.div
                  key={rv.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onVideoSelect(rv)}
                  className="flex gap-2.5 cursor-pointer group"
                >
                  <div className={cn('w-32 shrink-0 rounded-lg overflow-hidden aspect-video flex items-center justify-center', `bg-gradient-to-br ${getGradient(rv.id)}`)}>
                    <Play className="w-5 h-5 text-muted-foreground/50" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium leading-tight line-clamp-2 group-hover:text-honey transition-colors">
                      {rv.title}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      {rAuthor?.displayName}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {formatNumber(rv.views)} views · {formatRelativeTime(rv.createdAt)}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ============================================
// Live Stream View Component
// ============================================
function LiveStreamView({ stream, onBack }: { stream: Stream; onBack: () => void }) {
  const [chatMessages, setChatMessages] = useState(mockChatMessages)
  const [chatInput, setChatInput] = useState('')
  const [viewerCount, setViewerCount] = useState(stream.viewers)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const [streamHealth] = useState(100)

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  // Simulate viewer count fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount((prev) => prev + Math.floor(Math.random() * 11) - 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Simulate auto chat messages
  useEffect(() => {
    const interval = setInterval(() => {
      const users = ['Dilnoza R.', 'Timur A.', 'Nodira U.', 'Alex C.', 'Sardor M.', 'Maria G.', 'Bobur T.', 'Yuki T.']
      const newMsg = {
        id: `auto_${Date.now()}`,
        user: users[Math.floor(Math.random() * users.length)],
        text: autoChatMessages[Math.floor(Math.random() * autoChatMessages.length)],
        time: 'now',
      }
      setChatMessages((prev) => [...prev.slice(-50), newMsg])
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const sendChatMessage = useCallback(() => {
    if (!chatInput.trim()) return
    const msg = {
      id: `user_${Date.now()}`,
      user: 'You',
      text: chatInput,
      time: 'now',
    }
    setChatMessages((prev) => [...prev, msg])
    setChatInput('')
  }, [chatInput])

  const streamer = mockUsers.find((u) => u.id === stream.streamerId)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-3"
    >
      {/* Back Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-honey transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Streams
      </motion.button>

      {/* Live Video Player */}
      <div className={cn('relative aspect-video rounded-xl overflow-hidden', `bg-gradient-to-br ${getGradient(stream.id)}`)}>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center"
          >
            <Radio className="w-8 h-8 text-red-500" />
          </motion.div>
        </div>

        {/* Top Overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-red-500 rounded-lg text-[11px] font-bold text-white flex items-center gap-1.5 shadow-lg">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              LIVE
            </span>
            <motion.span
              key={viewerCount}
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              className="px-2.5 py-1 bg-black/50 rounded-lg text-[11px] font-medium text-white backdrop-blur-sm flex items-center gap-1"
            >
              <Eye className="w-3 h-3" />
              {formatNumber(viewerCount)}
            </motion.span>
          </div>
          <div className="flex items-center gap-2">
            {/* Stream Health */}
            <div className="px-2 py-1 bg-black/50 rounded-lg text-[10px] font-medium text-white backdrop-blur-sm flex items-center gap-1">
              <div className={cn('w-2 h-2 rounded-full', streamHealth > 80 ? 'bg-emerald-400' : 'bg-amber-400')} />
              Excellent
            </div>
          </div>
        </div>

        {/* Bottom Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          {streamer && (
            <div className="flex items-center gap-2 px-2 py-1 bg-black/40 rounded-lg backdrop-blur-sm">
              <img src={generateAvatar(streamer.displayName)} alt="" className="w-6 h-6 rounded-full" />
              <div>
                <p className="text-[10px] font-semibold text-white">{streamer.displayName}</p>
                <p className="text-[8px] text-white/60">{stream.title}</p>
              </div>
            </div>
          )}
          <Badge className="bg-honey/80 text-background border-0 text-[10px] backdrop-blur-sm">
            {stream.category}
          </Badge>
        </div>
      </div>

      {/* Stream Info */}
      <div className="glass-card rounded-xl p-3 space-y-2">
        <h2 className="text-sm font-bold">{stream.title}</h2>
        <p className="text-xs text-muted-foreground line-clamp-2">{stream.description}</p>
        <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Started {formatRelativeTime(stream.startedAt)}</span>
          <span className="flex items-center gap-1"><Users className="w-3 h-3" /> Peak: {formatNumber(stream.peakViewers)}</span>
        </div>
      </div>

      {/* Live Chat */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 border-b border-border">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-honey" />
            <span className="text-xs font-semibold">Live Chat</span>
          </div>
          <span className="text-[10px] text-muted-foreground">{chatMessages.length} messages</span>
        </div>

        <ScrollArea className="h-64">
          <div className="p-3 space-y-2.5">
            {chatMessages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-2">
                <div className={cn('w-5 h-5 rounded-full flex items-center justify-center text-[7px] font-bold text-background shrink-0', `bg-gradient-to-br ${getGradient(msg.id)}`)}>
                  {msg.user[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className={cn('text-[11px] font-semibold', msg.user === 'You' ? 'text-honey' : 'text-foreground')}>
                      {msg.user}
                    </span>
                    <span className="text-[9px] text-muted-foreground">{msg.time}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
        </ScrollArea>

        {/* Chat Input */}
        <div className="border-t border-border p-2">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Send a message..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendChatMessage()}
              className="flex-1 glass-card bg-transparent text-xs h-8 rounded-lg"
            />
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={sendChatMessage}
              disabled={!chatInput.trim()}
              className="p-1.5 rounded-lg bg-honey text-background disabled:opacity-40 transition-opacity"
            >
              <Send className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Creator Controls */}
      <div className="glass-card rounded-xl p-3">
        <div className="flex items-center gap-2 mb-2">
          <Settings className="w-4 h-4 text-honey" />
          <span className="text-xs font-semibold">Stream Controls</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="glass-subtle rounded-lg p-2 text-center">
            <div className="flex items-center justify-center gap-1 text-[10px] text-muted-foreground">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              Streaming
            </div>
          </div>
          <div className="glass-subtle rounded-lg p-2 text-center">
            <div className="flex items-center justify-center gap-1 text-[10px] text-muted-foreground">
              <Zap className="w-3 h-3 text-emerald-400" />
              Bitrate: 6000 kbps
            </div>
          </div>
          <div className="glass-subtle rounded-lg p-2 text-center">
            <div className="flex items-center justify-center gap-1 text-[10px] text-muted-foreground">
              <Clock className="w-3 h-3" />
              Uptime: {formatRelativeTime(stream.startedAt)}
            </div>
          </div>
          <div className="glass-subtle rounded-lg p-2 text-center">
            <div className="flex items-center justify-center gap-1 text-[10px] text-muted-foreground">
              <AlertCircle className="w-3 h-3 text-emerald-400" />
              No issues
            </div>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          className="w-full mt-2 py-2 rounded-lg bg-destructive/20 text-destructive text-xs font-semibold hover:bg-destructive/30 transition-colors"
        >
          End Stream
        </motion.button>
      </div>
    </motion.div>
  )
}

// ============================================
// Create Stream Form
// ============================================
function CreateStreamForm({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [privacy, setPrivacy] = useState('public')

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-gradient-honey">Create New Stream</DialogTitle>
        <DialogDescription>Set up your live stream details</DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-2">
        {/* Title */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-foreground">Stream Title</label>
          <Input
            placeholder="Give your stream a catchy title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="glass-card bg-transparent text-sm"
          />
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-foreground">Description</label>
          <Textarea
            placeholder="What will you be streaming about?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="glass-card bg-transparent text-sm min-h-[80px] resize-none"
          />
        </div>

        {/* Category */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-foreground">Category</label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full glass-card bg-transparent text-sm">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tech">Technology</SelectItem>
              <SelectItem value="gaming">Gaming</SelectItem>
              <SelectItem value="music">Music</SelectItem>
              <SelectItem value="art">Art</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="lifestyle">Lifestyle</SelectItem>
              <SelectItem value="design">Design</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Privacy */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-foreground">Privacy</label>
          <Select value={privacy} onValueChange={setPrivacy}>
            <SelectTrigger className="w-full glass-card bg-transparent text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">Public - Anyone can watch</SelectItem>
              <SelectItem value="unlisted">Unlisted - Only with link</SelectItem>
              <SelectItem value="private">Private - Invite only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Thumbnail Upload */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-foreground">Thumbnail (Optional)</label>
          <div className="glass-card rounded-lg p-6 border-2 border-dashed border-honey/20 text-center cursor-pointer hover:border-honey/40 transition-colors">
            <div className="w-10 h-10 rounded-full bg-honey/10 flex items-center justify-center mx-auto mb-2">
              <Plus className="w-5 h-5 text-honey" />
            </div>
            <p className="text-xs text-muted-foreground">Click to upload thumbnail</p>
            <p className="text-[10px] text-muted-foreground/60 mt-0.5">PNG, JPG up to 5MB</p>
          </div>
        </div>

        {/* Schedule */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            Schedule (Optional)
          </label>
          <Input
            type="datetime-local"
            className="glass-card bg-transparent text-sm"
          />
        </div>
      </div>
      <DialogFooter className="gap-2">
        <Button variant="outline" onClick={onClose} className="glass-card text-xs">
          Cancel
        </Button>
        <Button
          onClick={onClose}
          className="bg-honey text-background hover:bg-honey-dark text-xs font-semibold shadow-honey"
          disabled={!title.trim()}
        >
          <Radio className="w-3.5 h-3.5 mr-1.5" />
          Go Live
        </Button>
      </DialogFooter>
    </>
  )
}
