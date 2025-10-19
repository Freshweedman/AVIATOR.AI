import { useState, useEffect, useCallback } from 'react';

interface PatternRecord {
  timestamp: Date;
  type: string;
  confidence: number;
}

export function usePatternTracking() {
  const [patterns, setPatterns] = useState<PatternRecord[]>([]);

  const addPattern = useCallback((type: string, confidence: number) => {
    setPatterns((prev) => [
      ...prev,
      {
        timestamp: new Date(),
        type,
        confidence,
      },
    ]);
  }, []);

  const getPatternsToday = useCallback(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return patterns.filter((p) => p.timestamp >= today);
  }, [patterns]);

  const getTotalPatterns = useCallback(() => {
    return patterns.length;
  }, [patterns]);

  const clearPatterns = useCallback(() => {
    setPatterns([]);
  }, []);

  return {
    patterns,
    addPattern,
    getPatternsToday,
    getTotalPatterns,
    clearPatterns,
  };
}

