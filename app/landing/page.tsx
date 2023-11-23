import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { RxCaretDown } from 'react-icons/rx';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';

import NextSectionButton from '@/components/NextSectionButton';
import StrainCard from '@/components/StrainCard';
import type { Database } from '@/lib/database';
import type { Strain } from '@/lib/types';

const ClientParticles = dynamic(() => import('@/components/ClientParticles'), {
  ssr: false,
});

export default async function Component() {
  const supabase = createClientComponentClient<Database>();

  const { data: strains, error } = await supabase
    .from('strains')
    .select('*')
    .order('likes_count', { ascending: false })
    .limit(8)
    .returns<Strain[]>();

  return (
    <main className="flex-1 snap-y snap-proximity">
      <section className="w-full h-screen-bar py-[60%] sm:py-[40%] lg:py-[20%] snap-center">
        <ClientParticles className="absolute top-16 left-0 w-full -z-10 h-[93%]" />
        <div className="container px-4 md:px-6 ">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="z-50 text-5xl sm:text-6xl xl:text-7xl font-bold leading-tight bg-gradient-to-br from-green-800 via-green-600 to-green-300 text-transparent bg-clip-text">
                Welcome to Leafbase
              </h1>

              <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400">
                The most comprehensive database of{' '}
                <Link href="/strains" className="underline text-green-700">
                  strains
                </Link>{' '}
                on the web.
              </p>
            </div>
            <div className="space-x-3 z-50">
              <Link
                className="border border-zinc-500 inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-white dark:bg-zinc-900"
                href="/auth/signin"
              >
                Log in
              </Link>
              <span>or</span>
              <Link
                className="border border-zinc-500 inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-white dark:bg-zinc-900"
                href="/auth/signup"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full absolute bottom-0 flex items-center justify-center h-10">
          <NextSectionButton>
            <RxCaretDown className=" w-12 h-12 animate-bounce" />
          </NextSectionButton>
        </div>
      </section>
      {!error && strains && (
        <section className="w-full snap-center relative bg-white bg-zinc-900/50 py-8">
          <div className="w-full h-full ">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold">Top Strains:</h2>
              <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {strains.map((strain) => (
                  <StrainCard key={strain.id} strain={strain} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
