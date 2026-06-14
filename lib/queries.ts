import { createClient } from '@/lib/supabase/server'

export type Store = {
  id: string
  slug: string
  name: string
  tagline: string | null
  currency: string
  primary_color: string | null
  accent_color: string | null
  status: string
}

export type ProductRow = {
  id: string
  store_id: string
  name: string
  description: string | null
  category: string | null
  price: number
  image_url: string | null
  available: boolean
}

export type OrderRow = {
  id: string
  store_id: string
  customer_name: string
  customer_phone: string | null
  fulfillment: string
  address: string | null
  payment_method: string | null
  subtotal: number
  delivery_fee: number
  total: number
  status: string
  items: { name: string; qty: number; price: number }[]
  created_at: string
}

export async function getStoreBySlug(slug: string): Promise<Store | null> {
  const supabase = await createClient()
  const { data } = await supabase.from('stores').select('*').eq('slug', slug).maybeSingle()
  return (data as Store) ?? null
}

export async function getProductsForStore(storeId: string): Promise<ProductRow[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('store_id', storeId)
    .order('price', { ascending: true })
  return (data as ProductRow[]) ?? []
}

export async function getOrdersForStore(storeId: string): Promise<OrderRow[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('orders')
    .select('*')
    .eq('store_id', storeId)
    .order('created_at', { ascending: false })
  return (data as OrderRow[]) ?? []
}

export async function getAllStores(): Promise<Store[]> {
  const supabase = await createClient()
  const { data } = await supabase.from('stores').select('*').order('created_at', { ascending: false })
  return (data as Store[]) ?? []
}

export async function getAllRequests() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('store_requests')
    .select('*')
    .order('created_at', { ascending: false })
  return data ?? []
}

export async function getCurrentProfile() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null
  const { data } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle()
  return data
    ? { ...data, user_email: user.email as string | undefined }
    : { id: user.id, role: 'customer', user_email: user.email as string | undefined }
}
