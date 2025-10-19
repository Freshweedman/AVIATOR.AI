/* eslint-disable @typescript-eslint/no-explicit-any */ // permite uso temporário de 'any'

export function parseData(input: any): string {
  // Substitua 'any' pelo tipo correto se souber (ex: string | number)
  if (typeof input === 'string') {
    return input.trim();
  }
  return JSON.stringify(input);
}

export function sumValues(a: number, b: number): number {
  return a + b;
}

// Exemplo de função genérica
export function identity<T>(value: T): T {
  return value;
}

// Exemplo de função que antes usava any
export function getProperty(obj: Record<string, any>, key: string): any {
  return obj[key];
}

// Função adicional como placeholder
export function formatMultiplier(multiplier: number): string {
  if (multiplier > 10) return `>10x`;
  if (multiplier >= 2) return `2x-10x`;
  return `≤2x`;
}
