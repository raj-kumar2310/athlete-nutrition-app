/* app/(dashboard)/training/page.tsx */
"use client";

import React from 'react';
import ProtectedRoute from '@/components/protected-route';
import { useQuery } from '@tanstack/react-query';
import SessionForm from '@/components/training/session-form';
import { getTrainingSessions } from '@/lib/api/training';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Placeholder auth – replace with real user context
const USER_ID = 'CURRENT_USER_ID';

export default function TrainingPage() {
  // Fetch today's sessions
  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ['trainingSessions', USER_ID],
    queryFn: () => getTrainingSessions(USER_ID),
  });

  // Prepare data for weekly chart (last 7 days)
  const weeklyData = React.useMemo(() => {
    const today = new Date();
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const key = d.toISOString().split('T')[0];
      const daySessions = sessions.filter((s) => s.logged_at?.startsWith(key));
      const totalMinutes = daySessions.reduce((sum, s) => sum + (s.duration_min ?? 0), 0);
      data.push({ date: d.toLocaleDateString(undefined, { weekday: 'short' }), minutes: totalMinutes });
    }
    return data;
  }, [sessions]);

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Log Training Session</CardTitle>
        </CardHeader>
        <CardContent>
          <SessionForm userId={USER_ID} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Today&apos;s Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-muted-foreground">Loading…</p>
          ) : sessions.length === 0 ? (
            <p className="text-muted-foreground">No sessions logged today.</p>
          ) : (
            <ul className="space-y-2">
              {sessions.map((s) => (
                <li key={s.id} className="flex justify-between items-center">
                  <span>{s.sport} – {s.duration_min} min – {s.intensity}</span>
                  <span className="font-medium">{Math.round(s.calories_burned)} kcal</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Training Volume</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <XAxis dataKey="date" />
              <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Bar dataKey="minutes" fill="var(--primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      </div>
    </ProtectedRoute>
  );
}
