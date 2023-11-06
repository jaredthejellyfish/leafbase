import React from 'react';

import FilterByMenuSkeleton from '@/components/FilterByMenu/skeleton';

function StrainsLoading() {
  return (
    <main className="pb-8 px-5 md:px-16 xl:px-36 py-3">
      <div className="">
        <h1 className="mt-4 mb-2 text-3xl font-bold ">Single strain</h1>
        <p className="">
          Browse the most comprehensive weed strain library on the web. Browse
          weed strains by cannabis type (indica, sativa, or hybrid), effects, or
          number of comments.
        </p>
        <div className="flex items-center justify-between px-1 font-medium">
          <span className="mt-4 text-xs text-zinc-400">6330 strains</span>
          <span className="flex flex-row items-center gap-1 mb-1 text-xs text-zinc-400">
            <FilterByMenuSkeleton />
          </span>
        </div>
        <span className="hidden w-full p-2 mt-1 text-xs border rounded md:block border-zinc-600/50 text-zinc-600">
          These results are based on user comments and are not a substitute for
          professional medical advice.
        </span>
        <div className="flex flex-col gap-4 items-center justify-center w-full">
          <div className="relative grid md:grid-cols-3 xl:grid-cols-4 gap-x-4">
 
          </div>
        </div>
      </div>
    </main>
  );
}

export default StrainsLoading;
