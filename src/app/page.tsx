import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BsCaretDown } from 'react-icons/bs';

import StrainsFan from '@c/StrainsFan';

import { getPaginatedStrains } from '@l/utils/getPaginatedStrains';

export default async function Landing() {
  const { strains } = await getPaginatedStrains('re', 1, 4);

  return (
    <main className="snap-y snap-mandatory overflow-hidden">
      <section className="h-screen-bar relative sm:px-10">
        <div className="flex flex-col gap-y-1.5 absolute top-[33vh] sm:top-[36vh] lg:left-32 px-5 sm:px-0 z-50">
          <h1 className="text-4xl sm:text-7xl font-semibold">
            Welcome to Leafbase
          </h1>
          <h3 className="text-lg sm:text-xl pl-1 sm:pl-1.5 text-zinc-600 dark:text-zinc-400">
            The most comprehensive database of cannabis{' '}
            <Link
              href="/strains"
              className="text-green-700 hover:underline transition-all underline-offset-2"
            >
              strains
            </Link>{' '}
            on the web.
          </h3>
        </div>
        <div className="h-screen-bar top-0 z-0 relative blur-3xl opacity-50">
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[480px] absolute top-[290px] left-2/4 blob-1 rot"
          >
            <path
              fill="#24A148"
              d="M31.7,-51.4C44.5,-47.5,60.8,-46,68.4,-37.8C76.1,-29.6,75.3,-14.8,73.4,-1.1C71.4,12.6,68.5,25.2,59.9,31.9C51.4,38.6,37.3,39.3,26.3,43.3C15.4,47.2,7.7,54.4,-3.5,60.4C-14.6,66.3,-29.2,71.2,-39.3,66.7C-49.3,62.2,-54.7,48.5,-63.7,35.8C-72.7,23.1,-85.3,11.6,-85,0.2C-84.6,-11.2,-71.4,-22.4,-60.8,-32.3C-50.2,-42.2,-42.2,-50.7,-32.5,-56.4C-22.8,-62.1,-11.4,-64.9,-1,-63.2C9.4,-61.5,18.9,-55.3,31.7,-51.4Z"
              transform="translate(100 100)"
            />
          </svg>
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[580px] absolute rotate-90 fill-green-700 blob-2 -left-48"
          >
            <path
              d="M42.2,-64.8C55.6,-57.1,67.9,-46.9,72.3,-34C76.7,-21.1,73.1,-5.5,69.6,9.1C66.1,23.7,62.5,37.4,54.1,46.5C45.7,55.7,32.4,60.4,19.2,63.4C5.9,66.5,-7.2,68,-22,67.2C-36.8,66.4,-53.3,63.4,-60,53.3C-66.7,43.2,-63.6,25.9,-60.7,11.9C-57.7,-2.1,-54.7,-12.9,-50.5,-23.4C-46.3,-34,-40.7,-44.4,-32.1,-54.3C-23.5,-64.2,-11.7,-73.6,1.3,-75.7C14.4,-77.7,28.8,-72.5,42.2,-64.8Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
        <BsCaretDown className="absolute bottom-2 left-2/4 text-4xl animate-bounce" />
      </section>
      <section className="md:h-screen-bar snap-center relative">
        <h2 className="text-3xl md:text-5xl font-semibold sm:px-8 mb-2 sm:mb-0 px-3">
          Top strains
        </h2>
        <StrainsFan strains={strains} />
      </section>
      <section className="h-screen-bar relative sm:px-10 flex items-center lg:mx-16">
        <div className="flex lg:flex-row flex-col gap-y-10 px-5 sm:px-0 z-50 w-full justify-between">
          <div>
            <h3 className="text-2xl font-semibold mb-1.5">About Leafbase:</h3>
            <div className="max-w-xl">
              Leafbase is your go-to source for exploring the vast world of
              cannabis strains. Beyond a simple database, we offer in-depth
              details on strain lineage, effects, flavors, and medical
              advantages. Dive into our community for a tailored cannabis
              journey.
            </div>
          </div>
          <div className="flex max-w-2xl flex-col rounded-xl border border-zinc-300 bg-white px-5 py-4 shadow-md dark:border-transparent dark:bg-zinc-900 sm:flex-row">
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
                className=" mr-1 mt-1 flex size-9 items-center justify-center rounded-xl border border-zinc-300 p-2 underline dark:border-zinc-500"
              >
                <svg
                  className="size-5 text-zinc-500"
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

        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[480px] absolute top-[-190px] left-2/4 blob-1 blur-3xl opacity-60 -z-10"
        >
          <path
            fill="#24A148"
            d="M31.7,-51.4C44.5,-47.5,60.8,-46,68.4,-37.8C76.1,-29.6,75.3,-14.8,73.4,-1.1C71.4,12.6,68.5,25.2,59.9,31.9C51.4,38.6,37.3,39.3,26.3,43.3C15.4,47.2,7.7,54.4,-3.5,60.4C-14.6,66.3,-29.2,71.2,-39.3,66.7C-49.3,62.2,-54.7,48.5,-63.7,35.8C-72.7,23.1,-85.3,11.6,-85,0.2C-84.6,-11.2,-71.4,-22.4,-60.8,-32.3C-50.2,-42.2,-42.2,-50.7,-32.5,-56.4C-22.8,-62.1,-11.4,-64.9,-1,-63.2C9.4,-61.5,18.9,-55.3,31.7,-51.4Z"
            transform="translate(100 100)"
          />
        </svg>
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[580px] absolute rotate-90 fill-green-700 blob-2 blur-3xl opacity-60 -z-10"
        >
          <path
            d="M42.2,-64.8C55.6,-57.1,67.9,-46.9,72.3,-34C76.7,-21.1,73.1,-5.5,69.6,9.1C66.1,23.7,62.5,37.4,54.1,46.5C45.7,55.7,32.4,60.4,19.2,63.4C5.9,66.5,-7.2,68,-22,67.2C-36.8,66.4,-53.3,63.4,-60,53.3C-66.7,43.2,-63.6,25.9,-60.7,11.9C-57.7,-2.1,-54.7,-12.9,-50.5,-23.4C-46.3,-34,-40.7,-44.4,-32.1,-54.3C-23.5,-64.2,-11.7,-73.6,1.3,-75.7C14.4,-77.7,28.8,-72.5,42.2,-64.8Z"
            transform="translate(100 100)"
          />
        </svg>
      </section>
    </main>
  );
}
