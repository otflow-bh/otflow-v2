'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLang } from '@/lib/use-lang'
import { OTFlowLogo } from '@/components/otflow-logo'
import { LangToggle } from '@/components/lang-toggle'

export function PageHeader() {
  const { t } = useLang()
  return (
    <header className="sticky top-0 z-40 border-b border-border glass-strong">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <OTFlowLogo />
        </Link>
        <div className="flex items-center gap-2">
          <LangToggle />
          <Link
            href="/"
            className="hidden items-center gap-1 text-sm text-muted-foreground hover:text-foreground sm:flex"
          >
            {t('الرئيسية', 'Home')}
            <ArrowRight className="size-4 ltr:rotate-180" />
          </Link>
        </div>
      </div>
    </header>
  )
}
