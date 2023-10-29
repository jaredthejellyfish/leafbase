import { RxCaretDown } from 'react-icons/rx';
import React from 'react';

const FilterByMenuSkeleton = () => {
  return (
    <div className="relative flex flex-row items-center">
      <span className="flex flex-row items-center justify-end w-40 gap-1 mt-4 text-xs text text-zinc-400">
        Sort by
        <span className="flex flex-row items-center cursor-pointer dark:text-zinc-300 text-zinc-500">
          Recommended
          <RxCaretDown className="ml-1.5 arrow" size={14} />
        </span>
      </span>
    </div>
  );
};

export default FilterByMenuSkeleton;
