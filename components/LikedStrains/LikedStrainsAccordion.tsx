'use client';

import { ChevronDownIcon } from 'lucide-react';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import type { StrainLike } from '@/lib/types';

type Props = {
  strains: StrainLike[];
};

function LikedStrainsAccordion(props: Props) {
  const { strains } = props;
  const [isOpen, setIsOpen] = useState(false);
  const matches = useMediaQuery('(min-width: 640px)');

  const closedHeight =
    typeof window !== 'undefined' ? (matches ? '293px' : '275px') : '293px';

  const variants = {
    open: {
      height: 'auto',
      marginBottom: '10px',
      transition: { duration: 0.5 },
    },
    closed: {
      height: strains && strains.length < 10 ? 'auto' : closedHeight,
      transition: { duration: 0.3 },
    },
  };

  return (
    <>
      <motion.div
        variants={variants}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        className={
          'flex flex-row flex-wrap items-start justify-start mt-3 gap-x-1.5 gap-y-1.5 sm:gap-x-3 sm:gap-y-3 overflow-hidden'
        }
      >
        {strains &&
          strains.map((strain) => (
            <Link
              key={strain.id}
              className="flex flex-col gap-2 p-2 scale-95 border rounded shadow sm:scale-100 dark:border-zinc-600 dark:bg-zinc-800 "
              href={`/strain/${strain.strain_id.slug}`}
            >
              <div className="flex items-center justify-center rounded-md aspect-square max-h-24 max-w-24">
                <Image
                  src={strain.strain_id.nugImage}
                  className="rounded-md"
                  alt={strain.strain_id.name}
                  width={90}
                  height={90}
                  priority={true}
                />
              </div>
              <h1 className="w-20 text-sm truncate text-semi">
                {strain.strain_id.name}
              </h1>
            </Link>
          ))}
      </motion.div>
      {props.strains.length > 10 ? (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="font-semibold w-full mt-1 flex flex-row items-center justify-center gap-2"
        >
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
            <ChevronDownIcon className="w-4 h-4" />
          </motion.div>
          {isOpen ? 'Show less' : 'Show all'}
        </button>
      ) : null}
    </>
  );
}

export default LikedStrainsAccordion;
