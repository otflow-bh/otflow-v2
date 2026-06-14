'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { updateOrderStatus } from '@/lib/actions'
import { Clock, MapPin, Phone, Package } from 'lucide-react'

export type Order = {
  id: string
  customer_name: string
  customer_phone: string | null
  fulfillment: string
  address: string | null
  payment_method: string | null
  total: number
  status: string
  items: { name: string; qty: number; price: number }[]
  created_at: string
}

const STATUS: Record<string, { label: string; cls: string }> = {
  new: { label: 'جديد', cls: 'bg-primary/15 text-primary' },
  preparing: { label: 'قيد التحضير', cls: 'bg-accent/20 text-accent-foreground' },
  ready: { label: 'جاهز', cls: 'bg-chart-2/20 text-foreground' },
  out_for_delivery: { label: 'قيد التوصيل', cls: 'bg-chart-4/20 text-foreground' },
  completed: { label: 'مكتمل', cls: 'bg-chart-2/25 text-foreground' },
  cancelled: { label: 'ملغى', cls: 'bg-destructive/15 text-destructive' },
}

const FLOW = ['new', 'preparing', 'ready', 'out_for_delivery', 'completed']

export function OrdersBoard({
  initialOrders,
  currency,
  storeSlug,
}: {
  initialOrders: Order[]
  currency: string
  storeSlug: string
}) {
  const [orders, setOrders] = useState(initialOrders)
  const [filter, setFilter] = useState('all')

  const change = async (id: string, status: string) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)))
    await updateOrderStatus(id, status, storeSlug)
  }

  const shown = filter === 'all' ? orders : orders.filter((o) => o.status === filter)

  if (orders.length === 0) {
    return (
      <Card className="glass border-border/50 flex flex-col items-center gap-2 p-10 text-center">
        <Package className="text-muted-foreground size-8" />
        <p className="font-medium">لا توجد طلبات بعد</p>
        <p className="text-muted-foreground text-sm">ستظهر الطلبات الجديدة هنا فور وصولها.</p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {['all', ...FLOW, 'cancelled'].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === s ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
            }`}
          >
            {s === 'all' ? 'الكل' : STATUS[s]?.label}
          </button>
        ))}
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        {shown.map((o) => (
          <Card key={o.id} className="glass border-border/50 space-y-3 p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-heading font-bold">#{o.id.slice(0, 4).toUpperCase()}</span>
                  <Badge className={STATUS[o.status]?.cls}>{STATUS[o.status]?.label}</Badge>
                </div>
                <p className="text-muted-foreground mt-1 flex items-center gap-1 text-xs">
                  <Clock className="size-3" />
                  {new Date(o.created_at).toLocaleString('ar')}
                </p>
              </div>
              <div className="text-left">
                <div className="font-heading text-lg font-bold">
                  {o.total.toFixed(2)} {currency}
                </div>
                <span className="text-muted-foreground text-xs">{o.payment_method}</span>
              </div>
            </div>

            <div className="border-border/50 space-y-1 border-y py-2 text-sm">
              {o.items.map((it, i) => (
                <div key={i} className="flex justify-between">
                  <span>
                    {it.name} × {it.qty}
                  </span>
                  <span className="text-muted-foreground">{(it.price * it.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="text-muted-foreground space-y-1 text-xs">
              <p className="flex items-center gap-1.5">
                <Phone className="size-3" /> {o.customer_name} — {o.customer_phone}
              </p>
              {o.address && (
                <p className="flex items-center gap-1.5">
                  <MapPin className="size-3" /> {o.address}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Select value={o.status} onValueChange={(v) => change(o.id, v)}>
                <SelectTrigger className="h-9 flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(STATUS).map(([k, v]) => (
                    <SelectItem key={k} value={k}>
                      {v.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {FLOW.indexOf(o.status) >= 0 && FLOW.indexOf(o.status) < FLOW.length - 1 && (
                <Button size="sm" onClick={() => change(o.id, FLOW[FLOW.indexOf(o.status) + 1])}>
                  التالي
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
