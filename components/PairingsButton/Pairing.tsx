import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  pairing: {
    body: null | string;
    created_at: null | string;
    id: null | string;
    strain1_id: string;
    strain2_id: string;
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
  };
}

function Pairing({ pairing }: Props) {
  const { data: generatedPairing, isFetching } = useQuery({
    queryKey: ['pairings', pairing.strain1_id, pairing.strain2_id],
    queryFn: () => fetchPairing(pairing.strain1_id, pairing.strain2_id),
    enabled: Boolean(!pairing.body),
  });

  return (
    <Link
      href={`/strain/`}
      className="flex flex-row items-center justify-between gap-3 border border-zinc-300 dark:border-zinc-700 py-2 rounded"
    >
      <Image
        src={pairing.image || ''}
        alt={pairing.id || ''}
        width={90}
        height={90}
        className="aspect-square"
      />
      <p>{pairing.body || generatedPairing?.body || 'loading...'}</p>
    </Link>
  );
}

export default Pairing;
