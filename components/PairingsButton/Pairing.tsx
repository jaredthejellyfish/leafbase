import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  pairing: {
    body: null | string;
    created_at: null | string;
    id: null | string;
    strain1_id: string;
    strain2_id: string;
    strain2_slug: string;
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
      className="flex flex-row items-center justify-between gap-3 border border-zinc-300 dark:border-zinc-700 py-2 rounded pl-1.5 pr-3"
    >
      <Image
        src={pairing.image || ''}
        alt={pairing.id || ''}
        width={90}
        height={90}
        className="aspect-square"
      />
      <p className='text-sm'>{pairing.body || generatedPairing?.body || 'loading...'}</p>
    </Link>
  );
}

export default Pairing;
