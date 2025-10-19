// helpers.ts

// Converte entrada em string de forma segura
export function parseData(input: string | number | object): string {
  if (typeof input === 'string') {
    return input.trim();
  }
  return JSON.stringify(input);
}

// Soma dois números
export function sumValues(a: number, b: number): number {
  return a + b;
}

// Função genérica
export function identity<T>(value: T): T {
  return value;
}

// Retorna propriedade de objeto com tipo genérico
export function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// Formata multiplicador
export function formatMultiplier(multiplier: number): string {
  if (multiplier > 10) return `>10x`;
  if (multiplier >= 2) return `2x-10x`;
  return `≤2x`;
}
