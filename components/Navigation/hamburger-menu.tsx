'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const DropdownMenu = dynamic(() => import('./dropdown-menu'), { ssr: false });

const hamburgerMenu = {
  top: {
    open: { rotate: 45, y: 5 },
    closed: { rotate: 0, y: 0 },
  },
  middle: {
    open: { display: 'none' },
    closed: { display: 'block' },
  },
  bottom: {
    open: { rotate: -45, y: -5 },
    closed: { rotate: 0, y: 0 },
  },
};

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleBurgerClick = () => {
    setIsOpen(!isOpen);
  };

  const hamburgerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div ref={hamburgerRef} id="hamburger-menu">
        <svg
          className="text-dark rounded dark:text-white hover:bg-gray-300 dark:hover:bg-zinc-700 transition-colors select-none hover:cursor-pointer"
          width={25}
          height={25}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => handleBurgerClick()}
          id="hamburger-button"
          data-testid="hamburger-button"
        >
          <motion.path
            variants={hamburgerMenu.top}
            initial="closed"
            animate={isOpen ? 'open' : 'closed'}
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
          ></motion.path>
          <motion.path
            variants={hamburgerMenu.middle}
            initial="closed"
            animate={isOpen ? 'open' : 'closed'}
            d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
          ></motion.path>
          <motion.path
            variants={hamburgerMenu.bottom}
            initial="closed"
            animate={isOpen ? 'open' : 'closed'}
            d="M3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
          ></motion.path>
        </svg>
        <DropdownMenu open={isOpen} setOpen={setIsOpen} />
      </div>
    </>
  );
};

export default HamburgerMenu;
