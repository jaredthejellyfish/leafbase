import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { cn } from '@/lib/utils';

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
      href={`/strain/${pairing.strain2_slug}`}
      className={cn(
        'flex flex-row items-center gap-3 border border-zinc-300 dark:border-zinc-700 py-3 rounded pl-2 pr-3',
        pairing.body && 'justify-between'
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
        <div className="w-24 h-24 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
      )}

      <div className="text-sm max-w-[80%]">
        <h2 className="dark:text-zinc-200 text-black font-semibold text-sm">
          {pairing.strain2_name || generatedPairing?.strain2_name}
        </h2>
        {pairing.body || generatedPairing?.body || (
          <>
            <div className="w-1/3 h-4 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            <div className="w-full h-3 mt-2 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            <div className="w-48 h-3 mt-1.5 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            <div className="w-[80%] h-3 mt-1.5 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          </>
        )}
      </div>
    </Link>
  );
}

export default Pairing;
