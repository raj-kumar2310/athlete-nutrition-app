import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/client';

export async function GET(req: Request) {
  try {
    const supabase = createClient();
    const origin = req.headers.get('origin') ?? process.env.NEXT_PUBLIC_APP_URL ?? '';
    const redirectTo = `${origin.replace(/\/$/, '')}/auth/callback`;
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo },
    });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    // Supabase returns a redirect URL to send the browser to.
    if (data?.url) return NextResponse.redirect(data.url);
    return NextResponse.json({ error: 'No redirect URL returned from Supabase' }, { status: 500 });
  } catch (err) {
    return NextResponse.json({ error: 'OAuth initialization failed' }, { status: 500 });
  }
}
