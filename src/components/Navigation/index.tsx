import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import type { Database } from '@l/database';
import getServerUserProfile from '@l/utils/getServerUserProfile';

import SiteLogo from '@p/site-logo.png';
import ProfileIcon from '@p/svg/profile-icon.svg';

import HamburgerMenu from './hamburger-menu';
import NavDropdown from './nav-dropdown';
import { ThemeToggle } from './theme-toggle';

async function Navigation() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });
  const { user } = await getServerUserProfile(supabase);

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-50 flex h-14 items-center justify-between bg-gray-100 px-6 dark:bg-zinc-900">
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
        <div className="flex w-1/2 items-center justify-end gap-x-3">
          <ThemeToggle />
          <Link href={user?.image ? '/profile' : '/auth/login'}>
            <Image
              alt={`${user?.username}'s profile image`}
              src={user?.image ?? (ProfileIcon as unknown as string)}
              width={34}
              height={34}
              className="rounded-full"
            />
          </Link>
          <HamburgerMenu />
        </div>
      </nav>
      <div className="h-14 w-full bg-transparent"></div>
      <NavDropdown />
    </>
  );
}

export default Navigation;
