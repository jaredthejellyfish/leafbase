import React from 'react';
import { MdLocationPin } from 'react-icons/md';
import FollowDispensaryButtonSkeleton from './FollowDispensaryButtonSkeleton';

const ProfileSkeleton = () => {
  return (
    <div className="relative z-0 flex flex-col w-full shadow-md p-7 rounded-xl dark:bg-zinc-900">
      <FollowDispensaryButtonSkeleton />
      <div className="flex flex-row items-center gap-4">
        <div className="w-20 h-20 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        <div className="flex flex-col">
          <div className="mb-2 text-lg font-bold ">
            <div className="w-32 h-4 rounded-m bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          </div>
          <span className="mb-1">
            <div className="w-20 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          </span>
          <span className="flex flex-row items-center gap-1 text-sm text-zinc-300">
            <MdLocationPin />
            <div className="overflow-hidden text-zinc-400 hover:text-green-400 overflow-ellipsis">
              <div className="w-20 h-3 mt-0.5 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
