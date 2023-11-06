'use client';

import { usePathname } from 'next/navigation';
import { useMediaQuery } from 'usehooks-ts';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';

const DropdownSearchbar = dynamic(() => import('./dropdown-searchbar'));

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const variants = {
  container: {
    open: {
      scaleY: 1,
      transition: { duration: 0.3 },
    },
    closed: {
      scaleY: 0,
      transition: { delay: 0.15 },
    },
  },
  children: {
    open: {
      opacity: 1,
      transition: { delay: 0.15 },
    },
    closed: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  },
};
const DropdownMenu = (props: Props) => {
  const pathName = usePathname();
  const { open: isOpen, setOpen } = props;

  const matches = useMediaQuery('(min-width: 768px)');
  return (
    <motion.div
      className="w-screen top-[56px] sm:top-16 absolute left-0 bg-slate-200 dark:bg-zinc-800/100 z-50 origin-top px-4 py-2 sm:px-5 sm:py-3 divide-y divide-dashed divide-slate-400/25"
      variants={variants.container}
      animate={isOpen ? 'open' : 'closed'}
      initial="closed"
    >
      {!matches && isOpen && <DropdownSearchbar />}
      <motion.div
        variants={variants.children}
        animate={isOpen ? 'open' : 'closed'}
        initial="closed"
        className="flex items-center justify-start w-full h-10 py-5 pl-3.5 text-base sm:text-lg font-medium transition-colors cursor-pointer md:pl-10 hover:background-slate-200 dark:hover:bg-zinc-800"
      >
        <Link
          onClick={() => setOpen(!isOpen)}
          href="/strains?filter=re"
          className={`w-full ${
            pathName === '/strains'
              ? 'text-green-500 pointer-events-none cursor-not-allowed'
              : ''
          }`}
        >
          Strains
        </Link>
      </motion.div>

      <motion.div
        variants={variants.children}
        animate={isOpen ? 'open' : 'closed'}
        initial="closed"
        className="flex items-center justify-start w-full h-10 py-5 pl-3.5 text-base sm:text-lg font-medium transition-colors cursor-pointer md:pl-10 hover:background-slate-200 dark:hover:bg-zinc-800"
      >
        <Link
          onClick={() => setOpen(!isOpen)}
          href="/dispensaries"
          className={`w-full ${
            pathName === '/dispensaries' ? 'text-green-500' : ''
          }`}
        >
          Dispensaries
        </Link>
      </motion.div>
      <motion.div
        variants={variants.children}
        animate={isOpen ? 'open' : 'closed'}
        initial="closed"
        className="flex items-center justify-start w-full h-10 py-5 pl-3.5 text-base sm:text-lg font-medium transition-colors cursor-pointer md:pl-10 hover:background-slate-200 dark:hover:bg-zinc-800"
      >
        <Link
          onClick={() => setOpen(!isOpen)}
          className={`w-full ${pathName === '/about' ? 'text-green-500' : ''}`}
          href="/about"
        >
          About Us
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default dynamic(() => Promise.resolve(DropdownMenu), {
  ssr: false,
});
