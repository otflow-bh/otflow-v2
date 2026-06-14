import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/**
 * OTFlow Supabase client.
 *
 * Only uses public, browser-safe keys:
 *   - NEXT_PUBLIC_SUPABASE_URL
 *   - NEXT_PUBLIC_SUPABASE_ANON_KEY
 *
 * Service role keys are NEVER referenced here.
 *
 * If the environment variables are missing, `getSupabase()` returns null and
 * the app falls back to local demo data so every page keeps working.
 */

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let client: SupabaseClient | null = null

export function isSupabaseConfigured(): boolean {
  return Boolean(url && anonKey)
}

export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null
  if (!client) {
    client = createClient(url as string, anonKey as string)
  }
  return client
}

/**
 * Expected tables for future integration:
 *   workspaces, products, orders, leads, subscriptions
 *
 * Each helper gracefully returns the provided demo fallback when Supabase is
 * not configured, so the UI is identical in demo and live modes.
 */

export async function fetchProducts<T>(fallback: T[]): Promise<T[]> {
  const supabase = getSupabase()
  if (!supabase) return fallback
  const { data, error } = await supabase.from('products').select('*')
  if (error || !data) return fallback
  return data as T[]
}

export async function fetchOrders<T>(fallback: T[]): Promise<T[]> {
  const supabase = getSupabase()
  if (!supabase) return fallback
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
  if (error || !data) return fallback
  return data as T[]
}

export async function fetchWorkspaces<T>(fallback: T[]): Promise<T[]> {
  const supabase = getSupabase()
  if (!supabase) return fallback
  const { data, error } = await supabase.from('workspaces').select('*')
  if (error || !data) return fallback
  return data as T[]
}

export async function createLead(lead: Record<string, unknown>): Promise<boolean> {
  const supabase = getSupabase()
  if (!supabase) return false
  const { error } = await supabase.from('leads').insert(lead)
  return !error
}
