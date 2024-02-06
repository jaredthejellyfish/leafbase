import { RxCaretRight } from 'react-icons/rx';

import React from 'react';

function FriendSkeleton() {
  return (
    <div className="flex flex-row items-center justify-between rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-2 dark:border-zinc-700 dark:bg-zinc-800">
      <div className="flex flex-row items-center justify-start gap-x-4">
        <div className="aspect-square size-12 animate-pulse rounded-full bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400" />
        <div className="flex flex-col gap-0">
          <div className="h-4 w-24 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
          <div className="flex flex-row items-center gap-x-0.5 text-green-700">
            <span className="animate-pulse bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 bg-clip-text text-transparent">
              @
            </span>
            <div className="h-4 w-14 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
          </div>
        </div>
      </div>
      <RxCaretRight size={35} className="justify-self-end" />
    </div>
  );
}

export default function FriendsSkeleton() {
  return (
    <div className="flex w-full flex-col rounded-xl px-7 py-3 pb-4 shadow-md dark:bg-zinc-900">
      <h3 className="mb-1.5 text-xl font-bold">Friends</h3>
      <div className="flex flex-col gap-y-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <FriendSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
