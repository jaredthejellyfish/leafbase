'use client';

import { ChevronDownIcon } from 'lucide-react';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import type { StrainLike } from '@/lib/types';

type Props = {
  strains: StrainLike[];
};

function LikedStrainsAccordion(props: Props) {
  const { strains } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  const variants = {
    open: {
      height: 'auto',
      marginBottom: '10px',
      transition: { duration: 0.5 },
    },
    closed: {
      height: strains && strains.length < 10 ? 'auto' : '296px',
      transition: { duration: 0.3 },
    },
  };

  return (
    <>
      <motion.div
        variants={variants}
        initial="closed"
        id="liked-strains-accordion"
        animate={isOpen ? 'open' : 'closed'}
        className="mt-3 flex w-full flex-row flex-wrap items-start justify-start gap-1.5 overflow-hidden sm:gap-3"
      >
        {strains &&
          strains.map((strain, index) => {
            if (!hasOpened && index > 9 && !isOpen) return null;
            return (
              <Link
                key={strain.id}
                className="flex min-w-[11%] grow scale-95 flex-col gap-2 rounded border p-2 shadow dark:border-zinc-600 dark:bg-zinc-800 sm:min-w-[12%] sm:max-w-[130px] md:min-w-[calc(33.333%-1em)] lg:min-w-[calc(25%-1em)] xl:min-w-[calc(20%-1em)]"
                href={`/strains/${strain.strain_id.slug}`} // <- /strain
              >
                <div className="flex aspect-square h-24 max-h-24 w-full items-center justify-center rounded-md">
                  <Image
                    src={strain.strain_id.nugImage}
                    className="rounded-md"
                    alt={`An image of a nug of ${strain.strain_id.name}`}
                    width={96}
                    height={96}
                    priority={index < 10}
                  />
                </div>
                <p className="text-semi w-full overflow-hidden whitespace-nowrap text-sm sm:pl-3">
                  {strain.strain_id.name}
                </p>
              </Link>
            );
          })}
      </motion.div>
      {props.strains.length > 10 ? (
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setHasOpened(true);
          }}
          className="mt-1 flex w-full flex-row items-center justify-center gap-2 font-semibold"
        >
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
            <ChevronDownIcon className="h-4 w-4" />
          </motion.div>
          {isOpen ? 'Show less' : 'Show all'}
        </button>
      ) : null}
    </>
  );
}

export default LikedStrainsAccordion;
