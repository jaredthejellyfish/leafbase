'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import type { SearchStrain } from '@/lib/database/database_types';
import type { Database } from '@/lib/database';

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
    <Link
      href={`/strain/${strain.slug}`}
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
  const supabase = createClientComponentClient<Database>();

  const { data } = useQuery({
    queryKey: ['strains', 'search', query],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('search_strains', {
        search_term: query ?? '',
        limit_num: 5,
      });
      if (error) {
        throw error;
      }
      return data;
    },
    enabled: Boolean(query && query.length >= 3 && query.length < 20),
  });

  return (
    <>
      {data && data.length
        ? data.map((strain, index) => (
            <>
              {index !== 0 && (
                <div
                  key={`divider-${Math.random()}`}
                  className="border-b dark:border-gray-600 border-gray-300"
                ></div>
              )}
              <SearchResult
                key={`strain-${strain.slug}-${Math.random()}`}
                imageSize={60}
                strain={strain}
              />
            </>
          ))
        : null}
    </>
  );
}

export default SearchResults;
