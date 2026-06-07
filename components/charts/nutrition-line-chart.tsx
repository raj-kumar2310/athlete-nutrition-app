/* components/charts/nutrition-line-chart.tsx */
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import type { ProgressRecord } from '@/lib/api/analytics';

type Props = {
  data: ProgressRecord[];
  loading?: boolean;
};

export function NutritionLineChart({ data, loading }: Props) {
  if (loading) {
    return <Skeleton className="h-64 w-full" />;
  }

  const chartData = data.map((d) => ({
    date: d.date,
    weight: d.weight_kg,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tickFormatter={(v) => new Date(v).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} />
        <YAxis domain={['dataMin - 2', 'dataMax + 2']} label={{ value: 'Weight (kg)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
        <Line type="monotone" dataKey="weight" stroke="var(--color-primary)" strokeWidth={2} dot={{ r: 3 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
