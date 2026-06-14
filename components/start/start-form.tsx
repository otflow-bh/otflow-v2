'use client'

import { useState } from 'react'
import { CheckCircle2, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react'
import { useLang } from '@/lib/use-lang'
import { waLink } from '@/lib/brand'
import { submitStoreRequest } from '@/lib/actions'
import { PageHeader } from '@/components/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

type FormState = {
  project_name: string
  owner_name: string
  whatsapp: string
  email: string
  instagram: string
  logo_url: string
  product_images_notes: string
  delivery_notes: string
  payment_notes: string
  notes: string
}

const empty: FormState = {
  project_name: '',
  owner_name: '',
  whatsapp: '',
  email: '',
  instagram: '',
  logo_url: '',
  product_images_notes: '',
  delivery_notes: '',
  payment_notes: '',
  notes: '',
}

export function StartForm() {
  const { t, lang } = useLang()
  const [form, setForm] = useState<FormState>(empty)
  const [submitted, setSubmitted] = useState(false)

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const fields: {
    key: keyof FormState
    ar: string
    en: string
    type?: 'textarea'
    required?: boolean
  }[] = [
    { key: 'project_name', ar: 'اسم المشروع', en: 'Project name', required: true },
    { key: 'owner_name', ar: 'اسم صاحب المشروع', en: 'Owner name', required: true },
    { key: 'whatsapp', ar: 'رقم الواتساب', en: 'WhatsApp number', required: true },
    { key: 'email', ar: 'البريد الإلكتروني', en: 'Email' },
    { key: 'instagram', ar: 'حساب انستغرام', en: 'Instagram' },
    { key: 'logo_url', ar: 'رابط الشعار', en: 'Logo URL' },
    { key: 'product_images_notes', ar: 'ملاحظات صور المنتجات', en: 'Product images notes', type: 'textarea' },
    { key: 'delivery_notes', ar: 'ملاحظات التوصيل', en: 'Delivery notes', type: 'textarea' },
    { key: 'payment_notes', ar: 'ملاحظات الدفع', en: 'Payment notes', type: 'textarea' },
    { key: 'notes', ar: 'ملاحظات إضافية', en: 'Additional notes', type: 'textarea' },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const lines = [
      'OTFlow — طلب مشروع جديد',
      '──────────────',
      `اسم المشروع: ${form.project_name || '-'}`,
      `صاحب المشروع: ${form.owner_name || '-'}`,
      `واتساب: ${form.whatsapp || '-'}`,
      `البريد: ${form.email || '-'}`,
      `انستغرام: ${form.instagram || '-'}`,
      `رابط الشعار: ${form.logo_url || '-'}`,
      `صور المنتجات: ${form.product_images_notes || '-'}`,
      `التوصيل: ${form.delivery_notes || '-'}`,
      `الدفع: ${form.payment_notes || '-'}`,
      `ملاحظات: ${form.notes || '-'}`,
    ]
    const message = lines.join('\n')

    // Persist the request to Supabase.
    void submitStoreRequest({
      businessName: form.project_name,
      contactName: form.owner_name,
      email: form.email,
      phone: form.whatsapp,
      businessType: form.instagram,
      plan: '',
      notes: [
        form.notes,
        form.logo_url && `Logo: ${form.logo_url}`,
        form.product_images_notes && `Products: ${form.product_images_notes}`,
        form.delivery_notes && `Delivery: ${form.delivery_notes}`,
        form.payment_notes && `Payment: ${form.payment_notes}`,
      ]
        .filter(Boolean)
        .join(' | '),
    })

    window.open(waLink(message), '_blank', 'noopener,noreferrer')
    setSubmitted(true)
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main dir={lang === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-background">
      <PageHeader />
      <div className="relative">
        <div className="absolute inset-0 grid-bg" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-4 py-12">
          {submitted ? (
            <Card className="glass-strong border-border p-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                <CheckCircle2 className="size-7" />
              </div>
              <h1 className="font-heading text-2xl font-bold">
                {t('تم استلام طلبك بنجاح', 'Your request was received')}
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
                تم استلام طلبك بنجاح. سيتم مراجعة بيانات مشروعك والتواصل معك خلال 24 ساعة. بعد اعتماد
                الطلب ستصلك صفحة إدارة المشروع وصفحة الطلبات الخاصة بعملائك.
              </p>
              <Button className="mt-6" variant="outline" onClick={() => { setForm(empty); setSubmitted(false) }}>
                {t('إرسال طلب آخر', 'Submit another request')}
              </Button>
            </Card>
          ) : (
            <>
              <div className="mb-8 text-center">
                <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-muted-foreground">
                  <Sparkles className="size-3.5 text-accent" />
                  {t('انضم إلى رؤية OTFlow', 'Join the OTFlow vision')}
                </div>
                <h1 className="font-heading text-balance text-3xl font-bold sm:text-4xl">
                  {t('ابدأ مشروعك مع OTFlow', 'Start your project with OTFlow')}
                </h1>
                <p className="mx-auto mt-3 max-w-xl text-pretty leading-relaxed text-muted-foreground">
                  {t(
                    'نحن نؤمن أن كل صاحب عمل يستحق نظاماً احترافياً لإدارة طلباته. عبّئ بياناتك وسيتواصل معك فريقنا الموثوق.',
                    'We believe every business owner deserves a professional ordering system. Fill in your details and our trusted team will reach out.',
                  )}
                </p>
                <div className="mx-auto mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="size-4 text-accent" />
                  {t('بياناتك آمنة ولن تُشارك مع أي طرف ثالث.', 'Your data is safe and never shared with third parties.')}
                </div>
              </div>

              <Card className="glass-strong border-border p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
                  {fields.map((f) => (
                    <div
                      key={f.key}
                      className={f.type === 'textarea' ? 'sm:col-span-2' : ''}
                    >
                      <Label htmlFor={f.key} className="mb-2 block">
                        {t(f.ar, f.en)}
                        {f.required && <span className="text-destructive"> *</span>}
                      </Label>
                      {f.type === 'textarea' ? (
                        <Textarea
                          id={f.key}
                          value={form[f.key]}
                          onChange={set(f.key)}
                          rows={3}
                        />
                      ) : (
                        <Input
                          id={f.key}
                          value={form[f.key]}
                          onChange={set(f.key)}
                          required={f.required}
                          dir={f.key === 'whatsapp' || f.key === 'email' ? 'ltr' : undefined}
                        />
                      )}
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <Button type="submit" size="lg" className="w-full glow-blue">
                      <MessageCircle className="size-4" />
                      {t('إرسال الطلب عبر واتساب', 'Submit via WhatsApp')}
                    </Button>
                  </div>
                </form>
              </Card>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
