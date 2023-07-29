'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import StrainCard from '@/components/StrainCard/StrainCard';
import StrainLoaderSkeleton from './StrainLoaderSkeleton';
import { Cannabinoids, Effects, StrainExtended } from '@/types/interfaces';

const StrainLoader = ({ filter }: { filter?: string }) => {
  const { ref, inView } = useInView();

  const fetchStrains = async ({ pageParam = 3 }) => {
    const res = await fetch('/api/strains', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        take: 9,
        page: pageParam,
        filter: filter,
      }),
    });
    const data = (await res.json()) as {
      strains: StrainExtended[];
      page: number;
      totalPages: number;
    };
    return data;
  };

  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['strains'],
      queryFn: fetchStrains,
      getNextPageParam: (lastPage) => {
        const totalPages = lastPage.totalPages;
        const lastPageNumber = lastPage.page;

        if (lastPageNumber < totalPages) {
          return lastPageNumber + 1;
        } else {
          return undefined;
        }
      },
    });

  useEffect(() => {
    const loadMoreCallback = () => {
      fetchNextPage();
    };
    if (inView) {
      loadMoreCallback();
    }
  }, [inView, fetchNextPage, isFetchingNextPage]);

  if (error) {
    return <div>Error loading strains</div>;
  }

  return (
    <>
      {data &&
        data.pages
          .flatMap((page) => page.strains)
          .map((strain) =>
            strain?.slug ? (
              <StrainCard
                key={strain.slug}
                id={strain.id}
                slug={strain.slug}
                name={strain.name}
                subtitle={strain.subtitle}
                category={strain.category}
                phenotype={strain.phenotype}
                averageRating={strain.averageRating}
                shortDescription={strain.shortDescription || 'No description'}
                nugImage={strain.nugImage}
                flowerImageSvg={strain.flowerImageSvg}
                topTerpene={strain.topTerpene}
                thcPercent={strain.thcPercent}
                topEffect={strain.topEffect}
                cannabinoids={strain.cannabinoids as unknown as Cannabinoids}
                effects={strain.effects as unknown as Effects}
                liked={strain.likes.length > 0}
                priority={false}
              />
            ) : null
          )}
      {isFetchingNextPage && <StrainLoaderSkeleton />}

      <div className="flex items-center justify-center w-full h-10 mt-2 text-white rounded -z-10"></div>
      <div
        ref={ref}
        className="absolute flex items-center justify-center w-full h-10 mt-5 mb-4 text-transparent rounded bottom-96"
      >
        {isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
          ? 'Load more'
          : 'Nothing more to load'}
      </div>
    </>
  );
};

export default StrainLoader;
