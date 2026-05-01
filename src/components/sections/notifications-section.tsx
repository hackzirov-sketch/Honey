'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bell,
  Heart,
  MessageCircle,
  UserPlus,
  Video,
  Radio,
  Info,
  Mail,
  CheckCheck,
  Filter,
  Clock,
} from 'lucide-react'
import { mockNotifications, mockUsers } from '@/lib/mock-data'
import { formatRelativeTime, generateAvatar, cn } from '@/lib/utils'
import { useAppStore } from '@/lib/store'
import type { NotificationType } from '@/types'

// ---- Notification Type Icons ----
const notifIcons: Record<NotificationType, typeof Heart> = {
  like: Heart,
  comment: MessageCircle,
  follow: UserPlus,
  message: Mail,
  mention: MessageCircle,
  group_invite: UserPlus,
  meeting: Video,
  stream: Radio,
  system: Info,
  birthday: Heart,
  achievement: Info,
}

const notifColors: Record<NotificationType, string> = {
  like: 'text-red-400 bg-red-400/10',
  comment: 'text-sky-400 bg-sky-400/10',
  follow: 'text-emerald-400 bg-emerald-400/10',
  message: 'text-honey bg-honey/10',
  mention: 'text-violet-400 bg-violet-400/10',
  group_invite: 'text-cyan-400 bg-cyan-400/10',
  meeting: 'text-teal-400 bg-teal-400/10',
  stream: 'text-rose-400 bg-rose-400/10',
  system: 'text-muted-foreground bg-muted/30',
  birthday: 'text-pink-400 bg-pink-400/10',
  achievement: 'text-amber-400 bg-amber-400/10',
}

// ---- Filter Tabs ----
type NotifFilter = 'all' | 'unread' | 'mentions' | 'messages'

const filterTabs: { id: NotifFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'unread', label: 'Unread' },
  { id: 'mentions', label: 'Mentions' },
  { id: 'messages', label: 'Messages' },
]

// ---- Notification Item ----
function NotificationItem({
  notification,
}: {
  notification: typeof mockNotifications[0]
}) {
  const { markAsRead } = useAppStore()
  const [friendAction, setFriendAction] = useState<'none' | 'accepted' | 'rejected'>('none')

  const fromUser = mockUsers.find((u) => u.id === notification.fromUserId)
  const Icon = notifIcons[notification.type]
  const colorClass = notifColors[notification.type]

  const isFriendRequest = notification.type === 'follow'
  const isGroupInvite = notification.type === 'group_invite'

  const handleClick = () => {
    if (!notification.isRead) {
      markAsRead(notification.id)
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.2 }}
      onClick={handleClick}
      className={cn(
        'flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all',
        !notification.isRead
          ? 'glass-card hover:bg-accent/20'
          : 'hover:bg-accent/10',
      )}
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        <img
          src={fromUser ? generateAvatar(fromUser.displayName) : generateAvatar('System')}
          alt=""
          className="w-10 h-10 rounded-full"
        />
        <div
          className={cn(
            'absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center',
            colorClass,
          )}
        >
          <Icon className="w-3 h-3" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm leading-snug flex-1">
            <span className="font-semibold">{fromUser?.displayName || 'System'}</span>{' '}
            <span className="text-muted-foreground">
              {notification.body.replace(
                new RegExp(`^${fromUser?.displayName || 'System'}\\s*`, 'i'),
                '',
              )}
            </span>
          </p>
          {!notification.isRead && (
            <div className="w-2 h-2 rounded-full bg-honey shrink-0 mt-1.5 shadow-honey-glow" />
          )}
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatRelativeTime(notification.createdAt)}
          </span>

          {/* Action buttons for friend requests and group invites */}
          {(isFriendRequest || isGroupInvite) && friendAction === 'none' && (
            <div className="flex items-center gap-1.5">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation()
                  setFriendAction('accepted')
                }}
                className="px-3 py-1 rounded-lg bg-honey text-background text-xs font-semibold hover:bg-honey-light transition-colors"
              >
                Accept
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation()
                  setFriendAction('rejected')
                }}
                className="px-3 py-1 rounded-lg glass-card text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Reject
              </motion.button>
            </div>
          )}

          {friendAction === 'accepted' && (
            <span className="text-xs text-emerald-400 font-medium">Accepted</span>
          )}
          {friendAction === 'rejected' && (
            <span className="text-xs text-muted-foreground">Declined</span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ---- Empty State ----
function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16 gap-4"
    >
      <div className="w-20 h-20 rounded-full glass-card flex items-center justify-center">
        <Bell className="w-8 h-8 text-muted-foreground" />
      </div>
      <div className="text-center">
        <h3 className="text-sm font-semibold text-foreground">All caught up!</h3>
        <p className="text-xs text-muted-foreground mt-1">
          No notifications to show right now.
        </p>
      </div>
    </motion.div>
  )
}

