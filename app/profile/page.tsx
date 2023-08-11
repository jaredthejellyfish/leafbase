import { default as nextDynamic } from 'next/dynamic';
import { ErrorBoundary } from 'react-error-boundary';
import React from 'react';

import GeneralInformationSkeleton from './components/GeneralInformation/GeneralInformationSkeleton';
import ProfileCommentsSkeleton from './components/ProfileComments/ProfileCommentsSkeleton';
import ProfileCommentsError from './components/ProfileComments/ProfileCommentsError';
import LikedStrainsSkeleton from '@/components/LikedStrains/LikedStrainsSkeleton';
import LikedStrainsError from '@/components/LikedStrains/LikedStrainsError';
import NavBreadcrumbs from '@/components/NavBreadcrumbs/NavBreadcrumbs';
import ProfileSkeleton from './components/Profile/ProfileSkeleton';
import getServerUser from '@/utils/getServerUser';

const Profile = nextDynamic(() => import('./components/Profile/Profile'), {
  ssr: false,
  loading: () => <ProfileSkeleton />,
});

const LikedStrains = nextDynamic(
  () => import('@/components/LikedStrains/LikedStrains'),
  {
    ssr: false,
    loading: () => <LikedStrainsSkeleton />,
  }
);

const ProfileComments = nextDynamic(
  () => import('./components/ProfileComments/ProfileComments'),
  {
    ssr: false,
    loading: () => <ProfileCommentsSkeleton />,
  }
);

const GeneralInformation = nextDynamic(
  () => import('./components/GeneralInformation/GeneralInformation'),
  {
    ssr: false,
    loading: () => <GeneralInformationSkeleton />,
  }
);

const ProfileRevalidator = nextDynamic(
  () => import('./components/ProfileRevalidator/ProfileRevalidator')
);

export const metadata = {
  title: 'Profile - Leafbase',
  description:
    'Explore your personal user page, showcasing your profile, comments, and a curated list of your favorite cannabis strains. Stay updated and engaged with the community.',
};

async function ProfilePage() {
  const user = await getServerUser();

  if (!user) return <div>failed to load</div>;

  return (
    <div className="flex flex-col px-6 md:px-16">
      <NavBreadcrumbs urls={[{ name: 'Profile', url: '/profile' }]} />
      <div className="flex flex-col gap-6 mt-3 lg:flex-row">
        <div id="vertical 1" className="flex flex-col gap-4 lg:w-1/3">
          <Profile user={user} />

          <ErrorBoundary fallback={<ProfileCommentsError />}>
            <ProfileComments user={user} />
          </ErrorBoundary>
        </div>
        <div id="vertical 2" className="flex flex-col gap-4 pb-3 lg:w-2/3">
          {(user.aboutMe || user.birthDate) && (
            <GeneralInformation user={user} />
          )}

          <ErrorBoundary fallback={<LikedStrainsError />}>
            <LikedStrains />
          </ErrorBoundary>
        </div>
      </div>
      <ProfileRevalidator />
    </div>
  );
}

export default ProfilePage;

export const dynamic = 'force-dynamic';
