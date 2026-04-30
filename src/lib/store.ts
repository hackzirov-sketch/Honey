import { create } from 'zustand'
import type { User, Notification, AppTab } from '@/types'

// ---- App Store Interface ----
interface AppState {
  // Navigation
  activeTab: AppTab
  setActiveTab: (tab: AppTab) => void

  // Theme
  theme: 'dark' | 'light'
  setTheme: (theme: 'dark' | 'light') => void
  toggleTheme: () => void

  // Auth & User
  user: User | null
  setUser: (user: User | null) => void
  isAuthenticated: boolean
  setIsAuthenticated: (val: boolean) => void

  // Notifications
  notifications: Notification[]
  setNotifications: (notifications: Notification[]) => void
  unreadCount: number
  setUnreadCount: (count: number) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void

  // UI State
  isMobileNavOpen: boolean
  setIsMobileNavOpen: (open: boolean) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  isSearching: boolean
  setIsSearching: (val: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  // Navigation
  activeTab: 'home',
  setActiveTab: (tab) => set({ activeTab: tab }),

  // Theme
  theme: 'dark',
  setTheme: (theme) => set({ theme }),
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === 'dark' ? 'light' : 'dark'
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', newTheme === 'dark')
      }
      return { theme: newTheme }
    }),

  // Auth & User
  user: null,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  isAuthenticated: false,
  setIsAuthenticated: (val) => set({ isAuthenticated: val }),

  // Notifications
  notifications: [],
  setNotifications: (notifications) =>
    set({
      notifications,
      unreadCount: notifications.filter((n) => !n.isRead).length,
    }),
  unreadCount: 0,
  setUnreadCount: (count) => set({ unreadCount: count }),
  markAsRead: (id) =>
    set((state) => {
      const notifications = state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n,
      )
      return {
        notifications,
        unreadCount: notifications.filter((n) => !n.isRead).length,
      }
    }),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
      unreadCount: 0,
    })),

  // UI State
  isMobileNavOpen: false,
  setIsMobileNavOpen: (open) => set({ isMobileNavOpen: open }),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  isSearching: false,
  setIsSearching: (val) => set({ isSearching: val }),
}))
