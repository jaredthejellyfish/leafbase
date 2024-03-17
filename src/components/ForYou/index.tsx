'use client';

import { useQuery } from '@tanstack/react-query';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { MdError } from 'react-icons/md';
import { useMediaQuery } from 'usehooks-ts';

import StrainCard from '@c/StrainCard';

import type { Strain } from '@l/types';
import { cn } from '@l/utils/cn';
import { getForYouPage } from '@l/utils/getForYouPage';

import StrainCardSkeleton from '@c/StrainCard/skeleton';

type Props = {
  initialData?: Strain[];
};

function ForYou({ initialData }: Props) {
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [strains, setStrains] = useState<Strain[]>([]);

  const matches = useMediaQuery('(min-width: 768px)');

  const {
    data: strainsData,
    error: forYouError,
    isFetching,
  } = useQuery({
    queryKey: ['for-you', page],
    queryFn: () => getForYouPage(page),
    enabled: Boolean(page > 0),
  });

  useEffect(() => {
    if (strainsData) {
      setStrains(strainsData);
    }
  }, [strainsData]);

  if (forYouError) {
    return (
      <>
        <h2 className="mb-3 px-2 text-2xl font-semibold">For you</h2>
        <div className="flex flex-row items-center gap-x-3 px-3">
          <MdError size={44} className="text-green-600" />
          <span className="text-xs text-zinc-400 sm:text-sm">
            An error occurred while fetching your recommended strains. Please
            try again later.
          </span>
        </div>
      </>
    );
  }

  return (
    <div>
      <div className="mb-2 flex flex-row items-center justify-between px-3">
        <h2 className="text-2xl font-semibold">For you</h2>
        <div className="flex flex-row gap-x-4">
          <button
            onClick={() => setPage((page) => (page - 1 < 0 ? 0 : page - 1))}
            disabled={page === 0}
          >
            <ChevronLeft size={23} />
          </button>
          <span className="w-5 select-none text-center font-semibold text-zinc-500 dark:text-zinc-300">
            {page + 1}
          </span>
          <button onClick={() => setPage((page) => page + 1)}>
            <ChevronRight size={23} />
          </button>
        </div>
      </div>
      <div
        className={cn(
          'flex flex-col gap-y-3 transition-all duration-500 ease-in-out overflow-hidden px-3 sm:gap-x-3 sm:pl-4 md:flex-row md:items-center md:gap-y-0 md:overflow-scroll max-h-[2000px]',
          !matches && !open && 'max-h-[450px]',
        )}
      >
        {isFetching
          ? new Array(5).fill(0).map((_, i) => <StrainCardSkeleton key={i} />)
          : initialData && page > 0 && strains && strains.length > 0
            ? strains.map((strain, i) => <StrainCard key={i} strain={strain} />)
            : page < 1 &&
              initialData?.length &&
              initialData?.map((strain, i) => (
                <StrainCard key={i} strain={strain} />
              ))}
      </div>

      {!matches && (strains?.length || isFetching || initialData) && (
        <button
          onClick={() => setOpen(!open)}
          className="flex w-full flex-row items-center justify-center"
        >
          <div className="flex flex-row items-center justify-center gap-x-2">
            <span className="py-3 font-semibold">
              {open ? 'Show less' : 'Show more'}
            </span>
            <div
              className={cn(
                'rotate-0 transition-all duration-300',
                open && 'rotate-180',
              )}
            >
              <ChevronDown size={23} />
            </div>
          </div>
        </button>
      )}
    </div>
  );
}

export default ForYou;
