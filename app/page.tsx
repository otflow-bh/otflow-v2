'use client'

import { LanguageProvider, useLang } from '@/lib/use-lang'
import { LandingNav } from '@/components/landing/landing-nav'
import { Hero } from '@/components/landing/hero'
import { WhyOTFlow, HowItWorks, Features } from '@/components/landing/sections'
import { Pricing, Contact, Footer } from '@/components/landing/pricing-contact'

function LandingContent() {
  const { dir } = useLang()
  return (
    <main dir={dir} className="min-h-screen bg-background">
      <LandingNav />
      <Hero />
      <WhyOTFlow />
      <HowItWorks />
      <Features />
      <Pricing />
      <Contact />
      <Footer />
    </main>
  )
}

export default function HomePage() {
  return (
    <LanguageProvider initial="ar">
      <LandingContent />
    </LanguageProvider>
  )
}
