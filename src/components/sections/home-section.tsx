'use client'

import { Bell, MessageCircle, Play, Search, TrendingUp, Radio, Plus, Video, Sparkles, Zap, Users, Activity, Clock, Heart, Eye, Flame } from 'lucide-react'
import { motion } from 'framer-motion'
import { mockStories, mockPosts, mockUsers, mockStreams } from '@/lib/mock-data'
import { formatRelativeTime, generateAvatar } from '@/lib/utils'
import { useAppStore } from '@/lib/store'
import { staggerContainer, staggerItem, fadeInUp } from '@/lib/motion'

const quickActions = [
  { id: 'chat', label: 'Chat', icon: MessageCircle, tab: 'hub' as const, gradient: 'from-blue-500/20 to-cyan-500/20', iconColor: 'text-blue-400' },
  { id: 'meet', label: 'Meet', icon: Video, tab: 'meet' as const, gradient: 'from-green-500/20 to-emerald-500/20', iconColor: 'text-green-400' },
  { id: 'live', label: 'Go Live', icon: Radio, tab: 'streams' as const, gradient: 'from-red-500/20 to-orange-500/20', iconColor: 'text-red-400' },
  { id: 'post', label: 'Post', icon: Plus, tab: 'feed' as const, gradient: 'from-honey/20 to-amber-500/20', iconColor: 'text-honey' },
]

