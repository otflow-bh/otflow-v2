'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export type OrderItemInput = { name: string; qty: number; price: number }

export async function placeOrder(input: {
  storeId: string
  customerName: string
  customerPhone: string
  fulfillment: 'delivery' | 'pickup'
  address: string
  paymentMethod: string
  subtotal: number
  deliveryFee: number
  total: number
  items: OrderItemInput[]
}): Promise<{ ok: boolean; id?: string; error?: string }> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('orders')
    .insert({
      store_id: input.storeId,
      customer_name: input.customerName,
      customer_phone: input.customerPhone,
      fulfillment: input.fulfillment,
      address: input.address,
      payment_method: input.paymentMethod,
      subtotal: input.subtotal,
      delivery_fee: input.deliveryFee,
      total: input.total,
      items: input.items,
      status: 'new',
    })
    .select('id')
    .single()

  if (error) {
    console.log('[v0] placeOrder insert error:', error.message, error.details, error.hint)
    return { ok: false, error: error.message }
  }
  return { ok: true, id: data.id as string }
}

export async function submitStoreRequest(input: {
  businessName: string
  contactName: string
  email: string
  phone: string
  businessType: string
  plan: string
  notes: string
}): Promise<{ ok: boolean; error?: string }> {
  const supabase = await createClient()
  const { error } = await supabase.from('store_requests').insert({
    business_name: input.businessName,
    contact_name: input.contactName,
    email: input.email,
    phone: input.phone,
    business_type: input.businessType,
    plan: input.plan,
    notes: input.notes,
    status: 'new',
  })
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}

export async function updateOrderStatus(
  orderId: string,
  status: string,
  storeSlug: string,
): Promise<{ ok: boolean; error?: string }> {
  const supabase = await createClient()
  const { error } = await supabase.from('orders').update({ status }).eq('id', orderId)
  if (error) return { ok: false, error: error.message }
  revalidatePath(`/workspace/${storeSlug}`)
  return { ok: true }
}

export async function updateRequestStatus(
  requestId: string,
  status: string,
): Promise<{ ok: boolean; error?: string }> {
  const supabase = await createClient()
  const { error } = await supabase.from('store_requests').update({ status }).eq('id', requestId)
  if (error) return { ok: false, error: error.message }
  revalidatePath('/admin')
  return { ok: true }
}

export async function toggleProduct(
  productId: string,
  available: boolean,
  storeSlug: string,
): Promise<{ ok: boolean; error?: string }> {
  const supabase = await createClient()
  const { error } = await supabase.from('products').update({ available }).eq('id', productId)
  if (error) return { ok: false, error: error.message }
  revalidatePath(`/workspace/${storeSlug}`)
  return { ok: true }
}

export async function upsertProduct(input: {
  id?: string
  storeId: string
  name: string
  description: string
  category: string
  price: number
  imageUrl: string
  storeSlug: string
}): Promise<{ ok: boolean; error?: string }> {
  const supabase = await createClient()
  const row = {
    store_id: input.storeId,
    name: input.name,
    description: input.description,
    category: input.category,
    price: input.price,
    image_url: input.imageUrl || null,
    available: true,
  }
  const { error } = input.id
    ? await supabase.from('products').update(row).eq('id', input.id)
    : await supabase.from('products').insert(row)
  if (error) return { ok: false, error: error.message }
  revalidatePath(`/workspace/${input.storeSlug}`)
  return { ok: true }
}

export async function approveRequest(input: {
  requestId: string
  name: string
  slug: string
}): Promise<{ ok: boolean; error?: string }> {
  const supabase = await createClient()
  const { error: storeErr } = await supabase.from('stores').insert({
    slug: input.slug,
    name: input.name,
    status: 'active',
  })
  if (storeErr) return { ok: false, error: storeErr.message }
  await supabase.from('store_requests').update({ status: 'approved' }).eq('id', input.requestId)
  revalidatePath('/admin')
  return { ok: true }
}
