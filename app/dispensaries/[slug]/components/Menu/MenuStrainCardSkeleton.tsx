import React from 'react';

const MenuStrainCardSkeleton = () => {
  return (
    <div className="relative z-10 flex w-full gap-3 p-5 transition-transform border shadow md:flex-wrap md:w-56 rounded-xl dark:bg-zinc-900 dark:border-opacity-0 border-zinc-100 hover:scale-101">
      <div className="flex w-1/3 p-1 md:w-full md:items-center md:justify-center">
        <div className="flex items-center justify-center w-full border rounded-lg dark:border-opacity-0 border-zinc-100 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse aspect-square"></div>
      </div>
      <div className="flex flex-col justify-center w-1/2 md:w-full">
        <div className="px-1">
          <div className="w-1/2 h-4 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        </div>
        <div className="flex flex-row items-center gap-1 p-1 mt-2 text-sm">
          <div className="w-3/4 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        </div>
        <div className="flex flex-row gap-4 px-1 text-xs text-zinc-500 dark:text-zinc-300 h1">
          <div className="w-1/4 h-2 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          <div className="w-1/4 h-2 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        </div>
        <div className="flex flex-col px-1 mt-2 text-xs font-medium capitalize">
          <div className="w-2/4 h-3 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          <div className="w-2/4 h-3 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default MenuStrainCardSkeleton;
