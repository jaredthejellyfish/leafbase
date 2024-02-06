import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import React from 'react';

type Props = {
  pairing: {
    body: null | string;
    created_at: null | string;
    id: null | string;
    strain1_id: string;
    strain2_id: string;
    strain2_slug: string;
    strain2_name: string;
    image: null | string;
  };
};

async function fetchPairing(strain1_id: string, strain2_id: string) {
  const res = await fetch(`/api/generate/short-pairing`, {
    method: 'POST',
    body: JSON.stringify({
      strain1: strain1_id,
      strain2: strain2_id,
    }),
  });

  const data = await res.json();

  return data as {
    body: null | string;
    created_at: null | string;
    id: null | string;
    strain1_id: string;
    strain2_id: string;
    strain2_slug: string;
    strain2_name: string;
    image: null | string;
    slug: string;
  };
}

function Pairing({ pairing }: Props) {
  const { data: generatedPairing } = useQuery({
    queryKey: ['pairings', pairing.strain1_id, pairing.strain2_id],
    queryFn: () => fetchPairing(pairing.strain1_id, pairing.strain2_id),
    enabled: Boolean(!pairing.body),
  });

  return (
    <Link
      href={`/strains/${pairing.strain2_slug}`} // <- /strain
      className={cn(
        'flex flex-row items-center gap-3 rounded border border-zinc-300 py-3 pl-2 pr-3 dark:border-zinc-700',
        pairing.body && 'justify-between',
      )}
    >
      {pairing.image ? (
        <Image
          src={pairing.image}
          alt={pairing.strain2_name}
          width={96}
          height={96}
        />
      ) : (
        <div className="size-24 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
      )}

      <div className="max-w-[80%] text-sm">
        <h2 className="text-sm font-semibold text-black dark:text-zinc-200">
          {pairing.strain2_name || generatedPairing?.strain2_name}
        </h2>
        {pairing.body || generatedPairing?.body || (
          <>
            <div className="h-4 w-1/3 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
            <div className="mt-2 h-3 w-full animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
            <div className="mt-1.5 h-3 w-48 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
            <div className="mt-1.5 h-3 w-[80%] animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
          </>
        )}
      </div>
    </Link>
  );
}

export default Pairing;
