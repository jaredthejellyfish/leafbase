import React from 'react';
import MenuStrainCardSkeleton from './MenuStrainCardSkeleton';

const MenuSkeleton = () => {
  return (
    <div>
      <h2 className="mb-3 text-xl font-semibold text-gray-800 dark:text-gray-100">
        Menu:
      </h2>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <div className="flex flex-wrap gap-2 text-xl font-semibold text-gray-800 md:gap-5 dark:text-gray-100">
            <MenuStrainCardSkeleton />
            <MenuStrainCardSkeleton />
            <MenuStrainCardSkeleton />
            <MenuStrainCardSkeleton />
            <MenuStrainCardSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuSkeleton;
