import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protect dashboard and related routes. This middleware checks for a Supabase
// auth cookie (best-effort) and redirects to /login when missing. Note: for
// full server-side protection you must configure Supabase to set a cookie on
// successful sign-in (see Supabase auth cookie docs).
export function middleware(req: NextRequest) {
  const protectedPaths = ['/dashboard', '/meal-plan', '/training', '/progress'];
  const { pathname } = req.nextUrl;

  // Allow api, static assets and auth callback
  if (pathname.startsWith('/api') || pathname.startsWith('/_next') || pathname.startsWith('/auth/callback') || pathname === '/login' || pathname === '/signup') {
    return NextResponse.next();
  }

  const needsProtection = protectedPaths.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  if (!needsProtection) return NextResponse.next();

  // Best-effort cookie checks: common Supabase cookie names
  const cookieNames = ['sb-access-token', 'sb-refresh-token', 'supabase-auth-token', 'sb:token'];
  const hasAuthCookie = cookieNames.some((name) => Boolean(req.cookies.get(name)));

  if (!hasAuthCookie) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/meal-plan/:path*', '/training/:path*', '/progress/:path*'],
};
