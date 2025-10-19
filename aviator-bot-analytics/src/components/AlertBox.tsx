'use client';

import { useEffect, useState } from 'react';

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

interface AlertBoxProps {
  analysis: PatternAnalysis;
}

export default function AlertBox({ analysis }: AlertBoxProps) {
  const [playSound, setPlaySound] = useState<boolean>(false);

  useEffect(() => {
    if (playSound && typeof window !== 'undefined') {
      const audio = new Audio('data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==');
      audio.play().catch(err => console.log('Som não pode ser reproduzido:', err));
    }
  }, [playSound]);

  const getAlertTitle = () => {
    switch (analysis.alertType) {
      case '7_reds_alert':
        return '🔴 Padrão de Multiplicadores Baixos Detectado!';
      case 'high_volatility':
        return '📈 Alta Volatilidade Detectada!';
      case 'recovery_zone':
        return '💰 Zona de Recuperação Identificada!';
      default:
        return 'Alerta';
    }
  };

  const getAlertDescription = () => {
    switch (analysis.alertType) {
      case '7_reds_alert':
        return `${analysis.consecutiveReds} rodadas consecutivas abaixo de 2x. Possível entrada entre 2x-4x.`;
      case 'high_volatility':
        return 'Múltiplos multiplicadores altos consecutivos. Esperar retração.';
      case 'recovery_zone':
        return 'Muitos multiplicadores baixos. Possível reversão para multiplicadores maiores.';
      default:
        return 'Nenhum padrão detectado.';
    }
  };

  const getAlertColor = () => {
    switch (analysis.alertType) {
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

  return (
    <div
      className={`${getAlertColor()} border-l-4 rounded-lg p-6 shadow-lg animate-pulse`}
    >
      <h3 className="text-xl font-bold mb-2">{getAlertTitle()}</h3>
      <p className="text-sm mb-4">{getAlertDescription()}</p>

      <div className="space-y-2 mb-4">
        <p>
          <strong>Confiança:</strong> {analysis.confidence}%
        </p>
        <p>
          <strong>Tipo de Padrão:</strong> {analysis.alertType}
        </p>
      </div>

      <button
        onClick={() => setPlaySound(!playSound)}
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm"
      >
        {playSound ? '🔊 Som Ativado' : '🔕 Ativar Som'}
      </button>
    </div>
  );
}

