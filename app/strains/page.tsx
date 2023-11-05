import { ErrorBoundary } from 'react-error-boundary';
import React from 'react';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

import { getServerPaginatedStrains } from '@/lib/utils/getServerPaginatedStrains';
import { getServerLikedStrains } from '@/lib/utils/getServerLikedStrains';
import FilterByMenu from '@/components/FilterByMenu';

export const metadata: Metadata = {
  title: 'All Strains - Leafbase',
  description:
    'Explore our comprehensive list of marijuana strains, featuring detailed profiles, effects, and reviews. sort by type, potency, and medical benefits to find your perfect match. Discover new favorites and classics in our extensive collection of cannabis varieties.',
};

const StrainCardLoader = dynamic(() => import('@/components/StrainCardLoader'));

async function StrainsPage(request: { searchParams: { filter?: string } }) {
  const filter = request.searchParams.filter;

  const perPage = 12;

  const { strains, count, nextPage } = await getServerPaginatedStrains({
    filter,
    perPage,
  });

  const { data: strainLikes } = await getServerLikedStrains();

  const likes = strainLikes?.map((strainLike) => strainLike.strain_id.id);

  return (
    <main className="pb-8 px-5 md:px-16 xl:px-36 py-3">
      <div className="">
        <h1 className="mt-4 mb-2 text-3xl font-bold ">All strains</h1>
        <p className="">
          Browse the most comprehensive weed strain library on the web. Browse
          weed strains by cannabis type (indica, sativa, or hybrid), effects, or
          number of comments.
        </p>
        <div className="flex items-center justify-between px-1 font-medium">
          <span className="mt-4 text-xs text-zinc-400">{count} strains</span>
          <span className="flex flex-row items-center gap-1 mb-1 text-xs text-zinc-400">
            <FilterByMenu filter={request.searchParams.filter} />
          </span>
        </div>
        <span className="hidden w-full p-2 mt-1 text-xs border rounded md:block border-zinc-600/50 text-zinc-600">
          These results are based on user comments and are not a substitute for
          professional medical advice.
        </span>
        <div className="flex flex-col gap-4 items-center justify-center w-full">
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

export default StrainsPage;
