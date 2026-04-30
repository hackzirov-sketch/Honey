'use client'

import { useState, useMemo, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, TrendingUp, Users, Play, Radio, FileText, X,
  UserPlus, Heart, MessageCircle, Video, Star
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { mockUsers, mockPosts, mockVideos, mockStreams } from '@/lib/mock-data'
import { generateAvatar, formatRelativeTime, truncateText, cn } from '@/lib/utils'
import { useAppStore } from '@/lib/store'

type ResultTab = 'all' | 'users' | 'posts' | 'videos' | 'streams'

export default function ExploreSection() {
  const [query, setQuery] = useState('')
  const [activeTab, setActiveTab] = useState<ResultTab>('all')
  const [recentSearches, setRecentSearches] = useState<string[]>(['Honey platform', 'Uzbek creators', 'Live streams'])

  const addToRecent = useCallback((q: string) => {
    if (!q.trim()) return
    setRecentSearches(prev => {
      const filtered = prev.filter(s => s !== q)
      return [q, ...filtered].slice(0, 8)
    })
  }, [])

  const clearRecent = useCallback(() => setRecentSearches([]), [])

  const results = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return null
    const users = mockUsers.filter(u => u.name.toLowerCase().includes(q) || u.username.toLowerCase().includes(q))
    const posts = mockPosts.filter(p => p.caption.toLowerCase().includes(q))
    const videos = mockVideos.filter(v => v.title.toLowerCase().includes(q))
    const streams = mockStreams.filter(s => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q))
    return { users, posts, videos, streams }
  }, [query])

  const hasResults = results && (results.users.length + results.posts.length + results.videos.length + results.streams.length > 0)

  const trendingSearches = [
    'Honey AI Assistant', 'Live Coding Streams', 'Uzbek Dev Community',
    'Design Resources', 'React Tutorials', 'Music Production', 'Photography Tips'
  ]

  const trendingCreators = mockUsers.slice(0, 4)
  const liveNow = mockStreams.filter(s => s.isLive).slice(0, 3)
  const suggestedGroups = [
    { id: '1', name: 'Uzbek Developers', members: 12400, avatar: null },
    { id: '2', name: 'Design Hub', members: 8300, avatar: null },
    { id: '3', name: 'Music Lovers', members: 5600, avatar: null },
  ]

  return (
    <div className="min-h-screen pb-24 md:pb-8 overflow-hidden">
      {/* Search Bar */}
      <div className="sticky top-0 z-20 glass-premium p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search users, posts, videos, streams..."
            className="pl-10 pr-10 h-11 glass-card border-border/50 focus:border-honey/50 rounded-2xl bg-transparent"
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {query.trim() ? (
          /* Search Results */
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-4 pt-4"
          >
            {hasResults ? (
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as ResultTab)}>
                <TabsList className="glass-card w-full h-10 rounded-xl mb-4">
                  {(['all', 'users', 'posts', 'videos', 'streams'] as const).map(tab => {
                    const count = results ? 
                      tab === 'all' ? results.users.length + results.posts.length + results.videos.length + results.streams.length :
                      tab === 'users' ? results.users.length :
                      tab === 'posts' ? results.posts.length :
                      tab === 'videos' ? results.videos.length :
                      results.streams.length : 0
                    return (
                      <TabsTrigger key={tab} value={tab} className="text-xs rounded-lg capitalize data-[state=active]:bg-honey/20 data-[state=active]:text-honey">
                        {tab} {count > 0 && `(${count})`}
                      </TabsTrigger>
                    )
                  })}
                </TabsList>

                <div className="space-y-3">
                  {/* User Results */}
                  {(activeTab === 'all' || activeTab === 'users') && results.users.map(user => (
                    <motion.div
                      key={user.id}
                      whileHover={{ scale: 1.01 }}
                      onClick={() => addToRecent(query)}
                      className="flex items-center gap-3 p-3 glass-card rounded-2xl cursor-pointer"
                    >
                      <img src={generateAvatar(user.name)} alt="" className="w-10 h-10 rounded-full" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground">@{user.username}</p>
                      </div>
                      <Button size="sm" variant="outline" className="rounded-full text-xs border-honey/30 text-honey hover:bg-honey/10">
                        <UserPlus className="w-3 h-3 mr-1" /> Follow
                      </Button>
                    </motion.div>
                  ))}

                  {/* Post Results */}
                  {(activeTab === 'all' || activeTab === 'posts') && results.posts.map(post => (
                    <motion.div
                      key={post.id}
                      whileHover={{ scale: 1.01 }}
                      onClick={() => addToRecent(query)}
                      className="flex items-center gap-3 p-3 glass-card rounded-2xl cursor-pointer"
                    >
                      <img src={generateAvatar(post.user.name)} alt="" className="w-10 h-10 rounded-full" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{post.user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{truncateText(post.caption, 60)}</p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Heart className="w-3 h-3" /> {post.likes}
                      </div>
                    </motion.div>
                  ))}

                  {/* Video Results */}
                  {(activeTab === 'all' || activeTab === 'videos') && results.videos.map(video => (
                    <motion.div
                      key={video.id}
                      whileHover={{ scale: 1.01 }}
                      onClick={() => addToRecent(query)}
                      className="flex items-center gap-3 p-3 glass-card rounded-2xl cursor-pointer"
                    >
                      <div className="w-16 h-10 rounded-lg bg-gradient-to-br from-honey/30 to-amber-900/30 flex items-center justify-center shrink-0">
                        <Play className="w-4 h-4 text-honey" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{video.title}</p>
                        <p className="text-xs text-muted-foreground">{video.views} views</p>
                      </div>
                    </motion.div>
                  ))}

                  {/* Stream Results */}
                  {(activeTab === 'all' || activeTab === 'streams') && results.streams.map(stream => (
                    <motion.div
                      key={stream.id}
                      whileHover={{ scale: 1.01 }}
                      onClick={() => addToRecent(query)}
                      className="flex items-center gap-3 p-3 glass-card rounded-2xl cursor-pointer"
                    >
                      <div className="w-16 h-10 rounded-lg bg-gradient-to-br from-red-500/30 to-red-900/30 flex items-center justify-center shrink-0">
                        <Radio className="w-4 h-4 text-red-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{stream.title}</p>
                        <p className="text-xs text-muted-foreground">{stream.viewerCount} viewers</p>
                      </div>
                      {stream.isLive && <Badge className="bg-red-500 text-white text-[10px]">LIVE</Badge>}
                    </motion.div>
                  ))}
                </div>
              </Tabs>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Search className="w-12 h-12 text-muted-foreground/30 mb-4" />
                <p className="text-sm text-muted-foreground">No results found for &ldquo;{query}&rdquo;</p>
                <p className="text-xs text-muted-foreground mt-1">Try different keywords</p>
              </div>
            )}
          </motion.div>
        ) : (
          /* Default Explore Page */
          <motion.div
            key="explore"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="px-4 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold">Recent Searches</h3>
                  <button onClick={clearRecent} className="text-xs text-honey">Clear All</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map(term => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="flex items-center gap-1.5 px-3 py-1.5 glass-card rounded-full text-xs hover:bg-accent/50 transition-colors"
                    >
                      <Search className="w-3 h-3 text-muted-foreground" />
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Trending Searches */}
            <div className="px-4 pt-5">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-honey" /> Trending
              </h3>
              <div className="space-y-2">
                {trendingSearches.map((term, i) => (
                  <motion.button
                    key={term}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setQuery(term)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 glass-card rounded-xl hover:bg-accent/30 transition-colors text-left"
                  >
                    <span className="text-xs font-bold text-honey w-5">{i + 1}</span>
                    <span className="text-sm flex-1">{term}</span>
                    <TrendingUp className="w-3 h-3 text-muted-foreground" />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Trending Creators */}
            <div className="px-4 pt-5">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Star className="w-4 h-4 text-honey" /> Trending Creators
              </h3>
              <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar-x">
                {trendingCreators.map(creator => (
                  <motion.div
                    key={creator.id}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center gap-1.5 min-w-[72px] cursor-pointer"
                  >
                    <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-br from-honey to-amber-600">
                      <img src={generateAvatar(creator.name)} alt="" className="w-full h-full rounded-full border-2 border-background" />
                    </div>
                    <p className="text-[10px] font-medium text-center truncate w-16">{creator.name.split(' ')[0]}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Live Now */}
            {liveNow.length > 0 && (
              <div className="px-4 pt-5">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Radio className="w-4 h-4 text-red-400" /> Live Now
                </h3>
                <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar-x">
                  {liveNow.map(stream => (
                    <motion.div
                      key={stream.id}
                      whileHover={{ scale: 1.03 }}
                      className="min-w-[200px] w-[200px] glass-card rounded-2xl overflow-hidden cursor-pointer"
                    >
                      <div className="h-24 bg-gradient-to-br from-red-500/20 to-red-900/20 flex items-center justify-center relative">
                        <Play className="w-8 h-8 text-white/80" />
                        <Badge className="absolute top-2 left-2 bg-red-500 text-white text-[9px] px-1.5">LIVE</Badge>
                        <span className="absolute bottom-2 right-2 text-[10px] text-white/80 flex items-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                          {stream.viewerCount}
                        </span>
                      </div>
                      <div className="p-2">
                        <p className="text-xs font-medium truncate">{stream.title}</p>
                        <p className="text-[10px] text-muted-foreground truncate">{stream.user.name}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Suggested Groups */}
            <div className="px-4 pt-5 pb-8">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-honey" /> Suggested Groups
              </h3>
              <div className="space-y-2">
                {suggestedGroups.map(group => (
                  <motion.div
                    key={group.id}
                    whileHover={{ scale: 1.01 }}
                    className="flex items-center gap-3 p-3 glass-card rounded-2xl"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-honey/20 to-amber-800/20 flex items-center justify-center">
                      <Users className="w-5 h-5 text-honey" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{group.name}</p>
                      <p className="text-xs text-muted-foreground">{group.members.toLocaleString()} members</p>
                    </div>
                    <Button size="sm" className="rounded-full text-xs bg-honey/20 text-honey hover:bg-honey/30 border-0">
                      Join
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
