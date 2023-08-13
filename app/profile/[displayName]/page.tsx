import { ErrorBoundary } from 'react-error-boundary';
import { MdLocationPin } from 'react-icons/md';
import { User, Like } from '@prisma/client';
import dynamic from 'next/dynamic';
import { format } from 'date-fns';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import ProfileRevalidator from '../components/ProfileRevalidator/ProfileRevalidator';
import LikedStrainsError from '@/app/components/LikedStrains/LikedStrainsError';
import NavBreadcrumbs from '@/app/components/NavBreadcrumbs/NavBreadcrumbs';
import LikedStrains from '@/app/components/LikedStrains/LikedStrains';
import generateGravatarUrl from '@/utils/generateGravatarUrl';
import getServerComments from '@/utils/getServerComments';
import getServerUser from '@/utils/getServerUser';

const StrainCommentLikeButton = dynamic(
  () => import('./components/ProfileCommentLikeButton')
);

type Props = { params: { displayName: string } };

interface StrainName {
  name: string;
  slug: string;
}

interface Comment {
  id: string;
  userId: string;
  strainId: string;
  body: string;
  createdAt: Date;
  strain: StrainName;
  likes?: Like[];
}

type MetadataProps = { params: { displayName: string } };

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const displayName = params.displayName;

  return {
    title: `${displayName} - Leafbase` || 'Strain',
    description: `Explore ${displayName}'s personal user page, showcasing their profile, comments, and a curated list of their favorite cannabis strains. Connect and share experiences with fellow enthusiasts!`,
  };
}

function pickRandomComments(comments: Comment[], count = 4): Comment[] {
  try {
    const shuffledComments = [...comments].sort(() => Math.random() - 0.5);
    const selectedComments: Comment[] = [];

    for (const comment of shuffledComments) {
      if (
        !selectedComments.some((r) => r.strain.name === comment.strain.name)
      ) {
        selectedComments.push(comment);

        if (selectedComments.length >= count) {
          break;
        }
      }
    }

    return selectedComments;
  } catch (error) {
    console.log(error);
    return [];
  }
}

const ProfileDisplay = async (props: Props) => {
  const user = await getServerUser(props.params.displayName);
  const { comments, isError } = await getServerComments(user as User);

  if (!user) throw new Error('User not found');

  const randomComments = pickRandomComments(comments as Comment[]);

  return (
    <div className="flex flex-col px-6 md:px-16">
      <NavBreadcrumbs
        urls={[
          { name: 'Profile', url: '/profile' },
          {
            name: user?.displayName as string,
            url: `/profile/${user?.displayName}`,
          },
        ]}
      />
      <div className="flex flex-col gap-6 mt-3 lg:flex-row">
        <div id="vertical 1" className="flex flex-col gap-4 lg:w-1/3">
          <div className="relative z-0 flex flex-col w-full shadow-md p-7 rounded-xl dark:bg-zinc-900">
            <Image
              src={generateGravatarUrl(user as User)}
              alt="profile"
              className="rounded-md"
              width={80}
              height={80}
            />
            <p className="mt-2 text-lg font-bold ">{user?.name}</p>
            {user?.displayName ? (
              <>
                <span className="flex flex-row items-center gap-1 text-sm text-zinc-300">
                  <span className="text-zinc-400">{user?.displayName}</span>
                </span>
                <span className="mt-3 text-sm dark:text-white">
                  Location:
                  <span className="flex flex-row items-center gap-1 text-sm text-zinc-300">
                    <MdLocationPin />
                    <span className="text-zinc-400">{user?.location}</span>
                  </span>
                </span>
              </>
            ) : (
              <span className="flex flex-row items-center gap-1 text-sm text-zinc-300">
                <MdLocationPin />
                <span className="text-zinc-400">{user?.location}</span>
              </span>
            )}
          </div>
          {comments?.length && comments?.length > 0 && !isError ? (
            <div className="relative z-0 flex flex-col w-full shadow-md p-7 rounded-xl dark:bg-zinc-900">
              <h1 className="text-xl font-bold">Comments</h1>
              <div className="flex flex-col gap-2 mt-2">
                {randomComments &&
                  randomComments?.length > 0 &&
                  randomComments?.map((comment) => (
                    <Link
                      href={`/strains/${comment?.strain?.slug}`}
                      className="relative px-3 py-2 text-sm border rounded-lg shadow border-zinc-100 dark:border-zinc-500"
                      key={comment.id}
                    >
                      <StrainCommentLikeButton
                        id={comment.id}
                        liked={comment?.likes && comment.likes.length > 0}
                      />
                      <h2 className="mb-1 text-base font-semibold">
                        {comment.strain.name}
                      </h2>
                      <p className="text-zinc-400">{comment.body}</p>
                    </Link>
                  ))}
              </div>
            </div>
          ) : null}
        </div>
        <div id="vertical 2" className="flex flex-col gap-4 lg:w-2/3">
          <div className="flex flex-col w-full shadow-md p-7 rounded-xl dark:bg-zinc-900">
            <h1 className="text-xl font-bold">General information</h1>
            {user?.aboutMe && (
              <>
                <span className="mt-3 text-sm dark:text-white">About me</span>
                <p className="mt-1 text-sm text-zinc-400 lg:w-4/5">
                  {user?.aboutMe}
                </p>
              </>
            )}

            <div
              className={`flex flex-col justify-between ${
                user?.aboutMe && 'mt-6'
              } md:flex-row md:w-4/5`}
            >
              <span className="mt-3 text-sm dark:text-white">
                Birthday:
                <p className="text-gray-400 w-60">
                  {user?.birthDate && format(user?.birthDate, 'PP')}
                </p>
              </span>
              <span className="mt-3 text-sm dark:text-white">
                Languages:
                <p className="text-gray-400 w-60">{user?.languages}</p>
              </span>
            </div>
          </div>
          <ErrorBoundary fallback={<LikedStrainsError />}>
            <LikedStrains user={user} />
          </ErrorBoundary>
        </div>
      </div>
      <ProfileRevalidator />
    </div>
  );
};

export default ProfileDisplay;
