import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import dynamic from 'next/dynamic';
import { User } from '@prisma/client';
import useServerUser from '@/hooks/useServerUser';
import { StrainExtended } from '@/types/interfaces';
import { ErrorBoundary } from 'react-error-boundary';

const LikedStrainsModal = dynamic(() => import('./LikedStrainsModal'), {
  loading: () => <div>Loading...</div>,
  ssr: false,
});

type Strain = {
  id: string;
  slug: string;
  nugImage: string;
  name: string;
};

const getLikedStrains = async (user: User) => {
  const likes = await prisma.like.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      strain: {
        select: {
          id: true,
          slug: true,
          nugImage: true,
          name: true,
        },
      },
    },
  });
  const likedStrains = likes.map((like) => like.strain as StrainExtended);

  // sort them by name
  const sortedLikedStrains = likedStrains.sort((a, b) => {
    if (a.name < b.name) return -1;
    else if (a.name > b.name) return 1;
    else return 0;
  });

  return sortedLikedStrains;
};

const LikedStrains = async () => {
  const user = (await useServerUser()) as User;
  const strains = await getLikedStrains(user);

  if (strains.length < 1) return null;

  return (
    <div className="px-1">
      <div className="flex flex-row items-center gap-5 text-xl font-bold">
        <p className="">Liked Strains ({strains?.length})</p>
        <ErrorBoundary fallback={<span>error :C</span>}>
          <LikedStrainsModal strains={strains} />
        </ErrorBoundary>
      </div>

      {strains && strains.length === 0 ? (
        <div className="mt-6 text-sm text-semi text-zinc-400">
          You haven&apos;t liked any strains yet!
        </div>
      ) : (
        <div className="flex flex-row flex-wrap items-start justify-start mt-3 gap-x-0 gap-y-0 sm:gap-x-3 sm:gap-y-3">
          {strains &&
            strains.map((strain: Strain) => (
              <Link
                key={strain.id}
                className="flex flex-col gap-2 p-2 scale-95 border rounded shadow sm:scale-100 dark:border-zinc-600 dark:bg-zinc-800 "
                href={`/strains/${strain.slug}`}
              >
                <div className="flex items-center justify-center bg-white rounded-md aspect-square max-h-24 max-w-24">
                  <Image
                    src={strain.nugImage}
                    className="rounded-md"
                    alt={strain.name}
                    width={90}
                    height={90}
                    priority={true}
                  />
                </div>
                <h1 className="w-20 text-sm truncate text-semi">
                  {strain.name}
                </h1>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
};

export default LikedStrains;
