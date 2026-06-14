// Demo data used when Supabase env vars are not present.
// Real LA DOLCE products only — do not invent extra products.

export type Product = {
  id: string
  nameEn: string
  nameAr: string
  price: number
  descAr: string
  image: string
}


export const LADOLCE_PRODUCTS: Product[] = [
  {
    id: 'chocobites-20',
    nameEn: 'Chips Chocobites 20 pcs',
    nameAr: 'تشبس شوكوبايتس 20 حبة',
    price: 5,
    descAr: 'علبة من 20 قطعة شوكوبايتس مقرمشة بالشوكولاتة',
    image: '/products/chocobites-20.png',
  },
  {
    id: 'chocobites-40',
    nameEn: 'Chips Chocobites 40 pcs',
    nameAr: 'تشبس شوكوبايتس 40 حبة',
    price: 8,
    descAr: 'علبة من 40 قطعة شوكوبايتس مقرمشة بالشوكولاتة',
    image: '/products/chocobites-40.png',
  },
  {
    id: 'mango-graham',
    nameEn: 'Mango Graham',
    nameAr: 'مانجو جراهام',
    price: 12,
    descAr: 'حلى المانجو جراهام الكريمي الطازج',
    image: '/products/mango-graham.png',
  },
]

export const DELIVERY_OPTIONS = [
  { id: 'normal', labelAr: 'توصيل عادي', labelEn: 'Normal', price: 1.5 },
  { id: 'urgent', labelAr: 'توصيل سريع', labelEn: 'Urgent', price: 2 },
]

export const PAYMENT_OPTIONS = [
  { id: 'benefit', labelAr: 'بنفت باي', labelEn: 'BenefitPay' },
  { id: 'cash', labelAr: 'نقداً عند الاستلام', labelEn: 'Cash' },
]

export type OrderStatus =
  | 'NEW'
  | 'PENDING_PAYMENT'
  | 'PAID'
  | 'PREPARING'
  | 'READY'
  | 'DELIVERED'
  | 'CANCELLED'

export const STATUS_LABELS: Record<
  OrderStatus,
  { ar: string; en: string; color: string }
> = {
  NEW: { ar: 'جديد', en: 'New', color: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
  PENDING_PAYMENT: {
    ar: 'بانتظار الدفع',
    en: 'Pending Payment',
    color: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  },
  PAID: { ar: 'مدفوع', en: 'Paid', color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
  PREPARING: {
    ar: 'قيد التجهيز',
    en: 'Preparing',
    color: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  },
  READY: { ar: 'جاهز', en: 'Ready', color: 'bg-violet-500/15 text-violet-400 border-violet-500/30' },
  DELIVERED: {
    ar: 'تم التسليم',
    en: 'Delivered',
    color: 'bg-green-600/15 text-green-400 border-green-600/30',
  },
  CANCELLED: {
    ar: 'ملغي',
    en: 'Cancelled',
    color: 'bg-red-500/15 text-red-400 border-red-500/30',
  },
}

export type DemoOrder = {
  id: string
  number: string
  customer: string
  phone: string
  items: string
  total: number
  payment: string
  status: OrderStatus
  time: string
}

export const DEMO_ORDERS: DemoOrder[] = [
  {
    id: 'o1',
    number: '#1001',
    customer: 'سارة أحمد',
    phone: '3300xxxx',
    items: 'مانجو جراهام × 1، تشبس 20 × 2',
    total: 23.5,
    payment: 'BenefitPay',
    status: 'NEW',
    time: 'قبل 4 دقائق',
  },
  {
    id: 'o2',
    number: '#1002',
    customer: 'محمد علي',
    phone: '3611xxxx',
    items: 'تشبس شوكوبايتس 40 × 1',
    total: 10,
    payment: 'Cash',
    status: 'PENDING_PAYMENT',
    time: 'قبل 18 دقيقة',
  },
  {
    id: 'o3',
    number: '#1003',
    customer: 'نورة خالد',
    phone: '3955xxxx',
    items: 'مانجو جراهام × 2',
    total: 26,
    payment: 'BenefitPay',
    status: 'PREPARING',
    time: 'قبل 42 دقيقة',
  },
  {
    id: 'o4',
    number: '#1004',
    customer: 'عبدالله يوسف',
    phone: '3722xxxx',
    items: 'تشبس شوكوبايتس 20 × 3',
    total: 16.5,
    payment: 'Cash',
    status: 'READY',
    time: 'قبل ساعة',
  },
  {
    id: 'o5',
    number: '#1005',
    customer: 'ليان حسن',
    phone: '3433xxxx',
    items: 'مانجو جراهام × 1',
    total: 13.5,
    payment: 'BenefitPay',
    status: 'DELIVERED',
    time: 'قبل ساعتين',
  },
]

export const DEMO_WORKSPACES = [
  {
    id: 'ws-ladolce',
    project: 'LA DOLCE',
    slug: 'ladolce',
    owner: 'LA DOLCE Sweets',
    plan: 'Pro',
    type: 'Demo',
    status: 'Active',
    revenue: 89,
    created: '2026-05-01',
    expires: '2026-06-01',
  },
]

export const ADMIN_STATS = {
  totalWorkspaces: 1,
  activeWorkspaces: 1,
  pendingPayments: 1,
  expiredSubscriptions: 0,
  monthlyRevenue: 20,
}

export const MODULES = [
  { id: 'orders', nameEn: 'OTFlow Orders', nameAr: 'OTFlow للطلبات', active: true },
  { id: 'salon', nameEn: 'OTFlow Salon', nameAr: 'OTFlow للصالونات', active: false },
  { id: 'clinic', nameEn: 'OTFlow Clinic', nameAr: 'OTFlow للعيادات', active: false },
  { id: 'ai', nameEn: 'OTFlow AI', nameAr: 'OTFlow للذكاء الاصطناعي', active: false },
]

export const ACTIVITY_LOG = [
  { id: 'a1', action: 'created workspace', actionAr: 'إنشاء مساحة عمل', target: 'LA DOLCE', time: '2026-05-01 10:24' },
  { id: 'a2', action: 'activated subscription', actionAr: 'تفعيل الاشتراك', target: 'LA DOLCE — Pro', time: '2026-05-01 10:31' },
  { id: 'a3', action: 'login as client', actionAr: 'دخول كعميل', target: 'LA DOLCE', time: '2026-05-03 19:02' },
  { id: 'a4', action: 'reset password', actionAr: 'إعادة تعيين كلمة المرور', target: 'LA DOLCE', time: '2026-05-09 12:47' },
]
