'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setNavDropdownOpen } from '@/store/features/navDropdownSlice';

const NavigationHamburgerMenu = () => {
  const dispatch = useDispatch();
  const currentOpenStatus = useSelector(
    (state: RootState) => state.dropdown
  ).isNavDropdownOpen;
  const [isOpen, setIsOpen] = useState(currentOpenStatus);

  useEffect(() => {
    setIsOpen(currentOpenStatus);
  }, [currentOpenStatus]);

  const handleBurgerClick = () => {
    setIsOpen(!isOpen);
    dispatch(setNavDropdownOpen(!currentOpenStatus));
  };

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

  return (
    <svg
      className="text-dark p-1.5 min-w-40 rounded dark:text-white hover:bg-gray-300 dark:hover:bg-zinc-700 transition-colors select-none hover:cursor-pointer"
      width={40}
      height={40}
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
  );
};

export default NavigationHamburgerMenu;
