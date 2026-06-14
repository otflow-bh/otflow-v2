'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { OTFlowLogo } from '@/components/otflow-logo'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
    if (signInError) {
      setError(signInError.message)
      setLoading(false)
      return
    }
    // Route by role
    const {
      data: { user },
    } = await supabase.auth.getUser()
    let dest = '/'
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role, store_id')
        .eq('id', user.id)
        .maybeSingle()
      if (profile?.role === 'admin') dest = '/admin'
      else if (profile?.role === 'seller') dest = '/workspace/ladolce'
      else dest = '/ladolce'
    }
    router.push(dest)
    router.refresh()
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      <div className="absolute inset-0 grid-bg" aria-hidden />
      <Card className="glass-strong relative w-full max-w-md border-border p-8">
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <OTFlowLogo />
          <h1 className="font-heading text-2xl font-bold">تسجيل الدخول</h1>
          <p className="text-sm text-muted-foreground">ادخل إلى لوحة التحكم الخاصة بك</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="email" className="mb-2 block">البريد الإلكتروني</Label>
            <Input id="email" type="email" dir="ltr" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="password" className="mb-2 block">كلمة المرور</Label>
            <Input id="password" type="password" dir="ltr" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full glow-blue" disabled={loading}>
            {loading ? 'جارٍ الدخول...' : 'دخول'}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          ليس لديك حساب؟{' '}
          <Link href="/auth/sign-up" className="text-primary underline-offset-4 hover:underline">
            إنشاء حساب
          </Link>
        </p>
      </Card>
    </main>
  )
}
