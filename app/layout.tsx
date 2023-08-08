import { default as nextDynamic } from 'next/dynamic';
import 'react-toastify/dist/ReactToastify.css';
import { cookies } from 'next/headers';
import React from 'react';

import NavigationSkeleton from '@/components/Navigation/NavigationSkeleton';
import './globals.css';

const Navigation = nextDynamic(
  () => import('@/components/Navigation/Navigation'),
  {
    ssr: false,
    loading: () => <NavigationSkeleton />,
  }
);

const ClientToast = nextDynamic(() => import('@/lib/ClientToast'), {
  ssr: false,
});

const Providers = nextDynamic(() => import('@/lib/Providers'));

export const metadata = {
  title: 'Leafbase',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const theme = cookieStore.get('theme');

  return (
    <html lang="en" className={theme?.value === 'dark' ? 'dark' : ''}>
      <body className="dark:bg-black dark:text-white">
        <Providers>
          <Navigation />
          <div className="pt-20">
            {children}
            <ClientToast />
          </div>
        </Providers>
      </body>
    </html>
  );
}
