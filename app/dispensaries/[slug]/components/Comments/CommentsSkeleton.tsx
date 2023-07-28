import React from 'react';

const CommentsSkeleton = () => (
  <div className="relative z-0 flex flex-col w-full shadow-md p-7 rounded-xl dark:bg-zinc-900">
    <h1 className="text-xl font-bold">Comments</h1>
    <div className="flex flex-col gap-2 mt-2">
      <div className="px-3 py-2 text-sm rounded-lg shadow dark:border dark:border-zinc-500">
        <h2 className="mb-3 text-base font-semibold">
          <div className="w-20 h-4 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        </h2>
        <p className="text-zinc-400">
          <div className="w-2/3 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          <div className="w-2/5 h-3 mt-2 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        </p>
      </div>
      <div className="px-3 py-2 text-sm rounded-lg shadow dark:border dark:border-zinc-500">
        <h2 className="mb-3 text-base font-semibold">
          <div className="w-20 h-4 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        </h2>
        <p className="text-zinc-400">
          <div className="w-2/3 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          <div className="w-2/5 h-3 mt-2 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        </p>
      </div>
      <div className="px-3 py-2 text-sm rounded-lg shadow dark:border dark:border-zinc-500">
        <h2 className="mb-3 text-base font-semibold">
          <div className="w-20 h-4 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        </h2>
        <p className="text-zinc-400">
          <div className="w-2/3 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          <div className="w-2/5 h-3 mt-2 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        </p>
      </div>
      <div className="px-3 py-2 text-sm rounded-lg shadow dark:border dark:border-zinc-500">
        <h2 className="mb-3 text-base font-semibold">
          <div className="w-20 h-4 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        </h2>
        <p className="text-zinc-400">
          <div className="w-2/3 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          <div className="w-2/5 h-3 mt-2 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        </p>
      </div>
    </div>
  </div>
);

export default CommentsSkeleton;
