'use client';

import { BsSearch } from 'react-icons/bs';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const SearchResults = dynamic(() => import('../SearchResults'), {ssr: false});

function DrowdownSearchbar() {
  const [query, setQuery] = useState('');

  return (
    <>
      <div className="mb-2 pl-4 py-1.5 pr-5 px-10 flex-row gap-3 bg-white rounded text-black md:hidden flex dark:bg-zinc-700/60 items-center border border-zinc-400 dark:border-zinc-700">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="w-full bg-transparent focus:outline-none dark:text-white"
        ></input>
        <BsSearch className="text-zinc-400/80 dark:text-gray-400" size={20} />
      </div>
      {query.length > 3 && (
        <div
          className="flex z-50 absolute top-13 dark:bg-zinc-800 bg-white border border-zinc-600 border-solid max-w-[93%] xl:max-w-[320px] w-full py-3 px-3 rounded flex-col gap-y-2.5"
          onClick={() => setQuery('')}
        >
          <SearchResults query={query} />
        </div>
      )}
    </>
  );
}

export default DrowdownSearchbar;
