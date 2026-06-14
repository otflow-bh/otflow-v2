import { cn } from '@/lib/utils'

export function OTFlowLogo({
  className,
  showText = true,
}: {
  className?: string
  showText?: boolean
}) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563eb] via-[#06b6d4] to-[#7c3aed]">
        <div className="h-4 w-4 rounded-sm bg-[#0f172a]" />
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[#06b6d4]" />
      </div>
      {showText && (
        <span className="font-heading text-xl font-bold tracking-tight">
          OT<span className="text-gradient">Flow</span>
        </span>
      )}
    </div>
  )
}
