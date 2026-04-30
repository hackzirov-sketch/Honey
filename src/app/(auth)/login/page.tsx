'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Github,
  Chrome,
  Apple,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { HoneyLogo } from '@/components/honey-logo'
import { useAppStore } from '@/lib/store'
import { fadeInUp, springPresets } from '@/lib/motion'

export default function LoginPage() {
  const router = useRouter()
  const { toggleTheme, theme } = useAppStore()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate login delay
    await new Promise((r) => setTimeout(r, 1500))
    setIsLoading(false)
    router.push('/')
  }

  return (
    <div className="space-y-6">
      {/* Theme toggle */}
      <div className="flex justify-end">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className="p-2.5 rounded-full glass-card hover:bg-accent/50 transition-colors"
        >
          {theme === 'dark' ? (
            <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </motion.button>
      </div>

      {/* Logo + Title */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="text-center space-y-3"
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="flex justify-center"
        >
          <HoneyLogo size="xl" animated />
        </motion.div>
        <div>
          <h1 className="text-2xl font-bold">
            Welcome back to{' '}
            <span className="text-gradient-honey">Honey</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Sign in to continue your experience
          </p>
        </div>
      </motion.div>

      {/* Login Card */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
        className="glass-premium rounded-3xl p-6 md:p-8 space-y-5"
      >
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <Mail className="w-3 h-3" />
              Email
            </label>
            <div className="relative">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                placeholder="your@email.com"
                className="bg-transparent h-12 rounded-xl pl-4 text-sm transition-all duration-200"
                style={{
                  boxShadow: focusedField === 'email'
                    ? '0 0 0 2px rgba(255,184,0,0.2), 0 4px 16px rgba(255,184,0,0.08)'
                    : 'none',
                }}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <Lock className="w-3 h-3" />
              Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                placeholder="Enter your password"
                className="bg-transparent h-12 rounded-xl pl-4 pr-12 text-sm transition-all duration-200"
                style={{
                  boxShadow: focusedField === 'password'
                    ? '0 0 0 2px rgba(255,184,0,0.2), 0 4px 16px rgba(255,184,0,0.08)'
                    : 'none',
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <button type="button" className="text-xs text-honey hover:text-honey-light transition-colors font-medium">
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-honey via-honey-light to-honey text-background font-semibold text-sm flex items-center justify-center gap-2 shadow-honey-lg hover:shadow-honey transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full"
              />
            ) : (
              <>
                Sign In
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-border/50" />
          <span className="text-[11px] text-muted-foreground">or continue with</span>
          <div className="flex-1 h-px bg-border/50" />
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: <Chrome className="w-4 h-4" />, label: 'Google' },
            { icon: <Github className="w-4 h-4" />, label: 'GitHub' },
            { icon: <Apple className="w-4 h-4" />, label: 'Apple' },
          ].map((provider) => (
            <motion.button
              key={provider.label}
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              className="flex flex-col items-center gap-1.5 py-3 rounded-xl glass-card hover:bg-accent/30 transition-all text-muted-foreground hover:text-foreground"
            >
              {provider.icon}
              <span className="text-[10px] font-medium">{provider.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Sign Up Link */}
      <motion.p
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
        className="text-center text-sm text-muted-foreground"
      >
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-honey hover:text-honey-light font-semibold transition-colors">
          Create one
        </Link>
      </motion.p>
    </div>
  )
}
