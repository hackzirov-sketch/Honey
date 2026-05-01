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
  authToken: string | null
  refreshToken: string | null
  setAuthSession: (input: { user: User; accessToken: string; refreshToken: string }) => void
  clearAuthSession: () => void
  hydrateAuthFromStorage: () => void

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
  setUser: (user) =>
    set((state) => ({
      user,
      isAuthenticated: !!user || !!state.authToken,
    })),
  isAuthenticated: false,
  setIsAuthenticated: (val) => set({ isAuthenticated: val }),
  authToken: null,
  refreshToken: null,
  setAuthSession: ({ user, accessToken, refreshToken }) =>
    set(() => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('honey_access_token', accessToken)
        localStorage.setItem('honey_refresh_token', refreshToken)
        localStorage.setItem('honey_user', JSON.stringify(user))
      }
      return {
        user,
        authToken: accessToken,
        refreshToken,
        isAuthenticated: true,
      }
    }),
  clearAuthSession: () =>
    set(() => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('honey_access_token')
        localStorage.removeItem('honey_refresh_token')
        localStorage.removeItem('honey_user')
      }
      return {
        user: null,
        authToken: null,
        refreshToken: null,
        isAuthenticated: false,
      }
    }),
  hydrateAuthFromStorage: () =>
    set(() => {
      if (typeof window === 'undefined') {
        return {}
      }

      const accessToken = localStorage.getItem('honey_access_token')
      const storedRefreshToken = localStorage.getItem('honey_refresh_token')
      const storedUser = localStorage.getItem('honey_user')

      let parsedUser: User | null = null
      if (storedUser) {
        try {
          parsedUser = JSON.parse(storedUser) as User
        } catch {
          parsedUser = null
        }
      }

      return {
        user: parsedUser,
        authToken: accessToken,
        refreshToken: storedRefreshToken,
        isAuthenticated: Boolean(accessToken),
      }
    }),

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
