'use client';

import { useOnClickOutside } from 'usehooks-ts';
import React, { useRef, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import dynamic from 'next/dynamic';

const SearchResults = dynamic(() => import('../SearchResults'), { ssr: false });

function DropdownSearchbar() {
  const [query, setQuery] = useState('');

  const ref = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = () => {
    setQuery('');
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <>
      <div className="mb-2 flex flex-row items-center gap-3 rounded border border-zinc-400 bg-white px-10 py-1.5 pl-4 pr-5 text-black dark:border-zinc-700 dark:bg-zinc-700/60 md:hidden">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="w-full bg-transparent focus:outline-none dark:text-white"
        ></input>
        <BsSearch className="text-zinc-400/80 dark:text-gray-400" size={20} />
      </div>
      {query.length > 1 && (
        <div
          className="top-13 absolute z-50 flex w-full max-w-[93%] flex-col gap-y-2.5 rounded border border-solid border-zinc-600 bg-white p-3 dark:bg-zinc-800 xl:max-w-[320px]"
          onClick={() => setQuery('')}
          ref={ref}
        >
          <SearchResults query={query} />
        </div>
      )}
    </>
  );
}

export default DropdownSearchbar;
