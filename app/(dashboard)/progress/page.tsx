/* app/(dashboard)/progress/page.tsx */
'use client';

import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { format, subDays } from 'date-fns';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import ProtectedRoute from '@/components/protected-route';
import { Button } from '@/components/ui/button';
import { NutritionLineChart } from '@/components/charts/nutrition-line-chart';
import { Download } from 'lucide-react';
import { getProgressData, calculateAverages, exportToCSV } from '@/lib/api/analytics';
import { Loader2 } from 'lucide-react';

// Recharts components for bar & stacked bar charts
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';

export default function ProgressPage() {
  const queryClient = useQueryClient();
  const [rangeDays, setRangeDays] = useState(7);

  const endDate = format(new Date(), 'yyyy-MM-dd');
  const startDate = format(subDays(new Date(), rangeDays), 'yyyy-MM-dd');

  const { data, isLoading, error } = useQuery({
    queryKey: ['progressData', rangeDays],
    queryFn: () => getProgressData('current-user-id', startDate, endDate),
    staleTime: 5 * 60 * 1000,
  });

  // For demo we use a static userId – in production replace with session userId.

  const averages = data ? calculateAverages(data) : null;

  const handleExport = () => {
    if (!data) return;
    const csv = exportToCSV(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `progress_${startDate}_to_${endDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Refetch when range changes
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['progressData', rangeDays] });
  }, [rangeDays, queryClient]);

  return (
    <ProtectedRoute>
      <section className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Progress Tracker</h1>

      {/* Date range selector */}
      <div className="flex items-center gap-4">
        <label className="font-medium">Show last:</label>
        <select
          value={rangeDays}
          onChange={(e) => setRangeDays(Number(e.target.value))}
          className="border rounded p-1"
        >
          <option value={7}>7 days</option>
          <option value={30}>30 days</option>
          <option value={90}>90 days</option>
        </select>
        <Button variant="outline" onClick={handleExport} disabled={!data} className="flex items-center gap-2">
          <Download size={16} /> Export CSV
        </Button>
      </div>

      {isLoading && (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )}

      {error && <p className="text-destructive">Failed to load progress data.</p>}

      {data && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {/* Weight line chart */}
          <Card>
            <CardHeader>
              <CardTitle>Weight Over Time</CardTitle>
              {averages?.avgWeight && (
                <CardDescription>Average: {averages.avgWeight.toFixed(2)} kg</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <NutritionLineChart data={data} />
            </CardContent>
          </Card>

          {/* Daily calories bar chart */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Calories</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={(v) => new Date(v).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="calories" fill="var(--color-primary)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Macros stacked bar chart */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Macro Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data} stackOffset="sign" margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={(v) => new Date(v).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="protein_g" stackId="a" fill="var(--color-blue)" name="Protein (g)" />
                  <Bar dataKey="carbs_g" stackId="a" fill="var(--color-orange)" name="Carbs (g)" />
                  <Bar dataKey="fats_g" stackId="a" fill="var(--color-green)" name="Fats (g)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}
      </section>
    </ProtectedRoute>
  );
}
