'use client';

import React, { useState, useRef } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import Link from 'next/link';

const fetchSearchResults = async (search: string) => {
  const res = await fetch(`/api/strains/search?query=${search}`);
  const data = (await res.json()) as {
    strains: {
      name: string | null;
      slug: string;
      id: string;
    }[];
  };

  return data;
};

const generateStrainUrl = (strainSlug: string) => {
  return `/strains/${strainSlug}`;
};

interface Props {
  containerClassName?: string;
}

const NavigationSearchBar = (props: Props) => {
  const [search, setSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['search-results', searchQuery],
    queryFn: () => fetchSearchResults(searchQuery),
    cacheTime: 3000,
    enabled: Boolean(searchQuery),
  });

  const debouncedHandleChangeRef = useRef(
    debounce((input: string) => setSearchQuery(input), 300)
  );

  const debouncedHandleChange = (input: string) => {
    setSearch(input);
    debouncedHandleChangeRef.current(input);
  };

  return (
    <>
      <div className={props.containerClassName}>
        <input
          value={search}
          placeholder="Search..."
          className="w-full bg-transparent focus:outline-none dark:text-white"
          onChange={(e) => debouncedHandleChange(e.target.value)}
        ></input>
        <BsSearch className="text-zinc-400/80 dark:text-gray-400" size={20} />
      </div>
      {search &&
        data &&
        !isFetching &&
        !isLoading &&
        !error &&
        data?.strains?.length > 0 && (
          <div className="absolute flex-col hidden gap-4 px-4 py-5 rounded bg-white shadow dark:bg-zinc-800 md:flex top-16 right-60 xl:min-w-[388px] md:min-w-[248px]">
            {data.strains.map((strain) => (
              <div
                className="flex flex-row items-center gap-5 px-2.5 "
                key={strain.slug}
              >
                <BsSearch
                  className="flex items-center justify-center text-zinc-700/80 dark:text-gray-400"
                  size={25}
                />
                <Link
                  className="flex flex-col leading-none"
                  href={generateStrainUrl(strain.slug)}
                  onClick={() => setSearch('')}
                >
                  <p>{strain.name}</p>
                  <p className="text-sm text-green-700/75">strain</p>
                </Link>
              </div>
            ))}
          </div>
        )}
    </>
  );
};

export default NavigationSearchBar;
