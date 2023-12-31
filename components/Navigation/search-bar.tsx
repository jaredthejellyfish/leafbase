'use client';

import { X } from 'lucide-react';
import dynamic from 'next/dynamic';
import { BsSearch } from 'react-icons/bs';
import { useMediaQuery } from 'usehooks-ts';

import React, { useState } from 'react';

const SearchResults = dynamic(() => import('../SearchResults'));

function SearchBar() {
  const [query, setQuery] = useState('');
  const matches = useMediaQuery('(min-width: 768px)');

  return (
    <>
      <div className="md:w-46 hidden flex-row items-center gap-3 rounded bg-white py-1.5 pl-4 pr-5 text-black md:flex xl:w-80 dark:bg-zinc-800">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="w-full bg-transparent focus:outline-none dark:text-white"
        ></input>
        {query.length > 0 ? (
          <X
            className="cursor-pointer text-zinc-400/80 transition-colors dark:text-gray-400 hover:dark:text-white"
            size={20}
            onClick={() => {
              setQuery('');
            }}
          />
        ) : (
          <BsSearch className="text-zinc-400/80 dark:text-gray-400" size={20} />
        )}
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
