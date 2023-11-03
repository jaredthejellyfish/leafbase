import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { getServerUserMetadata } from '@/lib/utils/getServerUserMetadata';
import SiteLogo from '@/public/site-logo.png';
import HamburgerMenu from './hamburger-menu';
import { ThemeToggle } from './theme-toggle';
import NavigationSkeleton from './skeleton';
import UserAvatar from './user-avatar';

async function Navigation() {
  const { user_metadata } = await getServerUserMetadata();

  return (
    <nav className="justify-between px-6 bg-gray-100 dark:bg-zinc-900 h-14 sm:h-16 flex items-center">
      <div>
        <Link
          href="/"
          className="flex items-center justify-start gap-2.5 sm:gap-4 text-xl"
        >
          <Image
            className="rounded-sm sm:scale-125"
            src={SiteLogo}
            height={33}
            width={33}
            alt="site logo"
          />
          <span className="font-medium text-base sm:text-xl">Leafbase</span>
        </Link>
      </div>
      <div className="flex flex-row items-center sm:gap-5 gap-3">
        <ThemeToggle />
        <UserAvatar
          avatarUrl={user_metadata?.image}
          username={user_metadata?.displayName}
        />
        <HamburgerMenu />
      </div>
    </nav>
  );
}

export default Navigation;

export { NavigationSkeleton };
