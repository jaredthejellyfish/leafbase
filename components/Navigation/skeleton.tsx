import { Moon, Sun } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import SiteLogo from '@/public/site-logo.png';
import UserAvatar from './user-avatar';
import { Button } from '../ui/button';

const NavigationSkeleton = () => {
  return (
    <nav className="justify-between px-6 bg-gray-100 dark:bg-zinc-900 h-14 sm:h-16 flex items-center">
      <div>
        <div className="flex items-center justify-start gap-2.5 sm:gap-4 text-xl">
          <Image
            className="rounded-sm sm:scale-125"
            src={SiteLogo}
            height={33}
            width={33}
            alt="site logo"
          />
          <span className="font-medium text-base sm:text-xl">Leafbase</span>
        </div>
      </div>
      <div className="flex flex-row items-center sm:gap-5 gap-3">
        <Button
          variant="outline"
          size="icon"
          className="sm:h-[1.6rem] sm:w-[1.6rem] h-[1.4rem] w-[1.4rem] hover:bg-gray-300 dark:hover:bg-zinc-700 bg-transparent border-transparent"
          disabled
        >
          <Sun className="h-[1.15rem] w-[1.15rem] sm:h-[1.3rem] sm:w-[1.3rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.15rem] w-[1.15rem] sm:h-[1.3rem] sm:w-[1.3rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
        <UserAvatar username={'N/A'} />

        <svg
          className="text-dark rounded dark:text-white hover:bg-gray-300 dark:hover:bg-zinc-700 transition-colors select-none hover:cursor-pointer"
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
