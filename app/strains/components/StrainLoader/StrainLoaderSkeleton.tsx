import React from 'react';

import StrainCardSkeleton from '@/app/components/StrainCard/StrainCardSkeleton';

const StrainLoaderSkeleton = () => {
  return (
    <>
      <StrainCardSkeleton />
      <StrainCardSkeleton />
      <StrainCardSkeleton />
      <StrainCardSkeleton />
      <StrainCardSkeleton />
      <StrainCardSkeleton />
    </>
  );
};

export default StrainLoaderSkeleton;