function ActivityRing({ percentage, size = 56, strokeWidth = 6, color = '#FFB800' }: { percentage: number; size?: number; strokeWidth?: number; color?: string }) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} className="activity-ring-track" strokeWidth={strokeWidth} />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
        style={{ filter: `drop-shadow(0 0 4px ${color}40)` }}
      />
    </svg>
  )
}

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
    <div className="space-y-5 p-4 md:p-6 pb-24 md:pb-6">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative ios-widget ios-gradient-mesh p-5 overflow-hidden"
      >
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
          <div className="space-y-1.5">
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xs text-muted-foreground font-medium uppercase tracking-wider"
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
              className="flex items-center gap-2 mt-2"
            >
              <span className="ios-pill text-[10px]">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                {onlineUsers.length} online
              </span>
              <span className="ios-pill text-[10px]" style={{ background: 'rgba(255, 59, 48, 0.1)', color: '#FF3B30', borderColor: 'rgba(255, 59, 48, 0.15)' }}>
                <Radio className="w-2.5 h-2.5" />
                {liveNow.length} live
              </span>
              {unreadCount > 0 && (
                <span className="ios-pill text-[10px]" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6', borderColor: 'rgba(59, 130, 246, 0.15)' }}>
                  <MessageCircle className="w-2.5 h-2.5" />
                  {unreadCount}
                </span>
              )}
            </motion.div>
          </div>

          {/* Activity Ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="hidden sm:flex items-center gap-3"
          >
            <div className="relative">
              <ActivityRing percentage={78} size={72} strokeWidth={7} color="#FFB800" />
              <div className="absolute inset-0 flex items-center justify-center">
                <ActivityRing percentage={62} size={48} strokeWidth={5} color="#34D399" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-5 h-5 rounded-full bg-honey/20 flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-honey" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.section variants={staggerContainer(0.06)} initial="hidden" animate="visible">
        <div className="ios-section-header">
          <span className="ios-section-title">Quick Actions</span>
        </div>
        <motion.div variants={staggerItem} className="grid grid-cols-4 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <motion.button
                key={action.id}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(action.tab)}
                className="flex flex-col items-center gap-2.5 py-3 px-2 rounded-2xl transition-all group"
                style={{
                  background: 'rgba(28, 25, 23, 0.4)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                }}
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center transition-transform group-hover:scale-110`}>
                  <Icon className={`w-5 h-5 ${action.iconColor}`} />
                </div>
                <p className="text-[11px] font-semibold text-foreground">{action.label}</p>
              </motion.button>
            )
          })}
        </motion.div>
      </motion.section>

      {/* Smart Stack Widgets */}
      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="ios-section-header">
          <span className="ios-section-title">Overview</span>
          <button className="text-[11px] text-honey font-medium">See All</button>
        </div>
        <div className="space-y-3">
          {/* Engagement Widget */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="ios-widget ios-widget-shimmer p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="ios-icon-container w-7 h-7"><TrendingUp className="w-3.5 h-3.5 text-honey" /></div>
              <span className="text-xs font-semibold">This Week</span>
              <span className="ml-auto text-[10px] text-emerald-400 font-medium">+12.4%</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Views', value: '24.5K', icon: Eye, color: '#3B82F6' },
                { label: 'Likes', value: '3.2K', icon: Heart, color: '#EF4444' },
                { label: 'Comments', value: '847', icon: MessageCircle, color: '#10B981' },
              ].map((stat) => {
                const Icon = stat.icon
                return (
                  <div key={stat.label} className="text-center">
                    <div className="flex items-center justify-center mb-1.5">
                      <Icon className="w-3.5 h-3.5" style={{ color: stat.color }} />
                    </div>
                    <p className="text-sm font-bold">{stat.value}</p>
                    <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Activity & Schedule */}
          <div className="grid grid-cols-2 gap-3">
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="ios-widget p-4">
              <div className="flex items-center gap-1.5 mb-3">
                <Activity className="w-3 h-3 text-honey" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Activity</span>
              </div>
              <div className="flex items-center justify-center mb-2">
                <div className="relative">
                  <ActivityRing percentage={85} size={64} strokeWidth={6} color="#FFB800" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold">85%</span>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground text-center">Daily goal reached</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="ios-widget p-4">
              <div className="flex items-center gap-1.5 mb-3">
                <Clock className="w-3 h-3 text-honey" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Upcoming</span>
              </div>
              <div className="space-y-2">
                {[
                  { title: 'Sprint Planning', time: '2:00 PM', color: '#FFB800' },
                  { title: 'Design Review', time: '5:00 PM', color: '#3B82F6' },
                ].map((event) => (
                  <div key={event.title} className="flex items-center gap-2">
                    <div className="w-1 h-8 rounded-full shrink-0" style={{ background: event.color }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold truncate">{event.title}</p>
                      <p className="text-[9px] text-muted-foreground">{event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Online Friends */}
      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div className="ios-section-header">
          <div className="flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-green-400" />
            <span className="ios-section-title">Online Now</span>
          </div>
          <span className="text-[11px] text-muted-foreground">{onlineUsers.length}</span>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          {onlineUsers.map((user, idx) => (
            <motion.button
              key={user.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + idx * 0.05 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-1.5 shrink-0"
            >
              <div className="relative">
                <div className="w-13 h-13 rounded-full p-[2px] bg-gradient-to-br from-green-400 to-emerald-500" style={{ width: 52, height: 52 }}>
                  <img src={generateAvatar(user.displayName)} alt={user.displayName} className="w-full h-full rounded-full object-cover border-2 border-background" />
                </div>
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-background" style={{ boxShadow: '0 0 6px rgba(34, 197, 94, 0.5)' }} />
              </div>
              <span className="text-[10px] text-muted-foreground truncate max-w-[56px]">{user.displayName.split(' ')[0]}</span>
            </motion.button>
          ))}
        </div>
      </motion.section>

      {/* Search */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search Honey..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-all"
            style={{ background: 'rgba(28, 25, 23, 0.45)', backdropFilter: 'blur(30px)', border: '1px solid rgba(255, 255, 255, 0.06)' }}
          />
        </div>
      </motion.div>

      {/* Stories */}
      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex flex-col items-center gap-1.5 shrink-0">
            <div className="relative" style={{ width: 64, height: 64 }}>
              <div className="w-full h-full rounded-full border-2 border-dashed border-honey/40 flex items-center justify-center" style={{ background: 'rgba(28, 25, 23, 0.3)' }}>
                <span className="text-honey text-xl">+</span>
              </div>
            </div>
            <span className="text-[10px] text-muted-foreground">Your Story</span>
          </div>
          {mockStories.map((storyGroup) => {
            const user = mockUsers.find((u) => u.id === storyGroup.userId)
            if (!user) return null
            return (
              <motion.button key={storyGroup.userId} whileTap={{ scale: 0.95 }} className="flex flex-col items-center gap-1.5 shrink-0">
                <div className={`relative rounded-full p-0.5 ${storyGroup.hasUnviewed ? 'bg-gradient-to-br from-honey via-amber to-honey-dark' : 'bg-muted'}`} style={{ width: 66, height: 66 }}>
                  <img src={generateAvatar(user.displayName)} alt={user.displayName} className="w-full h-full rounded-full object-cover border-2 border-background" />
                </div>
                <span className="text-[10px] text-muted-foreground truncate max-w-[64px]">{user.displayName.split(' ')[0]}</span>
              </motion.button>
            )
          })}
        </div>
      </motion.section>

      {/* Trending */}
      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
        <div className="ios-section-header">
          <div className="flex items-center gap-2">
            <Flame className="w-3.5 h-3.5 text-honey" />
            <span className="ios-section-title">Trending</span>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {['#DesignSystem', '#BuildInPublic', '#AI', '#UzbekTech', '#WebDev', '#Honey'].map((tag) => (
            <motion.span key={tag} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="ios-pill text-[11px] cursor-pointer">{tag}</motion.span>
          ))}
        </div>
      </motion.section>

      {/* Posts Feed */}
      <section className="space-y-4">
        <div className="ios-section-header">
          <span className="ios-section-title">Feed</span>
        </div>
        {mockPosts.map((post, index) => {
          const author = mockUsers.find((u) => u.id === post.authorId)
          if (!author) return null
          return (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.08 }}
              whileHover={{ y: -2 }}
              className="ios-widget p-4 space-y-3 transition-ios"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={generateAvatar(author.displayName)} alt={author.displayName} className="w-10 h-10 rounded-full" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-semibold">{author.displayName}</span>
                      {author.isVerified && (
                        <span className="w-4 h-4 bg-honey rounded-full flex items-center justify-center"><span className="text-[8px] text-background font-bold">&#10003;</span></span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{formatRelativeTime(post.createdAt)}</span>
                  </div>
                </div>
                <button className="p-1.5 rounded-full hover:bg-accent/50 transition-colors"><span className="text-muted-foreground">&#8226;&#8226;&#8226;</span></button>
              </div>
              <p className="text-sm leading-relaxed whitespace-pre-line">{post.content}</p>
              {post.hashtags.length > 0 && (
                <div className="flex gap-1.5 flex-wrap">
                  {post.hashtags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs text-honey font-medium">{tag}</span>
                  ))}
                </div>
              )}
              <div className="flex items-center justify-between pt-2" style={{ borderTop: '0.5px solid rgba(255, 255, 255, 0.06)' }}>
                <motion.button whileTap={{ scale: 0.9 }} className={`flex items-center gap-1.5 text-xs transition-colors ${post.isLiked ? 'text-red-500' : 'text-muted-foreground hover:text-foreground'}`}>
                  <span>{post.isLiked ? '\u2764\uFE0F' : '\uD83E\uDD0D'}</span>
                  <span>{post.likes}</span>
                </motion.button>
                <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <MessageCircle className="w-3.5 h-3.5" /><span>{post.commentCount}</span>
                </button>
                <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <span>&#8599;</span><span>{post.shares}</span>
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
