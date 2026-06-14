import { Card } from '@/components/ui/card'
import { resolveIcon, type IconName } from '@/components/dashboard/icon-map'

export type Stat = {
  label: string
  value: string
  icon: IconName
  hint?: string
}

export function StatCards({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map((s) => {
        const Icon = resolveIcon(s.icon)
        return (
          <Card
            key={s.label}
            className="glass border-border/50 flex flex-col gap-3 p-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs font-medium">{s.label}</span>
              <span className="bg-primary/10 text-primary flex size-8 items-center justify-center rounded-lg">
                <Icon className="size-4" />
              </span>
            </div>
            <div>
              <div className="font-heading text-2xl font-bold tracking-tight">{s.value}</div>
              {s.hint ? <div className="text-muted-foreground mt-0.5 text-xs">{s.hint}</div> : null}
            </div>
          </Card>
        )
      })}
    </div>
  )
}
