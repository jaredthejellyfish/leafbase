import React from 'react';

import FilterByMenuSkeleton from '@/components/FilterByMenu/skeleton';
import StrainCardSkeleton from '@/components/StrainCard/skeleton';

export default function StrainsLoading() {
  return (
    <main className="px-5 py-3 pb-8 md:px-16 xl:px-36">
      <div className="">
        <h1 className="mb-2 mt-4 text-3xl font-bold ">All strains</h1>
        <p className="">
          Browse the most comprehensive weed strain library on the web. Browse
          weed strains by cannabis type (indica, sativa, or hybrid), effects, or
          number of comments.
        </p>
        <div className="flex items-center justify-between px-1 font-medium">
          <span className="mt-4 text-xs text-zinc-400">6329 strains</span>
          <span className="mb-1 flex flex-row items-center gap-1 text-xs text-zinc-400">
            <FilterByMenuSkeleton />
          </span>
        </div>
        <span className="mt-1 hidden w-full rounded border border-zinc-600/50 p-2 text-xs text-zinc-600 md:block">
          These results are based on user comments and are not a substitute for
          professional medical advice.
        </span>

        <div className="relative grid gap-x-4 md:grid-cols-3 xl:grid-cols-4">
          {[...Array(12)].map((_, i) => (
            <StrainCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
