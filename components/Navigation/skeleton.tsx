import { Moon, Sun } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import SiteLogo from '@/public/site-logo.png';
import UserAvatar from './user-avatar';
import { Button } from '../ui/button';

const NavigationSkeleton = () => {
  return (
    <nav className="flex h-14 items-center justify-between bg-gray-100 px-6 dark:bg-zinc-900 sm:h-16">
      <div>
        <div className="flex items-center justify-start gap-2.5 text-xl sm:gap-4">
          <Image
            className="rounded-sm sm:scale-125"
            src={SiteLogo}
            height={33}
            width={33}
            alt="site logo"
          />
          <span className="text-base font-medium sm:text-xl">Leafbase</span>
        </div>
      </div>
      <div className="flex flex-row items-center gap-3 sm:gap-5">
        <Button
          variant="outline"
          size="icon"
          className="h-[1.4rem] w-[1.4rem] border-transparent bg-transparent hover:bg-gray-300 dark:hover:bg-zinc-700 sm:h-[1.6rem] sm:w-[1.6rem]"
          disabled
        >
          <Sun className="h-[1.15rem] w-[1.15rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 sm:h-[1.3rem] sm:w-[1.3rem]" />
          <Moon className="absolute h-[1.15rem] w-[1.15rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 sm:h-[1.3rem] sm:w-[1.3rem]" />
          <span className="sr-only">Toggle theme</span>
        </Button>
        <UserAvatar />

        <svg
          className="text-dark select-none rounded transition-colors hover:cursor-pointer hover:bg-gray-300 dark:text-white dark:hover:bg-zinc-700"
          width={25}
          height={25}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          id="hamburger-button"
          data-testid="hamburger-button"
        >
          <path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path>
          <path d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path>
          <path d="M3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path>
        </svg>
      </div>
    </nav>
  );
};

export default NavigationSkeleton;
