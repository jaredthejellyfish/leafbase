'use client';

import { useTheme } from 'next-themes';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import * as React from 'react';

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          id="theme-toggle"
          className="h-[1.4rem] w-[1.4rem] border-transparent bg-transparent hover:bg-gray-300 sm:h-[1.6rem] sm:w-[1.6rem] dark:hover:bg-zinc-700"
        >
          <MdLightMode className="h-[1.15rem] w-[1.15rem] rotate-0 scale-100 transition-all sm:h-[1.3rem] sm:w-[1.3rem] dark:-rotate-90 dark:scale-0" />
          <MdDarkMode className="absolute h-[1.15rem] w-[1.15rem] rotate-90 scale-0 transition-all sm:h-[1.3rem] sm:w-[1.3rem] dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
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
