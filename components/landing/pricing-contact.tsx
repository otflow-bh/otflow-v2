'use client'

import Link from 'next/link'
import { Check, MessageCircle, Mail, AtSign } from 'lucide-react'
import { useLang } from '@/lib/use-lang'
import { PRICING, BRAND, waLink } from '@/lib/brand'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SectionHeader } from '@/components/landing/sections'
import { OTFlowLogo } from '@/components/otflow-logo'

export function Pricing() {
  const { t, lang } = useLang()
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-4 py-20">
      <SectionHeader
        eyebrow={t('الأسعار', 'Pricing')}
        title={t('باقات تناسب نمو عملك', 'Plans that fit your growth')}
      />
      <div className="grid gap-5 md:grid-cols-3">
        {PRICING.map((p) => (
          <Card
            key={p.id}
            className={`relative flex flex-col border-border p-6 ${
              p.highlighted
                ? 'glass-strong glow-blue ring-1 ring-primary/40'
                : 'glass-strong'
            }`}
          >
            {p.highlighted && (
              <Badge className="absolute -top-3 right-6 bg-primary text-primary-foreground">
                {t('الأكثر اختياراً', 'Most popular')}
              </Badge>
            )}
            <h3 className="font-heading text-lg font-semibold">
              {lang === 'ar' ? p.nameAr : p.nameEn}
            </h3>
            <div className="mt-4 flex items-end gap-2">
              <span className="font-heading text-3xl font-bold text-gradient">
                {lang === 'ar' ? p.priceAr : p.priceEn}
              </span>
              {p.period && (
                <span className="pb-1 text-sm text-muted-foreground">
                  {p.period === 'monthly' ? t('/ شهرياً', '/ month') : t('/ سنوياً', '/ year')}
                </span>
              )}
            </div>
            <ul className="mt-6 flex flex-1 flex-col gap-3">
              {(lang === 'ar' ? p.featuresAr : p.featuresEn).map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                  <span className="text-muted-foreground">{f}</span>
                </li>
              ))}
            </ul>
            <Button
              render={<Link href="/start" />}
              nativeButton={false}
              className="mt-6 w-full"
              variant={p.highlighted ? 'default' : 'outline'}
            >
              {t('ابدأ الآن', 'Get started')}
            </Button>
          </Card>
        ))}
      </div>
    </section>
  )
}

export function Contact() {
  const { t } = useLang()
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-20">
      <Card className="glass-strong overflow-hidden border-border p-8 sm:p-12">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h2 className="font-heading text-balance text-2xl font-bold sm:text-3xl">
              {t('جاهز لإطلاق متجر طلباتك؟', 'Ready to launch your ordering store?')}
            </h2>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              {t(
                'تواصل معنا الآن عبر الواتساب وسيقوم فريق OTFlow بمساعدتك في كل خطوة.',
                'Contact us on WhatsApp and the OTFlow team will help you at every step.',
              )}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                render={
                  <a
                    href={waLink(t('مرحباً، أريد معرفة المزيد عن OTFlow', 'Hello, I want to know more about OTFlow'))}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
                nativeButton={false}
                className="glow-blue"
              >
                <MessageCircle className="size-4" />
                {t('تواصل عبر واتساب', 'Chat on WhatsApp')}
              </Button>
              <Button render={<Link href="/start" />} nativeButton={false} variant="outline">
                {t('ابدأ طلبك', 'Start Request')}
              </Button>
            </div>
          </div>
          <div className="space-y-3">
            <ContactRow icon={MessageCircle} label={t('واتساب', 'WhatsApp')} value={BRAND.whatsapp} />
            <ContactRow icon={Mail} label={t('البريد', 'Email')} value="hello@otflow.app" />
            <ContactRow icon={AtSign} label={t('انستغرام', 'Instagram')} value="@otflow" />
          </div>
        </div>
      </Card>
    </section>
  )
}

function ContactRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-secondary/40 p-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent">
        <Icon className="size-4" />
      </div>
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-sm font-medium" dir="ltr">{value}</div>
      </div>
    </div>
  )
}

export function Footer() {
  const { t, lang } = useLang()
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        <OTFlowLogo />
        <p className="text-center text-xs text-muted-foreground">
          {lang === 'ar' ? BRAND.taglineAr : BRAND.taglineEn}
        </p>
        <p className="text-xs text-muted-foreground">
          © 2026 OTFlow. {t('جميع الحقوق محفوظة.', 'All rights reserved.')}
        </p>
      </div>
    </footer>
  )
}
