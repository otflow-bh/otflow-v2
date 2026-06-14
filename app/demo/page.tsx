'use client'

import Link from 'next/link'
import { ShoppingBag, LayoutDashboard, ArrowLeft } from 'lucide-react'
import { LanguageProvider, useLang } from '@/lib/use-lang'
import { PageHeader } from '@/components/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

function DemoContent() {
  const { t, dir } = useLang()
  const cards = [
    {
      href: '/ladolce',
      icon: ShoppingBag,
      ar: 'تجربة العميل',
      en: 'Customer Demo',
      dAr: 'تصفّح صفحة طلبات LA DOLCE كما يراها عميلك وأكمل طلباً تجريبياً بالكامل.',
      dEn: "Browse the LA DOLCE ordering page as your customer sees it and complete a full demo order.",
      tag: 'LA DOLCE',
    },
    {
      href: '/workspace/ladolce',
      icon: LayoutDashboard,
      ar: 'تجربة البائع',
      en: 'Seller Demo',
      dAr: 'استكشف لوحة تحكم البائع لإدارة الطلبات والمنتجات والمدفوعات.',
      dEn: 'Explore the seller dashboard to manage orders, products and payments.',
      tag: 'Workspace',
    },
  ]
  return (
    <main dir={dir} className="min-h-screen bg-background">
      <PageHeader />
      <div className="relative">
        <div className="absolute inset-0 grid-bg" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 py-16">
          <div className="mb-10 text-center">
            <h1 className="font-heading text-balance text-3xl font-bold sm:text-4xl">
              {t('مركز العروض التجريبية', 'Demo Center')}
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              {t(
                'جرّب OTFlow من جهتي العميل والبائع قبل أن تبدأ مشروعك.',
                'Experience OTFlow from both the customer and seller sides before starting.',
              )}
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {cards.map((c) => (
              <Card key={c.href} className="group flex flex-col glass-strong border-border p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <c.icon className="size-6" />
                  </div>
                  <Badge variant="outline" className="border-accent/40 text-accent">
                    {c.tag}
                  </Badge>
                </div>
                <h2 className="font-heading text-xl font-semibold">{t(c.ar, c.en)}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {t(c.dAr, c.dEn)}
                </p>
                <Button render={<Link href={c.href} />} nativeButton={false} className="mt-6 w-full">
                  {t('فتح العرض', 'Open demo')}
                  <ArrowLeft className="size-4 ltr:rotate-180" />
                </Button>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button render={<Link href="/start" />} nativeButton={false} variant="outline">
              {t('أعجبك؟ ابدأ طلبك', 'Liked it? Start your request')}
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default function DemoPage() {
  return (
    <LanguageProvider initial="ar">
      <DemoContent />
    </LanguageProvider>
  )
}
