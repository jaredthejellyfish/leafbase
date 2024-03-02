'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';

import StrainCard from '@c/StrainCard';

import type { Filter, Strain } from '@l/types';

type Props = { filter: Filter; count?: number; perPage?: number };

const fetchStrains = async ({ pageParam }: { pageParam: number }) => {
  const data = await fetch(`/api/strains?page=${pageParam}`, {
    next: { revalidate: 3600 },
  });
  const json = (await data.json()) as { strains: Strain[]; page: number };

  return json;
};

function StrainCardLoader({ filter, count = 6329, perPage = 12 }: Props) {
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.5,
  });

  const totalPages = Math.ceil(count / (perPage || 6));

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['strains', filter],
    queryFn: fetchStrains,
    enabled: true,
    initialPageParam: 2,
    getNextPageParam: (lastPage) => {
      const lastPageNumber = lastPage.page;

      if (lastPageNumber < totalPages) {
        return lastPageNumber + 1;
      } else {
        return undefined;
      }
    },
  });

  useEffect(() => {
    if (isIntersecting) {
      fetchNextPage().catch(console.error);
    }
  }, [isIntersecting, fetchNextPage]);

  const flatStrains = data?.pages.flatMap((group) => group.strains);

  const lastStrain = flatStrains?.pop();

  if (!flatStrains?.length || !lastStrain) {
    return null;
  }

  return (
    <>
      {flatStrains.map((strain) => (
        <StrainCard key={strain.id} strain={strain} />
      ))}
      <StrainCard ref={ref} strain={lastStrain} />
    </>
  );
}

export default StrainCardLoader;
