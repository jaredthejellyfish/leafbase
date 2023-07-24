import React from 'react';

const DispensaryMapSkeleton = () => {
  return (
    <div className="relative z-0 flex flex-col w-screen p-3 shadow-md h-screen-bar rounded-xl dark:bg-zinc-900">
      <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse" />
    </div>
  );
};

export default DispensaryMapSkeleton;
