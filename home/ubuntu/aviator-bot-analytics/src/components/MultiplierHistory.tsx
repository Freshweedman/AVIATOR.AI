'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface AviatorRoundData {
  id: string;
  multiplier: number;
  roundNumber: number;
  timestamp: string;
  platform: string;
}

interface MultiplierHistoryProps {
  rounds: AviatorRoundData[];
}

const getMultiplierColor = (multiplier: number): string => {
  if (multiplier <= 2) return '#ef4444'; // red
  if (multiplier <= 10) return '#f59e0b'; // yellow
  return '#22c55e'; // green
};

export default function MultiplierHistory({ rounds }: MultiplierHistoryProps) {
  // Preparar dados para o gráfico (últimos 50 para melhor visualização)
  const chartData = rounds
    .slice(0, 50)
    .reverse()
    .map((round, index) => ({
      name: `R${round.roundNumber}`,
      multiplier: round.multiplier,
      color: getMultiplierColor(round.multiplier),
    }));

  // Estatísticas rápidas
  const stats = {
    total: rounds.length,
    average: (rounds.reduce((sum, r) => sum + r.multiplier, 0) / rounds.length).toFixed(2),
    max: Math.max(...rounds.map(r => r.multiplier)).toFixed(2),
    min: Math.min(...rounds.map(r => r.multiplier)).toFixed(2),
    redCount: rounds.filter(r => r.multiplier <= 2).length,
    yellowCount: rounds.filter(r => r.multiplier > 2 && r.multiplier <= 10).length,
    greenCount: rounds.filter(r => r.multiplier > 10).length,
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total de Rodadas</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Média</p>
          <p className="text-2xl font-bold">{stats.average}x</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Máximo</p>
          <p className="text-2xl font-bold">{stats.max}x</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Mínimo</p>
          <p className="text-2xl font-bold">{stats.min}x</p>
        </div>
      </div>

      {/* Color Distribution */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-red-50 dark:bg-red-900 p-4 rounded-lg border-l-4 border-red-500">
          <p className="text-sm text-gray-600 dark:text-gray-300">Vermelhos (≤2x)</p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.redCount}</p>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg border-l-4 border-yellow-500">
          <p className="text-sm text-gray-600 dark:text-gray-300">Amarelos (2-10x)</p>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.yellowCount}</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg border-l-4 border-green-500">
          <p className="text-sm text-gray-600 dark:text-gray-300">Verdes (>10x)</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.greenCount}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Últimas 50 Rodadas</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
            <YAxis />
            <Tooltip formatter={(value) => `${value}x`} />
            <Bar dataKey="multiplier" fill="#8884d8" radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-700 p-4 rounded-lg overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">Últimas 20 Rodadas (Detalhes)</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b dark:border-gray-600">
              <th className="text-left py-2">Rodada</th>
              <th className="text-left py-2">Multiplicador</th>
              <th className="text-left py-2">Zona</th>
              <th className="text-left py-2">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {rounds.slice(0, 20).map((round) => {
              const zone = round.multiplier <= 2 ? 'Vermelho' : round.multiplier <= 10 ? 'Amarelo' : 'Verde';
              const zoneColor = round.multiplier <= 2 ? 'text-red-600' : round.multiplier <= 10 ? 'text-yellow-600' : 'text-green-600';
              return (
                <tr key={round.id} className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="py-2">{round.roundNumber}</td>
                  <td className="py-2 font-bold">{round.multiplier}x</td>
                  <td className={`py-2 font-semibold ${zoneColor}`}>{zone}</td>
                  <td className="py-2 text-gray-500 dark:text-gray-400">
                    {new Date(round.timestamp).toLocaleTimeString('pt-BR')}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

