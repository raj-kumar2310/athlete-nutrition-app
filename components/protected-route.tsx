"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      try {
        const supabase = createClient();
        const sessionRes = await supabase.auth.getSession();
        const session = (sessionRes as any)?.data?.session;
        if (!session) {
          router.replace('/login');
          return;
        }
        setLoading(false);
      } catch (err) {
        router.replace('/login');
      }
    };
    check();
  }, [router]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Checking authentication…</div>;
  return <>{children}</>;
}
