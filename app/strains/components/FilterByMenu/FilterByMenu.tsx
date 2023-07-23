'use client';

import React, { useEffect, useState, useRef } from 'react';
import { animate, motion, stagger } from 'framer-motion';
import { RxCaretDown } from 'react-icons/rx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
    case 'mr':
      return 'Most Reviews';
    default:
      break;
  }
};

const staggerMenuItems = stagger(0.05, { startDelay: 0.2 });

const FilterByMenu = (props: Props) => {
  const [isOpen, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/strains?filter=re');
    router.prefetch('/strains?filter=az');
    router.prefetch('/strains?filter=za');
    router.prefetch('/strains?filter=mr');
  }, [router]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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
        display: isOpen ? 'flex' : 'none',
        clipPath: isOpen
          ? 'inset(0% 0% 0% 0% round 10px)'
          : 'inset(10% 50% 90% 50% round 10px)',
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
        className="flex flex-row items-center justify-end w-40 gap-1 mt-4 text-xs text text-zinc-400"
        onClick={() => setOpen(!isOpen)}
      >
        Sort by
        <span className="flex flex-row items-center cursor-pointer dark:text-zinc-300 text-zinc-500">
          {generateFilterFromQuery(props.filter)}
          <RxCaretDown className="ml-1.5 arrow" size={14} />
        </span>
      </span>
      <motion.div
        className="absolute z-40 flex flex-col ml-1.5 bg-zinc-800 w-36 right-0 top-10 text-white gap-0.5 items-start rounded p-1 filter-menu"
        ref={menuRef}
        initial={{ display: 'none' }}
        transition={{ display: { delay: 0.2 } }}
      >
        <Link
          href="/strains?filter=re"
          className="flex items-start w-full px-3 py-3 rounded hover:bg-zinc-500 filter-item"
          onClick={() => setOpen(false)}
        >
          Recommended
        </Link>
        <Link
          href="/strains?filter=az"
          className="flex items-start w-full px-3 py-3 rounded hover:bg-zinc-500 filter-item"
          onClick={() => setOpen(false)}
        >
          A-Z
        </Link>
        <Link
          href="/strains?filter=za"
          className="flex items-start w-full px-3 py-3 rounded hover:bg-zinc-500 filter-item"
          onClick={() => setOpen(false)}
        >
          Z-A
        </Link>
        <Link
          href="/strains?filter=mr"
          className="flex items-start w-full px-3 py-3 rounded hover:bg-zinc-500 filter-item"
          onClick={() => setOpen(false)}
        >
          Most Reviews
        </Link>
      </motion.div>
    </div>
  );
};

export default FilterByMenu;
