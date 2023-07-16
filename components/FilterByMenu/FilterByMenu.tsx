'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { animate, motion, stagger } from 'framer-motion';
import { RxCaretDown } from 'react-icons/rx';

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

  const router = useRouter();

  const handleFilterChange = (filter: string) => {
    router.push(`/strains?filter=${filter}`);
    setOpen(false);
  };

  useEffect(() => {
    animate('.arrow', { rotate: isOpen ? 180 : 0 }, { duration: 0.2 });

    animate(
      '.filter-menu',
      {
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
    <div className="flex flex-row items-center">
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

      <motion.div  className="absolute z-40 flex flex-col ml-1.5 bg-zinc-800 w-36 top-60 text-white gap-0.5 items-start rounded p-1 filter-menu">
        <button
          className="flex items-start w-full px-3 py-3 rounded hover:bg-zinc-500 filter-item"
          onClick={() => handleFilterChange('re')}
        >
          Recommended
        </button>
        <button
          className="flex items-start w-full px-3 py-3 rounded hover:bg-zinc-500 filter-item"
          onClick={() => handleFilterChange('az')}
        >
          A-Z
        </button>
        <button
          className="flex items-start w-full px-3 py-3 rounded hover:bg-zinc-500 filter-item"
          onClick={() => handleFilterChange('za')}
        >
          Z-A
        </button>
        <button
          className="flex items-start w-full px-3 py-3 rounded hover:bg-zinc-500 filter-item"
          onClick={() => handleFilterChange('mr')}
        >
          Most Reviews
        </button>
      </motion.div>
    </div>
  );
};

export default FilterByMenu;
