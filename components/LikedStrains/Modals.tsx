// Modals.tsx
'use client';

import dynamic from 'next/dynamic';
import { ErrorBoundary } from 'react-error-boundary';
import { RiPieChart2Fill } from 'react-icons/ri';
import { TbGraphFilled, TbGraphOff } from 'react-icons/tb';

import React from 'react';

// Modals.tsx

// Modals.tsx

// Modals.tsx

// Modals.tsx

// Modals.tsx

// Modals.tsx

// Modals.tsx

const StrainSimilarityModal = dynamic(() => import('./StrainSimilarityModal'), {
  ssr: false,
  loading: () => (
    <TbGraphFilled className="text-gradient-to-br h-6 w-6 animate-pulse from-gray-200 via-green-300 to-green-700" />
  ),
});

const SmokingProfileModal = dynamic(() => import('./SmokingProfileModal'), {
  ssr: false,
  loading: () => (
    <RiPieChart2Fill className="text-gradient-to-br h-5 w-5 animate-pulse from-gray-200 via-green-300 to-green-700" />
  ),
});

type Props = { modal: boolean };

function Modals({ modal }: Props) {
  if (!modal) return null;

  return (
    <div className="flex flex-row items-center gap-x-3 px-2">
      <ErrorBoundary fallback={<TbGraphOff className="h-6 w-6 text-red-500" />}>
        <StrainSimilarityModal />
      </ErrorBoundary>
      <ErrorBoundary
        fallback={<RiPieChart2Fill className="h-5 w-5 text-red-500" />}
      >
        <SmokingProfileModal />
      </ErrorBoundary>
    </div>
  );
}

export default Modals;
