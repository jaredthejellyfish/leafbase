import { ClipboardXIcon } from 'lucide-react';
import React from 'react';

const LikedStrainsSkeleton = () => (
  <div className="px-1">
    <div className="flex flex-row items-center gap-5 text-xl font-bold">
      <p className="">Liked Strains (-)</p>
      <ClipboardXIcon />
    </div>
    <div className="w-full flex flex-row flex-wrap items-start justify-between mt-3 gap-x-1.5 gap-y-1.5 sm:gap-x-3 sm:gap-y-3 overflow-hidden">
      {/* strain start */}
      <div className="flex-grow flex flex-col gap-2 p-2 scale-95 border rounded shadow dark:border-zinc-600 dark:bg-zinc-800 min-w-[15%] sm:min-w-[12%] md:min-w-[calc(33.333%-1em)] lg:min-w-[calc(25%-1em)] xl:min-w-[calc(20%-1em)]">
        <div className="flex h-24 w-24 items-center justify-center rounded-md aspect-square max-h-24 w-full">
          <div className="rounded-md h-24 w-24 bg-gray-300 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse" />
        </div>
        <div className="text-sm text-semi">
          <div className="w-28 h-4 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse ml-3"></div>
        </div>
      </div>
      {/* strain end */}
      {/* strain start */}
      <div className="flex-grow flex flex-col gap-2 p-2 scale-95 border rounded shadow dark:border-zinc-600 dark:bg-zinc-800 min-w-[15%] sm:min-w-[12%] md:min-w-[calc(33.333%-1em)] lg:min-w-[calc(25%-1em)] xl:min-w-[calc(20%-1em)]">
        <div className="flex h-24 w-24 items-center justify-center rounded-md aspect-square max-h-24 w-full">
          <div className="rounded-md h-24 w-24 bg-gray-300 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse" />
        </div>
        <div className="text-sm text-semi">
          <div className="w-28 h-4 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse ml-3"></div>
        </div>
      </div>
      {/* strain end */}
      {/* strain start */}
      <div className="flex-grow flex flex-col gap-2 p-2 scale-95 border rounded shadow dark:border-zinc-600 dark:bg-zinc-800 min-w-[15%] sm:min-w-[12%] md:min-w-[calc(33.333%-1em)] lg:min-w-[calc(25%-1em)] xl:min-w-[calc(20%-1em)]">
        <div className="flex h-24 w-24 items-center justify-center rounded-md aspect-square max-h-24 w-full">
          <div className="rounded-md h-24 w-24 bg-gray-300 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse" />
        </div>
        <div className="text-sm text-semi">
          <div className="w-28 h-4 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse ml-3"></div>
        </div>
      </div>
      {/* strain end */}
      {/* strain start */}
      <div className="flex-grow flex flex-col gap-2 p-2 scale-95 border rounded shadow dark:border-zinc-600 dark:bg-zinc-800 min-w-[15%] sm:min-w-[12%] md:min-w-[calc(33.333%-1em)] lg:min-w-[calc(25%-1em)] xl:min-w-[calc(20%-1em)]">
        <div className="flex h-24 w-24 items-center justify-center rounded-md aspect-square max-h-24 w-full">
          <div className="rounded-md h-24 w-24 bg-gray-300 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse" />
        </div>
        <div className="text-sm text-semi">
          <div className="w-28 h-4 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse ml-3"></div>
        </div>
      </div>
      {/* strain end */}
      {/* strain start */}
      <div className="flex-grow flex flex-col gap-2 p-2 scale-95 border rounded shadow dark:border-zinc-600 dark:bg-zinc-800 min-w-[15%] sm:min-w-[12%] md:min-w-[calc(33.333%-1em)] lg:min-w-[calc(25%-1em)] xl:min-w-[calc(20%-1em)]">
        <div className="flex h-24 w-24 items-center justify-center rounded-md aspect-square max-h-24 w-full">
          <div className="rounded-md h-24 w-24 bg-gray-300 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse" />
        </div>
        <div className="text-sm text-semi">
          <div className="w-28 h-4 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse ml-3"></div>
        </div>
      </div>
      {/* strain end */}
      {/* strain start */}
      <div className="flex-grow flex flex-col gap-2 p-2 scale-95 border rounded shadow dark:border-zinc-600 dark:bg-zinc-800 min-w-[15%] sm:min-w-[12%] md:min-w-[calc(33.333%-1em)] lg:min-w-[calc(25%-1em)] xl:min-w-[calc(20%-1em)]">
        <div className="flex h-24 w-24 items-center justify-center rounded-md aspect-square max-h-24 w-full">
          <div className="rounded-md h-24 w-24 bg-gray-300 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse" />
        </div>
        <div className="text-sm text-semi">
          <div className="w-28 h-4 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse ml-3"></div>
        </div>
      </div>
      {/* strain end */}
    </div>
  </div>
);

export default LikedStrainsSkeleton;
