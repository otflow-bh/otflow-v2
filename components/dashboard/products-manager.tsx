'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { toggleProduct, upsertProduct } from '@/lib/actions'
import type { ProductRow } from '@/lib/queries'
import { Plus, Pencil } from 'lucide-react'

export function ProductsManager({
  products,
  storeId,
  currency,
  canEdit,
}: {
  products: ProductRow[]
  storeId: string
  currency: string
  canEdit: boolean
}) {
  const [list, setList] = useState(products)
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<ProductRow | null>(null)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ name: '', description: '', category: '', price: '', imageUrl: '' })

  const openNew = () => {
    setEditing(null)
    setForm({ name: '', description: '', category: '', price: '', imageUrl: '' })
    setOpen(true)
  }
  const openEdit = (p: ProductRow) => {
    setEditing(p)
    setForm({
      name: p.name,
      description: p.description ?? '',
      category: p.category ?? '',
      price: String(p.price),
      imageUrl: p.image_url ?? '',
    })
    setOpen(true)
  }

  const save = async () => {
    setSaving(true)
    await upsertProduct({
      id: editing?.id,
      storeId,
      name: form.name,
      description: form.description,
      category: form.category,
      price: Number(form.price) || 0,
      imageUrl: form.imageUrl,
      storeSlug: 'ladolce',
    })
    setSaving(false)
    setOpen(false)
    // optimistic local refresh
    if (editing) {
      setList((prev) =>
        prev.map((p) =>
          p.id === editing.id
            ? { ...p, name: form.name, description: form.description, category: form.category, price: Number(form.price) || 0, image_url: form.imageUrl }
            : p,
        ),
      )
    }
  }

  const flip = async (p: ProductRow, available: boolean) => {
    setList((prev) => prev.map((x) => (x.id === p.id ? { ...x, available } : x)))
    await toggleProduct(p.id, available, 'ladolce')
  }

  return (
    <div className="space-y-3">
      {canEdit && (
        <div className="flex justify-end">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
              render={
                <Button onClick={openNew} size="sm">
                  <Plus className="size-4" /> منتج جديد
                </Button>
              }
            />
            <DialogContent dir="rtl">
              <DialogHeader>
                <DialogTitle>{editing ? 'تعديل المنتج' : 'منتج جديد'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label>الاسم</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label>الوصف</Label>
                  <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label>التصنيف</Label>
                    <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>السعر ({currency})</Label>
                    <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>رابط الصورة</Label>
                  <Input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="/products/..." />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={save} disabled={saving || !form.name}>
                  {saving ? 'جارٍ الحفظ...' : 'حفظ'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <Card key={p.id} className="glass border-border/50 overflow-hidden p-0">
            <div className="bg-secondary relative aspect-video">
              {p.image_url ? (
                <Image src={p.image_url || "/placeholder.svg"} alt={p.name} fill className="object-cover" />
              ) : null}
            </div>
            <div className="space-y-2 p-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-heading font-semibold leading-tight">{p.name}</h3>
                  {p.category && <Badge variant="secondary" className="mt-1 text-xs">{p.category}</Badge>}
                </div>
                <span className="font-heading font-bold">
                  {Number(p.price).toFixed(2)} {currency}
                </span>
              </div>
              <p className="text-muted-foreground line-clamp-2 text-xs">{p.description}</p>
              {canEdit && (
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 text-xs">
                    <Switch checked={p.available} onCheckedChange={(v) => flip(p, v)} />
                    {p.available ? 'متاح' : 'مخفي'}
                  </label>
                  <Button variant="ghost" size="sm" onClick={() => openEdit(p)}>
                    <Pencil className="size-3.5" /> تعديل
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
