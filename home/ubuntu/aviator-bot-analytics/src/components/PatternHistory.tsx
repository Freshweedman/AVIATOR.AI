'use client';

interface PatternRecord {
  timestamp: Date;
  type: string;
  confidence: number;
}

interface PatternHistoryProps {
  patterns: PatternRecord[];
}

const getPatternColor = (type: string): string => {
  switch (type) {
    case '7_reds_alert':
      return 'bg-red-100 dark:bg-red-900 border-red-500';
    case 'high_volatility':
      return 'bg-yellow-100 dark:bg-yellow-900 border-yellow-500';
    case 'recovery_zone':
      return 'bg-green-100 dark:bg-green-900 border-green-500';
    default:
      return 'bg-gray-100 dark:bg-gray-800 border-gray-500';
  }
};

const getPatternLabel = (type: string): string => {
  switch (type) {
    case '7_reds_alert':
      return '🔴 Vermelhos Consecutivos';
    case 'high_volatility':
      return '📈 Alta Volatilidade';
    case 'recovery_zone':
      return '💰 Zona de Recuperação';
    default:
      return '❓ Desconhecido';
  }
};

export default function PatternHistory({ patterns }: PatternHistoryProps) {
  if (patterns.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-8">
        Nenhum padrão detectado ainda
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-96 overflow-y-auto">
      {patterns
        .slice()
        .reverse()
        .map((pattern, index) => (
          <div
            key={index}
            className={`border-l-4 p-3 rounded ${getPatternColor(pattern.type)}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">{getPatternLabel(pattern.type)}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {pattern.timestamp.toLocaleTimeString('pt-BR')}
                </p>
              </div>
              <span className="text-sm font-bold">{pattern.confidence}%</span>
            </div>
          </div>
        ))}
    </div>
  );
}

