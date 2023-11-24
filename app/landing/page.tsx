import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { RxCaretDown } from 'react-icons/rx';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';

import StrainCard from '@/components/StrainCard';
import type { Database } from '@/lib/database';
import type { Strain } from '@/lib/types';

const NextSectionButton = dynamic(
  () => import('@/components/NextSectionButton'),
  {
    ssr: false,
    loading: () => <RxCaretDown className=" h-12 w-12" />,
  }
);

const ClientParticles = dynamic(() => import('@/components/ClientParticles'), {
  ssr: false,
});

export default async function Landing() {
  const supabase = createClientComponentClient<Database>();

  const { data: strains, error } = await supabase
    .from('strains')
    .select('*')
    .order('likes_count', { ascending: false })
    .limit(8)
    .returns<Strain[]>();

  return (
    <main className="flex-1">
      <section
        className="flex h-screen-bar w-full items-center justify-center "
        style={{ scrollSnapAlign: 'start', scrollMarginTop: '6rem' }}
      >
        <ClientParticles className="absolute left-0 top-16 -z-10 h-[93%] w-full" />
        <div className="container px-4 md:px-6 ">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="z-50 animate-gradient bg-gradient-to-br from-green-800 via-green-600 to-green-300 bg-300x bg-clip-text text-5xl font-bold leading-tight text-transparent sm:text-6xl xl:text-7xl">
                Welcome to Leafbase
              </h1>

              <p className="mx-auto max-w-[700px] text-zinc-500 dark:text-zinc-400 md:text-xl">
                The most comprehensive database of{' '}
                <Link href="/strains" className="text-green-700 underline">
                  strains
                </Link>{' '}
                on the web.
              </p>
            </div>
            <div className="z-50 space-x-3">
              <Link
                id="login"
                className="inline-flex h-9 items-center justify-center rounded-md border border-zinc-500 bg-white px-4 py-2 text-sm font-medium dark:bg-zinc-900"
                href="/auth/signin"
              >
                Log in
              </Link>
              <span>or</span>
              <Link
                id="signup"
                className="inline-flex h-9 items-center justify-center rounded-md border border-zinc-500 bg-white px-4 py-2 text-sm font-medium dark:bg-zinc-900"
                href="/auth/signup"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 flex h-10 w-full items-center justify-center">
          <NextSectionButton nextSectionId="top-strains">
            <RxCaretDown className=" h-12 w-12 animate-bounce" />
          </NextSectionButton>
        </div>
      </section>
      {!error && strains && (
        <section
          style={{ scrollSnapAlign: 'start' }}
          className="bonrder-transparent border-top-zinc-500 relative w-full border bg-white py-8 dark:bg-zinc-900/50"
          id="top-strains"
        >
          <div className="h-full w-full ">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold">Top Strains:</h2>
              <div
                id={'top-strain-cards'}
                className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
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
