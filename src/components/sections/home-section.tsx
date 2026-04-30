'use client'

import { Bell, MessageCircle, Play, Search, TrendingUp, Radio, Plus, Video, Sparkles, Zap, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import { HoneyLogo } from '@/components/honey-logo'
import { mockStories, mockPosts, mockUsers, mockStreams } from '@/lib/mock-data'
import { formatRelativeTime, generateAvatar } from '@/lib/utils'
import { useAppStore } from '@/lib/store'
import { staggerContainer, staggerItem, fadeInUp, glassCardHover } from '@/lib/motion'

// ============================================
// Quick Actions Data
// ============================================
const quickActions = [
  { id: 'chat', label: 'New Chat', icon: MessageCircle, tab: 'hub' as const, gradient: 'from-blue-500/20 to-cyan-500/20', iconColor: 'text-blue-400' },
  { id: 'meet', label: 'Start Meeting', icon: Video, tab: 'meet' as const, gradient: 'from-green-500/20 to-emerald-500/20', iconColor: 'text-green-400' },
  { id: 'live', label: 'Go Live', icon: Radio, tab: 'streams' as const, gradient: 'from-red-500/20 to-orange-500/20', iconColor: 'text-red-400' },
  { id: 'post', label: 'Create Post', icon: Plus, tab: 'feed' as const, gradient: 'from-honey/20 to-amber-500/20', iconColor: 'text-honey' },
]

// ============================================
// Greeting helper
// ============================================
function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 6) return 'Good night'
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

