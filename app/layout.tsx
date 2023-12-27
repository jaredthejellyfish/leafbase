import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Analytics as NextAnalytics } from '@vercel/analytics/react';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

import { NavigationSkeleton } from '@/components/Navigation';
import { QueryProvider, ThemeProvider } from '@/components/providers';

import './globals.css';

import React from 'react';

const CookieBanner = dynamic(() => import('@/components/CookieBanner'), {
  ssr: false,
});

const Navigation = dynamic(() => import('@/components/Navigation'), {
  ssr: false,
  loading: () => <NavigationSkeleton />,
});

const Analytics = dynamic(() => import('@/components/Analytics'), {
  ssr: false,
});

const Toaster = dynamic(() => import('@/components/ui/toaster'), {
  ssr: false,
});

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
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <Navigation />
            {children}
            <Toaster />
            <CookieBanner />
            <ReactQueryDevtools />
          </QueryProvider>
        </ThemeProvider>
        <NextAnalytics />
        <Analytics />
      </body>
    </html>
  );
}
