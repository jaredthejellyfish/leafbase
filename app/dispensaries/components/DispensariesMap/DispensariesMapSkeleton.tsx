import React from 'react';

const DispensariesMapSkeleton = () => {
  return (
    <div className="relative z-0 flex flex-col w-[99vw] lg:w-[70vw] p-3 m-1 shadow-md border border-zinc-100 dark:border-zinc-900 h-[30vh] lg:h-screen-bar rounded-xl dark:bg-zinc-900">
      <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse" />
    </div>
  );
};

export default DispensariesMapSkeleton;
