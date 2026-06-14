import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Store } from '@/lib/queries'
import { Store as StoreIcon, ExternalLink, Settings } from 'lucide-react'

const STATUS: Record<string, { label: string; cls: string }> = {
  active: { label: 'نشط', cls: 'bg-chart-2/25 text-foreground' },
  paused: { label: 'متوقف', cls: 'bg-accent/20 text-accent-foreground' },
  pending: { label: 'بانتظار', cls: 'bg-primary/15 text-primary' },
}

export function StoresList({ stores }: { stores: Store[] }) {
  if (stores.length === 0) {
    return (
      <Card className="glass border-border/50 p-10 text-center">
        <StoreIcon className="text-muted-foreground mx-auto mb-2 size-8" />
        <p className="font-medium">لا توجد متاجر بعد</p>
      </Card>
    )
  }
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {stores.map((s) => (
        <Card key={s.id} className="glass border-border/50 space-y-3 p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <span
                className="flex size-9 items-center justify-center rounded-lg text-sm font-bold text-white"
                style={{ backgroundColor: s.primary_color ?? '#2563EB' }}
              >
                {s.name.slice(0, 1)}
              </span>
              <div>
                <h3 className="font-heading font-semibold leading-tight">{s.name}</h3>
                <p className="text-muted-foreground text-xs">/{s.slug}</p>
              </div>
            </div>
            <Badge className={STATUS[s.status]?.cls}>{STATUS[s.status]?.label}</Badge>
          </div>
          {s.tagline && <p className="text-muted-foreground line-clamp-2 text-xs">{s.tagline}</p>}
          <div className="flex gap-2">
            <Button render={<Link href={`/${s.slug}`} />} nativeButton={false} size="sm" variant="outline" className="flex-1">
              <ExternalLink className="size-3.5" /> المتجر
            </Button>
            <Button render={<Link href={`/workspace/${s.slug}`} />} nativeButton={false} size="sm" variant="outline" className="flex-1">
              <Settings className="size-3.5" /> الإدارة
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}
