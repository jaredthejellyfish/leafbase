import { MdLocationPin } from 'react-icons/md';
import React from 'react';

const ProfileSkeleton = () => {
  return (
    <div className="flex w-full flex-col rounded-xl p-7 shadow-md dark:bg-zinc-900">
      <div className="h-20 w-20 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
      <div className="rounded-m mt-3 h-4 w-32 animate-pulse bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
      <span className="mt-2 flex flex-row items-center gap-1 text-sm text-zinc-300">
        <div className="mt-0 h-3 w-16 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
      </span>
      <span className="mt-3 text-sm dark:text-white">
        Location:
        <div className="mb-3 flex flex-row items-center gap-1 text-sm text-zinc-300">
          <MdLocationPin />
          <div className="mt-0.5 h-3 w-20 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
        </div>
      </span>
      <span className="text-sm dark:text-white">
        Email Address:
        <div className="mt-1 h-3 w-2/4 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
      </span>
      <span className="mt-3 text-sm dark:text-white">
        Phone number:
        <div className="mt-1 h-3 w-1/4 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
      </span>
      <button
        aria-label="Log out"
        type="button"
        disabled
        className="mb-2 mr-2 mt-5 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white transition-all focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-green-700 "
      >
        Log Out
      </button>
    </div>
  );
};

export default ProfileSkeleton;
