"use client";

import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  

  return (
    <motion.div
      className="w-screen top-12 sm:top-16 absolute left-0 bg-slate-200 dark:bg-zinc-800/100 z-50 origin-top px-4 py-2 sm:px-5 sm:py-3 divide-y divide-dashed divide-slate-400/25"
      variants={variants.container}
      animate={isOpen ? "open" : "closed"}
      initial="closed"
    >
      <motion.div
        variants={variants.children}
        animate={isOpen ? "open" : "closed"}
        initial="closed"
        className="flex items-center justify-start w-full h-10 py-5 pl-3.5 text-base sm:text-lg font-medium transition-colors cursor-pointer md:pl-10 hover:background-slate-200 dark:hover:bg-zinc-800"
      >
        <Link
          onClick={() => setOpen(!isOpen)}
          href="/strains?filter=re"
          className={`w-full ${
            pathName === "/strains"
              ? "text-green-500 pointer-events-none cursor-not-allowed"
              : ""
          }`}
        >
          Strains
        </Link>
      </motion.div>

      <motion.div
        variants={variants.children}
        animate={isOpen ? "open" : "closed"}
        initial="closed"
        className="flex items-center justify-start w-full h-10 py-5 pl-3.5 text-base sm:text-lg font-medium transition-colors cursor-pointer md:pl-10 hover:background-slate-200 dark:hover:bg-zinc-800"
      >
        <Link
          onClick={() => setOpen(!isOpen)}
          href="/dispensaries"
          className={`w-full ${
            pathName === "/dispensaries" ? "text-green-500" : ""
          }`}
        >
          Dispensaries
        </Link>
      </motion.div>
      <motion.div
        variants={variants.children}
        animate={isOpen ? "open" : "closed"}
        initial="closed"
        className="flex items-center justify-start w-full h-10 py-5 pl-3.5 text-base sm:text-lg font-medium transition-colors cursor-pointer md:pl-10 hover:background-slate-200 dark:hover:bg-zinc-800"
      >
        <Link
          onClick={() => setOpen(!isOpen)}
          className={`w-full ${pathName === "/about" ? "text-green-500" : ""}`}
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
