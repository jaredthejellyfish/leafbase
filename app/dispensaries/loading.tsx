import React from 'react';
import DispensariesMapSkeleton from './components/DispensariesMap/DispensariesMapSkeleton';
import DispensariesListSkeleton from './components/DispensariesList/DispensariesListSkeleton';

const Dispensaries = () => {
  return (
    <div className="flex flex-row justify-center w-full -mt-3 items-around">
      <DispensariesListSkeleton />
      <DispensariesMapSkeleton />
    </div>
  );
};

export default Dispensaries;
