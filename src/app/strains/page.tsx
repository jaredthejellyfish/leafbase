import React from 'react';

import SortBy from '@c/SortBy';
import StrainCard from '@c/StrainCard';
import StrainCardLoader from '@c/StrainCardLoader';

import type { Filter } from '@l/types';
import { getPaginatedStrains } from '@l/utils/getPaginatedStrains';
import { getServerLikedStrains } from '@l/utils/getServerLikedStrains';

async function StrainsPage(request: { searchParams: { filter?: Filter } }) {
  const filter = request.searchParams.filter ?? 're';
  const { strains, count } = await getPaginatedStrains(filter, 1);
  const { likes } = await getServerLikedStrains();

  return (
    <main className="px-5 py-3 pb-8 md:px-3 lg:px-16 xl:px-36">
      <div
        className="flex flex-col items-center w-auto flex-shrink"
        id="main-container"
      >
        <div id="heading" className="">
          <h1 className="mb-2 mt-4 text-3xl font-bold ">All strains</h1>
          <h3 className="">
            Browse the most comprehensive weed strain library on the web. Browse
            weed strains by cannabis type (indica, sativa, or hybrid), effects,
            or number of comments.
          </h3>
          <div className="flex items-center justify-between px-1 font-medium">
            <span className="mt-4 text-xs text-zinc-400">{count} strains</span>
            <SortBy filter={filter} />
          </div>
          <span className="mt-1 hidden w-full rounded border border-zinc-600/50 p-2 text-xs text-zinc-600 md:block">
            These results are based on user comments and are not a substitute
            for professional medical advice.
          </span>
        </div>

        <div
          id="response-div"
          className="relative mt-4 grid gap-x-4 gap-y-4 md:grid-cols-3 xl:grid-cols-4"
        >
          {strains?.map((strain) => (
            <StrainCard
              key={strain.id}
              strain={strain}
              liked={likes?.includes(strain.id)}
            />
          ))}
          <StrainCardLoader
            filter={filter}
            count={count ?? undefined}
            likes={likes}
          />
        </div>
      </div>
    </main>
  );
}

export default StrainsPage;
