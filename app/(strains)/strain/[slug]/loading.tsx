import React from 'react';

import NavBreadcrumbsSkeleton from '@/components/NavBreadcrumbs/skeleton';

const StrainLoading = () => {
  return (
    <main className="justify-center px-5 md:px-16 py-3">
      <NavBreadcrumbsSkeleton urls={[{ name: 'Strains' }, { name: '...' }]} />
      <div
        id="card"
        className="relative flex flex-col items-center justify-center pb-8 border rounded shadow border-zinc-300 dark:border-transparent dark:bg-zinc-900"
      >
        <div
          id="header"
          className="flex flex-col items-center justify-center w-full gap-8 px-5 pt-8 md:flex-row md:px-8"
        >
          <div
            id="vertical-1"
            className="flex items-center justify-center md:w-1/3 h-52 md:border rounded-sm md:dark:bg-zinc-950/10 md:dark:shadow md:shadow-sm "
          >
            <div className="w-48 h-48 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          </div>
          <div id="vertical-2" className="w-full md:w-2/3">
            <div className="w-16 h-4 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            <div className="w-32 h-6 mt-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            <div className="w-48 h-4 mt-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            <div className="w-20 h-4 mt-2 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            <div className="w-20 h-4 mt-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            <div className="w-40 h-4 mt-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          </div>
        </div>
        <div
          id="body"
          className="flex flex-col justify-center w-full gap-8 px-5 md:flex-row md:px-8"
        >
          <div className="mt-3 md:w-1/3">
            <div className="flex flex-col gap-2 p-2 px-3 border rounded border-zinc-200 dark:border-zinc-600 dark:bg-zinc-800 md:mt-7">
              <div className="w-20 h-4 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
              <div className="w-2/4 h-3 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
              <div className="w-2/4 h-3 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
              <div className="w-2/4 h-3 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            </div>
          </div>
          <div className="md:w-2/3">
            <div className="mt-1 space-y-2">
              <div className="w-2/3 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
              <div className="w-3/4 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
              <div className="w-2/5 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
              <div className="w-3/5 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
              <div className="w-2/3 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
              <div className="w-2/4 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default StrainLoading;
