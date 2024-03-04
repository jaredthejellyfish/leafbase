import React from 'react';

import StarRating from '../StarRating';

const StrainCardSkeleton = () => {
  return (
    <div className="h-[220px] md:min-h-[460px] w-full rounded-xl p-3 shadow-md dark:bg-zinc-900 dark:shadow-none md:max-w-[280px] min-w-[250px] relative border dar">
      <div className="flex flex-row md:flex-col z-0">
        <div
          className="animate-pulse bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 mr-3 flex max-h-[280px] w-1/2 max-w-[280px] items-center justify-center rounded-lg border border-zinc-200 bg-zinc-300/10 dark:border-transparent dark:border-zinc-800 dark:bg-zinc-950/30 sm:mb-1 sm:mr-0 sm:w-full"
          id="image"
        >
          <div className=" md:max-h-[250px] md:w-full size-[190px] md:max-w-[250px] rounded-lg object-contain p-4 dark:opacity-90 md:h-[390px]"></div>
        </div>

        <div className="w-1/2 scale-[93%] md:w-full">
          <div className="mb-1 flex w-14 items-center justify-center rounded bg-gray-200 px-2 py-1 text-xs font-medium dark:bg-zinc-700 dark:shadow">
            N/A
          </div>

          <div className="mt-2 px-1 font-medium mb-1.5">
            <div className="h-4 w-1/3 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
          </div>
          <div className="line-clamp-3 h-14 px-1 text-xs font-normal text-gray-500 sm:text-sm flex flex-col gap-y-1">
            <div className="h-3.5 w-3/4 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
            <div className="h-3.5 w-1/2 animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
          </div>
          <div className="mt-2 flex flex-row items-center gap-1 p-1 text-sm">
            <span className="flex h-4 w-6 items-center justify-center">
              5.0
            </span>
            {<StarRating rating={5} />}
          </div>
          <div className="flex flex-row gap-4 px-1 text-xs text-zinc-500 dark:text-zinc-300">
            <span className="">THC: ??%</span>

            <span className="">CBD: ??%</span>
          </div>
          <div className="mt-2 flex flex-col px-1 text-xs font-medium capitalize md:flex-row md:items-center md:gap-3">
            <span className="flex flex-row items-center gap-1">
              <div
                style={{
                  backgroundColor: 'gray',
                }}
                className="h-2.5 w-2.5 rounded-full"
              ></div>
              <p className="p-0">unknown</p>
            </span>

            <span className="flex flex-row items-center gap-1">
              <div
                style={{
                  backgroundColor: 'gray',
                }}
                className="h-2.5 w-2.5 rounded-full"
              ></div>
              <p className="p-0">unknown</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrainCardSkeleton;
