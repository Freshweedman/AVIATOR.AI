import axios from 'axios';
import { load } from 'cheerio';
import { AviatorRoundData } from './types';

const TIPMINER_URL = 'https://www.tipminer.com/br/historico/sortenabet/aviator';

export async function scrapeAviatorHistory(): Promise<AviatorRoundData[]> {
  try {
    const response = await axios.get(TIPMINER_URL, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
      },
      timeout: 10000,
    });

    const $ = load(response.data);
    const rounds: AviatorRoundData[] = [];

    const buttons = $('button');

    buttons.each((index: number, element: any) => {
      const text = $(element).text().trim();
      const match = text.match(/^([\d,]+)x(\d+)/);

      if (match) {
        const multiplierStr = match[1].replace(',', '.');
        const multiplier = parseFloat(multiplierStr);
        const roundNumber = parseInt(match[2], 10);

        if (!isNaN(multiplier) && !isNaN(roundNumber)) {
          rounds.push({
            id: `${roundNumber}-${Date.now()}`,
            multiplier,
            roundNumber,
            timestamp: new Date(),
            platform: 'sortenabet',
          });
        }
      }
    });

    return rounds.slice(0, 100);
  } catch (error) {
    console.error('[Scraper] Erro ao fazer scraping:', error);
    throw new Error(`Falha ao fazer scraping do Tipminer: ${error}`);
  }
}

export function extractMultipliers(rounds: AviatorRoundData[]): number[] {
  return rounds
    .sort((a, b) => a.roundNumber - b.roundNumber)
    .map((r) => r.multiplier);
}

export function validateScrapedData(rounds: AviatorRoundData[]): boolean {
  if (!Array.isArray(rounds) || rounds.length === 0) {
    return false;
  }

  return rounds.every(
    (round) =>
      typeof round.multiplier === 'number' &&
      typeof round.roundNumber === 'number' &&
      round.multiplier > 0 &&
      round.roundNumber > 0
  );
}
