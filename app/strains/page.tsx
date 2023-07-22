import React from 'react';

import useServerStrains from '@/hooks/useServerStrains';
import ErrorStrains from './error';

import dynamic from 'next/dynamic';
import { Cannabinoids, Effects } from '@/types/interfaces';
import { RxCaretDown } from 'react-icons/rx';
import StrainCard from '@/components/StrainCard/StrainCard';

const StrainLoader = dynamic(
  () => import('./components/StrainLoader/StrainLoader')
);

const FilterByMenu = dynamic(
  () => import('./components/FilterByMenu/FilterByMenu'),
  {
    loading: () => (
      <span className="flex flex-row items-center justify-end w-40 gap-1 mt-4 text-xs text text-zinc-400">
        Sort by
        <span className="flex flex-row items-center cursor-pointer dark:text-zinc-300 text-zinc-500">
          Filter
          <RxCaretDown className="ml-1.5 arrow" size={14} />
        </span>
      </span>
    ),
  }
);

export const metadata = {
  title: 'All Strains - Leafbase',
  description:
    'Explore our comprehensive list of marijuana strains, featuring detailed profiles, effects, and reviews. sort by type, potency, and medical benefits to find your perfect match. Discover new favorites and classics in our extensive collection of cannabis varieties.',
};

const Strains = async (request: { searchParams: { filter?: string } }) => {
  const { strains, count, error } = await useServerStrains(
    1,
    18,
    request.searchParams.filter
  );

  if (error) {
    return <ErrorStrains />;
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 xl:px-52">
      <div className="max-w-4xl">
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
        <div className="flex items-center justify-center w-full">
          <div className="relative grid max-w-4xl md:grid-cols-3 gap-x-4">
            {strains &&
              strains.map((strain) => (
                <StrainCard
                  key={`ssr-${strain.slug}`}
                  id={strain.id}
                  slug={strain.slug}
                  name={strain.name || 'Unknown'}
                  subtitle={strain.subtitle || 'Unknown'}
                  category={strain.category || 'Unknown'}
                  phenotype={strain.phenotype || 'Unknown'}
                  averageRating={strain.averageRating || 0}
                  shortDescription={strain.shortDescription || 'Unknown'}
                  nugImage={strain.nugImage || 'Unknown'}
                  flowerImageSvg={strain.flowerImageSvg || 'Unknown'}
                  topTerpene={strain.topTerpene || 'Unknown'}
                  thcPercent={strain.thcPercent || 0}
                  topEffect={strain.topEffect || 'Unknown'}
                  cannabinoids={strain.cannabinoids as unknown as Cannabinoids}
                  effects={strain.effects as unknown as Effects}
                  liked={strain.likes ? strain.likes.length > 0 : false}
                  priority={true}
                />
              ))}
            <StrainLoader filter={request.searchParams.filter} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Strains;
