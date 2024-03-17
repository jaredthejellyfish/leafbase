import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';

import Budtender from '@c/Budtender';
import Navigation from '@c/Navigation';
import QueryProvider from '@c/QueryClientProvider';
import ThemeProvider from '@c/ThemeProvider';

import { cn } from '@l/utils/cn';

import './globals.css';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Leafbase',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('font-sans antialiased', fontSans.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <Navigation />
            {children}
          </QueryProvider>
          <Budtender />
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
