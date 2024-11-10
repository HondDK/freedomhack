import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { I18nextProvider, QueryProvider, ThemeProvider } from '@/core/providers';
import { LanguageProvider } from '@/core/providers/I18nextProvider/LanguageContext/LanguageContext';
import GuardProvider from '../core/providers/GuardProvider/GuardProvider';

const geistSans = localFont({
  src:  './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'FH',
  description: 'FH',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <QueryProvider>
          <GuardProvider>
            <LanguageProvider>
              <I18nextProvider>
                <ThemeProvider
                  disableTransitionOnChange
                  defaultTheme="system"
                  attribute="class"
                  enableSystem
                >
                  {children}
                </ThemeProvider>
              </I18nextProvider>
            </LanguageProvider>
          </GuardProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
