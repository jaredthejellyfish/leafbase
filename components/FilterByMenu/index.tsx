'use client';

import React, { useEffect, useState, useRef } from 'react';
import { animate, motion, stagger } from 'framer-motion';
import { RxCaretDown } from 'react-icons/rx';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Props {
  filter?: string;
}

const generateFilterFromQuery = (filter = 're') => {
  switch (filter) {
    case 'az':
      return 'A-Z';
    case 're':
      return 'Recommended';
    case 'za':
      return 'Z-A';
    case 'sr':
      return 'Star Rating';
    default:
      break;
  }
};

const staggerMenuItems = stagger(0.05, { startDelay: 0.2 });

const FilterByMenu = (props: Props) => {
  const [isOpen, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/strains?filter=re');
    router.prefetch('/strains?filter=az');
    router.prefetch('/strains?filter=za');
    router.prefetch('/strains?filter=sr');
  }, [router]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (spanRef.current && spanRef.current.contains(event.target as Node)) {
        return;
      }
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    animate('.arrow', { rotate: isOpen ? 180 : 0 }, { duration: 0.2 });

    animate(
      '.filter-menu',
      {
        scaleY: isOpen ? 1 : 0,
      },
      {
        type: 'spring',
        bounce: 0,
        duration: 0.5,
      }
    );

    animate(
      '.filter-item',
      isOpen
        ? { opacity: 1, scale: 1, filter: 'blur(0px)' }
        : { opacity: 0, scale: 0.3, filter: 'blur(20px)' },
      {
        duration: 0.2,
        delay: isOpen ? staggerMenuItems : 0,
      }
    );
  }, [isOpen]);

  return (
    <div className="relative flex flex-row items-center">
      <span
        className="text mt-4 flex w-40 flex-row items-center justify-end gap-1 text-xs text-zinc-400"
        onClick={() => setOpen(!isOpen)}
        ref={spanRef}
      >
        Sort by
        <span className="flex cursor-pointer flex-row items-center text-zinc-500 dark:text-zinc-300">
          {generateFilterFromQuery(props.filter)}
          <RxCaretDown className="arrow ml-1.5" size={14} />
        </span>
      </span>

      <motion.div
        className="filter-menu absolute right-0 top-10 z-40 ml-1.5 box-border flex w-36 origin-top flex-col items-start gap-0.5 rounded-lg border border-zinc-200 bg-white p-1 font-bold text-zinc-600 shadow-xl dark:border-zinc-900 dark:bg-zinc-800 dark:text-white"
        ref={menuRef}
        initial={{ scaleY: 0 }}
      >
        <Link
          href="/strains?filter=re"
          className="filter-item flex w-full items-start rounded p-3 hover:bg-zinc-100/80 dark:dark:hover:bg-zinc-500"
          onClick={() => setOpen(false)}
        >
          Recommended
        </Link>
        <Link
          href="/strains?filter=az"
          className="filter-item flex w-full items-start rounded p-3 hover:bg-zinc-100/80 dark:hover:bg-zinc-500"
          onClick={() => setOpen(false)}
        >
          A-Z
        </Link>
        <Link
          href="/strains?filter=za"
          className="filter-item flex w-full items-start rounded p-3 hover:bg-zinc-100/80 dark:hover:bg-zinc-500"
          onClick={() => setOpen(false)}
        >
          Z-A
        </Link>
        <Link
          href="/strains?filter=sr"
          className="filter-item flex w-full items-start rounded p-3 hover:bg-zinc-100/80 dark:hover:bg-zinc-500"
          onClick={() => setOpen(false)}
        >
          Star Rating
        </Link>
      </motion.div>
    </div>
  );
};

export default FilterByMenu;
