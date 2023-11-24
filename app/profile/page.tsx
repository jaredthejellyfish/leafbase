import { ErrorBoundary } from 'react-error-boundary';
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

import LikedStrainsSkeleton from '@/components/LikedStrains/LikedStrainsSkeleton';
import LikedStrainsError from '@/components/LikedStrains/LikedStrainsError';
import { getServerUserMetadata } from '@/lib/utils/getServerUserMetadata';
import GeneralInformation from '@/components/GeneralInformation';
import NavBreadcrumbs from '@/components/NavBreadcrumbs';
import LikedStrains from '@/components/LikedStrains';
import ProfileSection from '@/components/Profile';

const Notifier = dynamic(() => import('@/components/Notifier'), { ssr: false });

export const metadata = {
  title: 'Profile - Leafbase',
  description:
    'Explore your personal user page, showcasing your profile, comments, and a curated list of your favorite cannabis strains. Stay updated and engaged with the community.',
};

export default async function Profile() {
  const { user_metadata, session } = await getServerUserMetadata();

  if (!user_metadata) {
    return null;
  }

  return (
    <div className="px-5 py-3 md:px-16">
      <NavBreadcrumbs
        urls={[
          {
            name: 'Profile',
            url: `/profile/${user_metadata?.displayName}`,
          },
        ]}
      />
      <div className="mt-3 flex flex-col gap-6 lg:flex-row">
        <div id="vertical 1" className="flex flex-col gap-4 lg:w-1/3">
          <ProfileSection user={user_metadata} session={session} />
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
