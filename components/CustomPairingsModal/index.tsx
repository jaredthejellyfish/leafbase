'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeftRight } from 'lucide-react';
import Image from 'next/image';
import { BsSearch, BsX } from 'react-icons/bs';

import type { Database } from '@/lib/database';

import Modal from '../Modal';

import React, { useEffect, useState } from 'react';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  slug: string;
  image: string;
  id: string;
};

async function fetchLongPairing(id: string, searchId: string | null) {
  if (!searchId) return null;

  const res = await fetch(
    `/api/generate/long-pairing?strain1=${id}&strain2=${searchId}`,
  );

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

  const findPairings = async () => {
    const { data, error } = await supabase.rpc('search_strains', {
      search_term: query ?? '',
      limit_num: 5,
    });

    if (error) throw error;

    return data;
  };

  const { data: searchData, isFetching: fetchingSearchData } = useQuery({
    queryKey: ['custom-pairing-search', query],
    queryFn: () => findPairings(),
    enabled: Boolean(
      !searchId && query && query.length >= 3 && query.length < 20,
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
      <div className="mb-2 flex flex-row items-center gap-3 rounded border border-zinc-400 bg-white px-10 py-1.5 pl-4 pr-5 text-black dark:border-zinc-600 dark:bg-zinc-700/60">
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
            className="cursor-pointer text-zinc-400/80 dark:text-gray-400"
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
              key={strain.slug} // Add a unique key prop here
              onClick={() => setSearchId(strain.slug)}
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
          <div className="mt-3 flex w-full flex-row items-center justify-between px-[5%] sm:px-[10%]">
            <Image
              className="rounded-lg border border-zinc-600 p-2"
              src={image}
              alt={pairingData.strain2_name}
              width={100}
              height={100}
              priority={true}
            />
            <ArrowLeftRight size={45} />
            <Image
              className="rounded-lg border border-zinc-600 p-2"
              src={pairingData.image || ''}
              alt={pairingData.strain2_name}
              width={100}
              height={100}
              priority={true}
            />
          </div>
          <div className="mb-2 mt-3 px-0.5">
            <p className="rounded-lg border border-zinc-600 p-2">
              {pairingData.body}
            </p>
          </div>
        </div>
      )}

      {fetchingPairingData && !fetchingSearchData && (
        <div>
          <div className="mt-3 flex w-full flex-row items-center justify-between px-[5%] sm:px-[10%]">
            <div className="size-24 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
            <ArrowLeftRight size={45} />
            <div className="size-24 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
          </div>
          <div className="mb-2 mt-3 px-0.5">
            <div className="rounded-lg border border-zinc-600 p-2">
              <div className="h-4 w-full animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
              <div className="mt-2 h-4 w-full animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
              <div className="mt-2 h-4 w-full animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
              <div className="mt-2 h-4 w-full animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
              <div className="mt-2 h-4 w-full animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
              <div className="mt-2 h-4 w-1/2 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
            </div>
          </div>
        </div>
      )}

      {!fetchingPairingData && fetchingSearchData && (
        <>
          <div className="mb-1 flex flex-col items-start">
            <div className="flex flex-row items-center gap-2">
              <div className="size-14 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400" />
              <div className="mt-2 h-4 w-24 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
            </div>
          </div>
          <div className="mb-1 flex flex-col items-start">
            <div className="flex flex-row items-center gap-2">
              <div className="size-14 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400" />
              <div className="mt-2 h-4 w-24 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
            </div>
          </div>
          <div className="flex flex-col items-start">
            <div className="flex flex-row items-center gap-2">
              <div className="size-14 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400" />
              <div className="mt-2 h-4 w-24 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
            </div>
          </div>
        </>
      )}

      {pairingError && <p>Something went wrong...</p>}
    </Modal>
  );
}

export default CustomPairingsModal;
