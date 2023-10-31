import { getServerSession } from 'next-auth';
import { User } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import NavigationHamburgerMenu from './NavigationHamburgerMenu';
import generateGravatarUrl from '@/utils/generateGravatarUrl';
import NavigationThemeSelect from './NavigationThemeSelect';
import ProfileIcon from '@/public/svg/profile-icon.svg';
import NavigationSearchBar from './NavigationSearchBar';
import NavigationDropdown from './NavigationDropdown';
import getServerUser from '@/utils/getServerUser';
import { authOptions } from '@/auth/authOptions';
import SiteLogo from '../SiteLogo/SiteLogo';

const Navigation = async () => {
  const user = await getServerUser();
  const session = await getServerSession(authOptions);

  return (
    <nav className="fixed z-50 w-screen h-16 text-black drop-shadow-lg dark:text-white">
      <div className="relative z-50 grid h-full grid-cols-3 grid-rows-1 gap-0 px-6 bg-gray-100 md:px-16 dark:bg-zinc-900">
        <div className="flex items-center justify-start col-span-1">
          <Link
            href="/"
            className="flex items-center justify-start gap-4 text-xl"
          >
            <SiteLogo height={40} width={40} />
            <span className="font-medium ">Leafbase</span>
          </Link>
        </div>
        <div className="flex items-center justify-end col-span-2 gap-4">
          {!session ? (
            <>
              <NavigationSearchBar containerClassName="pl-4 py-1.5 pr-5 flex-row gap-3 bg-white rounded text-black hidden md:flex dark:bg-zinc-800 items-center md:w-46 xl:w-80" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="20"
                className="hidden stroke-black dark:stroke-white md:block"
              >
                <line x1="5" y1="0" x2="5" y2="200" strokeWidth="1.3" />
              </svg>
              <NavigationThemeSelect />
              <Link href="/profile" className="bg-white rounded-full">
                <Image
                  className="p-0.5 rounded-full text-zinc-900"
                  src={ProfileIcon}
                  alt="profile"
                  height={32}
                  width={32}
                  priority
                />
              </Link>
              <NavigationHamburgerMenu />
            </>
          ) : (
            <>
              <div className="md:block hidden">
                <NavigationSearchBar containerClassName="pl-4 py-1.5 pr-5 flex-row gap-3 bg-white rounded text-black hidden md:flex dark:bg-zinc-800 items-center md:w-46 xl:w-80" />
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="20"
                className="hidden stroke-black dark:stroke-white md:block"
              >
                <line x1="5" y1="0" x2="5" y2="200" strokeWidth="1.3" />
              </svg>
              <NavigationThemeSelect />
              <Link href="/profile">
                <Image
                  className="rounded-full"
                  src={generateGravatarUrl(user as User)}
                  alt="profile"
                  height={32}
                  width={32}
                  priority
                />
              </Link>
              <NavigationHamburgerMenu />
            </>
          )}
        </div>
      </div>
      <NavigationDropdown />
    </nav>
  );
};

export default Navigation;