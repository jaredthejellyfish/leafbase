import type { Metadata } from 'next';
import { unstable_cache } from 'next/cache';
import dynamic from 'next/dynamic';
import { ErrorBoundary } from 'react-error-boundary';

import FilterByMenuSkeleton from '@/components/FilterByMenu/skeleton';
import StrainCardSkeleton from '@/components/StrainCard/skeleton';

import { getServerLikedStrains } from '@/lib/utils/getServerLikedStrains';
import getServerPaginatedStrains from '@/lib/utils/getServerPaginatedStrains';

import React, { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'All Strains - Leafbase',
  description:
    'Explore our comprehensive list of marijuana strains, featuring detailed profiles, effects, and reviews. sort by type, potency, and medical benefits to find your perfect match. Discover new favorites and classics in our extensive collection of cannabis varieties.',
};

const FilterByMenu = dynamic(() => import('@/components/FilterByMenu'), {
  loading: () => <FilterByMenuSkeleton />,
});
const StrainCardLoader = dynamic(
  () => import('@/components/StrainCardLoader'),
  {
    loading: () => (
      <>
        {[...Array(12)].map((_, i) => (
          <StrainCardSkeleton key={i} />
        ))}
      </>
    ),
  },
);

const getCachedServerPaginatedStrains = unstable_cache(
  async ({ filter, perPage }: { filter: string; perPage: number }) =>
    getServerPaginatedStrains({ filter, perPage }),
  ['server-paginated-strains'],
  {
    revalidate: 3600,
  },
);

export default async function Strains(request: {
  searchParams: { filter?: string };
}) {
  const filter = request.searchParams.filter;

  const perPage = 12;

  const { strains, count, nextPage } = await getCachedServerPaginatedStrains({
    filter: filter || 're',
    perPage,
  });

  const { likes } = await getServerLikedStrains();

  return (
    <main className="px-5 py-3 pb-8 md:px-16 xl:px-36">
      <div className="flex flex-col items-center">
        <div id="heading" className="w-full sm:max-w-[992px] xl:max-w-[1328px]">
          <h1 className="mb-2 mt-4 text-3xl font-bold ">All strains</h1>
          <h3 className="">
            Browse the most comprehensive weed strain library on the web. Browse
            weed strains by cannabis type (indica, sativa, or hybrid), effects,
            or number of comments.
          </h3>
          <div className="flex items-center justify-between px-1 font-medium">
            <span className="mt-4 text-xs text-zinc-400">{count} strains</span>
            <span className="mb-1 flex flex-row items-center gap-1 text-xs text-zinc-400">
              <ErrorBoundary fallback={<FilterByMenuSkeleton />}>
                <Suspense fallback={<FilterByMenuSkeleton />}>
                  <FilterByMenu filter={request.searchParams.filter} />
                </Suspense>
              </ErrorBoundary>
            </span>
          </div>
          <span className="mt-1 hidden w-full rounded border border-zinc-600/50 p-2 text-xs text-zinc-600 md:block">
            These results are based on user comments and are not a substitute
            for professional medical advice.
          </span>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <ErrorBoundary fallback={<div>Something went wrong</div>}>
            {strains && count && count > perPage && (
              <StrainCardLoader
                perPage={perPage}
                page={nextPage}
                filter={filter || 're'}
                initialData={strains}
                count={count}
                likes={likes}
              />
            )}
          </ErrorBoundary>
        </div>
      </div>
    </main>
  );
}
