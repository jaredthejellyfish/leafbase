import React from 'react';
import prisma from '@/lib/prisma';
import Image from 'next/image';
import StarRating from '@/components/StarRating/StarRating';
import Link from 'next/link';
import { Metadata } from 'next/types';
import { StrainExtended } from '@/types/interfaces';
import { AiOutlineHeart } from 'react-icons/ai';
import StrainSoma from '@/components/StrainSoma/StrainSoma';
import { ErrorBoundary } from 'react-error-boundary';
import CommentLoaderFallback from '@/components/CommentLoader/CommentLoaderFallback';

import dynamic from 'next/dynamic';

const StrainPageLikeButton = dynamic(
  () => import('@/components/StrainPageLikeButton/StrainPageLikeButton'),
  {
    loading: () => (
      <button
        aria-label="Like Strain"
        className={
          'absolute top-1.5 right-2 border bg-white dark:bg-zinc-800 text-zinc-400/75 transition-colors rounded-full p-1.5 dark:text-zinc-400 dark:border-zinc-700'
        }
      >
        <AiOutlineHeart />
      </button>
    ),
  }
);

const CommentLoader = dynamic(
  () => import('@/components/CommentLoader/CommentLoader'),
  {
    ssr: false,
  }
);

const MixersButton = dynamic(() => import('@/components/Mixers/MixersButton'), {
  ssr: false,
});

type Props = { params: { slug: string } };

type Colors = {
  [key: string]: string;
};

const terpenes: Colors = {
  myrcene: '#7EBF73',
  caryophyllene: '#B25C52',
  terpinolene: '#4A7597',
  linalool: '#9A67B5',
  pinene: '#3B8A5A',
  limonene: '#F9B122',
  ocimene: '#2AA39F',
};

const effects: Colors = {
  Hungry: '#FF8C00',
  Giggly: '#FF69B4',
  Euphoric: '#9370DB',
  Energetic: '#F5A623',
  Uplifted: '#20B2AA',
  Aroused: '#FF4500',
  Tingly: '#BA55D3',
  Happy: '#00FF00',
  Focused: '#FFD700',
  null: '#778899',
  Talkative: '#4682B4',
  Creative: '#FFA07A',
  Relaxed: '#8B4513',
  Sleepy: '#1E90FF',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;

  const strain = (await prisma.strain.findUnique({
    where: {
      slug: slug,
    },
    select: {
      name: true,
    },
  })) as StrainExtended;

  return {
    title: `${strain?.name} - Leafbase` || 'Strain',
    description:
      strain.shortDescription || `Description page for ${strain?.name}`,
  };
}

const getStrainBySlug = async (slug: string) => {
  try {
    const strain = await prisma.strain.findUnique({
      where: {
        slug: slug,
      },
      include: {
        comments: {
          include: {
            user: {
              select: {
                name: true,
                image: true,
                location: true,
                displayName: true,
              },
            },
          },
        },
      },
    });

    return strain;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

// export async function generateStaticParams() {
//   const strains = await prisma.strain.findMany({
//     select: {
//       slug: true,
//     },
//   });

//   return strains.map((strains) => ({
//     slug: strains.slug,
//   }));
// }

const StrainPage = async (props: Props) => {
  const strain = (await getStrainBySlug(
    props.params.slug
  )) as unknown as StrainExtended;

  if (!strain) return <div>Error not found</div>;

  return (
    <div className="flex flex-col items-center justify-center px-4 md:px-1/4">
      <nav className="flex w-full mb-2 ml-1 md:w-4/5" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link
              href="/"
              className="inline-flex items-center text-lg font-medium text-gray-700 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
            >
              <svg
                aria-hidden="true"
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <Link
                href={'/strains'}
                className="ml-1 text-lg font-medium text-gray-700 hover:text-green-600 md:ml-2 dark:text-gray-400 dark:hover:text-green-400"
              >
                Strains
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <div className="ml-1 text-lg font-medium text-gray-700 hover:text-green-600 md:ml-2 dark:text-gray-400 dark:hover:text-green-400">
                {strain?.name}
              </div>
            </div>
          </li>
        </ol>
      </nav>
      <div
        id="card"
        className="relative flex flex-col items-center justify-center pb-8 border rounded shadow md:w-4/5 border-zinc-300 dark:border-transparent dark:bg-zinc-900"
      >
        <div className="absolute transform top-6 right-5 md:right-10">
          <StrainPageLikeButton id={strain.id} />
        </div>

        <MixersButton strain={strain} />

        <div
          id="header"
          className="flex flex-col items-center justify-center w-full gap-8 px-5 pt-8 md:flex-row md:px-8"
        >
          <div
            id="vertical-1"
            className="flex items-center justify-center md:w-1/3 h-52"
          >
            {strain.nugImage && (
              <Image
                className="rounded"
                src={strain.nugImage}
                alt={strain?.slug}
                width={200}
                height={200}
              />
            )}
          </div>
          <div id="vertical-2" className="w-full md:w-2/3">
            <div className="flex flex-row items-center gap-3 mb-2">
              <div className="inline-block px-2 py-1 text-xs font-medium bg-gray-200 rounded dark:shadow dark:bg-zinc-700">
                {strain.phenotype}
              </div>
              <div className="flex flex-row gap-4 px-1 text-xs text-zinc-500 dark:text-zinc-300">
                <span className="">
                  THC {strain.thcPercent && strain.thcPercent}%
                </span>
                <span className="">
                  CBD: {strain && strain.cannabinoids.cbd.percentile50}%
                </span>
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-0.5">{strain.name}</h1>
            <h2 className="font-semi text-zinc-400 md:w-2/3 min-h-10">
              {strain.subtitle}
            </h2>
            <span className="flex items-center justify-start w-48 gap-3 mt-1 text-zinc-800 dark:text-zinc-200">
              {strain.averageRating &&
                Math.round(strain.averageRating * 10) / 10}
              <StarRating rating={strain.averageRating || 0} />
            </span>
            <div className="flex flex-row gap-3 mt-1 text-sm font-medium capitalize">
              <span className="flex flex-row items-center gap-1">
                <div
                  style={{
                    backgroundColor:
                      effects[strain.topEffect || 'rgb(70, 130, 180)'],
                  }}
                  className="rounded-full w-2.5 h-2.5"
                ></div>
                <p className="p-0">{strain.topEffect}</p>
              </span>
              <span className="flex flex-row items-center gap-1">
                <div
                  style={{
                    backgroundColor:
                      terpenes[strain.topTerpene || 'rgb(70, 130, 180)'],
                  }}
                  className="rounded-full w-2.5 h-2.5"
                ></div>
                <p className="p-0">{strain.topTerpene}</p>
              </span>
            </div>
          </div>
        </div>
        <div
          id="body"
          className="flex flex-col justify-center w-full gap-5 px-5 md:flex-row md:px-8"
        >
          <div className="mt-3 md:w-1/3">
            <StrainSoma strain={strain} />
          </div>
          <div className="px-0.5 md:w-2/3">{strain.description}</div>
        </div>
      </div>
      <div className="flex flex-col w-full gap-3 mb-2 ml-1 md:w-4/5">
        <ErrorBoundary fallback={<CommentLoaderFallback strain={strain} />}>
          <CommentLoader strain={strain} />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default StrainPage;