// ---- Main Notifications Section ----
export default function NotificationsSection() {
  const { notifications, setNotifications, markAllAsRead, unreadCount } = useAppStore()
  const [activeFilter, setActiveFilter] = useState<NotifFilter>('all')
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Initialize notifications from mock data on first render
  const initialized = useMemo(() => {
    if (notifications.length === 0) {
      setNotifications(mockNotifications)
      return true
    }
    return true
  }, [notifications.length, setNotifications])

  const filteredNotifications = useMemo(() => {
    switch (activeFilter) {
      case 'unread':
        return notifications.filter((n) => !n.isRead)
      case 'mentions':
        return notifications.filter(
          (n) => n.type === 'mention' || n.type === 'comment',
        )
      case 'messages':
        return notifications.filter(
          (n) => n.type === 'message' || n.type === 'group_invite',
        )
      default:
        return notifications
    }
  }, [notifications, activeFilter])

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setNotifications(mockNotifications)
      setIsRefreshing(false)
    }, 800)
  }

  return (
    <div className="space-y-4 p-4 md:p-6 pb-24 md:pb-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-honey/10 flex items-center justify-center">
            <Bell className="w-5 h-5 text-honey" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Notifications</h1>
            {unreadCount > 0 && (
              <p className="text-xs text-muted-foreground">
                {unreadCount} unread notification{unreadCount > 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            className="p-2 rounded-lg glass-card hover:bg-accent/50 transition-colors"
          >
            <Filter className="w-4 h-4 text-muted-foreground" />
          </motion.button>
          {unreadCount > 0 && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={markAllAsRead}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-card hover:bg-honey/10 transition-colors"
            >
              <CheckCheck className="w-4 h-4 text-honey" />
              <span className="text-xs text-honey font-medium">Mark all read</span>
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="flex gap-2"
      >
        {filterTabs.map((tab) => (
          <motion.button
            key={tab.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveFilter(tab.id)}
            className={cn(
              'px-4 py-2 rounded-xl text-xs font-medium transition-all',
              activeFilter === tab.id
                ? 'bg-honey text-background shadow-honey'
                : 'glass-card text-muted-foreground hover:text-foreground',
            )}
          >
            {tab.label}
            {tab.id === 'unread' && unreadCount > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-honey text-background text-[10px] font-bold">
                {unreadCount}
              </span>
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* Refresh Indicator */}
      <AnimatePresence>
        {isRefreshing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center justify-center gap-2 py-2"
          >
            <div className="w-4 h-4 rounded-full border-2 border-honey/30 border-t-honey animate-spin" />
            <span className="text-xs text-muted-foreground">Refreshing...</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notifications List */}
      <div className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))
          ) : (
            <EmptyState />
          )}
        </AnimatePresence>
      </div>

      {/* Load More Placeholder */}
      {filteredNotifications.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center pt-4"
        >
          <button className="px-6 py-2 rounded-xl glass-card text-xs text-muted-foreground hover:text-foreground transition-colors">
            Load more notifications
          </button>
        </motion.div>
      )}
    </div>
  )
}
