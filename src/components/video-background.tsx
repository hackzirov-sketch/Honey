'use client'

import { useEffect, useRef } from 'react'
import { useAppStore } from '@/lib/store'

export function VideoBackground() {
  const { theme } = useAppStore()
  const darkVideoRef = useRef<HTMLVideoElement>(null)
  const lightVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const darkVideo = darkVideoRef.current
    const lightVideo = lightVideoRef.current

    if (darkVideo) {
      darkVideo.play().catch(() => {
        // Autoplay blocked, try muted
        darkVideo.muted = true
        darkVideo.play().catch(() => {})
      })
    }
    if (lightVideo) {
      lightVideo.play().catch(() => {
        lightVideo.muted = true
        lightVideo.play().catch(() => {})
      })
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Dark mode video */}
      <video
        ref={darkVideoRef}
        autoPlay
        loop
        muted
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          theme === 'dark' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <source src="/background-dark.mp4" type="video/mp4" />
      </video>

      {/* Light mode video */}
      <video
        ref={lightVideoRef}
        autoPlay
        loop
        muted
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          theme === 'light' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <source src="/background-light.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for glassmorphism readability */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          theme === 'dark'
            ? 'opacity-100'
            : 'opacity-0'
        }`}
        style={{
          background:
            'linear-gradient(180deg, rgba(12,10,9,0.45) 0%, rgba(12,10,9,0.55) 50%, rgba(12,10,9,0.65) 100%)',
        }}
      />

      {/* Light overlay */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          theme === 'light'
            ? 'opacity-100'
            : 'opacity-0'
        }`}
        style={{
          background:
            'linear-gradient(180deg, rgba(255,251,235,0.35) 0%, rgba(255,251,235,0.45) 50%, rgba(255,251,235,0.55) 100%)',
        }}
      />
    </div>
  )
}
