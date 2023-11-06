import { ErrorBoundary } from 'react-error-boundary';
import React, { Suspense } from 'react';

import { getServerUserProfileFromUsername } from '@/lib/utils/getServerUserProfileFromUsername';
import LikedStrainsSkeleton from '@/components/LikedStrains/LikedStrainsSkeleton';
import LikedStrainsError from '@/components/LikedStrains/LikedStrainsError';
import GeneralInformation from '@/components/GeneralInformation';
import NavBreadcrumbs from '@/components/NavBreadcrumbs';
import LikedStrains from '@/components/LikedStrains';
import Profile from '@/components/Profile';

type Props = { params: { username: string } };

async function UsernamePage(props: Props) {
  if (!props.params.username) return null;

  const { userProfile: user } = await getServerUserProfileFromUsername(
    props.params.username
  );
  
  if (!user) return <div>404</div>;

  return (
    <div className="px-5 md:px-16 py-3">
      <NavBreadcrumbs
        urls={[
          { name: 'Profile', url: '/profile' },
          {
            name: user.displayName,
            url: `/profile/${user?.displayName}`,
          },
        ]}
      />
      <div className="flex flex-col gap-6 mt-3 lg:flex-row">
        <div id="vertical 1" className="flex flex-col gap-4 lg:w-1/3">
          <Profile user={user} hideOptions />
        </div>
        <div id="vertical 2" className="flex flex-col gap-4 pb-3 lg:w-2/3">
          <GeneralInformation user={user} />
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

export default UsernamePage;
