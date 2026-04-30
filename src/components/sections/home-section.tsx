'use client'

import { Bell, MessageCircle, Play, Search, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { HoneyLogo } from '@/components/honey-logo'
import { mockStories, mockPosts, mockUsers } from '@/lib/mock-data'
import { formatRelativeTime, generateAvatar } from '@/lib/utils'
import { useAppStore } from '@/lib/store'

export default function HomeSection() {
  const { setActiveTab } = useAppStore()

  return (
    <div className="space-y-6 p-4 md:p-6 pb-24 md:pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <HoneyLogo size="lg" />
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('streams')}
            className="relative p-2 rounded-full glass-card hover:bg-accent/50 transition-colors"
          >
            <Play className="w-5 h-5 text-muted-foreground" />
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-background" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="relative p-2 rounded-full glass-card hover:bg-accent/50 transition-colors"
          >
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-honey rounded-full border-2 border-background text-[8px] font-bold flex items-center justify-center text-background">
              5
            </span>
          </motion.button>
        </div>
      </div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search Honey..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-card bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-honey/30 transition-all"
        />
      </motion.div>

      {/* Stories Row */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          {/* Your Story */}
          <div className="flex flex-col items-center gap-1.5 shrink-0">
            <div className="relative w-16 h-16">
              <div className="w-full h-full rounded-full bg-muted border-2 border-dashed border-honey/40 flex items-center justify-center">
                <span className="text-honey text-xl">+</span>
              </div>
            </div>
            <span className="text-xs text-muted-foreground">Your Story</span>
          </div>
          {/* Story items */}
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

      {/* Trending */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-honey" />
          <h2 className="text-sm font-semibold text-foreground">Trending Now</h2>
        </div>
        <div className="flex gap-2 flex-wrap">
          {['#DesignSystem', '#BuildInPublic', '#AI', '#UzbekTech', '#WebDev'].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-full glass-card text-xs text-honey font-medium cursor-pointer hover:bg-honey/10 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.section>

      {/* Posts Feed */}
      <section className="space-y-4">
        {mockPosts.map((post, index) => {
          const author = mockUsers.find((u) => u.id === post.authorId)
          if (!author) return null
          return (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + index * 0.08 }}
              className="glass-card rounded-2xl p-4 space-y-3"
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
                          <span className="text-[8px] text-background font-bold">✓</span>
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{formatRelativeTime(post.createdAt)}</span>
                  </div>
                </div>
                <button className="p-1.5 rounded-full hover:bg-accent/50 transition-colors">
                  <span className="text-muted-foreground">•••</span>
                </button>
              </div>
              {/* Post Content */}
              <p className="text-sm leading-relaxed whitespace-pre-line">{post.content}</p>
              {/* Hashtags */}
              {post.hashtags.length > 0 && (
                <div className="flex gap-1.5 flex-wrap">
                  {post.hashtags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs text-honey font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {/* Post Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className={`flex items-center gap-1.5 text-xs ${post.isLiked ? 'text-honey' : 'text-muted-foreground'}`}
                >
                  <span>{post.isLiked ? '❤️' : '🤍'}</span>
                  <span>{post.likes}</span>
                </motion.button>
                <button className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{post.commentCount}</span>
                </button>
                <button className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span>↗</span>
                  <span>{post.shares}</span>
                </button>
                <button className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span>🔖</span>
                </button>
              </div>
            </motion.article>
          )
        })}
      </section>
    </div>
  )
}
