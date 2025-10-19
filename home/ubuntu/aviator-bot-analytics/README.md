# Aviator Analytics Bot

Este projeto é um bot analítico para o jogo Aviator (Sortenabet), desenvolvido para fazer scraping de dados em tempo real, analisar multiplicadores e detectar padrões de possíveis entradas. A ferramenta visa fornecer uma análise educacional e estatística do jogo, não uma predição garantida de resultados.

## Funcionalidades

- **Scraping de Dados ao Vivo**: Coleta dados do histórico de rodadas de [https://www.tipminer.com/br/historico/sortenabet/aviator](https://www.tipminer.com/br/historico/sortenabet/aviator).
- **Análise de Multiplicadores**: Analisa os multiplicadores em tempo real para identificar padrões.
- **Detecção de Padrões**: Alerta visualmente quando padrões específicos são detectados (ex: 7 ou mais rodadas seguidas abaixo de 2x, com a última rodada também abaixo de 2x).
- **Interface Intuitiva**: Exibe o histórico de rodadas e o status de alerta em um frontend interativo.
- **Componente de Alerta Visual**: `AlertBox.tsx` que aparece somente quando um padrão é detectado.
- **Atualização de Dados**: Utiliza SWR para atualização de dados a cada 10 segundos.
- **Estatísticas Avançadas**: Mostra a média e distribuição dos últimos 50/100 multiplicadores.
- **Contagem de Padrões**: Registra a frequência de detecção de padrões.
- **Gatilho Configurável**: Permite ao usuário escolher o número de rodadas consecutivas abaixo de 2x para disparar o alerta.
- **Modo Dark/Light**: Alterna entre temas claro e escuro para melhor visualização.
- **Gráfico de Barras Coloridas**: Visualização do histórico de multiplicadores com cores (vermelho, amarelo, verde).
- **Notificação Sonora (Opcional)**: Alerta sonoro ao detectar um padrão.

## Tecnologias Utilizadas

- **Next.js** (App Router)
- **React**
- **TypeScript**
- **Tailwind CSS**
- **SWR** (para fetching de dados)
- **Recharts** (para gráficos)
- **Axios** e **Cheerio** (para scraping)

## Como Rodar o Projeto Localmente

Siga os passos abaixo para configurar e executar o projeto em sua máquina local:

1.  **Clone o repositório** (se aplicável, caso contrário, extraia os arquivos):
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd aviator-bot-analytics
    ```

2.  **Instale as dependências** usando pnpm:
    ```bash
    pnpm install
    ```

3.  **Inicie o servidor de desenvolvimento**:
    ```bash
    pnpm dev
    ```

4.  **Acesse a aplicação** em seu navegador:
    Abra [http://localhost:3000](http://localhost:3000)

## Estrutura do Projeto

-   `src/app/page.tsx`: Página principal da aplicação, responsável por orquestrar os componentes e a lógica de fetching.
-   `src/app/layout.tsx`: Layout raiz da aplicação, incluindo metadados e configuração do tema.
-   `src/app/api/aviator/route.ts`: API Route do Next.js para realizar o scraping e a análise dos dados do Aviator.
-   `src/app/api/aviator/scraper.ts`: Lógica de scraping dos dados do Tipminer.
-   `src/app/api/aviator/analysis.ts`: Lógica de análise de padrões e classificação de multiplicadores.
-   `src/app/api/aviator/types.ts`: Definições de tipos TypeScript para os dados do Aviator e análise.
-   `src/components/AlertBox.tsx`: Componente para exibir alertas visuais de padrões detectados.
-   `src/components/MultiplierHistory.tsx`: Componente para exibir o histórico de rodadas e o gráfico de barras.
-   `src/components/SettingsPanel.tsx`: Componente para configurar o gatilho de alerta e exibir informações sobre a análise.
-   `src/components/StatsPanel.tsx`: Componente para exibir estatísticas detalhadas e distribuição de zonas.
-   `src/components/DistributionChart.tsx`: Componente de gráfico de pizza para distribuição de zonas.
-   `src/components/PatternHistory.tsx`: Componente para exibir o histórico de padrões detectados.
-   `src/components/NotificationManager.tsx`: Componente para gerenciar notificações sonoras e visuais.
-   `src/config/constants.ts`: Arquivo com constantes de configuração da aplicação.
-   `src/utils/helpers.ts`: Funções utilitárias e auxiliares.
-   `src/app/globals.css`: Estilos globais e configurações do Tailwind CSS.

## Deploy na Vercel

Este projeto Next.js está configurado para ser facilmente implantado na Vercel.

1.  **Crie uma conta na Vercel** (se ainda não tiver): [https://vercel.com/signup](https://vercel.com/signup)

2.  **Importe seu projeto**: Conecte seu repositório Git (GitHub, GitLab, Bitbucket) à Vercel. A Vercel detectará automaticamente que é um projeto Next.js.

3.  **Configuração de Build**: A Vercel geralmente configura automaticamente as opções de build para projetos Next.js. Certifique-se de que o comando de build seja `next build` e o diretório de saída seja `.next`.

4.  **Variáveis de Ambiente**: Se houver variáveis de ambiente sensíveis (atualmente não há, mas é uma boa prática), adicione-as nas configurações do projeto na Vercel.

5.  **Deploy**: Após a configuração, a Vercel fará o deploy do seu projeto. Novas alterações no seu repositório Git automaticamente acionarão novos deploys.

### Observações sobre o Scraping na Vercel

O scraping pode ser um desafio em ambientes serverless como a Vercel devido a restrições de tempo de execução e possíveis bloqueios por parte do site alvo. O cache implementado na API (`src/app/api/aviator/route.ts`) ajuda a mitigar isso, reduzindo a frequência de requisições externas. Em caso de problemas, considere:

-   **Ajustar `CACHE_DURATION`**: Aumentar o tempo de cache pode reduzir a carga no servidor de scraping.
-   **Serviço de Proxy**: Utilizar um serviço de proxy externo para as requisições de scraping, se o Tipminer começar a bloquear as requisições da Vercel.

## Contribuição

Sinta-se à vontade para contribuir com melhorias, correções de bugs ou novas funcionalidades. Abra uma issue ou envie um pull request.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

**Aviso:** Este projeto é uma ferramenta educacional e não deve ser usado para fins de apostas irresponsáveis. O jogo Aviator é um jogo de azar e pode resultar em perdas financeiras. Jogue com responsabilidade. 

