'use client'

import { LanguageProvider } from '@/lib/use-lang'
import { StartForm } from '@/components/start/start-form'

export default function StartPage() {
  return (
    <LanguageProvider initial="ar">
      <StartForm />
    </LanguageProvider>
  )
}
