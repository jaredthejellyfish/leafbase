import { ErrorBoundary } from 'react-error-boundary';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

import LikedStrainsSkeleton from '@/components/LikedStrains/LikedStrainsSkeleton';
import LikedStrainsError from '@/components/LikedStrains/LikedStrainsError';
import { getServerUserMetadata } from '@/lib/utils/getServerUserMetadata';
import FriendsSkeleton from '@/components/ProfileFriends/skeleton';
import GeneralInformation from '@/components/GeneralInformation';
import ProfileComments from '@/components/ProfileComments';
import NavBreadcrumbs from '@/components/NavBreadcrumbs';
import ProfileFriends from '@/components/ProfileFriends';
import LikedStrains from '@/components/LikedStrains';
import ProfileSection from '@/components/Profile';

const Notifier = dynamic(() => import('@/components/Notifier'), { ssr: false });

export const metadata = {
  title: 'Profile - Leafbase',
  description:
    'Explore your personal user page, showcasing your profile, comments, and a curated list of your favorite cannabis strains. Stay updated and engaged with the community.',
};

export default async function Profile({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { user_metadata, session } = await getServerUserMetadata();

  if (!user_metadata) return notFound();

  return (
    <div className="px-5 py-3 md:px-16">
      <NavBreadcrumbs
        urls={[
          {
            name: 'Profile',
            url: `/profile/${user_metadata?.username}`,
          },
        ]}
      />
      <div className="mt-3 flex flex-col gap-x-6 gap-y-4 lg:flex-row">
        <div id="vertical 1" className="flex flex-col gap-4 lg:w-1/3">
          <ProfileSection user={user_metadata} session={session} />
          <ErrorBoundary fallback={<FriendsSkeleton />}>
            <Suspense fallback={<FriendsSkeleton />}>
              {!searchParams ||
                (searchParams.cr !== 'comments' && (
                  <ProfileFriends session={session} />
                ))}
              {searchParams && searchParams.cr === 'comments' && (
                <ProfileComments session={session} />
              )}
            </Suspense>
          </ErrorBoundary>
        </div>
        <div id="vertical 2" className="flex flex-col gap-4 pb-3 lg:w-2/3">
          <GeneralInformation user={user_metadata} />
          <ErrorBoundary fallback={<LikedStrainsError />}>
            <Suspense fallback={<LikedStrainsSkeleton />}>
              <LikedStrains userId={session?.user.id} modal />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
      <Notifier />
    </div>
  );
}
