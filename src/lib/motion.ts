// ============================================
// Honey — Premium Motion Design System
// iOS 17 + visionOS inspired animations
// ============================================
import type { Variants, Transition } from 'framer-motion'

// ============================================
// Spring Physics Presets
// ============================================
export const springPresets = {
  /** Snappy & responsive — buttons, cards */
  snappy: { type: 'spring' as const, stiffness: 400, damping: 25 },
  /** Smooth & bouncy — general UI */
  smooth: { type: 'spring' as const, stiffness: 300, damping: 24 },
  /** Gentle & floaty — modals, overlays */
  gentle: { type: 'spring' as const, stiffness: 200, damping: 20 },
  /** Bouncy — playful interactions */
  bouncy: { type: 'spring' as const, stiffness: 500, damping: 30 },
  /** Stiff — layout shifts, reordering */
  stiff: { type: 'spring' as const, stiffness: 350, damping: 30 },
  /** Slow & elegant — page transitions */
  elegant: { type: 'spring' as const, stiffness: 150, damping: 20 },
} satisfies Record<string, Transition>

// ============================================
// Fade Variants
// ============================================
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.15, ease: 'easeIn' } },
}

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { ...springPresets.smooth } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
}

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0, transition: { ...springPresets.smooth } },
  exit: { opacity: 0, y: 8, transition: { duration: 0.15 } },
}

export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { ...springPresets.smooth } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } },
}

// ============================================
// Slide Variants
// ============================================
export const slideInRight: Variants = {
  hidden: { x: 40, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { ...springPresets.stiff } },
  exit: { x: 40, opacity: 0, transition: { duration: 0.2 } },
}

export const slideInLeft: Variants = {
  hidden: { x: -40, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { ...springPresets.stiff } },
  exit: { x: -40, opacity: 0, transition: { duration: 0.2 } },
}

export const slideInUp: Variants = {
  hidden: { y: 60, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { ...springPresets.elegant } },
  exit: { y: 60, opacity: 0, transition: { duration: 0.2 } },
}

// ============================================
// Glass Card Variants
// ============================================
export const glassCardHover = {
  whileHover: {
    scale: 1.03,
    y: -4,
    boxShadow: '0 12px 40px rgba(255, 184, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.2)',
    transition: { ...springPresets.snappy },
  },
  whileTap: {
    scale: 0.97,
    transition: { duration: 0.1 },
  },
}

export const glassCardSubtle = {
  whileHover: {
    scale: 1.01,
    y: -2,
    transition: { ...springPresets.snappy },
  },
  whileTap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
}

// ============================================
// Premium Button Variants
// ============================================
export const buttonHover = {
  whileHover: { scale: 1.04, transition: { ...springPresets.snappy } },
  whileTap: { scale: 0.96, transition: { duration: 0.08 } },
}

export const buttonGlow = {
  whileHover: {
    scale: 1.04,
    boxShadow: '0 0 20px rgba(255, 184, 0, 0.3), 0 4px 16px rgba(255, 184, 0, 0.15)',
    transition: { ...springPresets.snappy },
  },
  whileTap: { scale: 0.96, transition: { duration: 0.08 } },
}

// ============================================
// Stagger Container Variants
// ============================================
export const staggerContainer = (staggerDelay = 0.05): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.05,
    },
  },
})

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ...springPresets.smooth },
  },
}

// ============================================
// Message Bubble Variants
// ============================================
export const messageBubble: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.96, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { ...springPresets.smooth },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.15 },
  },
}

export const messageBubbleOwn: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.96, x: 10 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    x: 0,
    transition: { ...springPresets.snappy },
  },
}

// ============================================
// Reaction Pop Variants
// ============================================
export const reactionPop: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { ...springPresets.bouncy },
  },
  exit: {
    opacity: 0,
    scale: 0,
    transition: { duration: 0.15 },
  },
}

// ============================================
// Like Burst Animation Config
// ============================================
export const likeBurstParticles = Array.from({ length: 8 }, (_, i) => {
  const angle = (i / 8) * Math.PI * 2
  const distance = 40 + Math.random() * 30
  return {
    id: i,
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    scale: 0.5 + Math.random() * 0.8,
    rotation: Math.random() * 360,
  }
})

// ============================================
// Video Card Variants
// ============================================
export const videoCard: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ...springPresets.smooth },
  },
}

// ============================================
// Video Player Overlay Variants
// ============================================
export const videoOverlayFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
}

// ============================================
// Comments Slide-Up Variants
// ============================================
export const commentsSlideUp: Variants = {
  hidden: { y: '100%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { ...springPresets.stiff },
  },
  exit: {
    y: '100%',
    opacity: 0,
    transition: { duration: 0.2 },
  },
}

// ============================================
// Panel Variants (sidebar, drawers)
// ============================================
export const panelSlideRight: Variants = {
  hidden: { x: '100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { ...springPresets.stiff },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
}

export const panelSlideLeft: Variants = {
  hidden: { x: '-100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { ...springPresets.stiff },
  },
  exit: {
    x: '-100%',
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
}

// ============================================
// Meeting Participant Variants
// ============================================
export const participantJoin: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { ...springPresets.smooth },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.2 },
  },
}

// ============================================
// Typing Dots Config
// ============================================
export const typingDotConfig = Array.from({ length: 3 }, (_, i) => ({
  delay: i * 0.15,
}))

// ============================================
// Notification Badge Pop
// ============================================
export const badgePop: Variants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: { ...springPresets.bouncy },
  },
  exit: {
    scale: 0,
    transition: { duration: 0.1 },
  },
}

// ============================================
// Floating Action Button
// ============================================
export const fabVariants = {
  whileHover: {
    scale: 1.08,
    y: -2,
    boxShadow: '0 8px 30px rgba(255, 184, 0, 0.25)',
    transition: { ...springPresets.snappy },
  },
  whileTap: {
    scale: 0.94,
    transition: { duration: 0.1 },
  },
}

// ============================================
// Page Transition Variants
// ============================================
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 8, filter: 'blur(4px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    filter: 'blur(4px)',
    transition: { duration: 0.2, ease: 'easeIn' },
  },
}

// ============================================
// Tooltip Variants
// ============================================
export const tooltipVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 4 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { ...springPresets.snappy },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    y: 4,
    transition: { duration: 0.1 },
  },
}

// ============================================
// Skeleton / Shimmer
// ============================================
export const skeletonPulse: Variants = {
  animate: {
    opacity: [0.4, 0.7, 0.4],
    transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
  },
}

// ============================================
// Scale-in utility (for modals, dialogs)
// ============================================
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { ...springPresets.smooth },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.15 },
  },
}

// ============================================
// Hover Glow Effect
// ============================================
export const hoverGlow = {
  whileHover: {
    boxShadow: '0 0 0px rgba(255, 184, 0, 0), 0 0 20px rgba(255, 184, 0, 0.1)',
    transition: { duration: 0.3 },
  },
}
