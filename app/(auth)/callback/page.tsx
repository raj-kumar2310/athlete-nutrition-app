"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function OAuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const finalize = async () => {
      try {
        const supabase = createClient();
        // Parse the session from the URL after provider redirect and store it.
        const { data, error } = await supabase.auth.getSessionFromUrl({ storeSession: true });
        if (error) {
          setError(error.message ?? 'Failed to finalize sign-in');
          return;
        }
        // session stored — navigate to dashboard
        router.replace('/dashboard');
      } catch (e) {
        setError('OAuth callback error');
      }
    };
    finalize();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {error ? (
        <div className="text-center">
          <h2 className="text-lg font-semibold">Authentication Error</h2>
          <p className="mt-2 text-sm text-destructive">{error}</p>
          <a href="/login" className="text-primary underline mt-4 inline-block">Return to login</a>
        </div>
      ) : (
        <div className="text-center">
          <p>Finalizing sign-in — redirecting…</p>
        </div>
      )}
    </div>
  );
}
