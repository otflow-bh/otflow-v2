export const BRAND = {
  name: 'OTFlow',
  whatsapp: '39955657',
  whatsappIntl: '97339955657',
  taglineAr: 'تكنولوجيا متقدمة. موجودة لخدمتك. لتبسيط حياتك.',
  taglineEn: 'Advanced Technology. Built to Serve You. Designed to Simplify Life.',
  colors: {
    blue: '#2563EB',
    cyan: '#06B6D4',
    purple: '#7C3AED',
    navy: '#0F172A',
    light: '#F8FAFC',
  },
}

export function waLink(message: string, phone: string = BRAND.whatsappIntl) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}

export const PRICING = [
  {
    id: 'starter',
    nameAr: 'الباقة المبدئية',
    nameEn: 'Starter',
    priceAr: 'مجاناً لمدة شهر',
    priceEn: 'Free for 1 month',
    period: '',
    featuresAr: [
      'صفحة طلبات للعملاء',
      'لوحة تحكم للبائع',
      'دعم عبر واتساب',
      'تجربة كاملة للنظام',
    ],
    featuresEn: [
      'Customer ordering page',
      'Seller dashboard',
      'WhatsApp support',
      'Full system trial',
    ],
    highlighted: false,
  },
  {
    id: 'pro',
    nameAr: 'الباقة الاحترافية',
    nameEn: 'Pro',
    priceAr: '20 د.ب',
    priceEn: '20 BHD',
    period: 'monthly',
    featuresAr: [
      'كل مميزات المبدئية',
      'عدد طلبات غير محدود',
      'إدارة المنتجات والعملاء',
      'تقارير ومبيعات',
      'تخصيص الهوية البصرية',
    ],
    featuresEn: [
      'Everything in Starter',
      'Unlimited orders',
      'Products & customers management',
      'Reports & sales',
      'Branding customization',
    ],
    highlighted: true,
  },
  {
    id: 'business',
    nameAr: 'باقة الأعمال',
    nameEn: 'Business',
    priceAr: '216 د.ب',
    priceEn: '216 BHD',
    period: 'yearly',
    featuresAr: [
      'كل مميزات الاحترافية',
      'أولوية في الدعم',
      'تحديثات مبكرة',
      'وفّر مع الدفع السنوي',
    ],
    featuresEn: [
      'Everything in Pro',
      'Priority support',
      'Early feature access',
      'Save with yearly billing',
    ],
    highlighted: false,
  },
]
