'use client'

import Link from 'next/link'
import { ArrowLeft, Play, Sparkles, ShoppingBag } from 'lucide-react'
import { useLang } from '@/lib/use-lang'
import { BRAND } from '@/lib/brand'
import { Button } from '@/components/ui/button'

export function Hero() {
  const { t, lang } = useLang()

  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40">
      <div className="absolute inset-0 grid-bg" aria-hidden />
      <div
        className="absolute left-1/2 top-0 h-[420px] w-[680px] -translate-x-1/2 rounded-full opacity-40 blur-[120px]"
        style={{
          background:
            'radial-gradient(circle, rgba(37,99,235,0.55) 0%, rgba(124,58,237,0.35) 50%, transparent 70%)',
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-muted-foreground">
          <Sparkles className="size-3.5 text-accent" />
          {t('منصة 2026 لإدارة الطلبات', '2026 platform for order management')}
        </div>

        <h1 className="font-heading text-balance text-4xl font-bold leading-tight sm:text-6xl">
          {t('حوّل عملك إلى ', 'Turn your business into a ')}
          <span className="text-gradient">{t('متجر طلبات ذكي', 'smart ordering store')}</span>
          {t(' مع OTFlow', ' with OTFlow')}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          {lang === 'ar' ? BRAND.taglineAr : BRAND.taglineEn}
        </p>

        <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground/80">
          {t(
            'نظام OTFlow Orders يمنح عملك صفحة طلبات احترافية لعملائك ولوحة تحكم متكاملة لإدارة كل طلب من البداية حتى التسليم.',
            'OTFlow Orders gives your business a professional ordering page for customers and a complete dashboard to manage every order from start to delivery.',
          )}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button render={<Link href="/demo" />} nativeButton={false} size="lg" className="w-full glow-blue sm:w-auto">
            <Play className="size-4" />
            {t('شاهد العرض التجريبي', 'View Demo')}
          </Button>
          <Button render={<Link href="/start" />} nativeButton={false} size="lg" variant="outline" className="w-full sm:w-auto">
            {t('ابدأ طلبك', 'Start Request')}
            <ArrowLeft className="size-4 rtl:rotate-0 ltr:rotate-180" />
          </Button>
          <Button render={<Link href="/ladolce" />} nativeButton={false} size="lg" variant="secondary" className="w-full sm:w-auto">
            <ShoppingBag className="size-4" />
            {t('تجربة متجر LA DOLCE', 'Try LA DOLCE store')}
          </Button>
        </div>

        <div className="mt-14 grid grid-cols-3 gap-4 border-t border-border pt-8 text-center">
          {[
            { v: '24h', ar: 'وقت التفعيل', en: 'Activation time' },
            { v: '100%', ar: 'يعمل بدون تعقيد', en: 'Hassle free' },
            { v: '7', ar: 'خطوات سهلة', en: 'Simple steps' },
          ].map((s) => (
            <div key={s.v}>
              <div className="font-heading text-2xl font-bold text-gradient sm:text-3xl">
                {s.v}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {t(s.ar, s.en)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
