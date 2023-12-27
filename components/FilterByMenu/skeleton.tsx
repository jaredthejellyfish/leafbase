import { RxCaretDown } from 'react-icons/rx';

import React from 'react';

const FilterByMenuSkeleton = () => {
  return (
    <div className="relative flex flex-row items-center">
      <span className="text mt-4 flex w-40 flex-row items-center justify-end gap-1 text-xs text-zinc-400">
        Sort by
        <span className="flex cursor-pointer flex-row items-center text-zinc-500 dark:text-zinc-300">
          Recommended
          <RxCaretDown className="arrow ml-1.5" size={14} />
        </span>
      </span>
    </div>
  );
};

export default FilterByMenuSkeleton;
