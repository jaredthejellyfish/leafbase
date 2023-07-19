import React from 'react';
import { AiOutlineHeart } from 'react-icons/ai';

const StrainLoaderSkeleton = () => {
  return (
    <>
      <div className="relative flex gap-5 p-5 mt-4 shadow rounded-xl dark:bg-zinc-900 md:flex-wrap flex-nowrap">
        <div className="absolute top-1.5 right-2 border bg-white dark:bg-zinc-800 text-zinc-400/75 dark:border-zinc-700 rounded-full p-1.5 dark:text-zinc-400 z-10">
          <AiOutlineHeart />
        </div>
        <div
          style={{ maxHeight: '250px' }}
          className="flex items-center justify-center w-1/2 border rounded-lg md:w-full dark:border-opacity-0 border-zinc-100 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse aspect-square"
        ></div>
        <div className="w-1/2 md:w-full">
          <div className="inline-block w-16 h-6 py-1 mt-2 ml-1 text-xs font-medium bg-gray-200 rounded dark:shadow dark:bg-zinc-700"></div>
          <div className="px-1">
            <div className="w-1/2 h-4 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          </div>
          <div className="px-1 mt-2 h-14">
            <div className="w-4/5 h-3 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            <div className="w-3/4 h-3 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            <div className="w-2/4 h-3 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          </div>
          <div className="flex flex-row items-center gap-1 p-1 mt-2 text-sm">
            <div className="w-3/4 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          </div>
          <div className="flex flex-row gap-4 px-1 text-xs text-zinc-500 dark:text-zinc-300 h1">
            <div className="w-1/4 h-2 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            <div className="w-1/4 h-2 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          </div>
          <div className="flex flex-col px-1 mt-2 text-xs font-medium capitalize md:flex-row md:gap-3 md:items-center">
            <div className="w-2/4 h-3 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            <div className="w-2/4 h-3 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          </div>
        </div>
      </div>
      <div className="relative flex gap-5 p-5 mt-4 shadow rounded-xl dark:bg-zinc-900 md:flex-wrap flex-nowrap">
        <div className="absolute top-1.5 right-2 border bg-white dark:bg-zinc-800 text-zinc-400/75 dark:border-zinc-700 rounded-full p-1.5 dark:text-zinc-400 z-10">
          <AiOutlineHeart />
        </div>
        <div
          style={{ maxHeight: '250px' }}
          className="flex items-center justify-center w-1/2 border rounded-lg md:w-full dark:border-opacity-0 border-zinc-100 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse aspect-square"
        ></div>
        <div className="w-1/2 md:w-full">
          <div className="inline-block w-16 h-6 py-1 mt-2 ml-1 text-xs font-medium bg-gray-200 rounded dark:shadow dark:bg-zinc-700"></div>
          <div className="px-1">
            <div className="w-1/2 h-4 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          </div>
          <div className="px-1 mt-2 h-14">
            <div className="w-4/5 h-3 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            <div className="w-3/4 h-3 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            <div className="w-2/4 h-3 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          </div>
          <div className="flex flex-row items-center gap-1 p-1 mt-2 text-sm">
            <div className="w-3/4 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          </div>
          <div className="flex flex-row gap-4 px-1 text-xs text-zinc-500 dark:text-zinc-300 h1">
            <div className="w-1/4 h-2 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            <div className="w-1/4 h-2 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          </div>
          <div className="flex flex-col px-1 mt-2 text-xs font-medium capitalize md:flex-row md:gap-3 md:items-center">
            <div className="w-2/4 h-3 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            <div className="w-2/4 h-3 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          </div>
        </div>
      </div>
      <div className="relative flex gap-5 p-5 mt-4 shadow rounded-xl dark:bg-zinc-900 md:flex-wrap flex-nowrap">
        <div className="absolute top-1.5 right-2 border bg-white dark:bg-zinc-800 text-zinc-400/75 dark:border-zinc-700 rounded-full p-1.5 dark:text-zinc-400 z-10">
          <AiOutlineHeart />
        </div>
        <div
          style={{ maxHeight: '250px' }}
          className="flex items-center justify-center w-1/2 border rounded-lg md:w-full dark:border-opacity-0 border-zinc-100 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse aspect-square"
        ></div>
        <div className="w-1/2 md:w-full">
          <div className="inline-block w-16 h-6 py-1 mt-2 ml-1 text-xs font-medium bg-gray-200 rounded dark:shadow dark:bg-zinc-700"></div>
          <div className="px-1">
            <div className="w-1/2 h-4 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          </div>
          <div className="px-1 mt-2 h-14">
            <div className="w-4/5 h-3 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            <div className="w-3/4 h-3 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            <div className="w-2/4 h-3 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          </div>
          <div className="flex flex-row items-center gap-1 p-1 mt-2 text-sm">
            <div className="w-3/4 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          </div>
          <div className="flex flex-row gap-4 px-1 text-xs text-zinc-500 dark:text-zinc-300 h1">
            <div className="w-1/4 h-2 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            <div className="w-1/4 h-2 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          </div>
          <div className="flex flex-col px-1 mt-2 text-xs font-medium capitalize md:flex-row md:gap-3 md:items-center">
            <div className="w-2/4 h-3 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            <div className="w-2/4 h-3 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          </div>
        </div>
      </div>
      <div className="relative flex gap-5 p-5 mt-4 shadow rounded-xl dark:bg-zinc-900 md:flex-wrap flex-nowrap">
        <div className="absolute top-1.5 right-2 border bg-white dark:bg-zinc-800 text-zinc-400/75 dark:border-zinc-700 rounded-full p-1.5 dark:text-zinc-400 z-10">
          <AiOutlineHeart />
        </div>
        <div
          style={{ maxHeight: '250px' }}
          className="flex items-center justify-center w-1/2 border rounded-lg md:w-full dark:border-opacity-0 border-zinc-100 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse aspect-square"
        ></div>
        <div className="w-1/2 md:w-full">
          <div className="inline-block w-16 h-6 py-1 mt-2 ml-1 text-xs font-medium bg-gray-200 rounded dark:shadow dark:bg-zinc-700"></div>
          <div className="px-1">
            <div className="w-1/2 h-4 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          </div>
          <div className="px-1 mt-2 h-14">
            <div className="w-4/5 h-3 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            <div className="w-3/4 h-3 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            <div className="w-2/4 h-3 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          </div>
          <div className="flex flex-row items-center gap-1 p-1 mt-2 text-sm">
            <div className="w-3/4 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          </div>
          <div className="flex flex-row gap-4 px-1 text-xs text-zinc-500 dark:text-zinc-300 h1">
            <div className="w-1/4 h-2 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            <div className="w-1/4 h-2 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          </div>
          <div className="flex flex-col px-1 mt-2 text-xs font-medium capitalize md:flex-row md:gap-3 md:items-center">
            <div className="w-2/4 h-3 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            <div className="w-2/4 h-3 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          </div>
        </div>
      </div>
      <div className="relative flex gap-5 p-5 mt-4 shadow rounded-xl dark:bg-zinc-900 md:flex-wrap flex-nowrap">
        <div className="absolute top-1.5 right-2 border bg-white dark:bg-zinc-800 text-zinc-400/75 dark:border-zinc-700 rounded-full p-1.5 dark:text-zinc-400 z-10">
          <AiOutlineHeart />
        </div>
        <div
          style={{ maxHeight: '250px' }}
          className="flex items-center justify-center w-1/2 border rounded-lg md:w-full dark:border-opacity-0 border-zinc-100 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse aspect-square"
        ></div>
        <div className="w-1/2 md:w-full">
          <div className="inline-block w-16 h-6 py-1 mt-2 ml-1 text-xs font-medium bg-gray-200 rounded dark:shadow dark:bg-zinc-700"></div>
          <div className="px-1">
            <div className="w-1/2 h-4 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          </div>
          <div className="px-1 mt-2 h-14">
            <div className="w-4/5 h-3 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            <div className="w-3/4 h-3 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            <div className="w-2/4 h-3 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          </div>
          <div className="flex flex-row items-center gap-1 p-1 mt-2 text-sm">
            <div className="w-3/4 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          </div>
          <div className="flex flex-row gap-4 px-1 text-xs text-zinc-500 dark:text-zinc-300 h1">
            <div className="w-1/4 h-2 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            <div className="w-1/4 h-2 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          </div>
          <div className="flex flex-col px-1 mt-2 text-xs font-medium capitalize md:flex-row md:gap-3 md:items-center">
            <div className="w-2/4 h-3 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            <div className="w-2/4 h-3 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          </div>
        </div>
      </div>
      <div className="relative flex gap-5 p-5 mt-4 shadow rounded-xl dark:bg-zinc-900 md:flex-wrap flex-nowrap">
        <div className="absolute top-1.5 right-2 border bg-white dark:bg-zinc-800 text-zinc-400/75 dark:border-zinc-700 rounded-full p-1.5 dark:text-zinc-400 z-10">
          <AiOutlineHeart />
        </div>
        <div
          style={{ maxHeight: '250px' }}
          className="flex items-center justify-center w-1/2 border rounded-lg md:w-full dark:border-opacity-0 border-zinc-100 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse aspect-square"
        ></div>
        <div className="w-1/2 md:w-full">
          <div className="inline-block w-16 h-6 py-1 mt-2 ml-1 text-xs font-medium bg-gray-200 rounded dark:shadow dark:bg-zinc-700"></div>
          <div className="px-1">
            <div className="w-1/2 h-4 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          </div>
          <div className="px-1 mt-2 h-14">
            <div className="w-4/5 h-3 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            <div className="w-3/4 h-3 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            <div className="w-2/4 h-3 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          </div>
          <div className="flex flex-row items-center gap-1 p-1 mt-2 text-sm">
            <div className="w-3/4 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          </div>
          <div className="flex flex-row gap-4 px-1 text-xs text-zinc-500 dark:text-zinc-300 h1">
            <div className="w-1/4 h-2 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            <div className="w-1/4 h-2 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          </div>
          <div className="flex flex-col px-1 mt-2 text-xs font-medium capitalize md:flex-row md:gap-3 md:items-center">
            <div className="w-2/4 h-3 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            <div className="w-2/4 h-3 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StrainLoaderSkeleton;
