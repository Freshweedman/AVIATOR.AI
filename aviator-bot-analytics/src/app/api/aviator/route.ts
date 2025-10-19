import { NextRequest, NextResponse } from 'next/server';
import { scrapeAviatorHistory } from './scraper';
import { analyzePatterns } from './analysis';

// Cache simples para reduzir requisições ao Tipminer
let cachedData: any = null;
let lastFetchTime = 0;
const CACHE_DURATION = 30000; // 30 segundos

export async function GET(req: NextRequest) {
  try {
    const now = Date.now();
    const triggerThreshold = req.nextUrl.searchParams.get('trigger') || '7';

    // Usar cache se disponível
    if (cachedData && now - lastFetchTime < CACHE_DURATION) {
      const analysis = analyzePatterns(
        cachedData.history.map((r: any) => r.multiplier),
        parseInt(triggerThreshold)
      );
      return NextResponse.json({
        history: cachedData.history,
        analysis,
        cached: true,
      });
    }

    const history = await scrapeAviatorHistory();

    if (!history || history.length === 0) {
      return NextResponse.json(
        { error: 'Nenhum dado disponível do Tipminer' },
        { status: 503 }
      );
    }

    const multipliers = history.map((round) => round.multiplier);
    const analysis = analyzePatterns(multipliers, parseInt(triggerThreshold));

    // Contar quantas vezes o padrão foi detectado
    analysis.patternCount = 1; // Incrementar conforme necessário

    // Atualizar cache
    cachedData = { history };
    lastFetchTime = now;

    return NextResponse.json({
      history,
      analysis,
      cached: false,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Erro na API /api/aviator:', error);
    return NextResponse.json(
      {
        error: 'Falha ao buscar dados do Aviator',
        details: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      { status: 500 }
    );
  }
}

