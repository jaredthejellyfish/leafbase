'use client';

import { X } from 'lucide-react';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useMediaQuery } from 'usehooks-ts';

const SearchResults = dynamic(() => import('./search-results'));

function SearchBar() {
  const [query, setQuery] = useState('');
  const matches = useMediaQuery('(min-width: 768px)');

  return (
    <div className="relative">
      <div className="md:w-46 hidden flex-row items-center gap-3 rounded bg-white py-1.5 pl-4 pr-5 text-black dark:bg-zinc-800 md:flex xl:w-80">
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
        <div onClick={() => setQuery('')}>
          <SearchResults query={query} />
        </div>
      )}
    </div>
  );
}

export default SearchBar;
