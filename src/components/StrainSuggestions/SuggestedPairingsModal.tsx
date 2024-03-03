import { useQuery, useQueryClient } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';

import PairingSkeleton from './PairingSkeleton';

const Pairing = dynamic(() => import('./Pairing'), {
  ssr: false,
  loading: () => <PairingSkeleton />,
});

const Modal = dynamic(() => import('@c/Modal'), { ssr: false });

type Props = {
  open: boolean;
  slug: string;
  id: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type Pairing = {
  body: null | string;
  created_at: null | string;
  id: null | string;
  image: null | string;
  strain1_id: string;
  strain2_id: string;
  strain2_slug: string;
  strain2_name: string;
};

async function fetchPairings(
  id: string,
  slug: string,
): Promise<{ pairings: Pairing[] }> {
  const res = await fetch(
    `/api/generate/pairings?id=${id}&slug=${slug}&limit=3`,
  );
  const data = (await res.json()) as { pairings: Pairing[] };

  return data;
}

function SuggestedPairingsModal({ slug, id, open, setOpen }: Props) {
  const queryClient = useQueryClient();
  const { data: pairings, isFetching } = useQuery({
    queryKey: ['pairings', slug, id],
    queryFn: () => fetchPairings(id, slug),
    enabled: open,
    refetchOnMount: 'always',
  });

  useEffect(() => {
    const invalidate = async () => {
      await queryClient.invalidateQueries({ queryKey: ['pairings', slug, id] });
    };

    if (!open) {
      invalidate().catch(console.error);
    }
  }, [open, queryClient, slug, id]);

  return (
    pairings?.pairings &&
    pairings.pairings.length >= 1 && (
      <Modal title="Suggested Pairings" open={open} setOpen={setOpen}>
        <div className="flex flex-col gap-y-2 pb-1.5">
          {!isFetching &&
          pairings?.pairings &&
          pairings.pairings.length >= 1 ? (
            pairings?.pairings.map((pairing: Pairing) => (
              <Pairing pairing={pairing} key={pairing.id ?? Math.random()} />
            ))
          ) : (
            <>
              <PairingSkeleton />
              <PairingSkeleton />
              <PairingSkeleton />
            </>
          )}
        </div>
      </Modal>
    )
  );
}

export default SuggestedPairingsModal;
