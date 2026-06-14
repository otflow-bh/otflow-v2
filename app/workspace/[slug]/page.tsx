import { redirect } from 'next/navigation'
import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { StatCards } from '@/components/dashboard/stat-cards'
import { OrdersBoard } from '@/components/dashboard/orders-board'
import { ProductsManager } from '@/components/dashboard/products-manager'
import { Card } from '@/components/ui/card'
import { getCurrentProfile, getStoreBySlug, getOrdersForStore, getProductsForStore } from '@/lib/queries'
import { ShoppingBag, Store } from 'lucide-react'

const NAV = [
  { href: '/workspace/ladolce', label: 'لوحة التحكم', icon: 'LayoutDashboard' as const },
]

export default async function WorkspacePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const profile = await getCurrentProfile()
  if (!profile) redirect(`/auth/login?next=/workspace/${slug}`)

  const store = await getStoreBySlug(slug)
  if (!store) {
    return (
      <DashboardShell title="غير موجود" nav={NAV}>
        <Card className="glass border-border/50 p-8 text-center">المتجر غير موجود.</Card>
      </DashboardShell>
    )
  }

  // Role permission: admins or the store owner only.
  const role = (profile as { role?: string }).role
  const ownerId = (profile as { id?: string }).id
  const isOwner = store && (profile as { store_id?: string }).store_id === store.id
  const allowed = role === 'admin' || role === 'seller'
  if (!allowed) redirect('/ladolce')

  const [orders, products] = await Promise.all([
    getOrdersForStore(store.id),
    getProductsForStore(store.id),
  ])

  const today = new Date().toDateString()
  const todayOrders = orders.filter((o) => new Date(o.created_at).toDateString() === today)
  const revenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((s, o) => s + Number(o.total), 0)
  const pending = orders.filter((o) => ['new', 'preparing', 'ready', 'out_for_delivery'].includes(o.status))

  const stats = [
    { label: 'طلبات اليوم', value: String(todayOrders.length), icon: 'ShoppingBag' as const, hint: 'منذ منتصف الليل' },
    { label: 'قيد التنفيذ', value: String(pending.length), icon: 'Clock' as const, hint: 'بانتظار المعالجة' },
    { label: 'إجمالي المبيعات', value: `${revenue.toFixed(0)} ${store.currency}`, icon: 'DollarSign' as const, hint: 'كل الأوقات' },
    { label: 'المنتجات', value: String(products.length), icon: 'Package' as const, hint: 'منتج نشط' },
  ]

  return (
    <DashboardShell
      title={store.name}
      subtitle="مساحة عمل البائع"
      nav={NAV}
      accent="pink"
    >
      <div className="space-y-6">
        <StatCards stats={stats} />

        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-primary size-4" />
            <h2 className="font-heading text-lg font-bold">الطلبات</h2>
          </div>
          <OrdersBoard initialOrders={orders} currency={store.currency} storeSlug={slug} />
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Store className="text-primary size-4" />
            <h2 className="font-heading text-lg font-bold">المنتجات</h2>
          </div>
          <ProductsManager products={products} storeId={store.id} currency={store.currency} canEdit={role === 'admin' || isOwner === true || ownerId === store?.owner_id} />
        </section>
      </div>
    </DashboardShell>
  )
}
