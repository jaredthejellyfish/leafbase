"use client";
import React from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Link from "next/link";
import { setNavDropdownOpen } from "@/store/features/navDropdownSlice";

type Props = {};

const NavigationDropdown = (props: Props) => {
  const isOpen = useSelector(
    (state: RootState) => state.dropdown
  ).isNavDropdownOpen;
  const dispatch = useDispatch();

  const navigationMenu = {
    container: {
      open: {
        display: "block",
        height: 200,
        y: 0,
        transition: {
          y: { duration: 0.2, when: "beforeChildren" },
        },
      },
      closed: {
        height: 0,
        y: -20,
        display: "none",
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
        display: "flex",
        transition: {
          delay: 0.15,
        },
      },
      closed: {
        opacity: 0,
        height: 0,
        display: "none",
      },
    },
  };

  return (
    <motion.div
      className="left-0 w-full pt-5 pl-5 pr-5 divide-y bg-slate-200 dark:bg-zinc-800/100 divide-dashed divide-slate-400/25 top-16 h-52"
      variants={navigationMenu.container}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
    >
      <motion.div
        className="flex items-center justify-start w-full h-10 p-5 pl-10 text-lg font-medium transition-colors cursor-pointer hover:background-slate-200 dark:hover:bg-zinc-800"
        variants={navigationMenu.child}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
      >
        <Link
          href="/strains"
          onClick={() => dispatch(setNavDropdownOpen(!isOpen))}
        >
          Strains
        </Link>
      </motion.div>
      <motion.div
        className="flex items-center justify-start w-full h-10 p-5 pl-10 text-lg font-medium cursor-pointer"
        variants={navigationMenu.child}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
      >
        Company
      </motion.div>
      <motion.div
        className="flex items-center justify-start w-full h-10 p-5 pl-10 text-lg font-medium cursor-pointer"
        variants={navigationMenu.child}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
      >
        Marketplace
      </motion.div>
      <motion.div
        className="flex items-center justify-start w-full h-10 p-5 pl-10 text-lg font-medium cursor-pointer"
        variants={navigationMenu.child}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
      >
        Stocks
      </motion.div>
    </motion.div>
  );
};

export default NavigationDropdown;
