import { Bell } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { getServerUserMetadata } from '@/lib/utils/getServerUserMetadata';
import type { Notification } from '@/lib/database/database_types';
import { supabase } from '@/lib/database/supabase_rsc';
import SiteLogo from '@/public/site-logo.png';
import HamburgerMenu from './hamburger-menu';
import { ThemeToggle } from './theme-toggle';
import NavigationSkeleton from './skeleton';
import UserAvatar from './user-avatar';
import SearchBar from './search-bar';

const NotifcationMenu = dynamic(() => import('./notification-menu'), {
  ssr: false,
  loading: () => (
    <Bell className="z-0 h-[1.15rem] w-[1.15rem] rotate-90 scale-0 animate-pulse transition-all dark:rotate-0 dark:scale-100 sm:h-[1.3rem] sm:w-[1.3rem]" />
  ),
});

async function Navigation() {
  const { user_metadata } = await getServerUserMetadata();

  const { data: notifications } = await supabase
    .from('notifications')
    .select('*')
    .eq('archived', false)
    .order('created_at', { ascending: false })
    .limit(10)
    .returns<Notification[]>();

  const { data: arcivedNotifications } = await supabase
    .from('notifications')
    .select('*')
    .eq('archived', true)
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
        {user_metadata?.username && (
          <NotifcationMenu
            pendingNotifications={notifications}
            archivedNotifications={arcivedNotifications}
          />
        )}
        <ThemeToggle />
        <UserAvatar avatarUrl={user_metadata?.image} />
        <HamburgerMenu />
      </div>
    </nav>
  );
}

export default Navigation;

export { NavigationSkeleton };
