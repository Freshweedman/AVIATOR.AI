'use client';

interface SettingsPanelProps {
  triggerThreshold: number;
  setTriggerThreshold: (value: number) => void;
}

export default function SettingsPanel({
  triggerThreshold,
  setTriggerThreshold,
}: SettingsPanelProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">⚙️ Configurações</h2>

      <div className="space-y-6">
        {/* Trigger Threshold */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Gatilho de Vermelhos Consecutivos
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="3"
              max="15"
              value={triggerThreshold}
              onChange={(e) => setTriggerThreshold(Number(e.target.value))}
              className="flex-1 h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 w-12 text-center">
              {triggerThreshold}
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Alerta quando {triggerThreshold} ou mais rodadas consecutivas forem abaixo de 2x
          </p>
        </div>

        {/* Information Box */}
        <div className="bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-500 p-4 rounded">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">📊 Sobre a Análise</h3>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• <strong>Vermelho:</strong> Multiplicador ≤ 2x</li>
            <li>• <strong>Amarelo:</strong> Multiplicador 2x - 10x</li>
            <li>• <strong>Verde:</strong> Multiplicador &gt; 10x</li>.
          </ul>
        </div>

        {/* Pattern Types */}
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded">
          <h3 className="font-semibold mb-2">🎯 Tipos de Padrões</h3>
          <div className="space-y-2 text-sm">
            <div>
              <p className="font-medium">7 Reds Alert</p>
              <p className="text-gray-600 dark:text-gray-400">Múltiplos vermelhos consecutivos</p>
            </div>
            <div>
              <p className="font-medium">High Volatility</p>
              <p className="text-gray-600 dark:text-gray-400">Múltiplos verdes consecutivos</p>
            </div>
            <div>
              <p className="font-medium">Recovery Zone</p>
              <p className="text-gray-600 dark:text-gray-400">Zona de recuperação identificada</p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-500 p-4 rounded">
          <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">⚠️ Aviso Importante</h3>
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            Esta ferramenta é apenas para análise educacional e estatística. Não é uma predição garantida de resultados. 
            Jogue responsavelmente e nunca invista mais do que pode perder.
          </p>
        </div>
      </div>
    </div>
  );
}

