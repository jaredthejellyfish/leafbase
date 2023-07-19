'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import useUser from '@/hooks/useUser';
import StrainCard from '@/components/StrainCard/StrainCard';
import StrainLoaderSkeleton from './StrainLoaderSkeleton';

const StrainLoader = ({ filter }: { filter?: string }) => {
  const { ref, inView } = useInView();
  const user = useUser();

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
    const data = await res.json();
    return data;
  };

  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['strains'],
      queryFn: fetchStrains,
      enabled: !!user?.user?.id,
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

  if (!user?.user?.id) {
    return null;
  }

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
                name={strain.name || undefined}
                subtitle={strain.subtitle || undefined}
                category={strain.category || undefined}
                phenotype={strain.phenotype || undefined}
                averageRating={strain.averageRating || undefined}
                shortDescription={strain.shortDescription || undefined}
                nugImage={strain.nugImage || undefined}
                flowerImageSvg={strain.flowerImageSvg || undefined}
                topTerpene={strain.topTerpene || undefined}
                thcPercent={strain.thcPercent || undefined}
                topEffect={strain.topEffect || undefined}
                cannabinoids={strain.cannabinoids || undefined}
                effects={strain.effects || undefined}
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
