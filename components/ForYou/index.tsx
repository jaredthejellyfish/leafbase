'use client';

import { useQuery } from '@tanstack/react-query';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { MdError } from 'react-icons/md';
import { useMediaQuery } from 'usehooks-ts';

import { getForYouPage } from '@/lib/utils/getForYouPage';

import StrainCard from '../StrainCard';
import StrainCardSkeleton from '../StrainCard/skeleton';

import React, { useState } from 'react';

function ForYou() {
  const [page, setPage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const matches = useMediaQuery('(min-width: 768px)');

  const {
    data: strains,
    error: forYouError,
    isFetching: fetchingForYou,
  } = useQuery({
    queryKey: ['for-you', page],
    queryFn: () => getForYouPage(page),
  });

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
    <LazyMotion features={domAnimation}>
      <div className="-mb-2 flex flex-row items-center justify-between px-3">
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
      <m.div
        animate={{
          height: matches ? 'auto' : isOpen ? 'auto' : 535,
          originY: 0,
          transition: { duration: 0.2 },
        }}
        className="flex flex-col gap-x-3 overflow-hidden px-3 sm:pl-4 md:flex-row md:items-center md:overflow-scroll"
      >
        {strains &&
          strains.length > 0 &&
          strains.map((strain, i) => (
            <StrainCard key={i} strain={strain} priority={i < 2 && !matches} />
          ))}

        {((strains && strains.length === 0) || fetchingForYou) &&
          [...Array(10)].map((_, i) => <StrainCardSkeleton key={i} />)}
      </m.div>

      {!matches && strains && strains.length > 0 && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full flex-row items-center justify-center"
        >
          <div className="flex flex-row items-center justify-center gap-x-2">
            <span className="py-3 font-semibold">
              {isOpen ? 'Show less' : 'Show more'}
            </span>
            <m.div animate={{ rotate: isOpen ? 180 : 0 }}>
              <ChevronDown size={23} />
            </m.div>
          </div>
        </button>
      )}
    </LazyMotion>
  );
}

export default ForYou;
