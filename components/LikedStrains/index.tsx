import { ErrorBoundary } from 'react-error-boundary';
import { ClipboardXIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import React from 'react';

import { getServerLikedStrains } from '@/lib/utils/getServerLikedStrains';
import StrainSimilarityModal from './StrainSimilarityModal';

const LikedStrainsAccordion = dynamic(() => import('./LikedStrainsAccordion'));
const SmokingProfileModal = dynamic(() => import('./SmokingProfileModal'));

const LikedStrains = async (props: { userId?: string; modal?: boolean }) => {
  const { userId } = props;
  if (!userId) return null;

  const { data: strains } = await getServerLikedStrains(userId);

  if (strains && strains.length < 1) return null;

  return (
    <div className="px-1">
      <div className="flex flex-row items-center gap-5 text-xl font-bold">
        <p className="">Liked Strains ({strains?.length})</p>
        <ErrorBoundary fallback={<ClipboardXIcon />}>
          {props.modal && <StrainSimilarityModal />}
        </ErrorBoundary>
        <ErrorBoundary fallback={<ClipboardXIcon />}>
          {props.modal && <SmokingProfileModal />}
        </ErrorBoundary>
      </div>

      {strains && strains.length > 0 ? (
        <LikedStrainsAccordion strains={strains} />
      ) : (
        <div className="mt-6 text-sm text-semi text-zinc-400">
          You haven&apos;t liked any strains yet!
        </div>
      )}
    </div>
  );
};

export default LikedStrains;
