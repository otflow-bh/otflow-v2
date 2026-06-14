import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist_Mono, Space_Grotesk, IBM_Plex_Sans_Arabic, Cairo } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const ibmArabic = IBM_Plex_Sans_Arabic({
  variable: '--font-geist-sans',
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700'],
})
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})
const cairo = Cairo({
  variable: '--font-space-grotesk',
  subsets: ['arabic', 'latin'],
  weight: ['600', '700', '800'],
})
const spaceGrotesk = Space_Grotesk({
  variable: '--font-display-latin',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'OTFlow — Advanced Technology. Built to Serve You.',
  description:
    'OTFlow is a premium platform to launch and manage online ordering workspaces for your business. تكنولوجيا متقدمة. موجودة لخدمتك. لتبسيط حياتك.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${ibmArabic.variable} ${geistMono.variable} ${cairo.variable} ${spaceGrotesk.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        <Toaster position="top-center" />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
