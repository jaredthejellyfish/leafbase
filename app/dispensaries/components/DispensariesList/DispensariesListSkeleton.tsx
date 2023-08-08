import React from 'react';

import DispensariesTableSkeleton from './DispensariesTableSkeleton';

const DispensariesListSkeleton = () => {
  return (
    <div className="lg:w-[28vw] mt-1 h-screen-bar bg-zinc-900 rounded-xl mr-1.5 overflow-y-scroll">
      <div className="relative overflow-x-auto sm:rounded-lg">
        <div className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-zinc-900">
          Nearby Dispensaries
          <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda
            culpa temporibus saepe sunt aliquam rem provident quam at aliquid
            nisi totam, sint nulla.
          </p>
        </div>
        <DispensariesTableSkeleton />
        <DispensariesTableSkeleton />
        <DispensariesTableSkeleton />
        <DispensariesTableSkeleton />
        <DispensariesTableSkeleton />
        <DispensariesTableSkeleton />
      </div>
    </div>
  );
};

export default DispensariesListSkeleton;
