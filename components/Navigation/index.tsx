import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { getServerUserMetadata } from '@/lib/utils/getServerUserMetadata';
import SiteLogo from '@/public/site-logo.png';
import HamburgerMenu from './hamburger-menu';
import { ThemeToggle } from './theme-toggle';
import NavigationSkeleton from './skeleton';
import UserAvatar from './user-avatar';
import SearchBar from './search-bar';

async function Navigation() {
  const { user_metadata } = await getServerUserMetadata();

  return (
    <nav className="flex h-14 items-center justify-between bg-gray-100 px-6 dark:bg-zinc-900 sm:h-16">
      <div>
        <Link
          href="/"
          className="flex items-center justify-start gap-2.5 text-xl sm:gap-4"
        >
          <Image
            className="rounded-sm sm:scale-125"
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
        <ThemeToggle />
        <UserAvatar avatarUrl={user_metadata?.image} />
        <HamburgerMenu />
      </div>
    </nav>
  );
}

export default Navigation;

export { NavigationSkeleton };
