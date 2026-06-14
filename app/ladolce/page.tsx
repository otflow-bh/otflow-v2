import { LaDolceFlow } from '@/components/ladolce/la-dolce-flow'
import { getStoreBySlug, getProductsForStore } from '@/lib/queries'
import { LADOLCE_PRODUCTS } from '@/lib/demo-data'

export const dynamic = 'force-dynamic'

export default async function LaDolcePage() {
  const store = await getStoreBySlug('ladolce')
  console.log('[v0] ladolce page store:', store?.id ?? 'NULL', store?.status)
  const dbProducts = store ? await getProductsForStore(store.id) : []

  const products =
    dbProducts.length > 0
      ? dbProducts.map((p) => ({
          id: p.id,
          nameEn: p.name,
          nameAr: p.name,
          price: Number(p.price),
          descAr: p.description ?? '',
          image: p.image_url ?? '/placeholder.svg',
        }))
      : LADOLCE_PRODUCTS

  return <LaDolceFlow storeId={store?.id ?? null} products={products} />
}
