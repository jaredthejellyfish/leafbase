import React from 'react';
import { BsFillSunFill } from 'react-icons/bs';
import { BsSearch } from 'react-icons/bs';

const NavigationSkeleton = () => {
  return (
    <nav data-testid="navigation-skeleton" className="fixed z-50 w-screen h-16 text-black drop-shadow-lg dark:text-white">
      <div className="relative z-50 grid h-full grid-cols-3 grid-rows-1 gap-0 px-6 bg-gray-100 md:px-16 dark:bg-zinc-900">
        <div className="flex items-center justify-start col-span-1">
          <div className="flex items-center justify-start gap-4 text-xl">
            <div className="w-10 h-10 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            <span className="font-medium ">Leafbase</span>
          </div>
        </div>
        <div className="flex items-center justify-end col-span-2 gap-4">
          <div className="pl-4 py-1.5 pr-5 flex-row gap-3 bg-white rounded text-black hidden md:flex dark:bg-zinc-800 items-center md:w-46 xl:w-80">
            <input
              placeholder="Search..."
              className="w-full bg-transparent focus:outline-none dark:text-white"
              disabled
            ></input>
            <BsSearch
              className="text-zinc-400/80 dark:text-gray-400"
              size={20}
            />
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="20"
            className="hidden stroke-black dark:stroke-white md:block"
          >
            <line x1="5" y1="0" x2="5" y2="200" strokeWidth="1.3" />
          </svg>
          <BsFillSunFill className="mx-2" />
          <div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          </div>
          <svg
            className="text-dark p-1.5 min-w-40 rounded dark:text-white hover:bg-gray-300 dark:hover:bg-zinc-700 transition-colors select-none hover:cursor-pointer"
            width={40}
            height={40}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path>
            <path d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path>
            <path d="M3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path>
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default NavigationSkeleton;
