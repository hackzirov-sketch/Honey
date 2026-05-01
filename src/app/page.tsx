'use client'

import { useState, useEffect, useSyncExternalStore, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { pageTransition, staggerContainer, staggerItem } from '@/lib/motion'
import {
  Home,
  MessageCircle,
  Video,
  Play,
  Grid3X3,
  User,
  Moon,
  Sun,
  Bell,
  Search,
  BookOpen,
  FolderOpen,
  Settings,
  X
} from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useAppStore } from '@/lib/store'
import { HoneyLogo } from '@/components/honey-logo'
import { cn } from '@/lib/utils'
import type { AppTab } from '@/types'
import { fetchMeWithApi, logoutWithApi } from '@/lib/api-client'

// Lazy-loaded sections
const HomeSection = lazy(() => import('@/components/sections/home-section'))
const HubSection = lazy(() => import('@/components/sections/hub-section'))
const MeetSection = lazy(() => import('@/components/sections/meet-section'))
const StreamsSection = lazy(() => import('@/components/sections/streams-section'))
const FeedSection = lazy(() => import('@/components/sections/feed-section'))
const ExploreSection = lazy(() => import('@/components/sections/explore-section'))
const LibrarySection = lazy(() => import('@/components/sections/library-section'))
const FilesSection = lazy(() => import('@/components/sections/files-section'))
const ProfileSection = lazy(() => import('@/components/sections/profile-section'))
const SettingsSection = lazy(() => import('@/components/sections/settings-section'))
const NotificationsSection = lazy(() => import('@/components/sections/notifications-section'))

// ============================================
// Navigation Items
// ============================================
interface NavItem {
  id: AppTab
  label: string
  icon: typeof Home
  mobileLabel: string
}

const mainNavItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home, mobileLabel: 'Home' },
  { id: 'hub', label: 'Messages', icon: MessageCircle, mobileLabel: 'Hub' },
  { id: 'meet', label: 'Meet', icon: Video, mobileLabel: 'Meet' },
  { id: 'streams', label: 'Streams', icon: Play, mobileLabel: 'Streams' },
  { id: 'feed', label: 'Feed', icon: Grid3X3, mobileLabel: 'Feed' },
]

const secondaryNavItems: NavItem[] = [
  { id: 'explore', label: 'Explore', icon: Search, mobileLabel: 'Explore' },
  { id: 'library', label: 'Library', icon: BookOpen, mobileLabel: 'Library' },
  { id: 'files', label: 'Files & Media', icon: FolderOpen, mobileLabel: 'Files' },
]

const LEGACY_HASH_TO_TAB: Record<string, AppTab> = {
  '/': 'home',
  '/messenger': 'hub',
  '/classroom': 'meet',
  '/media': 'streams',
  '/library': 'library',
  '/security': 'settings',
  '/profile': 'profile',
  '/settings': 'settings',
}

const TAB_TO_LEGACY_HASH: Partial<Record<AppTab, string>> = {
  home: '/',
  hub: '/messenger',
  meet: '/classroom',
  streams: '/media',
  library: '/library',
  settings: '/settings',
  profile: '/profile',
}

const bottomNavItems: NavItem[] = [
  { id: 'profile', label: 'Profile', icon: User, mobileLabel: 'Profile' },
  { id: 'settings', label: 'Settings', icon: Settings, mobileLabel: 'Settings' },
]

