'use client';

import React from 'react';

import navDropdownStore from '@l/store/nav-dropdown';
import { cn } from '@l/utils/cn';

function NavDropdownOverlay() {
  const { isOpen: open, toggle } = navDropdownStore((state) => state);
  return (
    <div
      onClick={() => toggle(!open)}
      className={cn(
        'fixed bottom-0 left-0 right-0 top-16 z-40 bg-zinc-950 opacity-50 transition-opacity duration-500',
        !open && 'pointer-events-none opacity-0',
      )}
    ></div>
  );
}

export default NavDropdownOverlay;
