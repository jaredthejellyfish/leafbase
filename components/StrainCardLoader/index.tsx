'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import { useIntersectionObserver } from 'usehooks-ts';

import type { Strain } from '@/lib/types';

import StrainCard from '../StrainCard';
import { Button } from '../ui/button';

import React, { useEffect, useRef, useState } from 'react';

type Props = {
  initialData?: Strain[];
  perPage: number;
  page: number;
  filter: string;
  count: number;
  likes?: string[];
};

const fetchStrains = async ({ pageParam }: { pageParam: number }) => {
  const data = await fetch(`/api/strains?page=${pageParam}`, {
    next: { revalidate: 3600 },
  });
  const json = (await data.json()) as { strains: Strain[]; page: number };

  return json;
};

const StrainCardLoader = (props: Props) => {
  const loadMoreRef = useRef<HTMLButtonElement>(null);
  const entry = useIntersectionObserver(loadMoreRef, {});
  const shouldFetchMore = !!entry?.isIntersecting;
  const totalPages = Math.ceil(props.count / (props.perPage || 6));
  const [hasFetched, setHasFetched] = useState(false);

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['strains', props.filter],
      queryFn: fetchStrains,
      initialData: {
        pages: [
          {
            strains: props.initialData || [],
            page: props.page!,
          },
        ],
        pageParams: [0],
      },
      initialPageParam: props.page || 2,
      getNextPageParam: (lastPage) => {
        const lastPageNumber = lastPage.page;

        if (lastPageNumber < totalPages) {
          return lastPageNumber + 1;
        } else {
          return undefined;
        }
      },
    });

  const debouncedFetchNextPage = debounce(fetchNextPage, 500);

  useEffect(() => {
    if (shouldFetchMore && !hasFetched) {
      debouncedFetchNextPage();
      setHasFetched(true);
    } else if (!shouldFetchMore) {
      setHasFetched(false);
    }
  }, [shouldFetchMore, debouncedFetchNextPage, hasFetched]);

  return (
    <>
      <div
        id="strain-card-loader"
        className="relative grid gap-x-4 md:grid-cols-3 xl:grid-cols-4"
      >
        {data &&
          data.pages
            .flatMap((page) => page.strains)
            .map((strain) => {
              if (!strain) return;
              return (
                <StrainCard
                  strain={strain}
                  key={strain.id}
                  priority={true}
                  liked={
                    typeof props.likes !== 'undefined'
                      ? props.likes?.includes(strain.id)
                      : undefined
                  }
                />
              );
            })}
      </div>
      <div className="mt-4 contents w-full items-center justify-center">
        <Button
          ref={loadMoreRef}
          onClick={() => debouncedFetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage || isFetching
            ? 'Loading more...'
            : hasNextPage
              ? 'Load More'
              : 'Nothing more to load'}
        </Button>
      </div>
    </>
  );
};

export default StrainCardLoader;