// ============================================
// Section Loader
// ============================================
function SectionLoader() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex h-64 items-center justify-center px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 180, damping: 18 }}
        className="animated-gold-border relative w-full max-w-sm overflow-hidden rounded-[30px] border border-[#f7c464]/20 bg-black/55 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-3xl"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.22),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(255,184,0,0.14),transparent_32%)]" />
        <div className="relative flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-[22px] border border-white/10 bg-white/6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <HoneyLogo
              size="sm"
              animated
              className="scale-[0.92] drop-shadow-[0_0_16px_rgba(255,184,0,0.28)]"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold tracking-[0.22em] text-[#ffe8a3]">
                HONEY
              </span>
              <span className="rounded-full border border-[#f7c464]/20 bg-[#f7c464]/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.28em] text-[#f7c464]">
                Live
              </span>
            </div>
            <p className="mt-1 text-sm text-white/82">Preparing your premium workspace</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/8">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#7a5300] via-[#ffcf5c] to-[#fff0bd]"
                animate={{ x: ['-45%', '105%'] }}
                transition={{ duration: 1.8, ease: 'easeInOut', repeat: Infinity }}
                style={{ width: '42%' }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ============================================
// Section Router
// ============================================
function ActiveSection({ tab }: { tab: AppTab }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={tab}
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        className="h-full"
      >
        <Suspense fallback={<SectionLoader />}>
          {tab === 'home' && <HomeSection />}
          {tab === 'hub' && <HubSection />}
          {tab === 'meet' && <MeetSection />}
          {tab === 'streams' && <StreamsSection />}
          {tab === 'feed' && <FeedSection />}
          {tab === 'explore' && <ExploreSection />}
          {tab === 'library' && <LibrarySection />}
          {tab === 'files' && <FilesSection />}
          {tab === 'profile' && <ProfileSection />}
          {tab === 'settings' && <SettingsSection />}
          {tab === 'notifications' && <NotificationsSection />}
        </Suspense>
      </motion.div>
    </AnimatePresence>
  )
}

// ============================================
// Mobile Bottom Navigation
// ============================================
function MobileBottomNav({ onNotifications }: { onNotifications: () => void }) {
  const { activeTab, setActiveTab, unreadCount } = useAppStore()
  const isMessengerHash =
    typeof window !== 'undefined' &&
    (window.location.hash.startsWith('#')
      ? window.location.hash.slice(1)
      : window.location.hash) === '/messenger'

  if (activeTab === 'hub' || isMessengerHash) return null

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden ios-frosted-bar">
      <div className="flex items-center justify-around px-0.5 py-1">
        {mainNavItems.map((item) => {
          const isActive = activeTab === item.id
          const Icon = item.icon
          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                'relative flex flex-col items-center gap-0.5 py-1 px-1.5 rounded-xl min-w-[48px] transition-all',
                isActive ? 'text-honey' : 'text-muted-foreground',
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-tab-indicator"
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-honey rounded-full"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <div className="relative">
                <Icon className={cn('w-5 h-5', isActive && 'drop-shadow-[0_0_6px_rgba(255,184,0,0.5)]')} />
                {item.id === 'hub' && unreadCount > 0 && (
                  <span className="absolute -top-1 -right-2 min-w-[14px] h-3.5 px-1 bg-honey rounded-full flex items-center justify-center text-[8px] font-bold text-background">
                    {unreadCount}
                  </span>
                )}
              </div>
              <span className="text-[9px] font-medium">{item.mobileLabel}</span>
            </motion.button>
          )
        })}
        {/* Profile tab */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setActiveTab('profile')}
          className={cn(
            'relative flex flex-col items-center gap-0.5 py-1 px-1.5 rounded-xl min-w-[48px] transition-all',
            activeTab === 'profile' ? 'text-honey' : 'text-muted-foreground',
          )}
        >
          <User className="w-5 h-5" />
          <span className="text-[9px] font-medium">Profile</span>
        </motion.button>
      </div>
      {/* Safe area spacing for iOS */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  )
}

