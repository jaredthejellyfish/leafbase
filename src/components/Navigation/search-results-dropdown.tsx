'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import type { SearchStrain } from '@l/types';
import { searchStrains } from '@l/utils/searchStrains';

type Props = {
  query?: string;
};

function SearchResult({
  strain,
  imageSize,
}: {
  strain: SearchStrain;
  imageSize: number;
}) {
  return (
    // <- /strain
    <Link
      href={`/strains/${strain.slug}`}
      className="flex flex-col items-start"
    >
      <div className="flex flex-row items-center gap-2">
        <Image
          src={strain.nugimage}
          alt={strain.name}
          width={imageSize}
          height={imageSize}
        />
        <span>{strain.name}</span>
      </div>
    </Link>
  );
}

function SearchResults({ query }: Props) {
  const { data } = useQuery({
    queryKey: ['strains', 'search', query],
    queryFn: async ({ signal }) => await searchStrains(signal, query),
    enabled: Boolean(query && query.length >= 3 && query.length < 20),
  });

  if (!data?.length) return null;

  return (
    <div className="top-13 absolute z-50 flex w-full max-w-[93%] flex-col gap-y-2.5 rounded border border-solid border-zinc-600 bg-white p-3 dark:bg-zinc-800 xl:max-w-[320px]">
      {data.map((strain, index) => (
        <>
          {index !== 0 && (
            <div
              key={`divider-${(Math.random() * 100000).toFixed(0)}`}
              className="border-b border-gray-300 dark:border-gray-600"
            ></div>
          )}
          <SearchResult
            key={`search-${strain.slug}-${(Math.random() * 100000).toFixed(0)}`}
            imageSize={60}
            strain={strain}
          />
        </>
      ))}
    </div>
  );
}

export default SearchResults;
