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
  User,
  AtSign,
  Check,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { HoneyLogo } from '@/components/honey-logo'
import { useAppStore } from '@/lib/store'
import { fadeInUp } from '@/lib/motion'

export default function RegisterPage() {
  const router = useRouter()
  const { toggleTheme, theme } = useAppStore()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [agreed, setAgreed] = useState(false)

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const passwordStrength = () => {
    const p = formData.password
    if (!p) return { level: 0, text: '', color: '' }
    let score = 0
    if (p.length >= 8) score++
    if (/[A-Z]/.test(p)) score++
    if (/[0-9]/.test(p)) score++
    if (/[^A-Za-z0-9]/.test(p)) score++
    if (score <= 1) return { level: 1, text: 'Weak', color: 'bg-red-500' }
    if (score <= 2) return { level: 2, text: 'Fair', color: 'bg-amber-500' }
    if (score <= 3) return { level: 3, text: 'Good', color: 'bg-honey' }
    return { level: 4, text: 'Strong', color: 'bg-green-500' }
  }

  const strength = passwordStrength()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) return
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setIsLoading(false)
    router.push('/')
  }

  const fields = [
    { key: 'name', label: 'Full Name', icon: User, type: 'text', placeholder: 'Jasur Karimov' },
    { key: 'email', label: 'Email', icon: Mail, type: 'email', placeholder: 'your@email.com' },
    { key: 'username', label: 'Username', icon: AtSign, type: 'text', placeholder: '@jasur_karimov' },
    { key: 'password', label: 'Password', icon: Lock, type: 'password', placeholder: 'Create a strong password' },
    { key: 'confirmPassword', label: 'Confirm Password', icon: Lock, type: 'password', placeholder: 'Repeat your password' },
  ]

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
            Join{' '}
            <span className="text-gradient-honey">Honey</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Create your account and start connecting
          </p>
        </div>
      </motion.div>

      {/* Register Card */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
        className="glass-premium rounded-3xl p-6 md:p-8 space-y-4"
      >
        <form onSubmit={handleRegister} className="space-y-3.5">
          {fields.map((field) => {
            const Icon = field.icon
            const isPasswordField = field.type === 'password'
            const showToggle = isPasswordField && (field.key === 'password' || field.key === 'confirmPassword')

            return (
              <div key={field.key} className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                  <Icon className="w-3 h-3" />
                  {field.label}
                </label>
                <div className="relative">
                  <Input
                    type={showToggle
                      ? (field.key === 'password' ? (showPassword ? 'text' : 'password') : (showConfirm ? 'text' : 'password'))
                      : field.type
                    }
                    value={formData[field.key as keyof typeof formData]}
                    onChange={(e) => updateField(field.key, e.target.value)}
                    onFocus={() => setFocusedField(field.key)}
                    onBlur={() => setFocusedField(null)}
                    placeholder={field.placeholder}
                    className="bg-transparent h-11 rounded-xl pl-4 pr-12 text-sm transition-all duration-200"
                    style={{
                      boxShadow: focusedField === field.key
                        ? '0 0 0 2px rgba(255,184,0,0.2), 0 4px 16px rgba(255,184,0,0.08)'
                        : 'none',
                    }}
                    required
                  />
                  {showToggle && (
                    <button
                      type="button"
                      onClick={() => {
                        if (field.key === 'password') setShowPassword(!showPassword)
                        else setShowConfirm(!showConfirm)
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {field.key === 'password'
                        ? (showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />)
                        : (showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />)
                      }
                    </button>
                  )}
                </div>

                {/* Password strength indicator */}
                {field.key === 'password' && formData.password && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-1.5"
                  >
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            level <= strength.level ? strength.color : 'bg-muted/30'
                          }`}
                        />
                      ))}
                    </div>
                    <p className={`text-[10px] font-medium ${
                      strength.level <= 1 ? 'text-red-400' :
                      strength.level <= 2 ? 'text-amber-400' :
                      strength.level <= 3 ? 'text-honey' : 'text-green-400'
                    }`}>
                      {strength.text}
                    </p>
                  </motion.div>
                )}

                {/* Password mismatch warning */}
                {field.key === 'confirmPassword' && formData.confirmPassword &&
                  formData.password !== formData.confirmPassword && (
                  <p className="text-[10px] text-red-400 flex items-center gap-1">
                    Passwords don&apos;t match
                  </p>
                )}
              </div>
            )
          })}

          {/* Terms checkbox */}
          <div className="flex items-start gap-2.5 pt-1">
            <button
              type="button"
              onClick={() => setAgreed(!agreed)}
              className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all ${
                agreed
                  ? 'bg-honey border-honey'
                  : 'border-border hover:border-honey/50'
              }`}
            >
              {agreed && <Check className="w-3 h-3 text-background" />}
            </button>
            <span className="text-[11px] text-muted-foreground leading-relaxed">
              I agree to the{' '}
              <span className="text-honey cursor-pointer hover:underline">Terms of Service</span>
              {' '}and{' '}
              <span className="text-honey cursor-pointer hover:underline">Privacy Policy</span>
            </span>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading || !agreed}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-honey via-honey-light to-honey text-background font-semibold text-sm flex items-center justify-center gap-2 shadow-honey-lg hover:shadow-honey transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full"
              />
            ) : (
              <>
                Create Account
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-border/50" />
          <span className="text-[11px] text-muted-foreground">or sign up with</span>
          <div className="flex-1 h-px bg-border/50" />
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>, label: 'Google' },
            { icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>, label: 'GitHub' },
            { icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>, label: 'Apple' },
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

      {/* Login Link */}
      <motion.p
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
        className="text-center text-sm text-muted-foreground"
      >
        Already have an account?{' '}
        <Link href="/login" className="text-honey hover:text-honey-light font-semibold transition-colors">
          Sign in
        </Link>
      </motion.p>
    </div>
  )
}
