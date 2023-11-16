'use client';

import { useQuery } from '@tanstack/react-query';
import { FiMoreVertical } from 'react-icons/fi';
import React, { useState } from 'react';

import Pairing from './Pairing';
import dynamic from 'next/dynamic';

const Modal = dynamic(() => import('@/components/Modal'), {ssr: false});

type Props = {
  slug: string;
  id: string;
};

async function fetchPairings(id: string, slug: string) {
  const res = await fetch(`/api/generate/pairings`, {
    method: 'POST',
    body: JSON.stringify({ strain_id: id, strain_slug: slug, limit: 3 }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();

  return data as {
    pairings: {
      body: null | string;
      created_at: null | string;
      id: null | string;
      image: null | string;
      strain1_id: string;
      strain2_id: string;
      strain2_slug: string;
      strain2_name: string;
    }[];
  };
}

function PairingsButton({ slug, id }: Props) {
  const [open, setOpen] = useState(false);

  const { data: pairings, isFetching } = useQuery({
    queryKey: ['pairings', slug, id],
    queryFn: () => fetchPairings(id, slug),
    enabled: open,
  });

  return (
    <>
      <button onClick={() => setOpen(true)}>
        <FiMoreVertical className="cursor-pointer" size={25} />
      </button>
      <Modal title="Pairings" open={open} setOpen={setOpen}>
        <div className="flex flex-col gap-y-2 pb-1.5">
          {!isFetching &&
            pairings &&
            pairings.pairings.length >= 1 &&
            pairings?.pairings.map((pairing) => (
              <Pairing pairing={pairing} key={pairing.id || Math.random()} />
            ))}
        </div>
      </Modal>
    </>
  );
}

export default PairingsButton;
