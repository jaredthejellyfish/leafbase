'use client';

import { useTheme } from 'next-themes';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

import { Button } from '@c/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@c/ui/dropdown-menu';

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
          className="size-[1.4rem] border-transparent bg-transparent hover:bg-gray-300 dark:hover:bg-zinc-700 sm:size-[1.6rem]"
        >
          <MdLightMode className="size-[1.15rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 sm:size-[1.3rem]" />
          <MdDarkMode className="absolute size-[1.15rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 sm:size-[1.3rem]" />
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