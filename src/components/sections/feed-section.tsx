'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Plus,
  Grid3X3,
  Compass,
  MoreHorizontal,
  X,
  Send,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Check,
  Eye,
  Image as ImageIcon,
} from 'lucide-react'
import { mockPosts, mockUsers, mockStories } from '@/lib/mock-data'
import {
  generateAvatar,
  formatRelativeTime,
  formatNumber,
  cn,
  generateId,
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
  DialogClose,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Post, StoryGroup, Story, Comment } from '@/types'

// ============================================
// Gradient configs
// ============================================
const gradients = [
  'from-honey/20 via-amber/10 to-orange/10',
  'from-honey-dark/20 via-brown/10 to-warm-gray/10',
  'from-gold/20 via-honey-light/10 to-amber/10',
  'from-honey/10 via-muted to-honey-dark/10',
  'from-amber-light/20 via-honey/10 to-warm-gray-light/10',
  'from-gold-light/20 via-cream/10 to-honey/10',
  'from-honey-dim/20 via-amber/10 to-gold/5',
  'from-pink/10 via-honey/10 to-gold/10',
  'from-amber/10 via-cream/10 to-honey-light/10',
]

function getGradient(id: string) {
  const idx =
    id.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % gradients.length
  return gradients[idx]
}

const storyGradients = [
  'from-honey via-amber to-gold-dark',
  'from-pink-500 via-rose-400 to-honey',
  'from-violet-500 via-purple-400 to-honey',
  'from-cyan-400 via-blue-400 to-honey',
  'from-emerald-400 via-teal-400 to-honey',
]

function getStoryGradient(id: string) {
  const idx =
    id.split('').reduce((a, c) => a + c.charCodeAt(0), 0) %
    storyGradients.length
  return storyGradients[idx]
}

