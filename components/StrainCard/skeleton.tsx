import { FaStar } from 'react-icons/fa';
import React from 'react';

const StrainCardSkeleton = () => {
  return (
    <div className="relative z-10 flex gap-5 p-5 mt-4 transition-transform border shadow rounded-xl dark:bg-zinc-900 md:flex-wrap flex-nowrap md:max-w-xs dark:border-opacity-0 border-zinc-100 hover:scale-101">
      <div className="flex items-center justify-center w-1/2 border rounded-lg md:w-full dark:border-opacity-0 border-zinc-200">
        <div
          style={{ maxHeight: '250px' }}
          className="bg-zinc-300/10 dark:opacity-90 dark:bg-zinc-950/30 object-contain w-full h-full border border-white dark:border-zinc-800 rounded-lg aspect-square p-4 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"
        ></div>
      </div>
      <div className="w-1/2 md:w-full">
        <div className="text-transparent inline-block w-14 flex items-center justify-center px-2 py-1 text-xs font-medium bg-gray-200 rounded dark:shadow dark:bg-zinc-700">
          Pheno
        </div>
        <div className="mt-2 font-medium">
          <div className="mb-1.5 w-1/2 h-4 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        </div>
        <div className="mt-2 text-sm font-normal text-gray-500 h-14 line-clamp-3">
          <div className="mb-1.5 w-full h-2.5 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          <div className="mb-1.5 w-2/3 h-2.5 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          <div className="w-1/2 h-2.5 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        </div>
        <div className="flex flex-row items-center gap-1 p-1 mt-2 text-sm">
          <span className="flex items-center justify-center w-6 h-4">5.0</span>
          <div
            style={{ display: 'flex' }}
            className={'flex flex-row text-black dark:text-white'}
          >
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
        </div>
        <div className="flex flex-row gap-4 px-1 text-xs text-zinc-500 dark:text-zinc-300">
          <span className="">THC: ?%</span>
          <span className="">CBD: ?%</span>
        </div>
        <div className="flex flex-col px-1 mt-2 text-xs font-medium capitalize md:flex-row md:gap-3 md:items-center gap-y-1">
          <span className="flex flex-row items-center gap-1">
            <div
              style={{
                backgroundColor: '#778899',
              }}
              className="rounded-full w-2.5 h-2.5"
            ></div>
            <div className="w-14 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          </span>

          <span className="flex flex-row items-center gap-1">
            <div
              style={{
                backgroundColor: '#778899',
              }}
              className="rounded-full w-2.5 h-2.5"
            ></div>
            <div className="w-14 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default StrainCardSkeleton;
