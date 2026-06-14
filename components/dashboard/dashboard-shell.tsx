'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { OTFlowLogo } from '@/components/otflow-logo'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { LogOut, Menu, X } from 'lucide-react'
import { resolveIcon, type IconName } from '@/components/dashboard/icon-map'

export type NavItem = { href: string; label: string; icon: IconName }

export function DashboardShell({
  title,
  subtitle,
  nav,
  accent = 'blue',
  children,
}: {
  title: string
  subtitle?: string
  nav: NavItem[]
  accent?: 'blue' | 'pink'
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const signOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth/login')
    router.refresh()
  }

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 right-0 z-50 w-64 border-l border-border bg-card/95 backdrop-blur transition-transform md:translate-x-0',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex items-center justify-between p-5">
          <OTFlowLogo />
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(false)}>
            <X className="size-5" />
          </Button>
        </div>
        <div className="px-3">
          <div className="mb-2 px-3 text-xs font-medium text-muted-foreground">{title}</div>
          <nav className="space-y-1">
            {nav.map((item) => {
              const active = pathname === item.href
              const Icon = resolveIcon(item.icon)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors',
                    active
                      ? accent === 'pink'
                        ? 'bg-primary/15 text-primary'
                        : 'bg-primary/15 text-primary'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
                  )}
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-3">
          <Button variant="outline" className="w-full justify-start gap-3" onClick={signOut}>
            <LogOut className="size-4" />
            تسجيل الخروج
          </Button>
        </div>
      </aside>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      {/* Main */}
      <div className="md:pr-64">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/80 px-4 py-3 backdrop-blur md:px-8">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(true)}>
            <Menu className="size-5" />
          </Button>
          <div>
            <h1 className="font-heading text-lg font-bold md:text-xl">{title}</h1>
            {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          </div>
          <div className="w-9 md:hidden" />
        </header>
        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  )
}
