import React from 'react';

import GeneralInformationSkeleton from './components/GeneralInformation/GeneralInformationSkeleton';
import ProfileCommentsSkeleton from './components/ProfileComments/ProfileCommentsSkeleton';
import NavBreadcrumbsSkeleton from '@/components/NavBreadcrumbs/NavBreadcrumbsSkeleton';
import LikedStrainsSkeleton from '@/components/LikedStrains/LikedStrainsSkeleton';
import ProfileSkeleton from './components/Profile/ProfileSkeleton';

async function ProfileLoading() {
  return (
    <div className="flex flex-col px-6 md:px-16">
      <NavBreadcrumbsSkeleton urls={[{ name: 'Profile' }]} />

      <div className="flex flex-col gap-6 mt-3 lg:flex-row">
        <div id="vertical 1" className="flex flex-col gap-4 lg:w-1/3">
          <ProfileSkeleton />
          <ProfileCommentsSkeleton />
        </div>
        <div id="vertical 2" className="flex flex-col gap-4 lg:w-2/3">
          <GeneralInformationSkeleton />
          <LikedStrainsSkeleton />
        </div>
      </div>
    </div>
  );
}

export default ProfileLoading;
