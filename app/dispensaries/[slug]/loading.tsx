import React from 'react';

import GeneralInformationSkeleton from './components/GeneralInformation/GeneralInformationSkeleton';
import NavBreadcrumbsSkeleton from '@/components/NavBreadcrumbs/NavBreadcrumbsSkeleton';
import DispensaryMapSkeleton from './components/DispensaryMap/DispensaryMapSkeleton';
import CommentsSkeleton from './components/Comments/CommentsSkeleton';
import ProfileSkeleton from './components/Profile/ProfileSkeleton';
import MenuSkeleton from './components/Menu/MenuSkeleton';

const DispensaryLoading = () => {
  return (
    <div className="flex flex-col px-6 md:px-16">
      <NavBreadcrumbsSkeleton
        urls={[{ name: 'Dispensaries' }, { name: '...' }]}
      />
      <div className="flex flex-col gap-6 lg:flex-row">
        <div id="vertical 1" className="flex flex-col gap-4 lg:w-1/3">
          <ProfileSkeleton />
          <DispensaryMapSkeleton />
          <CommentsSkeleton />
        </div>
        <div id="vertical 2" className="flex flex-col gap-4 pb-3 lg:w-2/3">
          <GeneralInformationSkeleton />
          <MenuSkeleton />
        </div>
      </div>
    </div>
  );
};

export default DispensaryLoading;
