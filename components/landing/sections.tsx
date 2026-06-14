'use client'

import {
  ShieldCheck,
  Zap,
  Smartphone,
  LayoutDashboard,
  BellRing,
  Wallet,
  Package,
  Users,
  BarChart3,
  Palette,
} from 'lucide-react'
import { useLang } from '@/lib/use-lang'
import { Card } from '@/components/ui/card'

export function WhyOTFlow() {
  const { t } = useLang()
  const items = [
    {
      icon: Zap,
      ar: 'تفعيل سريع',
      en: 'Fast Activation',
      dAr: 'مساحة عملك جاهزة خلال 24 ساعة من اعتماد الطلب.',
      dEn: 'Your workspace is ready within 24 hours of approval.',
    },
    {
      icon: Smartphone,
      ar: 'تصميم موبايل أولاً',
      en: 'Mobile First',
      dAr: 'تجربة مثالية على الجوال لعملائك أينما كانوا.',
      dEn: 'A perfect mobile experience for your customers anywhere.',
    },
    {
      icon: ShieldCheck,
      ar: 'موثوق وآمن',
      en: 'Secure & Reliable',
      dAr: 'بياناتك وطلبات عملائك محمية بأعلى المعايير.',
      dEn: 'Your data and orders are protected to the highest standards.',
    },
    {
      icon: BellRing,
      ar: 'إشعارات فورية',
      en: 'Instant Notifications',
      dAr: 'تابع الطلبات الجديدة والمدفوعات لحظة بلحظة.',
      dEn: 'Track new orders and payments in real time.',
    },
  ]
  return (
    <section id="why" className="mx-auto max-w-6xl px-4 py-20">
      <SectionHeader
        eyebrow={t('لماذا OTFlow', 'Why OTFlow')}
        title={t('بُني ليخدمك ويبسّط عملك', 'Built to serve you and simplify your work')}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <Card key={it.en} className="glass-strong border-border p-6">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <it.icon className="size-5" />
            </div>
            <h3 className="font-heading text-base font-semibold">{t(it.ar, it.en)}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {t(it.dAr, it.dEn)}
            </p>
          </Card>
        ))}
      </div>
    </section>
  )
}

export function HowItWorks() {
  const { t } = useLang()
  const steps = [
    {
      n: '01',
      ar: 'شاهد العرض التجريبي',
      en: 'View the demo',
      dAr: 'جرّب صفحة العميل ولوحة البائع قبل أن تبدأ.',
      dEn: 'Try the customer page and seller dashboard first.',
    },
    {
      n: '02',
      ar: 'أرسل طلبك',
      en: 'Submit your request',
      dAr: 'عبّئ بيانات مشروعك وسنتواصل معك خلال 24 ساعة.',
      dEn: 'Fill in your project details and we contact you within 24h.',
    },
    {
      n: '03',
      ar: 'استلم مساحتك',
      en: 'Receive your workspace',
      dAr: 'تصلك صفحة الإدارة وصفحة طلبات عملائك جاهزة.',
      dEn: 'Get your management page and customer ordering page ready.',
    },
    {
      n: '04',
      ar: 'ابدأ البيع',
      en: 'Start selling',
      dAr: 'استقبل الطلبات وأدرها حتى التسليم بسهولة.',
      dEn: 'Receive and manage orders through to delivery with ease.',
    },
  ]
  return (
    <section id="how" className="mx-auto max-w-6xl px-4 py-20">
      <SectionHeader
        eyebrow={t('كيف يعمل', 'How it works')}
        title={t('من الفكرة إلى أول طلب في خطوات', 'From idea to first order in a few steps')}
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <Card key={s.n} className="relative glass-strong border-border p-6">
            <span className="font-heading text-3xl font-bold text-gradient">{s.n}</span>
            <h3 className="mt-3 font-heading text-base font-semibold">{t(s.ar, s.en)}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {t(s.dAr, s.dEn)}
            </p>
          </Card>
        ))}
      </div>
    </section>
  )
}

export function Features() {
  const { t } = useLang()
  const features = [
    { icon: LayoutDashboard, ar: 'لوحة تحكم متكاملة', en: 'Complete dashboard' },
    { icon: Package, ar: 'إدارة المنتجات', en: 'Products management' },
    { icon: Users, ar: 'إدارة العملاء', en: 'Customers management' },
    { icon: Wallet, ar: 'متابعة المدفوعات', en: 'Payments tracking' },
    { icon: BarChart3, ar: 'تقارير ومبيعات', en: 'Reports & sales' },
    { icon: BellRing, ar: 'إشعارات الطلبات', en: 'Order notifications' },
    { icon: Palette, ar: 'تخصيص الهوية', en: 'Branding customization' },
    { icon: Smartphone, ar: 'صفحة طلبات للعملاء', en: 'Customer ordering page' },
  ]
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-20">
      <SectionHeader
        eyebrow={t('المميزات', 'Features')}
        title={t('كل ما تحتاجه لإدارة طلباتك', 'Everything you need to manage orders')}
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <div
            key={f.en}
            className="flex items-center gap-3 rounded-xl glass-strong border border-border p-4"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
              <f.icon className="size-4.5" />
            </div>
            <span className="text-sm font-medium">{t(f.ar, f.en)}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export function SectionHeader({
  eyebrow,
  title,
}: {
  eyebrow: string
  title: string
}) {
  return (
    <div className="mb-10 text-center">
      <span className="text-xs font-semibold uppercase tracking-widest text-accent">
        {eyebrow}
      </span>
      <h2 className="mt-3 font-heading text-balance text-2xl font-bold sm:text-4xl">
        {title}
      </h2>
    </div>
  )
}
