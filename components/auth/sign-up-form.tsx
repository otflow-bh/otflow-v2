'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { OTFlowLogo } from '@/components/otflow-logo'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function SignUpForm() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo:
          process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ??
          `${window.location.origin}/auth/callback`,
        data: { full_name: fullName, role: 'customer' },
      },
    })
    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }
    setDone(true)
    setLoading(false)
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      <div className="absolute inset-0 grid-bg" aria-hidden />
      <Card className="glass-strong relative w-full max-w-md border-border p-8">
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <OTFlowLogo />
          <h1 className="font-heading text-2xl font-bold">إنشاء حساب</h1>
          <p className="text-sm text-muted-foreground">أنشئ حسابك للبدء مع OTFlow</p>
        </div>
        {done ? (
          <div className="text-center">
            <p className="leading-relaxed text-muted-foreground">
              تم إنشاء حسابك. تحقق من بريدك الإلكتروني لتأكيد الحساب، ثم سجّل الدخول.
            </p>
            <Button render={<Link href="/auth/login" />} nativeButton={false} className="mt-6 w-full">
              الذهاب لتسجيل الدخول
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <Label htmlFor="name" className="mb-2 block">الاسم الكامل</Label>
              <Input id="name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="email" className="mb-2 block">البريد الإلكتروني</Label>
              <Input id="email" type="email" dir="ltr" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="password" className="mb-2 block">كلمة المرور</Label>
              <Input id="password" type="password" dir="ltr" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full glow-blue" disabled={loading}>
              {loading ? 'جارٍ الإنشاء...' : 'إنشاء حساب'}
            </Button>
          </form>
        )}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          لديك حساب بالفعل؟{' '}
          <Link href="/auth/login" className="text-primary underline-offset-4 hover:underline">
            تسجيل الدخول
          </Link>
        </p>
      </Card>
    </main>
  )
}
