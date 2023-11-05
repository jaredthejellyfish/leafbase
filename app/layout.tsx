import { GeistSans } from 'geist/font'
import React, { Suspense } from 'react';
import type { Metadata } from 'next';

import Navigation, { NavigationSkeleton } from '@/components/Navigation';
import { ThemeProvider, QueryProvider } from '@/components/Providers';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './globals.css';

export const metadata: Metadata = {
  title: 'Leafbase',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <Suspense fallback={<NavigationSkeleton />}>
              <Navigation />
            </Suspense>

            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
