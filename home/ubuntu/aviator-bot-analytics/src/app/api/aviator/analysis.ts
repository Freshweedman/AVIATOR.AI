import {
  AviatorRoundData,
  MultiplierZone,
  PatternAnalysis,
  AlertType,
} from './types';

export function classifyMultiplier(multiplier: number): MultiplierZone {
  if (multiplier <= 2) return 'red';
  if (multiplier <= 10) return 'yellow';
  return 'green';
}

export function calculateStandardDeviation(numbers: number[]): number {
  if (numbers.length === 0) return 0;

  const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
  const squareDiffs = numbers.map((value) => Math.pow(value - mean, 2));
  const avgSquareDiff = squareDiffs.reduce((a, b) => a + b, 0) / numbers.length;
  return Math.sqrt(avgSquareDiff);
}

export function analyzePatterns(
  multipliers: number[],
  triggerThreshold: number = 7
): PatternAnalysis {
  if (multipliers.length === 0) {
    return {
      lastMultipliers: [],
      redCount: 0,
      yellowCount: 0,
      greenCount: 0,
      consecutiveReds: 0,
      averageLast50: 0,
      averageLast100: 0,
      standardDeviation: 0,
      alertTriggered: false,
      alertType: 'none',
      confidence: 0,
      patternCount: 0,
    };
  }

  const sorted = [...multipliers].reverse();

  let redCount = 0;
  let yellowCount = 0;
  let greenCount = 0;

  sorted.forEach((m) => {
    const zone = classifyMultiplier(m);
    if (zone === 'red') redCount++;
    else if (zone === 'yellow') yellowCount++;
    else greenCount++;
  });

  let consecutiveReds = 0;
  for (const m of sorted) {
    if (classifyMultiplier(m) === 'red') {
      consecutiveReds++;
    } else {
      break;
    }
  }

  const last50 = sorted.slice(0, 50);
  const averageLast50 =
    last50.length > 0 ? last50.reduce((a, b) => a + b, 0) / last50.length : 0;

  const last100 = sorted.slice(0, 100);
  const averageLast100 =
    last100.length > 0 ? last100.reduce((a, b) => a + b, 0) / last100.length : 0;

  const standardDeviation = calculateStandardDeviation(last100);

  let alertTriggered = false;
  let alertType: AlertType = 'none';
  let confidence = 0;

  if (
    consecutiveReds >= triggerThreshold &&
    classifyMultiplier(sorted[0]) === 'red'
  ) {
    alertTriggered = true;
    alertType = '7_reds_alert';
    confidence = Math.min(100, 70 + (consecutiveReds - triggerThreshold) * 5);
  }

  let consecutiveGreens = 0;
  for (const m of sorted) {
    if (classifyMultiplier(m) === 'green') {
      consecutiveGreens++;
    } else {
      break;
    }
  }

  if (consecutiveGreens >= 5) {
    alertTriggered = true;
    alertType = 'high_volatility';
    confidence = Math.min(100, 60 + (consecutiveGreens - 5) * 4);
  }

  if (redCount >= 15 && redCount > greenCount && averageLast50 < 3) {
    alertTriggered = true;
    alertType = 'recovery_zone';
    confidence = Math.min(100, 50 + (redCount - 15) * 2);
  }

  return {
    lastMultipliers: sorted.slice(0, 100),
    redCount,
    yellowCount,
    greenCount,
    consecutiveReds,
    averageLast50: parseFloat(averageLast50.toFixed(2)),
    averageLast100: parseFloat(averageLast100.toFixed(2)),
    standardDeviation: parseFloat(standardDeviation.toFixed(2)),
    alertTriggered,
    alertType,
    confidence,
    patternCount: 0,
  };
}

export function calculateBetSuggestion(
  analysis: PatternAnalysis,
  bankAmount: number,
  riskPercentage: number,
  allocationModel: string
) {
  if (!analysis.alertTriggered) {
    return null;
  }

  let baseAmount = (bankAmount * riskPercentage) / 100;

  let multiplier = 1;
  if (allocationModel === 'conservative') {
    multiplier = 0.5;
  } else if (allocationModel === 'moderate') {
    multiplier = 1;
  } else if (allocationModel === 'aggressive') {
    multiplier = 1.5;
  }

  const suggestedAmount = baseAmount * multiplier;

  let targetMultiplier = 2.5;
  if (analysis.alertType === '7_reds_alert') {
    targetMultiplier = 2.5;
  } else if (analysis.alertType === 'high_volatility') {
    targetMultiplier = 5;
  } else if (analysis.alertType === 'recovery_zone') {
    targetMultiplier = 3;
  }

  return {
    suggestedAmount: parseFloat(suggestedAmount.toFixed(2)),
    targetMultiplier,
    confidence: analysis.confidence,
    patternType: analysis.alertType,
  };
}

export function getMultiplierColor(multiplier: number): string {
  const zone = classifyMultiplier(multiplier);
  switch (zone) {
    case 'red':
      return '#ef4444';
    case 'yellow':
      return '#f59e0b';
    case 'green':
      return '#22c55e';
    default:
      return '#6b7280';
  }
}

export function getAlertDescription(alertType: AlertType): string {
  switch (alertType) {
    case '7_reds_alert':
      return 'Detectado padrão de múltiplos multiplicadores baixos consecutivos. Possível entrada entre 2x-4x.';
    case 'high_volatility':
      return 'Detectado padrão de alta volatilidade com múltiplos multiplicadores altos. Esperar retração.';
    case 'recovery_zone':
      return 'Zona de recuperação identificada. Muitos multiplicadores baixos. Possível reversão.';
    default:
      return 'Nenhum padrão detectado.';
  }
}
