import React from 'react';
import DispensariesMapSkeleton from './components/DispensariesMap/DispensariesMapSkeleton';
import DispensariesListSkeleton from './components/DispensariesList/DispensariesListSkeleton';

const Dispensaries = () => {
  return (
    <div className="flex flex-row justify-center w-full -mt-3 items-around">
      <div className="order-last lg:order-first">
        <DispensariesListSkeleton />
      </div>
      <div className="order-first lg:order-last">
        <DispensariesMapSkeleton />
      </div>
    </div>
  );
};

export default Dispensaries;
