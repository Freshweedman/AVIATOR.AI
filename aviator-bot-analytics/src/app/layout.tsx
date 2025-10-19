import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Aviator Analytics Bot',
  description: 'Análise em tempo real de padrões do jogo Aviator (Sortenabet) com detecção de oportunidades de entrada',
  keywords: ['Aviator', 'Analytics', 'Sortenabet', 'Análise', 'Padrões', 'Multiplicadores'],
  authors: [{ name: 'Aviator Analytics Team' }],
  viewport: 'width=device-width, initial-scale=1.0',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 dark:bg-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}

