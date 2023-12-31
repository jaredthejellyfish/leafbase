import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { RxCaretDown, RxCaretUp } from 'react-icons/rx';

import StrainCard from '@/components/StrainCard';

import type { Database } from '@/lib/database';
import type { Strain } from '@/lib/types';

import React from 'react';

const NextSectionButton = dynamic(
  () => import('@/components/NextSectionButton'),
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
      <section className="flex h-screen-bar w-full scroll-mt-[6em] items-center justify-center sm:snap-start">
        <ClientParticles
          id="tsparticles1"
          className="absolute left-0 top-16 -z-10 h-[93%] w-full"
        />
        <div className="container px-4 md:px-6 ">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="z-50 animate-gradient bg-gradient-to-br from-green-800 via-green-600 to-green-300 bg-300x bg-clip-text text-5xl font-bold leading-tight text-transparent sm:text-6xl xl:text-7xl">
                Welcome to Leafbase
              </h1>

              <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400">
                The most comprehensive database of cannabis{' '}
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
          className="bonrder-transparent border-top-zinc-500 relative w-full border bg-white py-8 sm:snap-start dark:bg-zinc-900/50"
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
                  <StrainCard
                    key={strain.id}
                    strain={strain}
                    priority={false}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
      <section className="relative flex h-screen w-full items-center justify-center sm:snap-start">
        <ClientParticles
          id="tsparticles2"
          className="absolute -z-10 h-screen"
        />
        <NextSectionButton
          className="absolute bottom-[94vh]"
          nextSectionId="top-strains"
        >
          <RxCaretUp className="h-12 w-12 animate-bounce" />
        </NextSectionButton>
        <div className="container flex flex-col gap-y-12 px-4 md:px-6 xl:flex-row">
          <div id="vertical-1" className="w-full xl:w-1/2">
            <div className="bg-white/60 p-3 dark:bg-zinc-950/60">
              <h2 className="text-3xl font-bold">About Leafbase</h2>
              <p className="mt-1 text-zinc-500 sm:w-3/4 dark:text-zinc-400">
                Welcome to Leafbase, your premier destination for delving into
                the diverse realm of cannabis strains. We pride ourselves on
                being more than a database; we&apos;re your personalized guide
                to the rich tapestry of strains, offering detailed insights into
                lineage, effects, flavors, and medicinal benefits. What sets us
                apart is our innovative pairing and matching features. Explore
                new combinations with our Strain Pairing Wizard, find strains
                based on desired effects, match flavor profiles, and discover
                strains with specific medicinal benefits. Join our community,
                where knowledge meets enjoyment, and let Leafbase be your
                gateway to a curated cannabis experience.
              </p>
            </div>
          </div>
          <div
            id="vertical-2"
            className="flex w-full items-center justify-center xl:w-1/2"
          >
            <div className="flex max-w-2xl flex-col rounded-xl border border-zinc-300 bg-white px-5 py-4 shadow-md sm:flex-row dark:border-transparent dark:bg-zinc-900">
              <Image
                src="https://avatars.githubusercontent.com/u/50416421?v=4"
                alt="Leafbase Logo"
                width={200}
                height={200}
                className="hidden aspect-square rounded-xl sm:block"
              />
              <div className="flex w-full flex-row justify-center sm:ml-4">
                <div className="w-full sm:mt-5">
                  <h3 className="text-2xl font-bold ">Jared Hernandez</h3>
                  <span className="text-zinc-500 dark:text-zinc-400">
                    Creator of Leafbase
                  </span>
                  <p className="mt-1 text-zinc-600 dark:text-zinc-400">
                    I&apos;m a full stack developer with a passion for crafting
                    web applications that are both visually appealing and highly
                    functional.
                  </p>
                </div>
                <Link
                  href="https://github.com/jaredthejellyfish"
                  target="_blank"
                  className=" mr-1 mt-1 flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-300 p-2 underline dark:border-zinc-500"
                >
                  <svg
                    className="h-5 w-5 text-zinc-500"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
