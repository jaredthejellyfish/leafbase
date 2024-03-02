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
        'fixed bottom-0 left-0 right-0 top-16 z-10 bg-zinc-950 opacity-20 transition-opacity',
        !open && 'hidden opacity-0',
      )}
    ></div>
  );
}

export default NavDropdownOverlay;
