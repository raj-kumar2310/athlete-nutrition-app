import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Confetti } from '@/components/confetti'; // assume simple confetti component
import { logWater, getHydrationToday } from '@/lib/api/hydration';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * HydrationTracker – displays 8 water‑glass icons (2 L goal by default) and lets the user
 * quickly add water amounts. Supports a custom amount input, electrolyte type selector
 * and shows a progress ring. Confetti animation fires when the daily goal is reached.
 */
export default function HydrationTracker() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const userId = 'CURRENT_USER_ID'; // replace with real auth context

  // Load today's hydration data
  const { data: today, isLoading } = useQuery({
    queryKey: ['hydrationToday', userId],
    queryFn: () => getHydrationToday(userId),
    staleTime: 5 * 60 * 1000,
  });

  const [showConfetti, setShowConfetti] = useState(false);
  const [customAmount, setCustomAmount] = useState('');
  const [electrolyte, setElectrolyte] = useState('plain');

  const logMutation = useMutation({
    mutationFn: ({ amount }: { amount: number }) => logWater(userId, amount, electrolyte),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hydrationToday', userId] });
      toast({ title: 'Water logged!', description: `${electrolyte} water added.` });
    },
  });

  const totalMl = today?.total_ml ?? 0;
  const goalMl = today?.goal_ml ?? 2000; // default 2 L
  const progress = Math.min((totalMl / goalMl) * 100, 100);

  // Trigger confetti when goal reached for the first time
  useEffect(() => {
    if (progress >= 100 && !showConfetti) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }
  }, [progress, showConfetti]);

  const quickAdd = (ml: number) => {
    logMutation.mutate({ amount: ml });
  };

  const handleCustomAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseInt(customAmount, 10);
    if (!isNaN(amt) && amt > 0) {
      quickAdd(amt);
      setCustomAmount('');
    }
  };

  const glassCount = 8; // 8 glasses = 2 L
  const filledGlasses = Math.round((totalMl / goalMl) * glassCount);

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Hydration Tracker</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress ring */}
        <div className="relative flex justify-center">
          <svg viewBox="0 0 36 36" className="w-24 h-24 transform -rotate-90">
            <circle
              cx="18"
              cy="18"
              r="15.9155"
              fill="none"
              stroke="var(--muted)"
              strokeWidth="3"
            />
            <circle
              cx="18"
              cy="18"
              r="15.9155"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="3"
              strokeDasharray="100"
              strokeDashoffset={100 - progress}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold">{totalMl} ml</span>
            <span className="text-sm text-muted-foreground">of {goalMl} ml</span>
          </div>
        </div>

        {/* Glass icons */}
        <div className="flex justify-center gap-2">
          {[...Array(glassCount)].map((_, i) => (
            <motion.div
              key={i}
              className={cn('w-8 h-12 rounded-t-full border-2 border-primary', {
                'bg-primary': i < filledGlasses,
                'bg-transparent': i >= filledGlasses,
              })}
              animate={{ opacity: i < filledGlasses ? 1 : 0.3 }}
            />
          ))}
        </div>

        {/* Quick add buttons */}
        <div className="flex flex-wrap gap-2 justify-center">
          {[250, 500, 750, 1000].map((ml) => (
            <Button key={ml} size="sm" onClick={() => quickAdd(ml)} disabled={logMutation.isPending}>
              +{ml} ml
            </Button>
          ))}
        </div>

        {/* Custom amount */}
        <form onSubmit={handleCustomAdd} className="flex items-center gap-2 justify-center">
          <Input
            type="number"
            placeholder="Custom ml"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            className="w-24"
            min={1}
          />
          <select
            value={electrolyte}
            onChange={(e) => setElectrolyte(e.target.value)}
            className="h-8 w-[120px] rounded-md border border-input bg-background px-2 text-sm"
          >
            <option value="plain">Plain</option>
            <option value="sports">Sports</option>
            <option value="electrolyte">Electrolyte</option>
          </select>
          <Button type="submit" size="sm" disabled={logMutation.isPending}>Add</Button>
        </form>

        {/* Confetti */}
        {showConfetti && <Confetti />}

        {/* Loading */}
        {isLoading && <p className="text-muted-foreground text-center">Loading…</p>}
      </CardContent>
    </Card>
  );
}
