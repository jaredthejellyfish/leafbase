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
      <div className="pl-4 py-1.5 pr-5 flex-row gap-3 bg-white rounded text-black hidden md:flex dark:bg-zinc-800 items-center md:w-46 xl:w-80">
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
          className="flex z-50 absolute top-16 bg-zinc-800 max-w-[265px] xl:max-w-[320px] w-full py-2 px-3 rounded flex-col gap-y-2.5"
          onClick={() => setQuery('')}
        >
          <SearchResults query={query} />
        </div>
      )}
    </>
  );
}

export default SearchBar;
