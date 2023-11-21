'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BsSearch, BsX } from 'react-icons/bs';
import { ArrowLeftRight } from 'lucide-react';
import Image from 'next/image';

import type { Database } from '@/lib/database';
import Modal from '../Modal';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  slug: string;
  image: string;
  id: string;
};

async function fetchLongPairing(id: string, searchId: string | null) {
  if (!searchId) return null;

  const res = await fetch(`/api/generate/long-pairing`, {
    method: 'POST',
    body: JSON.stringify({
      strain1: id,
      strain2: searchId,
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

function CustomPairingsModal({ open, setOpen, id, image }: Props) {
  const [searchId, setSearchId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const supabase = createClientComponentClient<Database>();

  const { data: searchData } = useQuery({
    queryKey: ['custom-pairing-search', query],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('search_strains', {
        search_term: query ?? '',
        limit_num: 5,
      });

      if (error) throw error;

      return data;
    },
    enabled: Boolean(
      !searchId && query && query.length >= 3 && query.length < 20
    ),
  });

  const {
    data: pairingData,
    error: pairingError,
    isFetching: fetchingPairingData,
  } = useQuery({
    queryKey: ['custom-pairings', id, searchId],
    queryFn: () => fetchLongPairing(id, searchId),
    enabled: open && searchId !== null,
  });

  const resetSearch = () => {
    setSearchId(null);
    setQuery('');
  };

  useEffect(() => {
    pairingData &&
      pairingData.strain2_name &&
      setQuery(pairingData.strain2_name);
  }, [pairingData]);

  return (
    <Modal
      title="Custom Pairing"
      open={open}
      setOpen={setOpen}
      onModalClose={resetSearch}
    >
      <div className="mb-2 pl-4 py-1.5 pr-5 px-10 flex-row gap-3 bg-white rounded text-black flex flex-row dark:bg-zinc-700/60 items-center border border-zinc-400 dark:border-zinc-600">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          disabled={searchId !== null}
          className="w-full bg-transparent focus:outline-none dark:text-white"
        />
        {searchId ? (
          <BsX
            className="text-zinc-400/80 dark:text-gray-400 cursor-pointer"
            onClick={resetSearch}
            size={30}
          />
        ) : (
          <BsSearch className="text-zinc-400/80 dark:text-gray-400" size={20} />
        )}
      </div>

      {!searchId && searchData && searchData.length > 0 && (
        <div>
          {searchData.map((strain) => (
            <button
              onClick={() => setSearchId(strain.slug)}
              key={strain.slug}
              className="flex flex-col items-start"
            >
              <div className="flex flex-row items-center gap-2">
                <Image
                  src={strain.nugimage}
                  alt={strain.name}
                  width={60}
                  height={60}
                />
                <span>{strain.name}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {!fetchingPairingData && !pairingError && pairingData && (
        <div>
          <div className="w-full flex flex-row justify-between items-center px-[5%] sm:px-[10%] mt-3">
            {[image, pairingData.image ?? ''].map((img, index) => (
              <>
                <Image
                  key={index}
                  className="p-2 border border-zinc-600 rounded-lg"
                  src={img}
                  alt={pairingData.strain2_name}
                  width={100}
                  height={100}
                />
                {index < 1 && <ArrowLeftRight size={45} />}
              </>
            ))}
          </div>
          <div className="px-0.5 mt-3 mb-2">
            <p className="border border-zinc-600 rounded-lg p-2">
              {pairingData.body}
            </p>
          </div>
        </div>
      )}

      {fetchingPairingData && (
        <div>
          <div className="w-full flex flex-row justify-between items-center px-[5%] sm:px-[10%] mt-3">
            <div className="w-24 h-24 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            <ArrowLeftRight size={45} />
            <div className="w-24 h-24 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          </div>
          <div className="px-0.5 mt-3 mb-2">
            <div className="border border-zinc-600 rounded-lg p-2">
              <div className="w-full h-4 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
              <div className="w-full h-4 mt-2 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
              <div className="w-full h-4 mt-2 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
              <div className="w-full h-4 mt-2 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
              <div className="w-full h-4 mt-2 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
              <div className="w-1/2 h-4 mt-2 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            </div>
          </div>
        </div>
      )}

      {pairingError && <p>Something went wrong...</p>}
    </Modal>
  );
}

export default CustomPairingsModal;
