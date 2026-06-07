/* app/(auth)/login/page.tsx */
'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login, signInWithGoogleClient } from '@/lib/auth/actions';

const schema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await login(data.email, data.password);
      if (result.error) {
        setError(result.error.message);
      } else {
        router.push('/dashboard');
      }
    } catch {
      setError('Unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      const res = await signInWithGoogleClient();
      if (res.error) {
        setError(res.error.message ?? 'Google sign-in failed');
      } else if (res.data?.url) {
        // Redirect to provider
        window.location.href = res.data.url;
      } else {
        setError('Google sign-in did not return a redirect URL');
      }
    } catch (e) {
      setError('Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center">Login to AthleteEats</h1>
        {error && <p className="text-sm text-destructive text-center">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register('email')} disabled={loading} />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register('password')} disabled={loading} />
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Logging in…' : 'Login'}
          </Button>
        </form>
        <div className="flex items-center justify-between">
          <hr className="flex-grow" />
          <span className="px-2 text-sm text-muted-foreground">OR</span>
          <hr className="flex-grow" />
        </div>
        <Button variant="outline" onClick={handleGoogle} className="w-full" disabled={loading}>
          Continue with Google
        </Button>
        <p className="text-center text-sm">
          Don&apos;t have an account?{' '}
          <a href="/signup" className="text-primary underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
