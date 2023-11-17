import dynamic from 'next/dynamic';
import React from 'react';

import { getServerLikedStrains } from '@/lib/utils/getServerLikedStrains';
import LikedStrainsModal from '../LikedStrainsModal';
const LikedStrainsAccordion = dynamic(() => import('./LikedStrainsAccordion'));

const LikedStrains = async (props: { userId?: string }) => {
  const { userId } = props;
  if (!userId) return null;

  const { data: strains } = await getServerLikedStrains(userId);

  if (strains && strains.length < 1) return null;

  return (
    <div className="px-1">
      <div className="flex flex-row items-center gap-5 text-xl font-bold">
        <p className="">Liked Strains ({strains?.length})</p>
        <LikedStrainsModal />
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
