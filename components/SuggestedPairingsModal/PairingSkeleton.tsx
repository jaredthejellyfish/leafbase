import React from 'react';

function PairingSkeleton() {
  return (
    <div className="flex flex-row items-center gap-3 rounded border border-zinc-300 py-3 pl-2 pr-3 dark:border-zinc-700">
      <div className="h-24 w-24 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>

      <div className="max-w-[80%] text-sm">
        <div className="h-4 w-1/3 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
        <div className="mt-2 h-3 w-full animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
        <div className="mt-1.5 h-3 w-48 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
        <div className="mt-1.5 h-3 w-[80%] animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
      </div>
    </div>
  );
}

export default PairingSkeleton;
