import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  DollarSign,
  Clock,
  Store,
  Inbox,
  CheckCircle2,
  Building2,
  type LucideIcon,
} from 'lucide-react'

export const iconMap = {
  LayoutDashboard,
  Package,
  ShoppingBag,
  DollarSign,
  Clock,
  Store,
  Inbox,
  CheckCircle2,
  Building2,
} satisfies Record<string, LucideIcon>

export type IconName = keyof typeof iconMap

export function resolveIcon(name: IconName): LucideIcon {
  return iconMap[name] ?? LayoutDashboard
}
