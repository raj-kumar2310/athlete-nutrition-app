/* app/(dashboard)/meal-plan/page.tsx */
"use client";

import React from 'react';
import ProtectedRoute from '@/components/protected-route';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { generateMealPlan } from '@/lib/ai/meal-planner';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import MealPlanCard from '@/components/meal-plan-card';
import { toast } from '@/hooks/use-toast';
import type { MealPlan, PlannedMeal } from '@/lib/ai/meal-planner';

// Placeholder – replace with real auth context
const USER_ID = 'CURRENT_USER_ID';

export default function MealPlanPage() {
  const queryClient = useQueryClient();

  const {
    mutateAsync: generatePlan,
    data: plan,
    isPending,
    isError,
    error,
  } = useMutation<MealPlan, Error>({
    mutationFn: () => generateMealPlan(USER_ID),
    onSuccess: (data) => {
      queryClient.setQueryData(['mealPlan', USER_ID], data);
      toast({ title: 'Meal plan generated!' });
    },
    onError: () => {
      toast({ title: 'Failed to generate plan' });
    },
  });

  const handleGenerate = async () => {
    await generatePlan();
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI‑Powered Meal Planner</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <Button onClick={handleGenerate} disabled={isPending}>
            {isPending ? 'Generating…' : 'Generate 3-Day Plan'}
          </Button>
        </CardContent>
      </Card>

      {isPending && (
        <div className="space-y-4">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      )}

      {isError && <p className="text-destructive">{error?.message ?? 'Error'}</p>}

      {plan && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plan.days.map((day, idx: number) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle>{day.label}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {day.meals.map((meal: PlannedMeal) => (
                  <MealPlanCard
                    key={meal.id}
                    dayLabel={day.label}
                    meal={meal}
                    userId={USER_ID}
                  />
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      </div>
    </ProtectedRoute>
  );
}
