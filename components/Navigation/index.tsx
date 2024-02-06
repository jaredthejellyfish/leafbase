import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Bell } from 'lucide-react';
import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { ErrorBoundary } from 'react-error-boundary';

import type { Database } from '@/lib/database';
import type {
  Notification,
  UserMetadataExtended,
} from '@/lib/database/database_types';

import SiteLogo from '@/public/site-logo.png';

import HamburgerMenu from './hamburger-menu';
import SearchBar from './search-bar';
import NavigationSkeleton from './skeleton';
import { ThemeToggle } from './theme-toggle';
import UserAvatar from './user-avatar';

import React from 'react';

const NotifcationMenu = dynamic(() => import('./notification-menu'), {
  ssr: false,
  loading: () => (
    <Bell className="z-0 size-[1.15rem] rotate-90 scale-0 animate-pulse transition-all dark:rotate-0 dark:scale-100 sm:size-[1.3rem]" />
  ),
});

async function Navigation() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const user_metadata = user?.user_metadata as UserMetadataExtended;

  const id = user?.id;

  const { data: notifications } = await supabase
    .from('notifications')
    .select('*')
    .eq('archived', false)
    .eq('recipient', id!)
    .order('created_at', { ascending: false })
    .limit(10)
    .returns<Notification[]>();

  const { data: arcivedNotifications } = await supabase
    .from('notifications')
    .select('*')
    .eq('archived', true)
    .eq('recipient', id!)
    .order('created_at', { ascending: false })
    .limit(10)
    .returns<Notification[]>();

  return (
    <nav className="flex h-14 items-center justify-between bg-gray-100 px-6 dark:bg-zinc-900 sm:h-16">
      <div>
        <Link
          href="/"
          className="flex items-center justify-start gap-2.5 text-xl sm:gap-4"
        >
          <Image
            className="aspect-square rounded-sm border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-700/60 sm:scale-125"
            src={SiteLogo}
            height={33}
            width={33}
            alt="site logo"
          />
          <span className="text-base font-medium sm:text-xl">Leafbase</span>
        </Link>
      </div>
      <div className="flex flex-row items-center gap-3 sm:gap-5">
        <SearchBar />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="20"
          className="hidden stroke-black dark:stroke-white md:block"
        >
          <line x1="5" y1="0" x2="5" y2="200" strokeWidth="1.3" />
        </svg>
        <ErrorBoundary fallback={<></>}>
          {user_metadata?.username && (
            <NotifcationMenu
              pendingNotifications={notifications}
              archivedNotifications={arcivedNotifications}
              id={id!}
            />
          )}
        </ErrorBoundary>
        <ThemeToggle />
        <UserAvatar avatarUrl={user_metadata?.image} />
        <HamburgerMenu />
      </div>
    </nav>
  );
}

export default Navigation;

export { NavigationSkeleton };
