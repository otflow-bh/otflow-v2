'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useLang } from '@/lib/use-lang'
import { OTFlowLogo } from '@/components/otflow-logo'
import { LangToggle } from '@/components/lang-toggle'
import { Button } from '@/components/ui/button'

export function LandingNav() {
  const { t } = useLang()
  const [open, setOpen] = useState(false)

  const links = [
    { href: '#why', label: t('لماذا OTFlow', 'Why OTFlow') },
    { href: '#how', label: t('كيف يعمل', 'How it works') },
    { href: '#features', label: t('المميزات', 'Features') },
    { href: '#pricing', label: t('الأسعار', 'Pricing') },
    { href: '#contact', label: t('تواصل', 'Contact') },
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-3 flex max-w-6xl items-center justify-between gap-4 rounded-2xl glass-strong px-4 py-3 sm:mx-4 lg:mx-auto">
        <Link href="/">
          <OTFlowLogo />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LangToggle className="hidden sm:flex" />
          <Button render={<Link href="/start" />} nativeButton={false} size="sm" className="hidden sm:flex">
            {t('ابدأ طلبك', 'Start Request')}
          </Button>
          <button
            className="md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mx-4 mt-2 rounded-2xl glass-strong p-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm text-muted-foreground"
              >
                {l.label}
              </a>
            ))}
            <div className="flex items-center gap-2 pt-2">
              <LangToggle />
              <Button render={<Link href="/start" />} nativeButton={false} size="sm">
                {t('ابدأ طلبك', 'Start Request')}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
