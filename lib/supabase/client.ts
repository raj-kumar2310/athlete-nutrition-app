import { createClient as createSupabaseClient, SupabaseClient } from '@supabase/supabase-js';

// Lightweight wrapper used across the app. Uses the public anon key by default.
export function createClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
  if (!url || !key) {
    // Keep behavior permissive during local development; runtime code may still fail if envs missing.
    console.warn('Supabase URL or anon key is not set. Please check your .env.local');
  }
  return createSupabaseClient(url, key, {
    auth: {
      // Don't persist sessions on server-side contexts by default.
      persistSession: false,
      detectSessionInUrl: false,
    },
  });
}
