import React from 'react';

const GeneralInformationSkeleton = () => {
  return (
    <>
      <h1 className="text-xl font-bold">General information</h1>
      <h2 className="mt-4 text-lg">About me</h2>
      <div className="mt-1 space-y-2">
        <div className="w-2/3 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        <div className="w-3/4 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        <div className="w-2/5 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        <div className="w-3/5 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        <div className="w-2/3 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        <div className="w-2/4 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
      </div>
      <div className="flex flex-col justify-between mt-6 md:flex-row md:w-4/5">
        <span className="mt-3 text-sm dark:text-white">
          Birthday:
          <div className="h-3 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse w-60"></div>
        </span>
        <span className="mt-3 text-sm dark:text-white">
          Languages:
          <div className="h-3 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse w-60"></div>
        </span>
      </div>
    </>
  );
};

export default GeneralInformationSkeleton;
