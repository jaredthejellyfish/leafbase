import { FaStar } from 'react-icons/fa';

import React from 'react';

const StrainCardSkeleton = () => {
  return (
    <div className="hover:scale-101 relative z-10 mt-4 flex max-h-[250px] min-h-[250px] w-full min-w-[240px] flex-nowrap gap-5 rounded-xl border border-zinc-100 p-5 shadow transition-transform md:max-h-fit md:min-h-[440px] md:max-w-xs md:flex-wrap dark:border-transparent dark:bg-zinc-900">
      <div className="flex w-1/2 items-center justify-center rounded-lg border border-zinc-200 md:w-full dark:border-transparent">
        <div
          style={{ maxHeight: '250px', maxWidth: '250px' }}
          className="aspect-square h-full w-full animate-pulse rounded-lg border border-white bg-zinc-300/10 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 object-contain p-4 dark:border-zinc-800 dark:bg-zinc-950/30 dark:opacity-90"
        />
      </div>
      <div className="w-1/2 md:w-full">
        <div className="flex w-14 items-center justify-center rounded bg-gray-200 px-2 py-1 text-xs font-medium text-transparent dark:bg-zinc-700 dark:shadow">
          Pheno
        </div>
        <div className="mt-2 font-medium">
          <div className="mb-1.5 h-4 w-1/2 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
        </div>
        <div className="mt-2 line-clamp-3 h-14 text-sm font-normal text-gray-500">
          <div className="mb-1.5 h-2.5 w-full animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
          <div className="mb-1.5 h-2.5 w-2/3 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
          <div className="h-2.5 w-1/2 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
        </div>
        <div className="mt-2 flex flex-row items-center gap-1 p-1 text-sm">
          <span className="flex h-4 w-6 items-center justify-center">5.0</span>
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
        <div className="mt-2 flex flex-col gap-y-1 px-1 text-xs font-medium capitalize md:flex-row md:items-center md:gap-3">
          <span className="flex flex-row items-center gap-1">
            <div
              style={{
                backgroundColor: '#778899',
              }}
              className="h-2.5 w-2.5 rounded-full"
            ></div>
            <div className="h-3 w-14 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
          </span>

          <span className="flex flex-row items-center gap-1">
            <div
              style={{
                backgroundColor: '#778899',
              }}
              className="h-2.5 w-2.5 rounded-full"
            ></div>
            <div className="h-3 w-14 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default StrainCardSkeleton;
