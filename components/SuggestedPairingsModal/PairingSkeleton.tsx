import React from 'react';

function PairingSkeleton() {
  return (
    <div className="flex flex-row items-center gap-3 border border-zinc-300 dark:border-zinc-700 py-3 rounded pl-2 pr-3">
      <div className="w-24 h-24 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>

      <div className="text-sm max-w-[80%]">
        <div className="w-1/3 h-4 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        <div className="w-full h-3 mt-2 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        <div className="w-48 h-3 mt-1.5 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        <div className="w-[80%] h-3 mt-1.5 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
      </div>
    </div>
  );
}

export default PairingSkeleton;
