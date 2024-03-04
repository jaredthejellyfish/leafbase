'use client';

import { useTheme } from 'next-themes';
import * as React from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@c/ui/dropdown-menu';

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          id="theme-toggle"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border h-10 w-10 hover:bg-accent hover:text-accent-foreground size-[1.4rem] border-transparent bg-transparent hover:bg-gray-300 dark:hover:bg-zinc-700 sm:size-[1.6rem]"
        >
          <MdLightMode className="size-[1.15rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 sm:size-[1.3rem]" />
          <MdDarkMode className="absolute size-[1.15rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 sm:size-[1.3rem]" />
          <span className="sr-only">Toggle theme</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" id="theme-toggle-content">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