// ============================================
// Desktop Sidebar
// ============================================
function DesktopSidebar({ onNotifications, notificationsOpen }: {
  onNotifications: () => void
  notificationsOpen: boolean
}) {
  const { activeTab, setActiveTab, theme, toggleTheme, unreadCount, isAuthenticated, clearAuthSession, authToken, setUser, user } = useAppStore()

  const onLogout = async () => {
    try {
      if (authToken) {
        await logoutWithApi(authToken)
      }
    } catch {
      // Keep UX smooth even if logout API fails
    } finally {
      clearAuthSession()
      setUser(null)
      setActiveTab('home')
    }
  }

  return (
    <aside className="hidden md:flex flex-col w-64 lg:w-72 h-screen fixed left-0 top-0 ios-frosted-bar z-40">
      {/* Logo */}
      <div className="p-5 pb-3">
        <HoneyLogo size="lg" />
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {mainNavItems.map((item) => {
          const isActive = activeTab === item.id
          const Icon = item.icon
          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                'relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                isActive
                  ? 'text-honey bg-honey/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/30',
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-tab-bg"
                  className="absolute inset-0 bg-honey/10 rounded-xl"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">
                <Icon className="w-5 h-5" />
              </span>
              <span className="relative z-10">{item.label}</span>
              {item.id === 'hub' && unreadCount > 0 && (
                <span className="relative z-10 ml-auto min-w-[20px] h-5 px-1.5 bg-honey rounded-full flex items-center justify-center text-[10px] font-bold text-background">
                  {unreadCount}
                </span>
              )}
            </motion.button>
          )
        })}

        {/* Separator */}
        <div className="my-2 border-t border-border/50" />

        {/* Secondary Navigation */}
        {secondaryNavItems.map((item) => {
          const isActive = activeTab === item.id
          const Icon = item.icon
          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                'relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                isActive
                  ? 'text-honey bg-honey/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/30',
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-tab-bg"
                  className="absolute inset-0 bg-honey/10 rounded-xl"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">
                <Icon className="w-5 h-5" />
              </span>
              <span className="relative z-10">{item.label}</span>
            </motion.button>
          )
        })}

        {/* Separator */}
        <div className="my-2 border-t border-border/50" />

        {/* Bottom Navigation */}
        {bottomNavItems.map((item) => {
          const isActive = activeTab === item.id
          const Icon = item.icon
          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                'relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                isActive
                  ? 'text-honey bg-honey/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/30',
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-tab-bg"
                  className="absolute inset-0 bg-honey/10 rounded-xl"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">
                <Icon className="w-5 h-5" />
              </span>
              <span className="relative z-10">{item.label}</span>
            </motion.button>
          )
        })}
      </nav>

      {/* Bottom actions */}
      <div className="p-3 space-y-1 border-t border-border">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-accent/30 transition-all"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </motion.button>

        {isAuthenticated ? (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-300 hover:text-red-200 hover:bg-red-500/10 transition-all"
          >
            <X className="w-5 h-5" />
            <span>Log Out</span>
          </motion.button>
        ) : (
          <a
            href="/login"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-honey hover:text-honey-light hover:bg-honey/10 transition-all"
          >
            <User className="w-5 h-5" />
            <span>Log In</span>
          </a>
        )}

        {/* User info */}
        <div className="flex items-center gap-3 px-3 py-2.5">
          <div className="w-8 h-8 rounded-full bg-honey/20 flex items-center justify-center text-xs font-bold text-honey">
            {user?.displayName?.slice(0, 2).toUpperCase() ?? 'GU'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.displayName ?? 'Guest User'}</p>
            <p className="text-[10px] text-muted-foreground truncate">@{user?.username ?? 'guest'}</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

