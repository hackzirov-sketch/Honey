import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Toaster } from "sonner"
import { VideoBackground } from "@/components/video-background"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Honey — Social Platform",
  description:
    "Luxury all-in-one social communication platform. Chat, meet, stream, and share — all in one beautiful place.",
  keywords: ["Honey", "Social Platform", "Chat", "Video", "Streaming", "Communication"],
  authors: [{ name: "Honey Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Honey — Social Platform",
    description: "Luxury all-in-one social communication platform",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground font-sans`}
      >
        <VideoBackground />
        <div className="relative z-10 min-h-screen">
          {children}
        </div>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: 'rgba(28, 25, 23, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 184, 0, 0.15)',
              color: '#FAFAF9',
            },
          }}
        />
      </body>
    </html>
  )
}
