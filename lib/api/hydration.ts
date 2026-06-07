/* eslint-disable @typescript-eslint/no-explicit-any */
/* lib/api/hydration.ts */
import { createClient } from '@/lib/supabase/client';

/**
 * Log water intake for a user.
 * amountMl – millilitres of water consumed.
 * type – optional electrolyte type (plain, sports, electrolyte, etc.)
 */
export async function logWater(
  userId: string,
  amountMl: number,
  type: string = 'plain',
) {
  const supabase = createClient() as any;
  const { error } = await supabase.from('hydration_logs').insert({
    user_id: userId,
    amount_ml: amountMl,
    type,
    logged_at: new Date().toISOString(),
  });
  if (error) throw error;
  return { amount_ml: amountMl };
}

/**
 * Get today's hydration summary for a user.
 * Returns total ml consumed and the current goal (ml).
 */
export async function getHydrationToday(userId: string) {
  const supabase = createClient() as any;
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const { data, error } = await supabase
    .from('hydration_logs')
    .select('amount_ml')
    .eq('user_id', userId)
    .gte('logged_at', start.toISOString())
    .lte('logged_at', end.toISOString());
  if (error) throw error;

  const total_ml = ((data as any[] | null)?.reduce((sum, r) => sum + (r.amount_ml as number), 0) ?? 0) as number;

  // Fetch user goal from profiles (assume column `hydration_goal_ml`).
  const { data: profile } = await supabase
    .from('profiles')
    .select('hydration_goal_ml')
    .eq('id', userId)
    .single();
  const goal_ml = profile?.hydration_goal_ml ?? 2000; // default 2L

  return { total_ml, goal_ml };
}

/**
 * Get hydration data for the past 7 days (or more) for weekly chart.
 */
export async function getHydrationWeekly(userId: string, days: number = 7) {
  const supabase = createClient() as any;
  const start = new Date();
  start.setDate(start.getDate() - days + 1);
  start.setHours(0, 0, 0, 0);

  const { data, error } = await supabase
    .from('hydration_logs')
    .select('logged_at, amount_ml')
    .eq('user_id', userId)
    .gte('logged_at', start.toISOString())
    .order('logged_at', { ascending: true });
  if (error) throw error;

  // Group by date string (YYYY-MM-DD)
  const daily: Record<string, number> = {};
  (data as any[] | null)?.forEach((row) => {
    const date = new Date(row.logged_at).toISOString().split('T')[0];
    daily[date] = (daily[date] ?? 0) + (row.amount_ml as number);
  });

  // Fill missing days
  const result: { date: string; total_ml: number }[] = [];
  for (let i = 0; i < days; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const key = d.toISOString().split('T')[0];
    result.push({ date: key, total_ml: daily[key] ?? 0 });
  }
  return result;
}

/**
 * Update the user's daily hydration goal (in millilitres).
 */
export async function updateHydrationGoal(userId: string, goalMl: number) {
  const supabase = createClient() as any;
  const { error } = await supabase
    .from('profiles')
    .update({ hydration_goal_ml: goalMl })
    .eq('id', userId);
  if (error) throw error;
  return { goal_ml: goalMl };
}
