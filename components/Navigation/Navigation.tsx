"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import useColorTheme from "@/hooks/useColorTheme";
import { BsMoonFill, BsFillSunFill, BsSearch } from "react-icons/bs";
import Link from "next/link";
import Avatar from "react-avatar";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setTheme } from "@/store/features/themeSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

type Props = {};

const Navigation = (props: Props) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const { colorTheme, setColorTheme } = useColorTheme();

  const currentTheme = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    dispatch(setTheme(colorTheme));
  }, [colorTheme, dispatch]);

  const hamburgerMenu = {
    top: {
      open: { rotate: 45, y: 5 },
      closed: { rotate: 0, y: 0 },
    },
    middle: {
      open: { display: "none" },
      closed: { display: "block" },
    },
    bottom: {
      open: { rotate: -45, y: -5 },
      closed: { rotate: 0, y: 0 },
    },
  };

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

  const avatar = {};

  return (
    <nav className="fixed z-50 w-screen h-16 text-black drop-shadow-lg dark:text-white">
      <div className="relative z-50 grid h-full grid-cols-3 grid-rows-1 gap-0 px-6 bg-gray-100 md:px-16 dark:bg-zinc-900">
        <div className="flex items-center justify-start col-span-1">
          <Link
            href="/"
            className="flex items-center justify-start gap-5 text-xl"
          >
            <Image
              src="https://companieslogo.com/img/orig/LFLY-e243e87c.png?t=1676454310"
              alt="logo"
              width={38}
              height={38}
            />
            <span className="font-medium ">Strainbase</span>
          </Link>
        </div>
        <div className="flex items-center justify-end col-span-2 gap-4">
          <div className="pl-2 py-1.5 pr-2 flex-row items-center justify-center gap-3 bg-white rounded text-black hidden md:flex dark:bg-zinc-800">
            <BsSearch
              className="text-zinc-400/80 dark:text-gray-400"
              size={20}
            />
            <input
              value={search}
              placeholder="Search..."
              className="bg-transparent focus:outline-none dark:text-white md:w-48 xl:w-80"
              onChange={(e) => setSearch(e.target.value)}
            ></input>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="20"
            className="hidden stroke-black dark:stroke-white md:block"
          >
            <line x1="5" y1="0" x2="5" y2="200" strokeWidth="1.3" />
          </svg>
          <button
            className="p-2"
            onClick={() =>
              setColorTheme(colorTheme === "dark" ? "light" : "dark")
            }
          >
            {currentTheme.theme === "light" ? (
              <BsMoonFill />
            ) : (
              <BsFillSunFill />
            )}
          </button>
          <Link href="/profile">
            <Avatar
              className="rounded-full"
              src={
                session?.user?.image
                  ? session?.user?.image
                  : `https://www.gravatar.com/avatar/${session?.user?.name}?d=identicon`
              }
              alt="profile"
              size="32px"
            />
          </Link>
          <svg
            className="text-dark p-1.5 min-w-40 rounded dark:text-white hover:bg-gray-300 dark:hover:bg-zinc-700 transition-colors select-none hover:cursor-pointer"
            width={40}
            height={40}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setIsOpen(!isOpen)}
          >
            <motion.path
              variants={hamburgerMenu.top}
              initial="closed"
              animate={isOpen ? "open" : "closed"}
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            ></motion.path>
            <motion.path
              variants={hamburgerMenu.middle}
              initial="closed"
              animate={isOpen ? "open" : "closed"}
              d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            ></motion.path>
            <motion.path
              variants={hamburgerMenu.bottom}
              initial="closed"
              animate={isOpen ? "open" : "closed"}
              d="M3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            ></motion.path>
          </svg>
        </div>
      </div>
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
          <Link href="/strains" onClick={() => setIsOpen(false)}>
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
    </nav>
  );
};

export default Navigation;
