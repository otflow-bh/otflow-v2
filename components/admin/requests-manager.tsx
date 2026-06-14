'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { approveRequest, updateRequestStatus } from '@/lib/actions'
import { Mail, Phone, Building2, Check, X } from 'lucide-react'

type Request = {
  id: string
  business_name: string
  contact_name: string | null
  email: string
  phone: string | null
  business_type: string | null
  notes: string | null
  status: string
  created_at: string
}

const STATUS: Record<string, { label: string; cls: string }> = {
  new: { label: 'جديد', cls: 'bg-primary/15 text-primary' },
  reviewing: { label: 'قيد المراجعة', cls: 'bg-accent/20 text-accent-foreground' },
  approved: { label: 'مقبول', cls: 'bg-chart-2/25 text-foreground' },
  rejected: { label: 'مرفوض', cls: 'bg-destructive/15 text-destructive' },
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 24) || `store-${Math.floor(Math.random() * 9999)}`
}

export function RequestsManager({ requests }: { requests: Request[] }) {
  const [list, setList] = useState(requests)

  const approve = async (r: Request) => {
    setList((prev) => prev.map((x) => (x.id === r.id ? { ...x, status: 'approved' } : x)))
    await approveRequest({ requestId: r.id, name: r.business_name, slug: slugify(r.business_name) })
  }
  const reject = async (r: Request) => {
    setList((prev) => prev.map((x) => (x.id === r.id ? { ...x, status: 'rejected' } : x)))
    await updateRequestStatus(r.id, 'rejected')
  }

  if (list.length === 0) {
    return (
      <Card className="glass border-border/50 p-10 text-center">
        <Building2 className="text-muted-foreground mx-auto mb-2 size-8" />
        <p className="font-medium">لا توجد طلبات انضمام</p>
        <p className="text-muted-foreground text-sm">طلبات إنشاء المتاجر الجديدة ستظهر هنا.</p>
      </Card>
    )
  }

  return (
    <div className="grid gap-3 lg:grid-cols-2">
      {list.map((r) => (
        <Card key={r.id} className="glass border-border/50 space-y-3 p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-heading font-bold">{r.business_name}</h3>
              <p className="text-muted-foreground text-xs">{r.contact_name}</p>
            </div>
            <Badge className={STATUS[r.status]?.cls}>{STATUS[r.status]?.label}</Badge>
          </div>
          <div className="text-muted-foreground space-y-1 text-xs">
            <p className="flex items-center gap-1.5">
              <Mail className="size-3" /> {r.email}
            </p>
            {r.phone && (
              <p className="flex items-center gap-1.5">
                <Phone className="size-3" /> {r.phone}
              </p>
            )}
            {r.notes && <p className="border-border/50 mt-2 border-t pt-2">{r.notes}</p>}
          </div>
          {(r.status === 'new' || r.status === 'reviewing') && (
            <div className="flex gap-2">
              <Button size="sm" className="flex-1" onClick={() => approve(r)}>
                <Check className="size-4" /> قبول وإنشاء متجر
              </Button>
              <Button size="sm" variant="outline" onClick={() => reject(r)}>
                <X className="size-4" />
              </Button>
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}
