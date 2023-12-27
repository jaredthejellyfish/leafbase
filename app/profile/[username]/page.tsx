import { notFound } from 'next/navigation';
import { ErrorBoundary } from 'react-error-boundary';

import GeneralInformation from '@/components/GeneralInformation';
import LikedStrains from '@/components/LikedStrains';
import LikedStrainsError from '@/components/LikedStrains/LikedStrainsError';
import LikedStrainsSkeleton from '@/components/LikedStrains/LikedStrainsSkeleton';
import NavBreadcrumbs from '@/components/NavBreadcrumbs';
import Profile from '@/components/Profile';

import { getServerUserProfileFromUsername } from '@/lib/utils/getServerUserProfileFromUsername';

import React, { Suspense } from 'react';

type Props = { params: { username: string } };

export default async function ProfileUser(props: Props) {
  if (!props.params.username) return null;

  const { user, friendRequest, session, error } =
    await getServerUserProfileFromUsername(props.params.username);

  if (!user || error) notFound();

  return (
    <div className="px-5 py-3 md:px-16">
      <NavBreadcrumbs
        urls={[
          { name: 'Profile', url: '/profile' },
          {
            name: user.username,
            url: `/profile/${user?.username}`,
          },
        ]}
      />
      <div className="mt-3 flex flex-col gap-6 lg:flex-row">
        <div id="vertical 1" className="flex flex-col gap-4 lg:w-1/3">
          <Profile
            user={user}
            hideOptions
            allowFriendRequest
            session={session}
            friendRequest={friendRequest}
            username={session?.user.user_metadata.username}
          />
        </div>
        <div id="vertical 2" className="flex flex-col gap-4 pb-3 lg:w-2/3">
          {user && (user.about || user.birth_date || user.language) ? (
            <GeneralInformation user={user} />
          ) : null}
          <ErrorBoundary fallback={<LikedStrainsError />}>
            <Suspense fallback={<LikedStrainsSkeleton />}>
              <LikedStrains userId={user.id} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}
