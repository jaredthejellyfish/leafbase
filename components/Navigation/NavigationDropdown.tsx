'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Link from 'next/link';
import { setNavDropdownOpen } from '@/store/features/navDropdownSlice';
import { usePathname } from 'next/navigation';
import NavigationSearchBar from './NavigationSearchBar';

const NavigationDropdown = () => {
  const isOpen = useSelector(
    (state: RootState) => state.dropdown
  ).isNavDropdownOpen;
  const dispatch = useDispatch();
  const pathName = usePathname();
  const [screenWidth, setScreenWidth] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const burgerButton = document.getElementById('hamburger-button');
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        burgerButton &&
        !burgerButton.contains(event.target as Node)
      ) {
        dispatch(setNavDropdownOpen(false));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dispatch, isOpen]);

  const navigationMenu = {
    container: {
      open: {
        display: 'block',
        height: screenWidth && screenWidth < 768 ? 240 : 190,
        y: 0,
        transition: {
          y: { duration: 0.2, when: 'beforeChildren' },
        },
      },
      closed: {
        height: 0,
        y: -20,
        display: 'none',
        transition: {
          display: {
            delay: 0.25,
          },
          y: {
            duration: 0.4,
          },
        },
      },
    },
    child: {
      open: {
        opacity: 1,
        display: 'flex',
        transition: {
          delay: 0.15,
        },
      },
      closed: {
        opacity: 0,
        height: 0,
        display: 'none',
      },
    },
    search: {
      open: {
        opacity: 1,
        display: 'block',
        transition: {
          delay: 0.15,
        },
      },
      closed: {
        opacity: 0,
        height: 0,
        display: 'none',
      },
    },
    links: {
      wide: {
        marginTop: 0,
      },
      narrow: {
        marginTop: 48,
      },
    },
  };

  return (
    <motion.div
      className="left-0 w-full pt-3 pl-5 pr-5 bg-slate-200 dark:bg-zinc-800/100 top-16 h-52"
      variants={navigationMenu.container}
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      ref={dropdownRef}
    >
      <motion.div
        variants={navigationMenu.search}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
      >
        <NavigationSearchBar containerClassName="mb-2 pl-4 py-1.5 pr-5 px-10 flex-row gap-3 bg-white rounded text-black md:hidden flex dark:bg-zinc-700/60 items-center border border-zinc-400 dark:border-zinc-700" />
      </motion.div>

      <motion.div
        variants={navigationMenu.links}
        initial="closed"
        animate={screenWidth ? (screenWidth < 768 ? 'narrow' : 'wide') : 'wide'}
        className="divide-y divide-dashed divide-slate-400/25"
      >
        <motion.div
          className="flex items-center justify-start w-full h-10 py-5 pl-3.5 text-lg font-medium transition-colors cursor-pointer md:pl-10 hover:background-slate-200 dark:hover:bg-zinc-800"
          variants={navigationMenu.child}
          initial="closed"
          animate={isOpen ? 'open' : 'closed'}
        >
          <Link
            href="/strains?filter=re"
            className={`w-full ${
              pathName === '/strains' ? 'text-green-500' : ''
            }`}
            onClick={() => dispatch(setNavDropdownOpen(!isOpen))}
          >
            Strains
          </Link>
        </motion.div>

        <motion.div
          className="flex items-center justify-start w-full h-10 py-5 pl-3.5 text-lg font-medium transition-colors cursor-pointer md:pl-10 hover:background-slate-200 dark:hover:bg-zinc-800"
          variants={navigationMenu.child}
          initial="closed"
          animate={isOpen ? 'open' : 'closed'}
        >
          <Link
            href="/dispensaries"
            className={`w-full ${
              pathName === '/dispensaries' ? 'text-green-500' : ''
            }`}
            onClick={() => dispatch(setNavDropdownOpen(!isOpen))}
          >
            Dispensaries
          </Link>
        </motion.div>
        <motion.div
          className="flex items-center justify-start w-full h-10 py-5 pl-3.5 text-lg font-medium transition-colors cursor-pointer md:pl-10 hover:background-slate-200 dark:hover:bg-zinc-800"
          variants={navigationMenu.child}
          initial="closed"
          animate={isOpen ? 'open' : 'closed'}
        >
          Marketplace
        </motion.div>
        <motion.div
          className="flex items-center justify-start w-full h-10 py-5 pl-3.5 text-lg font-medium transition-colors cursor-pointer md:pl-10 hover:background-slate-200 dark:hover:bg-zinc-800"
          variants={navigationMenu.child}
          initial="closed"
          animate={isOpen ? 'open' : 'closed'}
        >
          <Link
            href="/settings"
            onClick={() => dispatch(setNavDropdownOpen(!isOpen))}
          >
            Settings
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default NavigationDropdown;
