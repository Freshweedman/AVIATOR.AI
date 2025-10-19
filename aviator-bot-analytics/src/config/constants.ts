/**
 * Constantes da aplicação Aviator Analytics Bot
 */

export const MULTIPLIER_ZONES = {
  RED: { min: 0, max: 2, label: 'Vermelho', color: '#ef4444' },
  YELLOW: { min: 2, max: 10, label: 'Amarelo', color: '#f59e0b' },
  GREEN: { min: 10, max: Infinity, label: 'Verde', color: '#22c55e' },
};

export const PATTERN_TYPES = {
  SEVEN_REDS_ALERT: '7_reds_alert',
  HIGH_VOLATILITY: 'high_volatility',
  RECOVERY_ZONE: 'recovery_zone',
  NONE: 'none',
};

export const ALERT_DESCRIPTIONS = {
  '7_reds_alert': 'Detectado padrão de múltiplos multiplicadores baixos consecutivos. Possível entrada entre 2x-4x.',
  'high_volatility': 'Detectado padrão de alta volatilidade com múltiplos multiplicadores altos. Esperar retração.',
  'recovery_zone': 'Zona de recuperação identificada. Muitos multiplicadores baixos. Possível reversão.',
  'none': 'Nenhum padrão detectado.',
};

export const API_CONFIG = {
  TIPMINER_URL: 'https://www.tipminer.com/br/historico/sortenabet/aviator',
  CACHE_DURATION: 30000, // 30 segundos
  FETCH_INTERVAL: 10000, // 10 segundos
  TIMEOUT: 10000, // 10 segundos
};

export const ANALYSIS_CONFIG = {
  DEFAULT_TRIGGER_THRESHOLD: 7,
  MIN_TRIGGER_THRESHOLD: 3,
  MAX_TRIGGER_THRESHOLD: 15,
  LAST_MULTIPLIERS_COUNT: 100,
  LAST_50_COUNT: 50,
};

export const ALLOCATION_MODELS = {
  CONSERVATIVE: 'conservative',
  MODERATE: 'moderate',
  AGGRESSIVE: 'aggressive',
};

export const RISK_PERCENTAGES = {
  LOW: 1,
  MEDIUM: 2,
  HIGH: 5,
};

export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto',
};

