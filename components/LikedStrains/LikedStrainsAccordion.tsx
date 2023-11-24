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
        className="w-full flex flex-row flex-wrap items-start justify-start mt-3 gap-x-1.5 gap-y-1.5 sm:gap-x-3 sm:gap-y-3 overflow-hidden"
      >
        {strains &&
          strains.map((strain, index) => (
            <Link
              key={strain.id}
              className="flex-grow flex flex-col gap-2 p-2 scale-95 border rounded shadow dark:border-zinc-600 dark:bg-zinc-800 min-w-[11%] sm:min-w-[12%] md:min-w-[calc(33.333%-1em)] lg:min-w-[calc(25%-1em)] xl:min-w-[calc(20%-1em)] sm:max-w-[130px]"
              href={`/strain/${strain.strain_id.slug}`}
            >
              <div className="flex h-24 w-24 items-center justify-center rounded-md aspect-square max-h-24 w-full">
                <Image
                  src={strain.strain_id.nugImage}
                  className="rounded-md"
                  alt={`An image of a nug of ${strain.strain_id.name}`}
                  width={96}
                  height={96}
                  priority={index < 10} // Set priority to true for the first 12 images
                />
              </div>
              <p className="sm:pl-3 w-full text-sm overflow-hidden whitespace-nowrap text-semi">
                {strain.strain_id.name}
              </p>
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
