'use client';

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

interface DistributionChartProps {
  redCount: number;
  yellowCount: number;
  greenCount: number;
}

const COLORS = ['#ef4444', '#f59e0b', '#22c55e'];

export default function DistributionChart({
  redCount,
  yellowCount,
  greenCount,
}: DistributionChartProps) {
  const data = [
    { name: 'Vermelhos (≤2x)', value: redCount },
    { name: 'Amarelos (2-10x)', value: yellowCount },
    { name: 'Verdes (>10x)', value: greenCount },
  ];

  const total = redCount + yellowCount + greenCount;

  if (total === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Nenhum dado disponível
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, value }) => `${name}: ${value}`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value} rodadas`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

