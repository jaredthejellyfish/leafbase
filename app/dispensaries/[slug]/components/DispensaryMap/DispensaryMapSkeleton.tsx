import React from 'react';

const DispensaryMapSkeleton = () => {
  return (
    <div className="h-[194px] md:h-[264px] relative z-0 flex flex-col w-full p-3 shadow-md rounded-xl dark:bg-zinc-900">
      <div className="h-[170px] md:h-[240px] w-full relative rounded-xl bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse" />
    </div>
  );
};

export default DispensaryMapSkeleton;
