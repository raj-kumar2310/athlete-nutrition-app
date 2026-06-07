/* eslint-disable @typescript-eslint/no-explicit-any */
/* lib/api/analytics.ts */
import { createClient } from '@/lib/supabase/client';

export type ProgressRecord = {
  date: string; // ISO date string
  weight_kg: number | null;
  calories: number | null;
  protein_g: number | null;
  carbs_g: number | null;
  fats_g: number | null;
};

/**
 * Fetch raw progress data for a user between two dates.
 * Returns an array ordered by date ascending.
 */
export async function getProgressData(
  userId: string,
  startDate: string,
  endDate: string,
): Promise<ProgressRecord[]> {
  const supabase = createClient() as any;
  const { data, error } = await supabase
    .from('meal_logs')
    .select(
      `logged_at, calories, food_id (protein_g, carbs_g, fats_g), weight_kg`
    )
    .eq('user_id', userId)
    .gte('logged_at', startDate)
    .lte('logged_at', endDate)
    .order('logged_at', { ascending: true });

  if (error) throw error;

  // Aggregate per day
  const dailyMap: Record<string, ProgressRecord> = {};
  (data as any[] | null)?.forEach((row) => {
    const date = new Date(row.logged_at).toISOString().split('T')[0];
    if (!dailyMap[date]) {
      dailyMap[date] = {
        date,
        weight_kg: null,
        calories: 0,
        protein_g: 0,
        carbs_g: 0,
        fats_g: 0,
      };
    }
    const day = dailyMap[date];
    day.calories! += row.calories ?? 0;
    day.protein_g! += row.food_id?.protein_g ?? 0;
    day.carbs_g! += row.food_id?.carbs_g ?? 0;
    day.fats_g! += row.food_id?.fats_g ?? 0;
    // Assume weight_kg may be recorded separately (e.g., profile table). For simplicity, ignore here.
  });

  return Object.values(dailyMap).sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * Calculate average values for a set of progress records.
 */
export function calculateAverages(data: ProgressRecord[]) {
  const totals = data.reduce(
    (acc, cur) => {
      acc.weight += cur.weight_kg ?? 0;
      acc.calories += cur.calories ?? 0;
      acc.protein += cur.protein_g ?? 0;
      acc.carbs += cur.carbs_g ?? 0;
      acc.fats += cur.fats_g ?? 0;
      acc.count += cur.weight_kg !== null ? 1 : 0;
      return acc;
    },
    { weight: 0, calories: 0, protein: 0, carbs: 0, fats: 0, count: 0 },
  );

  const avgWeight = totals.count ? totals.weight / totals.count : null;

  return {
    avgWeight,
    avgCalories: data.length ? totals.calories / data.length : 0,
    avgProtein: data.length ? totals.protein / data.length : 0,
    avgCarbs: data.length ? totals.carbs / data.length : 0,
    avgFats: data.length ? totals.fats / data.length : 0,
  };
}

/**
 * Export data to CSV string.
 */
export function exportToCSV(data: ProgressRecord[]): string {
  const header = [
    'Date',
    'Weight (kg)',
    'Calories',
    'Protein (g)',
    'Carbs (g)',
    'Fats (g)',
  ].join(',');

  const rows = data.map((r) =>
    [r.date, r.weight_kg ?? '', r.calories ?? '', r.protein_g ?? '', r.carbs_g ?? '', r.fats_g ?? ''].join(','),
  );

  return [header, ...rows].join('\n');
}
