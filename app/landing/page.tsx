import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { RxCaretDown } from 'react-icons/rx';
import Link from 'next/link';
import React from 'react';

import StrainCard from '@/components/StrainCard';
import type { Database } from '@/lib/database';
import type { Strain } from '@/lib/types';

export default async function Component() {
  const supabase = createClientComponentClient<Database>();

  const { data: strains, error } = await supabase
    .from('strains')
    .select('*')
    .order('likes_count', { ascending: false })
    .limit(8)
    .returns<Strain[]>();

  return (
    <>
      <main className="flex-1">
        <section className="w-full h-screen-bar py-[20%]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-6xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-green-600">
                  Welcome to Leafbase
                </h1>
                <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400">
                  The most comprehensive database of strains on the web.
                </p>
              </div>
              <div className="space-x-4">
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-zinc-50 shadow transition-colors hover:bg-green-500/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300"
                  href="/profile"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full absolute bottom-0 flex items-center justify-center h-10">
            <RxCaretDown className=" w-10 h-10 text-green-600 animate-bounce" />
          </div>
        </section>
        {!error && strains && (
          <section className="w-full dark:bg-zinc-900/50 py-8">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold">Top Strains:</h2>
              <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {strains.map((strain) => (
                  <StrainCard key={strain.id} strain={strain} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
