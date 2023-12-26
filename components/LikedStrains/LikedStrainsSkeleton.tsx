import { RiPieChart2Fill } from 'react-icons/ri';
import { TbGraphFilled } from 'react-icons/tb';
import React from 'react';

const LikedStrainsSkeleton = () => (
  <div className="px-1">
    <div className="flex flex-row items-center gap-5 text-xl font-bold">
      <div className="flex flex-row items-end gap-x-3">
        <span>Liked Strains</span>
        <span className="text-gradient-to-br animate-pulse from-gray-200 via-green-300 to-green-700 text-lg text-zinc-400">
          (--)
        </span>
      </div>
      <div className="flex flex-row items-center gap-x-3 px-2">
        <TbGraphFilled className="text-gradient-to-br h-6 w-6 animate-pulse from-gray-200 via-green-300 to-green-700" />
        <RiPieChart2Fill className="text-gradient-to-br h-5 w-5 animate-pulse from-gray-200 via-green-300 to-green-700" />
      </div>
    </div>
    <div className="mt-3 flex max-h-[296px] w-full flex-row flex-wrap items-start justify-between gap-1.5 overflow-hidden sm:gap-3">
      {/* Placeholder strains */}
      {Array.from({ length: 10 }, (_, index) => (
        <div
          key={index}
          className="flex min-w-[15%] grow scale-95 flex-col gap-2 rounded border p-2 shadow dark:border-zinc-600 dark:bg-zinc-800 sm:min-w-[12%] md:min-w-[calc(33.333%-1em)] lg:min-w-[calc(25%-1em)] xl:min-w-[calc(20%-1em)]"
        >
          <div className="flex aspect-square h-24 max-h-24 w-full items-center justify-center rounded-md">
            <div className="h-24 w-24 animate-pulse rounded-md bg-gray-300 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400" />
          </div>
          <div className="text-semi text-sm">
            <div className="ml-3 h-4 w-14 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default LikedStrainsSkeleton;
