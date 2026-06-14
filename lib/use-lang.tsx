'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

type Lang = 'ar' | 'en'

type LangContextValue = {
  lang: Lang
  dir: 'rtl' | 'ltr'
  toggle: () => void
  setLang: (l: Lang) => void
  t: (ar: string, en: string) => string
}

const LangContext = createContext<LangContextValue | null>(null)

export function LanguageProvider({
  children,
  initial = 'ar',
}: {
  children: ReactNode
  initial?: Lang
}) {
  const [lang, setLang] = useState<Lang>(initial)

  const toggle = useCallback(() => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'))
  }, [])

  const t = useCallback((ar: string, en: string) => (lang === 'ar' ? ar : en), [lang])

  return (
    <LangContext.Provider
      value={{ lang, dir: lang === 'ar' ? 'rtl' : 'ltr', toggle, setLang, t }}
    >
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) {
    throw new Error('useLang must be used within a LanguageProvider')
  }
  return ctx
}