// ============================================
// Main App Shell
// ============================================
export default function AppShell() {
  const {
    activeTab,
    setActiveTab,
    theme,
    toggleTheme,
    unreadCount,
    authToken,
    setUser,
    clearAuthSession,
    hydrateAuthFromStorage,
  } = useAppStore()
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const showMobileBottomNav = activeTab !== 'hub'

  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )

  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  useEffect(() => {
    hydrateAuthFromStorage()
    if (typeof window !== 'undefined') {
      const syncFromHash = () => {
        const rawHash = window.location.hash
        const normalizedHash = rawHash.startsWith('#') ? rawHash.slice(1) : rawHash
        const mapped = LEGACY_HASH_TO_TAB[normalizedHash]
        if (mapped) {
          setActiveTab(mapped)
        }
      }

      syncFromHash()
      window.addEventListener('hashchange', syncFromHash)
      return () => {
        window.removeEventListener('hashchange', syncFromHash)
      }
    }
  }, [hydrateAuthFromStorage, setActiveTab])

  useEffect(() => {
    if (!authToken) return
    void fetchMeWithApi(authToken)
      .then((user) => {
        setUser(user)
      })
      .catch(() => {
        clearAuthSession()
      })
  }, [authToken, setUser, clearAuthSession])

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const legacyHash = TAB_TO_LEGACY_HASH[activeTab]
    if (!legacyHash) return
    const currentHash = window.location.hash.startsWith('#')
      ? window.location.hash.slice(1)
      : window.location.hash
    if (currentHash !== legacyHash) {
      window.history.replaceState(null, '', `#${legacyHash}`)
    }
  }, [activeTab])

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-float">
          <HoneyLogo size="lg" animated={true} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex" style={{ background: 'transparent' }}>
      {/* Desktop Sidebar */}
      <DesktopSidebar
        onNotifications={() => setNotificationsOpen(true)}
        notificationsOpen={notificationsOpen}
      />

      {/* Main Content Area */}
      <main className={cn(
        'flex-1 min-h-screen',
        // Full width for hub, meet sections (Telegram-style 3-panel)
        (activeTab === 'hub' || activeTab === 'meet')
          ? 'md:ml-64 lg:ml-72'
          : 'md:ml-64 lg:ml-72'
      )}>
        {/* Mobile Header */}
        <header className="sticky top-0 z-30 md:hidden ios-frosted-bar">
          <div className="flex items-center justify-between px-4 py-3">
            <HoneyLogo size="sm" animated={false} />
            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 rounded-full glass-card hover:bg-accent/50 transition-colors"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <Moon className="w-4 h-4 text-muted-foreground" />
                )}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setNotificationsOpen(true)}
                className="relative p-2 rounded-full glass-card hover:bg-accent/50 transition-colors"
              >
                <Bell className="w-4 h-4 text-muted-foreground" />
                {unreadCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 min-w-[14px] h-3.5 px-1 bg-honey rounded-full flex items-center justify-center text-[8px] font-bold text-background">
                    {unreadCount}
                  </span>
                )}
              </motion.button>
            </div>
          </div>
        </header>

        {/* Desktop top bar with notifications for non-hub/meet sections */}
        {(activeTab !== 'hub' && activeTab !== 'meet') && (
          <header className="hidden md:flex sticky top-0 z-30 items-center justify-between px-6 py-3 ios-frosted-bar">
            <h2 className="text-lg font-bold capitalize">{activeTab}</h2>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setNotificationsOpen(true)}
              className="relative p-2.5 rounded-xl glass-card hover:bg-accent/50 transition-colors"
            >
              <Bell className="w-5 h-5 text-muted-foreground" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 bg-honey rounded-full flex items-center justify-center text-[9px] font-bold text-background">
                  {unreadCount}
                </span>
              )}
            </motion.button>
          </header>
        )}

        {/* Page Content */}
        <div className={cn(
          (activeTab === 'hub' || activeTab === 'meet')
            ? '' // Full width for hub and meet
            : 'max-w-4xl mx-auto'
        )}>
          <ActiveSection tab={activeTab} />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      {showMobileBottomNav && (
        <MobileBottomNav onNotifications={() => setNotificationsOpen(true)} />
      )}

      {/* Notifications Sheet */}
      <Sheet open={notificationsOpen} onOpenChange={setNotificationsOpen}>
        <SheetContent side="right" className="w-full sm:w-[400px] glass-card border-border p-0">
          <SheetHeader className="p-4 border-b border-border">
            <SheetTitle className="text-gradient-honey flex items-center gap-2">
              <Bell className="w-5 h-5 text-honey" /> Notifications
            </SheetTitle>
          </SheetHeader>
          <div className="h-[calc(100vh-60px)] overflow-hidden">
            <NotificationsSection />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
