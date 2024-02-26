'use client';

import { motion } from 'framer-motion';
import { ChevronDownIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMediaQuery } from 'usehooks-ts';

import type { StrainLike } from '@/lib/types';

import React, { useState } from 'react';

type Props = {
  strains: StrainLike[];
};

function LikedStrain({
  name,
  image,
  slug,
}: {
  name: string;
  image: string;
  slug: string;
}) {
  return (
    <Link
      className="xs:w-[110px] xs:scale-95 flex w-[100] flex-col items-center rounded-lg border bg-zinc-100/20 shadow dark:border-transparent dark:bg-zinc-800/70 sm:w-[125px]"
      href={`/strains/${slug}`}
    >
      <div className="mx-2 mb-1 mt-2 size-[98px] rounded border bg-zinc-300/50 p-0.5 shadow dark:border-zinc-700/80 dark:bg-zinc-700/30">
        <Image alt={slug} width={96} height={96} src={image} />
      </div>
      <span className="mb-1.5 max-w-[94px] truncate py-1 text-xs sm:text-base">
        {name}
      </span>
    </Link>
  );
}

function LikedStrainsAccordion(props: Props) {
  const { strains } = props;
  const [isOpen, setIsOpen] = useState(false);
  const match = useMediaQuery('(max-width: 640px)');

  const variants = {
    open: {
      height: 'auto',
      marginBottom: '10px',
      transition: { duration: 0.5 },
    },
    closed: {
      height:
        strains && strains.length < 10 ? 'auto' : match ? '294px' : '316px',
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
          strains.map((strain) => {
            return (
              <LikedStrain
                key={strain.id}
                name={strain.strain_id.name}
                image={strain.strain_id.nugImage}
                slug={strain.strain_id.slug}
              />
            );
          })}
      </motion.div>
      {props.strains.length > 10 ? (
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="mt-1 flex w-full flex-row items-center justify-center gap-2 font-semibold"
        >
          {isOpen ? 'Show less' : 'Show all'}
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
            <ChevronDownIcon className="size-4" />
          </motion.div>
        </button>
      ) : null}
    </>
  );
}

export default LikedStrainsAccordion;
