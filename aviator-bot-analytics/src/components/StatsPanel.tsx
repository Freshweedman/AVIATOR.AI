'use client';

interface PatternAnalysis {
  lastMultipliers: number[];
  redCount: number;
  yellowCount: number;
  greenCount: number;
  consecutiveReds: number;
  averageLast50: number;
  averageLast100: number;
  standardDeviation: number;
  alertTriggered: boolean;
  alertType: 'none' | '7_reds_alert' | 'high_volatility' | 'recovery_zone';
  confidence: number;
  patternCount: number;
}

interface StatsPanelProps {
  analysis: PatternAnalysis;
}

export default function StatsPanel({ analysis }: StatsPanelProps) {
  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-300">Vermelhos Consecutivos</p>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{analysis.consecutiveReds}</p>
        </div>

        <div className="bg-red-50 dark:bg-red-900 p-4 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-300">Total Vermelhos</p>
          <p className="text-3xl font-bold text-red-600 dark:text-red-400">{analysis.redCount}</p>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-300">Total Amarelos</p>
          <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{analysis.yellowCount}</p>
        </div>

        <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-300">Total Verdes</p>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">{analysis.greenCount}</p>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-300">Média Últimas 50</p>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{analysis.averageLast50}x</p>
        </div>

        <div className="bg-indigo-50 dark:bg-indigo-900 p-4 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-300">Média Últimas 100</p>
          <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{analysis.averageLast100}x</p>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
        <h3 className="font-semibold mb-4">📈 Estatísticas Detalhadas</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-300">Desvio Padrão:</span>
            <span className="font-bold">{analysis.standardDeviation}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-300">Alerta Ativo:</span>
            <span className={`font-bold ${analysis.alertTriggered ? 'text-red-600' : 'text-green-600'}`}>
              {analysis.alertTriggered ? '✓ Sim' : '✗ Não'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-300">Tipo de Alerta:</span>
            <span className="font-bold text-sm">{analysis.alertType}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-300">Confiança:</span>
            <span className="font-bold">{analysis.confidence}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-300">Padrões Detectados:</span>
            <span className="font-bold">{analysis.patternCount}</span>
          </div>
        </div>
      </div>

      {/* Distribution Chart */}
      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
        <h3 className="font-semibold mb-4">📊 Distribuição de Zonas</h3>
        <div className="space-y-3">
          {/* Red Distribution */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Vermelhos</span>
              <span>{analysis.redCount}</span>
            </div>
            <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2">
              <div
                className="bg-red-500 h-2 rounded-full"
                style={{
                  width: `${((analysis.redCount / (analysis.redCount + analysis.yellowCount + analysis.greenCount)) * 100) || 0}%`,
                }}
              ></div>
            </div>
          </div>

          {/* Yellow Distribution */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Amarelos</span>
              <span>{analysis.yellowCount}</span>
            </div>
            <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2">
              <div
                className="bg-yellow-500 h-2 rounded-full"
                style={{
                  width: `${((analysis.yellowCount / (analysis.redCount + analysis.yellowCount + analysis.greenCount)) * 100) || 0}%`,
                }}
              ></div>
            </div>
          </div>

          {/* Green Distribution */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Verdes</span>
              <span>{analysis.greenCount}</span>
            </div>
            <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{
                  width: `${((analysis.greenCount / (analysis.redCount + analysis.yellowCount + analysis.greenCount)) * 100) || 0}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

