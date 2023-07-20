import React from 'react';
import Link from 'next/link';

import { ErrorBoundary } from 'react-error-boundary';

import useServerUser from '@/hooks/useServerUser';

import LikedStrainsError from './components/LikedStrains/LikedStrainsError';
import ProfileCommentsError from './components/ProfileComments/ProfileCommentsError';

import ProfileCommentsSkeleton from './components/ProfileComments/ProfileCommentsSkeleton';
import LikedStrainsSkeleton from './components/LikedStrains/LikedStrainsSkeleton';

import GeneralInformationSkeleton from './components/GeneralInformation/GeneralInformationSkeleton';
import ProfileSkeleton from './components/Profile/ProfileSkeleton';

import { default as nextDynamic } from 'next/dynamic';

const Profile = nextDynamic(() => import('./components/Profile/Profile'), {
  ssr: false,
  loading: () => <ProfileSkeleton />,
});

const LikedStrains = nextDynamic(
  () => import('./components/LikedStrains/LikedStrains'),
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

async function UserProfile() {
  const user = await useServerUser();

  if (!user) return <div>failed to load</div>;

  return (
    <>
      <div className="flex flex-col px-6 md:px-16">
        <nav className="flex ml-1" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                href="/"
                className="inline-flex items-center text-lg font-medium text-gray-700 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
              >
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <div className="ml-1 text-lg font-medium text-gray-700 hover:text-green-600 md:ml-2 dark:text-gray-400 dark:hover:text-green-400">
                  Profile
                </div>
              </div>
            </li>
          </ol>
        </nav>
        <div className="flex flex-col gap-6 mt-3 lg:flex-row">
          <div id="vertical 1" className="flex flex-col gap-4 lg:w-1/3">
            <Profile user={user} />

            <ErrorBoundary fallback={<ProfileCommentsError />}>
              <ProfileComments user={user} />
            </ErrorBoundary>
          </div>
          <div id="vertical 2" className="flex flex-col gap-4 pb-3 lg:w-2/3">
            <div className="flex flex-col w-full shadow-md p-7 rounded-xl dark:bg-zinc-900">
              <GeneralInformation user={user} />
            </div>
            <div className="flex flex-col w-full shadow-md p-7 rounded-xl dark:bg-zinc-900">
              <ErrorBoundary fallback={<LikedStrainsError />}>
                <LikedStrains />
              </ErrorBoundary>
            </div>
          </div>
        </div>
        <ProfileRevalidator />
      </div>
    </>
  );
}

export default UserProfile;

export const dynamic = 'force-dynamic';
