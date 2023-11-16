'use client';

import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

import { Database } from '@/lib/database';
import Pairing from './Pairing';
import Modal from '../Modal';

type Props = {
  slug: string;
  id: string;
};

async function fetchPairings(id: string, slug: string) {
  const res = await fetch(`/api/generate/pairings?id=${id}&query=${slug}`);
  const data = await res.json();

  return data as {
    pairings: {
      body: null | string;
      created_at: null | string;
      id: null | string;
      image: null | string;
      strain1_id: string;
      strain2_id: string;
    }[];
  };
}

function PairingsButton({ slug, id }: Props) {
  const [open, setOpen] = useState(false);

  const { data, error, isFetching } = useQuery({
    queryKey: ['pairings', slug, id],
    queryFn: () => fetchPairings(id, slug),
    enabled: open,
  });

  return (
    <>
      <button onClick={() => setOpen(true)}>
        <p>Pairings</p>
      </button>
      <Modal title="Pairings" open={open} setOpen={setOpen}>
        <div className='flex flex-col gap-y-2'>

        {!isFetching &&
          data &&
          data.pairings.length >= 1 &&
          data?.pairings.map((pairing) => (
            <Pairing pairing={pairing} key={pairing.id || Math.random()} />
            ))}
            </div>
      </Modal>
    </>
  );
}

export default PairingsButton;
