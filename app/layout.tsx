import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { Suspense } from 'react';
import { GeistSans } from 'geist/font';
import type { Metadata } from 'next';

import Navigation, { NavigationSkeleton } from '@/components/Navigation';
import { ThemeProvider, QueryProvider } from '@/components/Providers';
import CookieBanner from '@/components/CookieBanner';
import { Toaster } from '@/components/ui/toaster';
import Analytics from '@/components/Analytics';
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
            <Toaster />
            <CookieBanner />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryProvider>
        </ThemeProvider>
        <Suspense>
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}
