import { MdLocationPin } from 'react-icons/md';
import React from 'react';

import NavBreadcrumbsSkeleton from '@/components/NavBreadcrumbs/NavBreadcrumbsSkeleton';
import LikedStrainsSkeleton from '@/components/LikedStrains/LikedStrainsSkeleton';

async function ProfileDisplayLoading() {
  return (
    <div className="flex flex-col px-6 md:px-16">
      <NavBreadcrumbsSkeleton urls={[{ name: 'Profile' }, { name: '...' }]} />

      <div className="flex flex-col gap-6 mt-3 lg:flex-row">
        <div id="vertical 1" className="flex flex-col gap-4 lg:w-1/3">
          <div className="flex flex-col w-full shadow-md p-7 rounded-xl dark:bg-zinc-900">
            <div className="w-20 h-20 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            <div className="w-32 h-4 mt-3 rounded-m bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            <span className="flex flex-row items-center gap-1 mt-2 text-sm text-zinc-300">
              <div className="w-16 h-3 mt-0 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            </span>
            <span className="mt-3 text-sm dark:text-white">
              Location:
              <div className="flex flex-row items-center gap-1 mb-3 text-sm text-zinc-300">
                <MdLocationPin />
                <div className="w-20 h-3 mt-0.5 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
              </div>
            </span>
          </div>
          <div className="relative z-0 flex flex-col w-full shadow-md p-7 rounded-xl dark:bg-zinc-900">
            <h1 className="text-xl font-bold">Comments</h1>
            <div className="flex flex-col gap-2 mt-2">
              <div className="px-3 py-2 text-sm rounded-lg shadow dark:border dark:border-zinc-500">
                <h2 className="mb-3 text-base font-semibold">
                  <div className="w-20 h-4 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                </h2>
                <p className="text-zinc-400">
                  <div className="w-2/3 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                  <div className="w-2/5 h-3 mt-2 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                </p>
              </div>
              <div className="px-3 py-2 text-sm rounded-lg shadow dark:border dark:border-zinc-500">
                <h2 className="mb-3 text-base font-semibold">
                  <div className="w-20 h-4 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                </h2>
                <p className="text-zinc-400">
                  <div className="w-2/3 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                  <div className="w-2/5 h-3 mt-2 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                </p>
              </div>
              <div className="px-3 py-2 text-sm rounded-lg shadow dark:border dark:border-zinc-500">
                <h2 className="mb-3 text-base font-semibold">
                  <div className="w-20 h-4 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                </h2>
                <p className="text-zinc-400">
                  <div className="w-2/3 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                  <div className="w-2/5 h-3 mt-2 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                </p>
              </div>
              <div className="px-3 py-2 text-sm rounded-lg shadow dark:border dark:border-zinc-500">
                <h2 className="mb-3 text-base font-semibold">
                  <div className="w-20 h-4 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                </h2>
                <p className="text-zinc-400">
                  <div className="w-2/3 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                  <div className="w-2/5 h-3 mt-2 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div id="vertical 2" className="flex flex-col gap-4 lg:w-2/3">
          <div className="flex flex-col w-full shadow-md p-7 rounded-xl dark:bg-zinc-900">
            <h1 className="text-xl font-bold">General information</h1>
            <span className="mt-3 text-sm dark:text-white">About me</span>
            <div className="mt-1 space-y-2">
              <div className="w-2/3 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
              <div className="w-3/4 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
              <div className="w-2/5 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
              <div className="w-3/5 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
              <div className="w-2/3 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
              <div className="w-2/4 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            </div>
            <div className="flex flex-row justify-between mt-6 md:w-4/5">
              <span className="mt-3 text-sm dark:text-white">
                Birthday:
                <div className="h-3 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse w-60"></div>
              </span>
              <span className="mt-3 text-sm dark:text-white">
                Languages:
                <div className="h-3 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse w-60"></div>
              </span>
            </div>
          </div>
          <LikedStrainsSkeleton />
        </div>
      </div>
    </div>
  );
}

export default ProfileDisplayLoading;
