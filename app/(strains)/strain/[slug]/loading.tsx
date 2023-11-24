import React from 'react';

import NavBreadcrumbsSkeleton from '@/components/NavBreadcrumbs/skeleton';

export default async function StrainLoading() {
  return (
    <main className="justify-center px-5 py-3 md:px-16">
      <NavBreadcrumbsSkeleton urls={[{ name: 'Strains' }, { name: '...' }]} />
      <div
        id="card"
        className="relative flex flex-col items-center justify-center rounded border border-zinc-300 pb-8 shadow dark:border-transparent dark:bg-zinc-900"
      >
        <div
          id="header"
          className="flex w-full flex-col items-center justify-center gap-8 px-5 pt-8 md:flex-row md:px-8"
        >
          <div
            id="vertical-1"
            className="flex h-52 items-center justify-center rounded-sm md:w-1/3 md:border md:shadow-sm md:dark:bg-zinc-950/10 md:dark:shadow "
          >
            <div className="h-48 w-48 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
          </div>
          <div id="vertical-2" className="w-full md:w-2/3">
            <div className="h-4 w-16 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
            <div className="mt-3 h-6 w-32 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
            <div className="mt-3 h-4 w-48 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
            <div className="mt-2 h-4 w-20 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
            <div className="mt-3 h-4 w-20 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
            <div className="mt-3 h-4 w-40 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
          </div>
        </div>
        <div
          id="body"
          className="flex w-full flex-col justify-center gap-8 px-5 md:flex-row md:px-8"
        >
          <div className="mt-3 md:w-1/3">
            <div className="flex flex-col gap-2 rounded border border-zinc-200 p-2 px-3 dark:border-zinc-600 dark:bg-zinc-800 md:mt-7">
              <div className="h-4 w-20 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
              <div className="mt-1 h-3 w-2/4 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
              <div className="mt-1 h-3 w-2/4 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
              <div className="mt-1 h-3 w-2/4 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
            </div>
          </div>
          <div className="md:w-2/3">
            <div className="mt-1 space-y-2">
              <div className="h-3 w-2/3 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
              <div className="h-3 w-3/4 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
              <div className="h-3 w-2/5 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
              <div className="h-3 w-3/5 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
              <div className="h-3 w-2/3 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
              <div className="h-3 w-2/4 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
