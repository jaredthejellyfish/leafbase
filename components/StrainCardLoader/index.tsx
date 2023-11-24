'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React, { useEffect, useRef, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useIntersectionObserver } from 'usehooks-ts';
import { debounce } from 'lodash';

import type { Database } from '@/lib/database';
import type { Strain } from '@/lib/types';
import StrainCard from '../StrainCard';
import { Button } from '../ui/button';
import { isLiked } from '@/lib/utils';

const supabase = createClientComponentClient<Database>();

type Props = {
  initialData?: Strain[];
  perPage: number;
  page: number;
  filter: string;
  count: number;
  likes?: string[];
};

const StrainCardLoader = (props: Props) => {
  const fetchStrains = async ({
    filter = props.filter,
    pageParam = 0,
    perPage = props.perPage || 6,
  }) => {
    const offset = pageParam * perPage;

    const nameFilter = filter === 'za' ? false : true;

    const orderByLikes = filter && filter !== 're' ? false : true;

    let query = supabase
      .from('strains')
      .select('*', { count: 'estimated', head: false });

    if (orderByLikes) {
      query = query.order('likes_count', { ascending: false });
    }

    query = query
      .order('name', { ascending: nameFilter })
      .range(offset, offset + perPage - 1);

    const { data: strains } = await query.returns<Strain[]>();

    return {
      strains,
      page: pageParam,
    };
  };

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
                      ? isLiked(strain.id, props.likes)
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
