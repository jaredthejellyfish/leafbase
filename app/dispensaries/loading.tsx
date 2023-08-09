import React from 'react';

import DispensariesListSkeleton from './components/DispensariesList/DispensariesListSkeleton';
import DispensariesMapSkeleton from './components/DispensariesMap/DispensariesMapSkeleton';

const DispensariesLoading = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center w-full -mt-3 items-around">
      <div className="order-last lg:order-first">
        <DispensariesListSkeleton />
      </div>
      <div className="order-first lg:order-last">
        <DispensariesMapSkeleton />
      </div>
    </div>
  );
};

export default DispensariesLoading;
