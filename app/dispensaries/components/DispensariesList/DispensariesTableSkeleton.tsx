import React from 'react';
import { RxCaretDown } from 'react-icons/rx';

const DispensariesTableSkeleton = () => {
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-2 flex flex-col">
      <thead className="text-xs text-gray-700 uppercase bg-zinc-100 dark:bg-zinc-800 dark:text-gray-400">
        <tr className="flex flex-row justify-between items-center">
          <th scope="col" className="px-6 py-3 w-2/3">
            <div className="w-1/2 h-3 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
          </th>
          <th className="flex items-center mr-2 justify-center">
            <RxCaretDown size={20} />
          </th>
        </tr>
      </thead>
    </table>
  );
};

export default DispensariesTableSkeleton;
