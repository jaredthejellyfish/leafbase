'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMediaQuery } from 'usehooks-ts';

import { Separator } from '../ui/separator';

import React from 'react';

const DropdownSearchbar = dynamic(() => import('./dropdown-searchbar'), {
  ssr: false,
});

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
      className="absolute left-0 top-[56px] z-50 w-screen origin-top px-4 py-2 dark:bg-zinc-800/100 sm:top-16 sm:px-5 sm:py-3"
      variants={variants.container}
      animate={isOpen ? 'open' : 'closed'}
      initial="closed"
    >
      {!matches && <DropdownSearchbar />}
      <motion.div
        variants={variants.children}
        animate={isOpen ? 'open' : 'closed'}
        initial="closed"
        className="hover:background-slate-200 flex h-10 w-full cursor-pointer items-center justify-start py-5 pl-3.5 text-base font-medium transition-colors dark:hover:bg-zinc-800 sm:text-lg md:pl-10"
      >
        <Link
          onClick={() => setOpen(!isOpen)}
          href="/strains?filter=re"
          className={`w-full ${
            pathName === '/strains'
              ? 'pointer-events-none cursor-not-allowed text-green-500'
              : ''
          }`}
        >
          Strains
        </Link>
      </motion.div>
      <Separator className="rounded-xl bg-zinc-700" />
      <motion.div
        variants={variants.children}
        animate={isOpen ? 'open' : 'closed'}
        initial="closed"
        className="hover:background-slate-200 flex h-10 w-full cursor-pointer items-center justify-start py-5 pl-3.5 text-base font-medium transition-colors dark:hover:bg-zinc-800 sm:text-lg md:pl-10"
      >
        <Link
          onClick={() => setOpen(!isOpen)}
          href="#"
          className={`w-full ${
            pathName === '/dispensaries' ? 'text-green-500' : ''
          }`}
        >
          Dispensaries
        </Link>
      </motion.div>
      <Separator className="rounded-xl bg-zinc-700" />
      <motion.div
        variants={variants.children}
        animate={isOpen ? 'open' : 'closed'}
        initial="closed"
        className="hover:background-slate-200 flex h-10 w-full cursor-pointer items-center justify-start py-5 pl-3.5 text-base font-medium transition-colors dark:hover:bg-zinc-800 sm:text-lg md:pl-10"
      >
        <Link
          onClick={() => setOpen(!isOpen)}
          className={`w-full ${pathName === '/about' ? 'text-green-500' : ''}`}
          href="#"
        >
          About Us
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default DropdownMenu;
