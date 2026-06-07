/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '@/lib/supabase/client';

/**
 * Updates the streak for a user based on a new meal log.
 * Should be called after inserting a meal log entry.
 */
export async function updateStreak(userId: string) {
  const supabase = createClient() as any;

  // Fetch the user's profile streak data
  const { data: profile, error: profileErr } = await supabase
    .from('profiles')
    .select('current_streak,longest_streak')
    .eq('id', userId)
    .single();

  if (profileErr || !profile) {
    console.error('Failed to fetch profile for streak:', profileErr);
    return;
  }

  // Determine if the user has already logged a meal today
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const { data: todayLogs, error: logsErr } = await supabase
    .from('meal_logs')
    .select('id')
    .eq('user_id', userId)
    .gte('logged_at', todayStart.toISOString())
    .lte('logged_at', todayEnd.toISOString());

  if (logsErr) {
    console.error('Failed to fetch today logs:', logsErr);
    return;
  }

  // If there is already a log for today, we don't increment the streak again
  if (todayLogs && todayLogs.length > 0) {
    return;
  }

  // Increment streak
  const profileData = profile as { current_streak?: number; longest_streak?: number };
  const newCurrent = (profileData.current_streak || 0) + 1;
  const newLongest = Math.max(profileData.longest_streak || 0, newCurrent);

  const { error: updateErr } = await supabase
    .from('profiles')
    .update({ current_streak: newCurrent, longest_streak: newLongest })
    .eq('id', userId);

  if (updateErr) {
    console.error('Failed to update streak:', updateErr);
  }
}

/**
 * Resets the user's current streak. Used for the monthly "freeze" feature.
 */
export async function resetStreak(userId: string) {
  const supabase = createClient() as any;
  const { error } = await supabase
    .from('profiles')
    .update({ current_streak: 0 })
    .eq('id', userId);
  if (error) console.error('Failed to reset streak:', error);
}
