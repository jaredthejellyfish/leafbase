'use client';

import { X } from 'lucide-react';
import dynamic from 'next/dynamic';
import React, { useRef, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useOnClickOutside } from 'usehooks-ts';

import navDropdownStore from '@/lib/store/nav-dropdown';

const SearchResults = dynamic(() => import('./search-results-dropdown'), {
  ssr: false,
});

function DropdownSearchbar() {
  const [query, setQuery] = useState('');
  const { isOpen: open, toggle } = navDropdownStore((state) => state);

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
      {open && query.length > 1 && (
        <div
          className="w-full"
          onClick={() => {
            setQuery('');
            toggle(false);
          }}
          ref={ref}
        >
          <SearchResults query={query} />
        </div>
      )}
    </>
  );
}

export default DropdownSearchbar;
