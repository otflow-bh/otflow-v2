import { redirect } from 'next/navigation'
import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { StatCards } from '@/components/dashboard/stat-cards'
import { StoresList } from '@/components/admin/stores-list'
import { RequestsManager } from '@/components/admin/requests-manager'
import { getCurrentProfile, getAllStores, getAllRequests } from '@/lib/queries'
import { Store, Inbox } from 'lucide-react'

const NAV = [{ href: '/admin', label: 'لوحة التحكم', icon: 'LayoutDashboard' as const }]

export default async function AdminPage() {
  const profile = await getCurrentProfile()
  if (!profile) redirect('/auth/login?next=/admin')
  if ((profile as { role?: string }).role !== 'admin') redirect('/')

  const [stores, requests] = await Promise.all([getAllStores(), getAllRequests()])
  const r = requests as { status: string }[]
  const newRequests = r.filter((x) => x.status === 'new' || x.status === 'reviewing')
  const activeStores = stores.filter((s) => s.status === 'active')

  const stats = [
    { label: 'إجمالي المتاجر', value: String(stores.length), icon: 'Store' as const, hint: `${activeStores.length} نشط` },
    { label: 'طلبات جديدة', value: String(newRequests.length), icon: 'Inbox' as const, hint: 'بانتظار المراجعة' },
    { label: 'متاجر نشطة', value: String(activeStores.length), icon: 'CheckCircle2' as const, hint: 'تستقبل الطلبات' },
    { label: 'إجمالي الطلبات', value: String(r.length), icon: 'Building2' as const, hint: 'كل الأوقات' },
  ]

  return (
    <DashboardShell title="OTFlow Admin" subtitle="لوحة تحكم المنصة" nav={NAV} accent="blue">
      <div className="space-y-6">
        <StatCards stats={stats} />

        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Inbox className="text-primary size-4" />
            <h2 className="font-heading text-lg font-bold">طلبات الانضمام</h2>
          </div>
          <RequestsManager requests={requests as never} />
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Store className="text-primary size-4" />
            <h2 className="font-heading text-lg font-bold">المتاجر</h2>
          </div>
          <StoresList stores={stores} />
        </section>
      </div>
    </DashboardShell>
  )
}
