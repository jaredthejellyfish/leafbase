'use client';

import React from 'react';
import { useIntersectionObserver } from 'usehooks-ts';

import StrainCard from '@/components/StrainCard';
import type { Strain } from '@/lib/types';
import { cn } from '@/lib/utils/cn';

const rotations = [
  'md:-rotate-28 md:z-1 md:-translate-x-80 md:translate-y-20',
  'md:-rotate-12 md:z-2 md:-translate-x-32',
  'md:rotate-0 md:z-3 md:-translate-y-5',
  'md:rotate-12 md:z-4 md:translate-x-32',
  'md:rotate-28 md:z-5 md:translate-x-80 md:translate-y-20',
];
type Props = { strains: Strain[] | null };

function StrainsFan({ strains }: Props) {
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.3,
  });

  if (!strains) return null;

  return (
    <div
      className="flex flex-col md:flex-row justify-center h-full relative gap-y-3 px-3 md:px-0"
      ref={ref}
    >
      {strains?.map((strain, index) => (
        <StrainCard
          key={strain.id}
          strain={strain}
          className={cn(
            rotations[index],
            'md:absolute hover:z-50 animate-in spin-in-0 duration-1000 top-[14%] transform-gpu pointer-events-auto',
            isIntersecting ? 'running' : 'paused',
          )}
        />
      ))}
    </div>
  );
}

export default StrainsFan;
