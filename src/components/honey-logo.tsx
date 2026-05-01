'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface HoneyLogoProps {
  size?: 'sm' | 'lg' | 'xl'
  className?: string
  animated?: boolean
}

export function HoneyLogo({ size = 'lg', className, animated = true }: HoneyLogoProps) {
  const dimensions = size === 'sm' ? 32 : size === 'xl' ? 72 : 56
  const fontSize = size === 'sm' ? 10 : size === 'xl' ? 20 : 16
  const strokeWidth = size === 'sm' ? 1.5 : size === 'xl' ? 2.5 : 2

  return (
    <motion.div
      className={cn('relative flex items-center gap-2', className)}
      animate={animated ? { y: [0, -4, 0] } : {}}
      transition={
        animated
          ? { duration: 3, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' }
          : undefined
      }
    >
      {/* Hexagonal honeycomb icon */}
      <svg
        width={dimensions}
        height={dimensions}
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Outer hexagon */}
        <path
          d="M28 2L51.2 15V41L28 54L4.8 41V15L28 2Z"
          stroke="url(#honey-gradient)"
          strokeWidth={strokeWidth}
          fill="url(#honey-fill)"
        />
        {/* Inner hexagon */}
        <path
          d="M28 12L40.4 19.5V34.5L28 42L15.6 34.5V19.5L28 12Z"
          stroke="url(#honey-gradient-inner)"
          strokeWidth={strokeWidth * 0.75}
          fill="url(#honey-fill-inner)"
        />
        {/* Center honey drop */}
        <circle cx="28" cy="28" r="6" fill="url(#honey-drop)" />
        <circle cx="28" cy="28" r="3" fill="rgba(255, 255, 255, 0.3)" />

        {/* Gradients */}
        <defs>
          <linearGradient id="honey-gradient" x1="4.8" y1="2" x2="51.2" y2="54">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#FFB800" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <linearGradient id="honey-gradient-inner" x1="15.6" y1="12" x2="40.4" y2="42">
            <stop offset="0%" stopColor="#FFCF4A" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <radialGradient id="honey-fill" cx="28" cy="28" r="26">
            <stop offset="0%" stopColor="rgba(255, 184, 0, 0.15)" />
            <stop offset="100%" stopColor="rgba(255, 184, 0, 0.03)" />
          </radialGradient>
          <radialGradient id="honey-fill-inner" cx="28" cy="28" r="16">
            <stop offset="0%" stopColor="rgba(255, 184, 0, 0.2)" />
            <stop offset="100%" stopColor="rgba(255, 184, 0, 0.05)" />
          </radialGradient>
          <radialGradient id="honey-drop" cx="26" cy="26" r="8">
            <stop offset="0%" stopColor="#FFE44D" />
            <stop offset="100%" stopColor="#FFB800" />
          </radialGradient>
        </defs>
      </svg>

      {/* Text */}
      {size !== 'sm' && (
        <span
          className="text-gradient-honey font-bold tracking-wider"
          style={{ fontSize: `${fontSize}px` }}
        >
          HONEY
        </span>
      )}
    </motion.div>
  )
}
