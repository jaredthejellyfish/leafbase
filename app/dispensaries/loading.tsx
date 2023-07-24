import React from 'react';
import DispensariesMapSkeleton from './components/DispensariesMap/DispensariesMapSkeleton';

const Dispensaries = () => {
  return (
    <div className="flex flex-col justify-center w-full -mt-3">
      <DispensariesMapSkeleton />
    </div>
  );
};

export default Dispensaries;
