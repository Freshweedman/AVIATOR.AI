'use client';

import { useState, useEffect } from 'react';
import useSWR from 'swr';
import AlertBox from '@/components/AlertBox';
import MultiplierHistory from '@/components/MultiplierHistory';
import SettingsPanel from '@/components/SettingsPanel';
import StatsPanel from '@/components/StatsPanel';

interface AviatorRoundData {
  id: string;
  multiplier: number;
  roundNumber: number;
  timestamp: string;
  platform: string;
}

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

interface ApiResponse {
  history: AviatorRoundData[];
  analysis: PatternAnalysis;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const [triggerThreshold, setTriggerThreshold] = useState<number>(7);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const { data, error, isLoading } = useSWR<ApiResponse>(
    `/api/aviator?trigger=${triggerThreshold}`,
    fetcher,
    { refreshInterval: 10000 }
  );

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 flex items-center justify-center">
        <div className="text-red-500 text-lg">
          Falha ao carregar os dados: {error.message}
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 flex items-center justify-center">
        <div className="text-gray-500 text-lg">Carregando...</div>
      </div>
    );
  }

  const { history = [], analysis = {} as PatternAnalysis } = data || {};

  return (
    <div className={`min-h-screen transition-colors ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Aviator Analytics Bot</h1>
            <button
              onClick={toggleDarkMode}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              {isDarkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="md:col-span-2 space-y-8">
              {/* Multiplier History */}
              <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">Histórico de Rodadas (Últimos 100)</h2>
                <MultiplierHistory rounds={history} />
              </div>

              {/* Stats Panel */}
              <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">Análise de Padrões</h2>
                <StatsPanel analysis={analysis} />
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="md:col-span-1 space-y-8">
              {/* Settings Panel */}
              <SettingsPanel
                triggerThreshold={triggerThreshold}
                setTriggerThreshold={setTriggerThreshold}
              />

              {/* Alert Box */}
              {analysis.alertTriggered && <AlertBox analysis={analysis} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

