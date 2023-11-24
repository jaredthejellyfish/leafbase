import { Analytics as NextAnalytics } from '@vercel/analytics/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';

import { ThemeProvider, QueryProvider } from '@/components/Providers';
import NavigationSkeleton from '@/components/Navigation/skeleton';
import './globals.css';

const CookieBanner = dynamic(() => import('@/components/CookieBanner'), {
  ssr: false,
});

const Analytics = dynamic(() => import('@/components/Analytics'), {
  ssr: false,
});

const Toaster = dynamic(() => import('@/components/ui/toaster'), {
  ssr: false,
});

const Navigation = dynamic(() => import('@/components/Navigation'), {
  loading: () => <NavigationSkeleton />,
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
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryProvider>
        </ThemeProvider>
        <NextAnalytics />
        <Analytics />
      </body>
    </html>
  );
}
