'use client';

import Link from 'next/link';
import React, { useState } from 'react';

import type { Filter } from '@l/types';
import { cn } from '@l/utils/cn';

type Props = { filter: Filter };

const filters = {
  re: 'Recommended',
  az: 'A-Z',
  za: 'Z-A',
  sr: 'Star Rating',
};

function SortBy({ filter }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <span
      className="relative mt-4 flex min-w-20 flex-row items-center justify-end gap-1 text-xs text-zinc-400"
      onClick={() => setOpen((open) => !open)}
    >
      Sort by
      <span className="relative flex cursor-pointer flex-row items-center text-zinc-500 dark:text-zinc-300">
        {filters[filter]}
        <svg
          className="arrow ml-1.5"
          stroke="currentColor"
          fill="none"
          strokeWidth="0"
          viewBox="0 0 15 15"
          height="1.3em"
          width="1.3em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z"
            fill="currentColor"
          ></path>
        </svg>
      </span>
      <div
        className={cn(
          'absolute -top-0.5 z-30 mt-5 rounded-md dark:bg-zinc-800 bg-white shadow-lg border border-neutral-100 dark:border-transparent p-0.5 transition-opacity duration-200',
          !open && 'scale-0 opacity-0',
        )}
        id="sort-modal"
      >
        <Link
          href="/strains?filter=re"
          className={cn(
            'filter-item flex w-full items-start rounded p-3 pr-3 hover:bg-zinc-100/80 dark:dark:hover:bg-zinc-500',
            filter === 're' && 'text-green-500',
          )}
        >
          Recommended
        </Link>
        <Link
          href="/strains?filter=az"
          className={cn(
            'filter-item flex w-full items-start rounded p-3 pr-3 hover:bg-zinc-100/80 dark:hover:bg-zinc-500',
            filter === 'az' && 'text-green-500',
          )}
        >
          A-Z
        </Link>
        <Link
          href="/strains?filter=za"
          className={cn(
            'filter-item flex w-full items-start rounded p-3 pr-3 hover:bg-zinc-100/80 dark:hover:bg-zinc-500',
            filter === 'za' && 'text-green-500',
          )}
        >
          Z-A
        </Link>
        <Link
          href="/strains?filter=sr"
          className={cn(
            'filter-item flex w-full items-start rounded p-3 pr-3 hover:bg-zinc-100/80 dark:hover:bg-zinc-500',
            filter === 'sr' && 'text-green-500',
          )}
        >
          Star Rating
        </Link>
      </div>
    </span>
  );
}

export default SortBy;
