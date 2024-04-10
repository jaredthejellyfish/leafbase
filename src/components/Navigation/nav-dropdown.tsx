'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { cn } from '@u/cn';

import navDropdownStore from '@l/store/nav-dropdown';

import DropdownSearchbar from './dropdown-search-bar';

const paths = [
  {
    name: 'Strains',
    path: '/strains',
  },
  {
    name: 'Budtender',
    path: '/budtender',
  },
  {
    name: 'About Us',
    path: '/about',
  },
];

function NavDropdown() {
  const pathname = usePathname();
  const { isOpen: open, toggle } = navDropdownStore((state) => state);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (open && event.key === 'Escape') {
        toggle(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, toggle]);

  return (
    <>
      <div
        id="nav-dropdown"
        className={cn(
          'fixed left-0 right-0 top-14 z-40 w-screen origin-top rounded-b bg-white px-4 py-2 shadow-lg transition-transform duration-300 dark:bg-zinc-800/100 sm:px-5 sm:py-3',
          !open && 'scale-y-0',
        )}
      >
        <DropdownSearchbar />

        {paths.map((path, i) => (
          <div key={path.name}>
            <div
              className={cn(
                'hover:background-slate-200 flex h-10 w-full cursor-pointer items-center justify-start py-5 pl-3.5 text-base font-medium transition-colors dark:hover:bg-zinc-800 sm:text-lg md:pl-10',
                pathname === path.path &&
                  'pointer-events-none cursor-not-allowed text-green-500',
              )}
            >
              <a className="w-full" href={path.path}>
                {path.name}
              </a>
            </div>
            {i !== paths.length - 1 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="1"
                className="my-0.5 stroke-zinc-300 dark:stroke-zinc-600"
              >
                <line x1="0" y1="0.5" x2="100%" y2="0.5" strokeWidth="1" />
              </svg>
            )}
          </div>
        ))}
      </div>
      <div
        onClick={() => toggle(!open)}
        className={cn(
          'fixed bottom-0 left-0 right-0 top-16 z-30 bg-zinc-950 opacity-50 transition-opacity duration-500',
          !open && 'pointer-events-none opacity-0',
        )}
      ></div>
    </>
  );
}

export default NavDropdown;
