export interface AviatorRoundData {
  id: string;
  multiplier: number;
  roundNumber: number;
  timestamp: Date;
  platform: string;
}

export type MultiplierZone = 'red' | 'yellow' | 'green';

export type AlertType = 'none' | '7_reds_alert' | 'high_volatility' | 'recovery_zone';

export interface PatternAnalysis {
  lastMultipliers: number[];
  redCount: number;
  yellowCount: number;
  greenCount: number;
  consecutiveReds: number;
  averageLast50: number;
  averageLast100: number;
  standardDeviation: number;
  alertTriggered: boolean;
  alertType: AlertType;
  confidence: number;
  patternCount: number;
}
