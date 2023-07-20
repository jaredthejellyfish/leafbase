import React from 'react';

const GeneralInformationSkeleton = () => {
  return (
    <div className="flex flex-col w-full shadow-md p-7 rounded-xl dark:bg-zinc-900">
      <h1 className="mb-2 text-xl font-bold">Description</h1>
      <div className="mt-1 space-y-2">
        <div className="w-2/3 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        <div className="w-3/4 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        <div className="w-2/5 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        <div className="w-3/5 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        <div className="w-2/3 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        <div className="w-2/4 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
      </div>
    </div>
  );
};

export default GeneralInformationSkeleton;
