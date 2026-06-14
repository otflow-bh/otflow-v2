'use client'

import { Languages } from 'lucide-react'
import { useLang } from '@/lib/use-lang'
import { Button } from '@/components/ui/button'

export function LangToggle({ className }: { className?: string }) {
  const { lang, toggle } = useLang()
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggle}
      className={className}
      aria-label="Toggle language"
    >
      <Languages className="size-4" />
      {lang === 'ar' ? 'English' : 'العربية'}
    </Button>
  )
}