export default function HomeSection() {
  const { setActiveTab, unreadCount } = useAppStore()
  const onlineUsers = mockUsers.filter((u) => u.status === 'online')
  const liveNow = mockStreams.filter((s) => s.isLive)

  return (
    <div className="space-y-6 p-4 md:p-6 pb-24 md:pb-6">
      {/* ─── Welcome Banner ─── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative glass-premium rounded-2xl p-5 overflow-hidden"
      >
        {/* Decorative blobs */}
        <motion.div
          animate={{ x: [0, 15, -10, 0], y: [0, -8, 5, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-8 -right-8 w-32 h-32 bg-honey/10 rounded-full blur-2xl pointer-events-none"
        />
        <motion.div
          animate={{ x: [0, -10, 10, 0], y: [0, 10, -5, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-8 -left-8 w-28 h-28 bg-amber/10 rounded-full blur-2xl pointer-events-none"
        />

        <div className="relative z-10 flex items-center justify-between">
          <div className="space-y-1">
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xs text-muted-foreground font-medium"
            >
              {getGreeting()}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl font-bold"
            >
              Jasur Karimov
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-3 mt-2"
            >
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-honey/10 rounded-full text-[11px] font-medium text-honey">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                {onlineUsers.length} online
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-500/10 rounded-full text-[11px] font-medium text-red-400">
                <Radio className="w-3 h-3" />
                {liveNow.length} live
              </span>
              {unreadCount > 0 && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-500/10 rounded-full text-[11px] font-medium text-blue-400">
                  <MessageCircle className="w-3 h-3" />
                  {unreadCount} new
                </span>
              )}
            </motion.div>
          </div>

          {/* Hexagon decoration */}
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="hidden sm:block"
          >
            <div className="w-20 h-20 clip-hexagon bg-gradient-to-br from-honey/20 via-amber/10 to-gold/10 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-honey/60" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ─── Quick Actions ─── */}
      <motion.section
        variants={staggerContainer(0.06)}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={staggerItem} className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-honey" />
          <h2 className="text-sm font-semibold text-foreground">Quick Actions</h2>
        </motion.div>
        <motion.div variants={staggerItem} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <motion.button
                key={action.id}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveTab(action.tab)}
                className="glass-card rounded-2xl p-4 text-left hover-glow-border transition-all group relative overflow-hidden"
              >
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />
                <div className="relative z-10 space-y-2.5">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${action.iconColor}`} />
                  </div>
                  <p className="text-xs font-semibold text-foreground">{action.label}</p>
                </div>
              </motion.button>
            )
          })}
        </motion.div>
      </motion.section>

      {/* ─── Online Friends ─── */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-4 h-4 text-green-400" />
          <h2 className="text-sm font-semibold text-foreground">Online Now</h2>
          <span className="text-[10px] text-muted-foreground">({onlineUsers.length})</span>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          {onlineUsers.map((user, idx) => (
            <motion.button
              key={user.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 + idx * 0.05 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-1.5 shrink-0"
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full p-[2px] bg-gradient-to-br from-green-400 to-emerald-500">
                  <img
                    src={generateAvatar(user.displayName)}
                    alt={user.displayName}
                    className="w-full h-full rounded-full object-cover border-2 border-background"
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
              </div>
              <span className="text-[10px] text-muted-foreground truncate max-w-[56px]">
                {user.displayName.split(' ')[0]}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.section>

      {/* ─── Search Bar ─── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative"
      >
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search Honey..."
          className="w-full pl-10 pr-4 py-3 rounded-xl glass-card bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-honey/30 transition-all text-sm"
        />
      </motion.div>

      {/* ─── Stories Row ─── */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex flex-col items-center gap-1.5 shrink-0">
            <div className="relative w-16 h-16">
              <div className="w-full h-full rounded-full bg-muted border-2 border-dashed border-honey/40 flex items-center justify-center">
                <span className="text-honey text-xl">+</span>
              </div>
            </div>
            <span className="text-xs text-muted-foreground">Your Story</span>
          </div>
          {mockStories.map((storyGroup, index) => {
            const user = mockUsers.find((u) => u.id === storyGroup.userId)
            if (!user) return null
            return (
              <motion.button
                key={storyGroup.userId}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-1.5 shrink-0"
              >
                <div
                  className={`relative w-16 h-16 rounded-full p-0.5 ${
                    storyGroup.hasUnviewed
                      ? 'bg-gradient-to-br from-honey via-amber to-honey-dark'
                      : 'bg-muted'
                  }`}
                >
                  <img
                    src={generateAvatar(user.displayName)}
                    alt={user.displayName}
                    className="w-full h-full rounded-full object-cover border-2 border-background"
                  />
                </div>
                <span className="text-xs text-muted-foreground truncate max-w-[64px]">
                  {user.displayName.split(' ')[0]}
                </span>
              </motion.button>
            )
          })}
        </div>
      </motion.section>

      {/* ─── Trending ─── */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-honey" />
          <h2 className="text-sm font-semibold text-foreground">Trending Now</h2>
        </div>
        <div className="flex gap-2 flex-wrap">
          {['#DesignSystem', '#BuildInPublic', '#AI', '#UzbekTech', '#WebDev', '#Honey'].map((tag) => (
            <motion.span
              key={tag}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1.5 rounded-full glass-card text-xs text-honey font-medium cursor-pointer hover:bg-honey/10 transition-colors"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </motion.section>

      {/* ─── Posts Feed ─── */}
      <section className="space-y-4">
        {mockPosts.map((post, index) => {
          const author = mockUsers.find((u) => u.id === post.authorId)
          if (!author) return null
          return (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 + index * 0.08 }}
              whileHover={{ y: -2 }}
              className="glass-card rounded-2xl p-4 space-y-3 hover-glow-border transition-all"
            >
              {/* Post Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={generateAvatar(author.displayName)}
                    alt={author.displayName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-semibold">{author.displayName}</span>
                      {author.isVerified && (
                        <span className="w-4 h-4 bg-honey rounded-full flex items-center justify-center">
                          <span className="text-[8px] text-background font-bold">&#10003;</span>
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{formatRelativeTime(post.createdAt)}</span>
                  </div>
                </div>
                <button className="p-1.5 rounded-full hover:bg-accent/50 transition-colors">
                  <span className="text-muted-foreground">&#8226;&#8226;&#8226;</span>
                </button>
              </div>

              {/* Post Content */}
              <p className="text-sm leading-relaxed whitespace-pre-line">{post.content}</p>

              {/* Hashtags */}
              {post.hashtags.length > 0 && (
                <div className="flex gap-1.5 flex-wrap">
                  {post.hashtags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs text-honey font-medium">{tag}</span>
                  ))}
                </div>
              )}

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className={`flex items-center gap-1.5 text-xs transition-colors ${post.isLiked ? 'text-honey' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  <span>{post.isLiked ? '\u2764\uFE0F' : '\uD83E\uDD0D'}</span>
                  <span>{post.likes}</span>
                </motion.button>
                <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{post.commentCount}</span>
                </button>
                <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <span>&#8599;</span>
                  <span>{post.shares}</span>
                </button>
                <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <span>&#128278;</span>
                </button>
              </div>
            </motion.article>
          )
        })}
      </section>
    </div>
  )
}
