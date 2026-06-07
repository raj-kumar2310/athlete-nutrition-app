"use client";

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';

type FormData = {
  email: string;
  password: string;
  full_name: string;
  age: number;
  weight_kg: number;
  height_cm: number;
  sport_type: 'cricket' | 'kabaddi' | 'athletics' | 'football';
  goal: 'muscle_gain' | 'fat_loss' | 'performance' | 'maintenance';
};

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const methods = useForm<FormData>({
    mode: 'onBlur',
  });

  const onSubmit = async (data: FormData) => {
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    // Final submission – call server action
    try {
      const supabase = createClient();
      const { error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.full_name,
            age: data.age,
            weight_kg: data.weight_kg,
            height_cm: data.height_cm,
            sport_type: data.sport_type,
            goal: data.goal,
          },
        },
      });
      if (signUpError) throw signUpError;
      // Redirect to login or dashboard after success
      window.location.href = '/login';
    } catch (e) {
      console.error(e);
    }
  };

  const progressValue = (step / 3) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Create your AthleteEats account</h1>
      <Progress value={progressValue} className="w-full max-w-md mb-6" />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full max-w-md space-y-4">
          {step === 1 && (
            <>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" {...methods.register('email')} />
                {methods.formState.errors.email && (
                  <p className="text-sm text-red-500">{methods.formState.errors.email.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" {...methods.register('password')} />
                {methods.formState.errors.password && (
                  <p className="text-sm text-red-500">{methods.formState.errors.password.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="full_name">Full Name</Label>
                <Input id="full_name" {...methods.register('full_name')} />
                {methods.formState.errors.full_name && (
                  <p className="text-sm text-red-500">{methods.formState.errors.full_name.message}</p>
                )}
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" {...methods.register('age')} />
                {methods.formState.errors.age && (
                  <p className="text-sm text-red-500">{methods.formState.errors.age.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="weight_kg">Weight (kg)</Label>
                <Input id="weight_kg" type="number" step="0.1" {...methods.register('weight_kg')} />
                {methods.formState.errors.weight_kg && (
                  <p className="text-sm text-red-500">{methods.formState.errors.weight_kg.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="height_cm">Height (cm)</Label>
                <Input id="height_cm" type="number" step="0.1" {...methods.register('height_cm')} />
                {methods.formState.errors.height_cm && (
                  <p className="text-sm text-red-500">{methods.formState.errors.height_cm.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="sport_type">Sport Type</Label>
                <select id="sport_type" {...methods.register('sport_type')} className="border rounded w-full p-2">
                  <option value="cricket">Cricket</option>
                  <option value="kabaddi">Kabaddi</option>
                  <option value="athletics">Athletics</option>
                  <option value="football">Football</option>
                </select>
                {methods.formState.errors.sport_type && (
                  <p className="text-sm text-red-500">{methods.formState.errors.sport_type.message}</p>
                )}
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <div>
                <Label htmlFor="goal">Goal</Label>
                <select id="goal" {...methods.register('goal')} className="border rounded w-full p-2">
                  <option value="muscle_gain">Muscle Gain</option>
                  <option value="fat_loss">Fat Loss</option>
                  <option value="performance">Performance</option>
                  <option value="maintenance">Maintenance</option>
                </select>
                {methods.formState.errors.goal && (
                  <p className="text-sm text-red-500">{methods.formState.errors.goal.message}</p>
                )}
              </div>
            </>
          )}
          <div className="flex justify-between mt-4">
            {step > 1 && (
              <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            )}
            <Button type="submit">{step === 3 ? 'Sign Up' : 'Next'}</Button>
          </div>
        </form>
      </FormProvider>
      <p className="mt-4">
        Already have an account?{' '}
        <Link href="/login" className="text-primary underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