// ============================================
// Main Feed Section
// ============================================
export default function FeedSection() {
  const [activeTab, setActiveTab] = useState<'latest' | 'popular' | 'following'>('latest')
  const [activeView, setActiveView] = useState<'feed' | 'explore'>('feed')
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [localPosts, setLocalPosts] = useState<Post[]>([])
  const [storyViewerOpen, setStoryViewerOpen] = useState(false)
  const [selectedStoryGroup, setSelectedStoryGroup] = useState<StoryGroup | null>(null)
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0)

  const allPosts = [...localPosts, ...mockPosts]

  const sortedPosts = allPosts.sort((a, b) => {
    if (activeTab === 'popular') return b.likes - a.likes
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  const openStory = (group: StoryGroup) => {
    setSelectedStoryGroup(group)
    setSelectedStoryIndex(0)
    setStoryViewerOpen(true)
  }

  const addNewPost = (post: Post) => {
    setLocalPosts((prev) => [post, ...prev])
    setShowCreatePost(false)
  }

  return (
    <div className="space-y-4 p-4 md:p-6 pb-24 md:pb-6 relative">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <h1 className="text-xl font-bold text-gradient-honey">Feed</h1>
        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveView('feed')}
            className={cn(
              'p-2 rounded-xl transition-all',
              activeView === 'feed' ? 'glass-premium text-honey' : 'glass-card text-muted-foreground'
            )}
          >
            <Grid3X3 className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveView('explore')}
            className={cn(
              'p-2 rounded-xl transition-all',
              activeView === 'explore' ? 'glass-premium text-honey' : 'glass-card text-muted-foreground'
            )}
          >
            <Compass className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>

      {/* Stories Row */}
      <StoriesRow onStoryClick={openStory} />

      {/* Feed View */}
      <AnimatePresence mode="wait">
        {activeView === 'feed' ? (
          <motion.div
            key="feed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Feed Tabs */}
            <div className="flex items-center gap-1 p-1 glass-card rounded-xl">
              {(['latest', 'popular', 'following'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    'flex-1 py-2 rounded-lg text-xs font-medium capitalize transition-all',
                    activeTab === tab
                      ? 'bg-honey text-background shadow-honey'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Posts */}
            <div className="space-y-4">
              {sortedPosts.map((post, index) => (
                <PostCard key={post.id} post={post} index={index} />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="explore"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <ExploreGrid />
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Create Post Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowCreatePost(true)}
        className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-30 w-14 h-14 rounded-full ios-pill-filled flex items-center justify-center shadow-honey-lg"
      >
        <Plus className="w-6 h-6" />
      </motion.button>

      {/* Create Post Modal */}
      <Dialog open={showCreatePost} onOpenChange={setShowCreatePost}>
        <DialogContent className="glass-premium sm:max-w-md border-honey/10 max-h-[90vh] overflow-y-auto">
          <CreatePostForm onSubmit={addNewPost} onClose={() => setShowCreatePost(false)} />
        </DialogContent>
      </Dialog>

      {/* Story Viewer */}
      {selectedStoryGroup && (
        <StoryViewer
          storyGroup={selectedStoryGroup}
          storyIndex={selectedStoryIndex}
          isOpen={storyViewerOpen}
          onClose={() => setStoryViewerOpen(false)}
          onNavigate={(group, index) => {
            setSelectedStoryGroup(group)
            setSelectedStoryIndex(index)
          }}
        />
      )}
    </div>
  )
}

// ============================================
// Stories Row Component
// ============================================
function StoriesRow({ onStoryClick }: { onStoryClick: (group: StoryGroup) => void }) {
  const currentUser = mockUsers[0]

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
        {/* Your Story */}
        <div className="flex flex-col items-center gap-1.5 shrink-0">
          <div className="relative w-16 h-16">
            <div className="w-full h-full rounded-full bg-muted border-2 border-dashed border-honey/40 flex items-center justify-center">
              <img
                src={generateAvatar(currentUser.displayName)}
                alt=""
                className="w-full h-full rounded-full object-cover opacity-60"
              />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-honey rounded-full flex items-center justify-center shadow-honey">
              <Plus className="w-3 h-3 text-background" />
            </div>
          </div>
          <span className="text-[10px] text-muted-foreground">Your Story</span>
        </div>

        {/* Story Groups */}
        {mockStories.map((group, idx) => {
          const user = mockUsers.find((u) => u.id === group.userId)
          if (!user) return null
          return (
            <motion.button
              key={group.userId}
              whileTap={{ scale: 0.92 }}
              onClick={() => onStoryClick(group)}
              className="flex flex-col items-center gap-1.5 shrink-0"
            >
              <div
                className={cn(
                  'relative w-16 h-16 rounded-full p-[2px]',
                  group.hasUnviewed
                    ? 'bg-gradient-to-br ' + getStoryGradient(group.userId)
                    : 'bg-muted-foreground/20'
                )}
              >
                <img
                  src={generateAvatar(user.displayName)}
                  alt={user.displayName}
                  className="w-full h-full rounded-full object-cover border-2 border-background"
                />
                {group.hasUnviewed && (
                  <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-honey rounded-full flex items-center justify-center">
                    <span className="text-[7px] text-background font-bold">✓</span>
                  </div>
                )}
              </div>
              <span className="text-[10px] text-muted-foreground truncate max-w-[64px]">
                {user.displayName.split(' ')[0]}
              </span>
            </motion.button>
          )
        })}
      </div>
    </motion.section>
  )
}

// ============================================
// Story Viewer Component
// ============================================
function StoryViewer({
  storyGroup,
  storyIndex,
  isOpen,
  onClose,
  onNavigate,
}: {
  storyGroup: StoryGroup
  storyIndex: number
  isOpen: boolean
  onClose: () => void
  onNavigate: (group: StoryGroup, index: number) => void
}) {
  const [currentStoryIdx, setCurrentStoryIdx] = useState(storyIndex)
  const [progress, setProgress] = useState(0)
  const [replyText, setReplyText] = useState('')
  const timerRef = useRef<number | null>(null)
  const storyDuration = 5000

  const user = mockUsers.find((u) => u.id === storyGroup.userId)
  const stories = storyGroup.stories
  const currentStory = stories[currentStoryIdx]

  const goNext = useCallback(() => {
    if (currentStoryIdx < stories.length - 1) {
      setCurrentStoryIdx((i) => i + 1)
    } else {
      const groupIdx = mockStories.findIndex((g) => g.userId === storyGroup.userId)
      if (groupIdx < mockStories.length - 1) {
        const nextGroup = mockStories[groupIdx + 1]
        onNavigate(nextGroup, 0)
        setCurrentStoryIdx(0)
      } else {
        onClose()
      }
    }
  }, [currentStoryIdx, stories.length, storyGroup.userId, onNavigate, onClose])

  const goPrev = useCallback(() => {
    if (currentStoryIdx > 0) {
      setCurrentStoryIdx((i) => i - 1)
    } else {
      const groupIdx = mockStories.findIndex((g) => g.userId === storyGroup.userId)
      if (groupIdx > 0) {
        const prevGroup = mockStories[groupIdx - 1]
        onNavigate(prevGroup, prevGroup.stories.length - 1)
        setCurrentStoryIdx(prevGroup.stories.length - 1)
      }
    }
  }, [currentStoryIdx, storyGroup.userId, onNavigate])

  // Progress timer
  useEffect(() => {
    if (!isOpen) return
    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const pct = Math.min((elapsed / storyDuration) * 100, 100)
      setProgress(pct)
      if (pct < 100) {
        timerRef.current = requestAnimationFrame(animate)
      } else {
        goNext()
      }
    }
    timerRef.current = requestAnimationFrame(animate)
    return () => {
      if (timerRef.current) cancelAnimationFrame(timerRef.current as number)
    }
  }, [currentStoryIdx, isOpen, goNext])

  // Touch areas
  const handleTapArea = (area: 'left' | 'right') => {
    if (timerRef.current) cancelAnimationFrame(timerRef.current)
    if (area === 'left') {
      goPrev()
    } else {
      goNext()
    }
  }

  if (!isOpen || !currentStory || !user) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black flex items-center justify-center"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Progress bars */}
        <div className="absolute top-4 left-4 right-14 z-50 flex gap-1">
          {stories.map((_, idx) => (
            <div key={idx} className="flex-1 h-0.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className={cn(
                  'h-full bg-white rounded-full transition-all duration-100',
                  idx < currentStoryIdx ? 'w-full' : idx === currentStoryIdx ? '' : 'w-0'
                )}
                style={idx === currentStoryIdx ? { width: `${progress}%` } : undefined}
              />
            </div>
          ))}
        </div>

        {/* User info */}
        <div className="absolute top-10 left-4 z-50 flex items-center gap-2.5">
          <img
            src={generateAvatar(user.displayName)}
            alt=""
            className="w-8 h-8 rounded-full border border-white/30"
          />
          <div>
            <p className="text-xs font-semibold text-white">{user.displayName}</p>
            <p className="text-[10px] text-white/60">{formatRelativeTime(currentStory.createdAt)}</p>
          </div>
        </div>

        {/* Story Content */}
        <div className={cn('relative w-full h-full flex items-center justify-center', `bg-gradient-to-br ${getStoryGradient(storyGroup.userId)}`)}>
          {/* Tap areas */}
          <div
            className="absolute left-0 top-0 w-1/3 h-full z-40"
            onClick={() => handleTapArea('left')}
          />
          <div
            className="absolute right-0 top-0 w-1/3 h-full z-40"
            onClick={() => handleTapArea('right')}
          />

          {/* Story visual */}
          <div className="flex flex-col items-center gap-4 px-8">
            <motion.div
              key={currentStory.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-28 h-28 rounded-full flex items-center justify-center text-5xl font-bold text-white/80"
              style={{ background: `linear-gradient(135deg, ${getGradient(currentStory.id).replace('from-', '#').split(' ')[0]}, rgba(255,184,0,0.3))` }}
            >
              {user.displayName.split(' ').map(w => w[0]).join('')}
            </motion.div>
            {currentStory.caption && (
              <p className="text-sm text-white/90 text-center font-medium">{currentStory.caption}</p>
            )}
            {currentStory.media.alt && (
              <p className="text-xs text-white/50">{currentStory.media.alt}</p>
            )}
          </div>
        </div>

        {/* Reply input */}
        <div className="absolute bottom-4 left-4 right-4 z-50">
          <div className="flex items-center gap-2">
            <Input
              placeholder={`Reply to ${user.displayName}...`}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/40 text-xs h-10 rounded-full"
            />
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setReplyText('')}
              className="p-2.5 rounded-full bg-honey text-background"
            >
              <Send className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// ============================================
// Post Card Component
// ============================================
function PostCard({ post, index }: { post: Post; index: number }) {
  const [isLiked, setIsLiked] = useState(post.isLiked)
  const [isSaved, setIsSaved] = useState(post.isBookmarked)
  const [likeCount, setLikeCount] = useState(post.likes)
  const [showHeart, setShowHeart] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [comments, setComments] = useState<Comment[]>(post.comments)
  const [showMore, setShowMore] = useState(false)
  const lastTapRef = useRef(0)

  const author = post.author || mockUsers.find((u) => u.id === post.authorId)
  if (!author) return null

  const handleDoubleTap = () => {
    const now = Date.now()
    if (now - lastTapRef.current < 300) {
      if (!isLiked) {
        setIsLiked(true)
        setLikeCount((c) => c + 1)
      }
      setShowHeart(true)
      setTimeout(() => setShowHeart(false), 800)
    }
    lastTapRef.current = now
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount((c) => (isLiked ? c - 1 : c + 1))
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
  }

  const handleComment = () => {
    if (!commentText.trim()) return
    const newComment: Comment = {
      id: generateId(),
      postId: post.id,
      authorId: 'u1',
      content: commentText,
      likes: 0,
      isLiked: false,
      replies: [],
      createdAt: new Date().toISOString(),
    }
    setComments((prev) => [...prev, newComment])
    setCommentText('')
  }

  // Render caption with hashtags highlighted
  const renderCaption = (text: string) => {
    const parts = text.split(/(#\w+)/g)
    return parts.map((part, i) =>
      part.startsWith('#') ? (
        <span key={i} className="text-honey font-medium">{part}</span>
      ) : (
        <span key={i}>{part}</span>
      )
    )
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 + index * 0.05 }}
      className="ios-widget overflow-hidden"
    >
      {/* Post Header */}
      <div className="flex items-center justify-between p-3 pb-2">
        <div className="flex items-center gap-2.5">
          <img
            src={generateAvatar(author.displayName)}
            alt={author.displayName}
            className="w-9 h-9 rounded-full"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold">{author.displayName}</span>
              {author.isVerified && (
                <span className="w-3.5 h-3.5 bg-honey rounded-full flex items-center justify-center">
                  <span className="text-[7px] text-background font-bold">✓</span>
                </span>
              )}
            </div>
            <span className="text-[10px] text-muted-foreground">
              {formatRelativeTime(post.createdAt)}
            </span>
          </div>
        </div>
        <button className="p-1.5 rounded-full hover:bg-accent/50 transition-colors text-muted-foreground">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Location */}
      {post.location && (
        <div className="flex items-center gap-1 px-3 pb-1">
          <MapPin className="w-3 h-3 text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground">{post.location}</span>
        </div>
      )}

      {/* Image Placeholder */}
      {(post.type === 'image' || post.type === 'video') && (
        <div
          className="relative mx-3 rounded-xl overflow-hidden cursor-pointer"
          onClick={handleDoubleTap}
        >
          <div className={cn('aspect-square flex items-center justify-center', `bg-gradient-to-br ${getGradient(post.id)}`)}>
            <ImageIcon className="w-12 h-12 text-muted-foreground/20" />
          </div>

          {/* Double-tap heart animation */}
          <AnimatePresence>
            {showHeart && (
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 1.2, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <Heart className="w-24 h-24 text-white fill-white drop-shadow-2xl" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Content */}
      <div className="px-3 pt-2.5 pb-1">
        <p className={cn('text-xs leading-relaxed', !showMore && post.content.length > 120 ? 'line-clamp-3' : '')}>
          {renderCaption(post.content)}
        </p>
        {post.content.length > 120 && (
          <button
            onClick={() => setShowMore(!showMore)}
            className="text-[10px] text-muted-foreground font-medium mt-0.5"
          >
            {showMore ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>

      {/* Hashtags */}
      {post.hashtags.length > 0 && (
        <div className="flex gap-1.5 flex-wrap px-3 pb-2">
          {post.hashtags.map((tag) => (
            <span key={tag} className="text-[10px] text-honey font-medium hover:underline cursor-pointer">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between px-3 py-1.5">
        <div className="flex items-center gap-3">
          {/* Like */}
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={handleLike}
            className="relative"
          >
            <motion.div
              animate={isLiked ? { scale: [1, 1.3, 1] } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Heart
                className={cn(
                  'w-5 h-5 transition-colors',
                  isLiked ? 'text-red-500 fill-red-500' : 'text-foreground'
                )}
              />
            </motion.div>
          </motion.button>

          {/* Comment */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className={cn('w-5 h-5', showComments ? 'text-honey' : 'text-foreground')} />
          </motion.button>

          {/* Share */}
          <motion.button whileTap={{ scale: 0.85 }}>
            <Send className="w-5 h-5 text-foreground -rotate-12" />
          </motion.button>
        </div>

        {/* Bookmark */}
        <motion.button whileTap={{ scale: 0.8 }} onClick={handleSave}>
          <motion.div animate={isSaved ? { scale: [1, 1.2, 1] } : { scale: 1 }} transition={{ duration: 0.2 }}>
            <Bookmark
              className={cn(
                'w-5 h-5 transition-colors',
                isSaved ? 'text-honey fill-honey' : 'text-foreground'
              )}
            />
          </motion.div>
        </motion.button>
      </div>

      {/* Like Count */}
      <div className="px-3 pb-1">
        <span className="text-xs font-semibold">{formatNumber(likeCount)} likes</span>
      </div>

      {/* Comments Preview */}
      {comments.length > 0 && (
        <div className="px-3 space-y-1">
          {comments.slice(0, 2).map((comment) => {
            const cAuthor = comment.author || mockUsers.find((u) => u.id === comment.authorId)
            return (
              <div key={comment.id} className="flex items-start gap-1.5">
                <span className="text-[11px] font-semibold shrink-0">{cAuthor?.displayName || 'User'}</span>
                <span className="text-[11px] text-muted-foreground">{comment.content}</span>
              </div>
            )
          })}
          {post.commentCount > 2 && (
            <button
              onClick={() => setShowComments(!showComments)}
              className="text-[10px] text-muted-foreground font-medium"
            >
              View all {post.commentCount} comments
            </button>
          )}
        </div>
      )}

      {/* Expanded Comments */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <Separator className="bg-border mx-3 my-2" />
            <ScrollArea className="max-h-48">
              <div className="px-3 space-y-2.5 pb-2">
                {comments.map((comment) => {
                  const cAuthor = comment.author || mockUsers.find((u) => u.id === comment.authorId)
                  return (
                    <div key={comment.id} className="flex items-start gap-2">
                      <img
                        src={generateAvatar(cAuthor?.displayName || 'User')}
                        alt=""
                        className="w-6 h-6 rounded-full shrink-0 mt-0.5"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-semibold">{cAuthor?.displayName || 'User'}</span>
                          <span className="text-[9px] text-muted-foreground">{formatRelativeTime(comment.createdAt)}</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground">{comment.content}</p>
                      </div>
                      <button className="text-muted-foreground shrink-0">
                        <Heart className="w-3 h-3" />
                      </button>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comment Input */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-t border-border mt-1">
        <div className="w-6 h-6 rounded-full bg-honey/20 flex items-center justify-center text-[8px] font-bold text-honey shrink-0">
          JK
        </div>
        <Input
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleComment()}
          className="flex-1 bg-transparent text-xs h-7 rounded-lg border-none shadow-none px-0 focus-visible:ring-0"
        />
        {commentText && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleComment}
            className="text-honey text-xs font-semibold shrink-0"
          >
            Post
          </motion.button>
        )}
      </div>
    </motion.article>
  )
}

// ============================================
// Explore Grid
// ============================================
function ExploreGrid() {
  const allPosts = mockPosts.filter((p) => p.type === 'image' || p.type === 'video')
  const regularPosts = allPosts.filter((_, i) => i % 3 !== 1)

  return (
    <div>
      {/* Search */}
      <div className="relative mb-4">
        <Input
          placeholder="Search explore..."
          className="glass-card bg-transparent text-xs h-9 rounded-xl"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-0.5">
        {regularPosts.map((post, idx) => {
          const author = mockUsers.find((u) => u.id === post.authorId)
          const isLarge = idx % 7 === 0
          return (
            <motion.div
              key={`${post.id}-${idx}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.03 }}
              className={cn(
                'relative aspect-square cursor-pointer group overflow-hidden',
                isLarge && 'col-span-1 row-span-2'
              )}
            >
              <div className={cn('absolute inset-0', `bg-gradient-to-br ${getGradient(post.id + idx)}`)} />
              <div className="absolute inset-0 flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-muted-foreground/15" />
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex items-center gap-4 text-white text-xs font-semibold">
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4 fill-white" />
                    {formatNumber(post.likes)}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4 fill-white" />
                    {post.commentCount}
                  </span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// ============================================
// Create Post Form
// ============================================
function CreatePostForm({ onSubmit, onClose }: { onSubmit: (post: Post) => void; onClose: () => void }) {
  const [caption, setCaption] = useState('')
  const [hashtags, setHashtags] = useState('')
  const [location, setLocation] = useState('')
  const [privacy, setPrivacy] = useState('public')
  const [previewMode, setPreviewMode] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)

  const currentUser = mockUsers[0]

  const handleSubmit = () => {
    const newPost: Post = {
      id: generateId(),
      authorId: currentUser.id,
      author: currentUser,
      content: caption,
      type: 'image',
      visibility: privacy as Post['visibility'],
      media: [],
      hashtags: hashtags
        .split(/[\s,]+/)
        .filter(Boolean)
        .map((t) => (t.startsWith('#') ? t : `#${t}`)),
      mentions: [],
      location: location || undefined,
      taggedUsers: [],
      likes: 0,
      comments: [],
      commentCount: 0,
      shares: 0,
      isLiked: false,
      isShared: false,
      isBookmarked: false,
      isPinned: false,
      createdAt: new Date().toISOString(),
    }
    onSubmit(newPost)
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-gradient-honey">Create Post</DialogTitle>
        <DialogDescription>Share something with your followers</DialogDescription>
      </DialogHeader>

      <div className="space-y-4 py-2">
        {/* Upload Area */}
        <div
          className={cn(
            'glass-card rounded-xl p-8 border-2 border-dashed text-center cursor-pointer transition-all',
            isDragOver ? 'border-honey bg-honey/5' : 'border-honey/20 hover:border-honey/40'
          )}
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragOver(false) }}
        >
          <div className="w-12 h-12 rounded-full bg-honey/10 flex items-center justify-center mx-auto mb-3">
            <ImageIcon className="w-6 h-6 text-honey" />
          </div>
          <p className="text-xs font-medium">Drag & drop your media here</p>
          <p className="text-[10px] text-muted-foreground mt-1">or click to browse files</p>
          <p className="text-[9px] text-muted-foreground/60 mt-1">PNG, JPG, MP4 up to 10MB</p>
        </div>

        {/* Caption */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-foreground">Caption</label>
          <Textarea
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="glass-card bg-transparent text-sm min-h-[80px] resize-none"
          />
        </div>

        {/* Hashtags */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-foreground">Hashtags</label>
          <Input
            placeholder="design, photography, lifestyle..."
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
            className="glass-card bg-transparent text-sm"
          />
        </div>

        {/* Location */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            Location
          </label>
          <Input
            placeholder="Add a location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="glass-card bg-transparent text-sm"
          />
        </div>

        {/* Privacy */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-foreground">Privacy</label>
          <Select value={privacy} onValueChange={setPrivacy}>
            <SelectTrigger className="w-full glass-card bg-transparent text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">Public - Everyone</SelectItem>
              <SelectItem value="friends">Friends Only</SelectItem>
              <SelectItem value="private">Private - Only You</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Preview Toggle */}
        <button
          onClick={() => setPreviewMode(!previewMode)}
          className="text-[10px] text-honey font-medium hover:underline"
        >
          {previewMode ? 'Hide Preview' : 'Show Preview'}
        </button>

        {previewMode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="glass-card rounded-xl p-3 space-y-2"
          >
            <div className="flex items-center gap-2">
              <img
                src={generateAvatar(currentUser.displayName)}
                alt=""
                className="w-8 h-8 rounded-full"
              />
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-semibold">{currentUser.displayName}</span>
                  {currentUser.isVerified && (
                    <span className="w-3 h-3 bg-honey rounded-full flex items-center justify-center">
                      <span className="text-[6px] text-background font-bold">✓</span>
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-muted-foreground">Just now</span>
              </div>
            </div>
            {caption && (
              <p className="text-xs text-muted-foreground">{caption}</p>
            )}
            {hashtags && (
              <div className="flex gap-1 flex-wrap">
                {hashtags.split(/[\s,]+/).filter(Boolean).map((t, i) => (
                  <span key={i} className="text-[10px] text-honey">
                    {t.startsWith('#') ? t : `#${t}`}
                  </span>
                ))}
              </div>
            )}
            {location && (
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <MapPin className="w-3 h-3" />
                {location}
              </div>
            )}
          </motion.div>
        )}
      </div>

      <DialogFooter className="gap-2">
        <Button variant="outline" onClick={onClose} className="glass-card text-xs">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!caption.trim()}
          className="bg-honey text-background hover:bg-honey-dark text-xs font-semibold shadow-honey"
        >
          <Share2 className="w-3.5 h-3.5 mr-1.5" />
          Post
        </Button>
      </DialogFooter>
    </>
  )
}
