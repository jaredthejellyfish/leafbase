import { FaRegStar } from 'react-icons/fa';
import React from 'react';

import StrainCardLikeButtonLoading from './StrainCardLikeButtonLoading';

const StrainCardSkeleton = () => {
  return (
    <div  className="relative z-10 flex gap-5 p-5 mt-4 transition-transform border shadow rounded-xl dark:bg-zinc-900 md:flex-wrap flex-nowrap md:max-w-xs dark:border-opacity-0 border-zinc-100 hover:scale-101 w-full">
      <StrainCardLikeButtonLoading />
      <div className="flex items-center justify-center w-1/2 border rounded-lg md:w-full dark:border-opacity-0 border-zinc-200">
        <div
          style={{ maxHeight: '250px' }}
          className=" object-contain w-full h-full bg-white border border-white rounded-lg aspect-square bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"
        ></div>
      </div>
      <div className="w-1/2 md:w-full">
        <div className="w-14 inline-block px-2 py-1 text-xs font-medium bg-gray-200 rounded dark:shadow dark:bg-zinc-700">
          <div className="w-full h-4 rounded-md"></div>
        </div>
        <div className="px-1 mt-1 font-medium">
          <div className="w-full h-full rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        </div>
        <div className="px-1 mt-1 font-medium">
          <div className="mb-2 w-2/5 h-4 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        </div>
        <div className="px-1 text-sm font-normal text-gray-500 h-14 line-clamp-3">
          <div className="mb-1.5 w-full h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          <div className="mb-1.5 w-2/3 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          <div className="w-1/2 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        </div>
        <div className="flex flex-row items-center gap-1 p-1 mt-2 text-sm">
          <span className="flex items-center justify-center w-6 h-4">5.0</span>
          <FaRegStar />
          <FaRegStar />
          <FaRegStar />
          <FaRegStar />
          <FaRegStar />
        </div>

        <div className="flex flex-row gap-4 px-1 text-xs text-zinc-500 dark:text-zinc-300">
          <span className="">THC: 0%</span>
          <span className="">CBD: 0%</span>
        </div>

        <div className="flex flex-col px-1 mt-2 text-xs font-medium capitalize md:flex-row md:gap-3 md:items-center">
          <span className="flex flex-row items-center gap-1">
            <div
              className="rounded-full w-2.5 h-2.5 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"
            ></div>
            <div className="w-16 h-2.5 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          </span>
          <span className="flex flex-row items-center gap-1">
            <div
              className="rounded-full w-2.5 h-2.5 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"
            ></div>
            <div className="w-16 h-2.5 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default StrainCardSkeleton;
