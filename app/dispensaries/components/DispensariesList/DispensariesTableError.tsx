import React from 'react';

const DispensariesTableError = () => {
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-2 flex flex-col">
      <thead className="text-xs text-gray-700 bg-zinc-100 dark:bg-zinc-800 dark:text-gray-400">
        <tr className="flex flex-row justify-between items-center">
          <th scope="col" className="px-6 py-3 w-2/3">
            No nearby dispensaries found.
          </th>
        </tr>
      </thead>
    </table>
  );
};

export default DispensariesTableError;
