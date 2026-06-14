'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import {
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  Zap,
  Wallet,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Crown,
} from 'lucide-react'
import { DELIVERY_OPTIONS, PAYMENT_OPTIONS, type Product } from '@/lib/demo-data'
import { waLink } from '@/lib/brand'
import { placeOrder } from '@/lib/actions'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'

type Step = 'landing' | 'products' | 'details' | 'delivery' | 'payment' | 'confirm'

const STEP_ORDER: Step[] = ['landing', 'products', 'details', 'delivery', 'payment', 'confirm']
const STEP_LABELS: Record<Step, string> = {
  landing: 'الرئيسية',
  products: 'المنتجات',
  details: 'بياناتك',
  delivery: 'التوصيل',
  payment: 'الدفع',
  confirm: 'التأكيد',
}

export function LaDolceFlow({
  storeId,
  products,
}: {
  storeId: string | null
  products: Product[]
}) {
  const [step, setStep] = useState<Step>('landing')
  const [qty, setQty] = useState<Record<string, number>>({})
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '' })
  const [delivery, setDelivery] = useState<string>('normal')
  const [payment, setPayment] = useState<string>('benefit')
  const [orderNumber, setOrderNumber] = useState('#1001')
  const [submitting, setSubmitting] = useState(false)

  const items = useMemo(
    () =>
      products.filter((p) => (qty[p.id] || 0) > 0).map((p) => ({
        ...p,
        count: qty[p.id],
        lineTotal: p.price * qty[p.id],
      })),
    [qty, products],
  )
  const subtotal = items.reduce((s, i) => s + i.lineTotal, 0)
  const deliveryOpt = DELIVERY_OPTIONS.find((d) => d.id === delivery)!
  const total = subtotal + (items.length ? deliveryOpt.price : 0)

  const inc = (id: string) => setQty((q) => ({ ...q, [id]: (q[id] || 0) + 1 }))
  const dec = (id: string) => setQty((q) => ({ ...q, [id]: Math.max(0, (q[id] || 0) - 1) }))

  const stepIndex = STEP_ORDER.indexOf(step)
  const go = (s: Step) => {
    setStep(s)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const submitOrder = async () => {
    console.log('[v0] submitOrder storeId:', storeId)
    if (!storeId) {
      // No live store — fall back to a generated number so the demo still completes.
      setOrderNumber('#' + Math.floor(1000 + Math.random() * 9000))
      go('confirm')
      return
    }
    setSubmitting(true)
    const res = await placeOrder({
      storeId,
      customerName: customer.name,
      customerPhone: customer.phone,
      fulfillment: 'delivery',
      address: customer.address,
      paymentMethod: PAYMENT_OPTIONS.find((p) => p.id === payment)?.labelEn ?? payment,
      subtotal,
      deliveryFee: items.length ? deliveryOpt.price : 0,
      total,
      items: items.map((i) => ({ name: i.nameAr, qty: i.count, price: i.price })),
    })
    setSubmitting(false)
    console.log('[v0] placeOrder result:', JSON.stringify(res))
    if (res.ok && res.id) {
      setOrderNumber('#' + res.id.slice(0, 4).toUpperCase())
    } else {
      setOrderNumber('#' + Math.floor(1000 + Math.random() * 9000))
    }
    go('confirm')
  }

  const next = () => {
    if (step === 'payment') {
      void submitOrder()
      return
    }
    go(STEP_ORDER[Math.min(STEP_ORDER.length - 1, stepIndex + 1)])
  }
  const prev = () => go(STEP_ORDER[Math.max(0, stepIndex - 1)])

  const orderSummaryMsg = () => {
    const lines = [
      `طلب جديد LA DOLCE ${orderNumber}`,
      '──────────────',
      ...items.map((i) => `${i.nameAr} × ${i.count} = ${i.lineTotal} د.ب`),
      `التوصيل (${deliveryOpt.labelAr}): ${deliveryOpt.price} د.ب`,
      `الإجمالي: ${total} د.ب`,
      '──────────────',
      `الاسم: ${customer.name || '-'}`,
      `الهاتف: ${customer.phone || '-'}`,
      `العنوان: ${customer.address || '-'}`,
      `طريقة الدفع: ${PAYMENT_OPTIONS.find((p) => p.id === payment)?.labelAr}`,
    ]
    return lines.join('\n')
  }

  return (
    <div className="theme-ladolce min-h-screen bg-background text-foreground" dir="rtl">
      {/* Top brand bar */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Crown className="size-4" />
            </div>
            <div className="leading-tight">
              <div className="font-heading text-lg font-bold tracking-wide">LA DOLCE</div>
              <div className="text-[10px] text-muted-foreground">حلويات فاخرة</div>
            </div>
          </div>
          <Badge variant="outline" className="border-accent/50 text-accent">
            وضع تجريبي
          </Badge>
        </div>
        {step !== 'landing' && step !== 'confirm' && (
          <div className="mx-auto flex max-w-2xl items-center gap-1.5 px-4 pb-3">
            {STEP_ORDER.slice(1, 5).map((s) => {
              const idx = STEP_ORDER.indexOf(s)
              const active = idx <= stepIndex
              return (
                <div key={s} className="flex-1">
                  <div
                    className={`h-1.5 rounded-full transition-colors ${
                      active ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                  <span
                    className={`mt-1 block text-center text-[10px] ${
                      active ? 'text-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    {STEP_LABELS[s]}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </header>

      <main className="mx-auto max-w-2xl px-4 py-6 pb-28">
        {step === 'landing' && <Landing onStart={() => go('products')} />}

        {step === 'products' && (
          <section className="space-y-4">
            <h1 className="font-heading text-2xl font-bold">اختر منتجاتك</h1>
            {products.map((p) => (
              <Card key={p.id} className="flex items-center gap-4 border-border p-3">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                  <Image src={p.image || '/placeholder.svg'} alt={p.nameAr} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-base font-semibold">{p.nameAr}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">{p.descAr}</p>
                  <div className="mt-1 font-bold text-primary">{p.price} د.ب</div>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <Button size="icon" variant="outline" className="size-8" onClick={() => inc(p.id)}>
                    <Plus className="size-4" />
                  </Button>
                  <span className="w-6 text-center text-sm font-semibold">{qty[p.id] || 0}</span>
                  <Button size="icon" variant="outline" className="size-8" onClick={() => dec(p.id)}>
                    <Minus className="size-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </section>
        )}

        {step === 'details' && (
          <section className="space-y-4">
            <h1 className="font-heading text-2xl font-bold">بياناتك</h1>
            <Card className="space-y-4 border-border p-5">
              <div>
                <Label htmlFor="name" className="mb-2 block">الاسم الكامل</Label>
                <Input id="name" value={customer.name} onChange={(e) => setCustomer((c) => ({ ...c, name: e.target.value }))} />
              </div>
              <div>
                <Label htmlFor="phone" className="mb-2 block">رقم الهاتف</Label>
                <Input id="phone" dir="ltr" value={customer.phone} onChange={(e) => setCustomer((c) => ({ ...c, phone: e.target.value }))} />
              </div>
              <div>
                <Label htmlFor="address" className="mb-2 block">عنوان التوصيل</Label>
                <Input id="address" value={customer.address} onChange={(e) => setCustomer((c) => ({ ...c, address: e.target.value }))} />
              </div>
            </Card>
          </section>
        )}

        {step === 'delivery' && (
          <section className="space-y-4">
            <h1 className="font-heading text-2xl font-bold">طريقة التوصيل</h1>
            {DELIVERY_OPTIONS.map((d) => (
              <Card
                key={d.id}
                onClick={() => setDelivery(d.id)}
                className={`flex cursor-pointer items-center gap-4 border-border p-4 transition-colors ${
                  delivery === d.id ? 'ring-2 ring-primary' : ''
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-primary">
                  {d.id === 'urgent' ? <Zap className="size-5" /> : <Truck className="size-5" />}
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{d.labelAr}</div>
                  <div className="text-xs text-muted-foreground">
                    {d.id === 'urgent' ? 'توصيل خلال أسرع وقت ممكن' : 'توصيل خلال اليوم'}
                  </div>
                </div>
                <div className="font-bold text-primary">{d.price} د.ب</div>
              </Card>
            ))}
          </section>
        )}

        {step === 'payment' && (
          <section className="space-y-4">
            <h1 className="font-heading text-2xl font-bold">طريقة الدفع</h1>
            {PAYMENT_OPTIONS.map((p) => (
              <Card
                key={p.id}
                onClick={() => setPayment(p.id)}
                className={`flex cursor-pointer items-center gap-4 border-border p-4 transition-colors ${
                  payment === p.id ? 'ring-2 ring-primary' : ''
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-primary">
                  <Wallet className="size-5" />
                </div>
                <div className="flex-1 font-semibold">{p.labelAr}</div>
                {payment === p.id && <CheckCircle2 className="size-5 text-primary" />}
              </Card>
            ))}

            {payment === 'benefit' && (
              <Card className="border-accent/40 bg-secondary p-4">
                <p className="text-sm leading-relaxed">
                  الرجاء إرسال إثبات الدفع عبر الواتساب إلى الرقم{' '}
                  <span className="font-bold" dir="ltr">39955657</span>
                </p>
                <Button
                  render={
                    <a
                      href={waLink('مرحباً، أرغب بإرسال إثبات الدفع لطلب LA DOLCE')}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                  nativeButton={false}
                  className="mt-3 w-full"
                >
                  <MessageCircle className="size-4" />
                  إرسال إثبات الدفع عبر واتساب
                </Button>
              </Card>
            )}

            <OrderSummary items={items} deliveryOpt={deliveryOpt} total={total} />
          </section>
        )}

        {step === 'confirm' && (
          <section className="space-y-5 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-primary">
              <CheckCircle2 className="size-9" />
            </div>
            <h1 className="font-heading text-2xl font-bold">تم تأكيد طلبك</h1>
            <p className="text-muted-foreground">
              رقم طلبك <span className="font-bold text-foreground">{orderNumber}</span>
            </p>
            <Card className="border-border p-5 text-right">
              <OrderSummary items={items} deliveryOpt={deliveryOpt} total={total} />
              <div className="mt-4 border-t border-border pt-4 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">الاسم</span><span>{customer.name || '-'}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">الهاتف</span><span dir="ltr">{customer.phone || '-'}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">الدفع</span><span>{PAYMENT_OPTIONS.find((p) => p.id === payment)?.labelAr}</span></div>
              </div>
            </Card>
            <Button
              render={<a href={waLink(orderSummaryMsg())} target="_blank" rel="noopener noreferrer" />}
              nativeButton={false}
              className="w-full"
            >
              <MessageCircle className="size-4" />
              إرسال الطلب عبر واتساب
            </Button>
            <Button variant="outline" className="w-full" onClick={() => { setQty({}); go('landing') }}>
              طلب جديد
            </Button>
          </section>
        )}
      </main>

      {/* Sticky footer nav */}
      {step !== 'landing' && step !== 'confirm' && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/90 backdrop-blur">
          <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-4 py-3">
            <Button variant="outline" onClick={prev}>
              <ArrowRight className="size-4" />
              السابق
            </Button>
            {items.length > 0 && (
              <span className="text-sm font-bold text-primary">{total} د.ب</span>
            )}
            <Button
              onClick={next}
              disabled={
                submitting ||
                (step === 'products' && items.length === 0) ||
                (step === 'details' && (!customer.name || !customer.phone))
              }
            >
              {step === 'payment' ? (submitting ? 'جارٍ الإرسال...' : 'تأكيد الطلب') : 'التالي'}
              <ArrowLeft className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

function Landing({ onStart }: { onStart: () => void }) {
  return (
    <section className="space-y-6 text-center">
      <div
        className="relative flex h-52 items-center justify-center overflow-hidden rounded-3xl"
        style={{ background: 'linear-gradient(135deg,#fdeef2 0%,#fff7f9 60%,#f7e6c4 100%)' }}
      >
        <div className="text-center">
          <Crown className="mx-auto size-10 text-accent" />
          <div className="mt-2 font-heading text-3xl font-bold tracking-wide text-foreground">LA DOLCE</div>
          <div className="text-sm text-muted-foreground">حلويات فاخرة بنكهة لا تُنسى</div>
        </div>
      </div>
      <div>
        <h1 className="font-heading text-2xl font-bold">أهلاً بك في LA DOLCE</h1>
        <p className="mx-auto mt-2 max-w-md text-pretty leading-relaxed text-muted-foreground">
          اطلب حلوياتك المف��لة بكل سهولة واستمتع بتوصيل سريع إلى باب منزلك.
        </p>
      </div>
      <Button size="lg" className="w-full" onClick={onStart}>
        <ShoppingBag className="size-5" />
        ابدأ الطلب الآن
      </Button>
    </section>
  )
}

function OrderSummary({
  items,
  deliveryOpt,
  total,
}: {
  items: { id: string; nameAr: string; count: number; lineTotal: number }[]
  deliveryOpt: { labelAr: string; price: number }
  total: number
}) {
  return (
    <div className="space-y-2 text-sm">
      {items.map((i) => (
        <div key={i.id} className="flex justify-between">
          <span>{i.nameAr} × {i.count}</span>
          <span className="font-medium">{i.lineTotal} د.ب</span>
        </div>
      ))}
      {items.length > 0 && (
        <div className="flex justify-between text-muted-foreground">
          <span>التوصيل ({deliveryOpt.labelAr})</span>
          <span>{deliveryOpt.price} د.ب</span>
        </div>
      )}
      <div className="flex justify-between border-t border-border pt-2 text-base font-bold text-primary">
        <span>الإجمالي</span>
        <span>{total} د.ب</span>
      </div>
    </div>
  )
}
