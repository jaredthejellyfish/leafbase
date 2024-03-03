'use client';

import dynamic from 'next/dynamic';
import React, { useState } from 'react';

import type { StrainLike } from '@l/types';
import { cn } from '@l/utils/cn';

import LikedStrain from './LikedStrain';

const Modals = dynamic(() => import('./modals'));

type Props = { likes?: StrainLike[]; noModals?: boolean };

function LikedStrains({ likes = [], noModals = false }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        id="liked-strains-container"
        className={cn(
          'overflow-y-hidden px-2 pt-3 transition-all duration-500 ease-in-out',
          open ? 'max-h-[5000px]' : 'max-h-[309px] sm:max-h-[350px]',
        )}
      >
        <div className="flex flex-row gap-x-1.5 items-center mb-1.5">
          <h2 className="text-2xl font-bold">Liked Strains</h2>
          <h3 className="mt-[1.5px] text-lg font-bold text-zinc-400/90">
            ({likes?.length ?? 0})
          </h3>
          {!noModals && <Modals modal={true} />}
        </div>
        <div className="flex w-full flex-row flex-wrap gap-x-1.5 gap-y-1.5 sm:justify-start sm:gap-x-1.5 sm:gap-y-2">
          {likes?.map((strain, i) => (
            <LikedStrain
              key={`${strain.strain_id.slug}-${i}`}
              name={strain.strain_id.name}
              image={strain.strain_id.nugImage}
              slug={strain.strain_id.slug}
            />
          ))}
        </div>
      </div>
      {likes?.length > 10 && (
        <button
          className="mt-1 flex w-full items-center justify-center px-2"
          onClick={() => setOpen((open) => !open)}
        >
          <svg
            id="arrow-down-liked"
            stroke="currentColor"
            fill="none"
            strokeWidth="0"
            viewBox="0 0 15 15"
            height="35px"
            width="35px"
            className={cn(
              'transition-transform duration-200',
              open && 'rotate-180',
            )}
            style={{ pointerEvents: 'none' }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
      )}
    </>
  );
}

export default LikedStrains;
