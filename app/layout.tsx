import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { cookies } from 'next/headers';
import Hotjar from '@/lib/Hotjar';
import dynamic from 'next/dynamic';
import NavigationSkeleton from '@/components/Navigation/NavigationSkeleton';

const Navigation = dynamic(() => import('@/components/Navigation/Navigation'), {
  ssr: false,
  loading: () => <NavigationSkeleton />,
});

const ClientToast = dynamic(() => import('@/lib/ClientToast'), {
  ssr: false,
});

const Providers = dynamic(() => import('@/lib/Providers'));

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
      <body
        className={`dark:bg-black dark:text-white ${
          theme?.value === 'dark' && 'dark'
        }`}
      >
        <Providers>
          <Navigation />
          <div className="pt-20">
            {children}
            <ClientToast />
          </div>
          <Hotjar />
        </Providers>
      </body>
    </html>
  );
}
