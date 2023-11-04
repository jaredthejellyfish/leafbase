import { MdLocationPin } from 'react-icons/md';
import React from 'react';

const ProfileSkeleton = () => {
  return (
    <div className="flex flex-col w-full shadow-md p-7 rounded-xl dark:bg-zinc-900">
      <div className="w-20 h-20 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
      <div className="w-32 h-4 mt-3 rounded-m bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
      <span className="flex flex-row items-center gap-1 mt-2 text-sm text-zinc-300">
        <div className="w-16 h-3 mt-0 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
      </span>
      <span className="mt-3 text-sm dark:text-white">
        Location:
        <div className="flex flex-row items-center gap-1 mb-3 text-sm text-zinc-300">
          <MdLocationPin />
          <div className="w-20 h-3 mt-0.5 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
        </div>
      </span>
      <span className="text-sm dark:text-white">
        Email Address:
        <div className="w-2/4 h-3 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
      </span>
      <span className="mt-3 text-sm dark:text-white">
        Phone number:
        <div className="w-1/4 h-3 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
      </span>
      <button
        aria-label="Log out"
        type="button"
        disabled
        className="mt-5 text-white bg-green-700 transition-all focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-700 focus:outline-none "
      >
        Log Out
      </button>
    </div>
  );
};

export default ProfileSkeleton;
