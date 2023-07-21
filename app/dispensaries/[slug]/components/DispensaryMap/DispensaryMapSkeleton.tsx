import React from 'react';

const DispensaryMapSkeleton = () => {
  return (
    <div className="relative z-0 flex flex-col w-full p-3 rounded shadow-md dark:bg-zinc-900">
      <div className="h-[300px] w-full relative rounded bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse" />
    </div>
  );
};

export default DispensaryMapSkeleton;
