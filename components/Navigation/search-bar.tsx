'use client';

import { useMediaQuery } from 'usehooks-ts';
import { BsSearch } from 'react-icons/bs';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const SearchResults = dynamic(() => import('../SearchResults'));

function SearchBar() {
  const [query, setQuery] = useState('');
  const matches = useMediaQuery('(min-width: 768px)');

  return (
    <>
      <div className="md:w-46 hidden flex-row items-center gap-3 rounded bg-white py-1.5 pl-4 pr-5 text-black dark:bg-zinc-800 md:flex xl:w-80">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="w-full bg-transparent focus:outline-none dark:text-white"
        ></input>
        <BsSearch className="text-zinc-400/80 dark:text-gray-400" size={20} />
      </div>
      {query.length > 1 && matches && (
        <div
          className="absolute top-16 z-50 flex w-full max-w-[265px] flex-col gap-y-2.5 rounded bg-zinc-800 px-3 py-2 xl:max-w-[320px]"
          onClick={() => setQuery('')}
        >
          <SearchResults query={query} />
        </div>
      )}
    </>
  );
}

export default SearchBar;
