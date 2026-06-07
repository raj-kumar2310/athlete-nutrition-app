import { createClient } from '@/lib/supabase/client';

export async function login(email: string, password: string) {
  const supabase = createClient();
  const result = await supabase.auth.signInWithPassword({ email, password });
  return result;
}

export async function logout() {
  const supabase = createClient();
  return supabase.auth.signOut();
}

export async function signInWithGoogleClient() {
  const supabase = createClient();
  const origin = typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_APP_URL ?? '';
  const redirectTo = `${origin.replace(/\/$/, '')}/auth/callback`;
  return supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo } });
}
