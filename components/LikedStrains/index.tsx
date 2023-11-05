import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { getServerLikedStrains } from '@/lib/utils/getServerLikedStrains';

const LikedStrains = async (props: { userId?: string }) => {
  const { userId } = props;
  if (!userId) return null;

  const { data: strains } = await getServerLikedStrains(userId);

  if (strains.length < 1) return null;

  return (
    <div className="px-1">
      <div className="flex flex-row items-center gap-5 text-xl font-bold">
        <p className="">Liked Strains ({strains?.length})</p>
      </div>

      {strains && strains.length === 0 ? (
        <div className="mt-6 text-sm text-semi text-zinc-400">
          You haven&apos;t liked any strains yet!
        </div>
      ) : (
        <div className="flex flex-row flex-wrap items-start justify-start mt-3 gap-x-0 gap-y-0 sm:gap-x-3 sm:gap-y-3">
          {strains &&
            strains.map((strain) => (
              <Link
                key={strain.id}
                className="flex flex-col gap-2 p-2 scale-95 border rounded shadow sm:scale-100 dark:border-zinc-600 dark:bg-zinc-800 "
                href={`/strains/${strain.strain_id.slug}`}
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
        </div>
      )}
    </div>
  );
};

export default LikedStrains;
