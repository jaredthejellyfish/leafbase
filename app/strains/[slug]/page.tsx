import { ErrorBoundary } from 'react-error-boundary';
import { AiOutlineHeart } from 'react-icons/ai';
import { FiMoreVertical } from 'react-icons/fi';
import { MdError } from 'react-icons/md';
import { Metadata } from 'next/types';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import CommentLoaderFallback from './components/CommentLoader/CommentLoaderFallback';
import NavBreadcrumbs from '@/components/NavBreadcrumbs/NavBreadcrumbs';
import StarRating from '@/components/StarRating/StarRating';
import StrainSoma from './components/StrainSoma/StrainSoma';
import defaultImage from '@/public/webp/default.webp';
import { StrainExtended } from '@/types/interfaces';
import useServerUser from '@/hooks/useServerUser';
import prisma from '@/lib/prisma';

const StrainPageLikeButton = dynamic(
  () => import('./components/StrainPageLikeButton/StrainPageLikeButton'),
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
  () => import('./components/CommentLoader/CommentLoader')
);

const MixersButton = dynamic(() => import('./components/Mixers/MixersButton'), {
  ssr: false,
  loading: () => (
    <div className="absolute text-gray-400 top-8 sm:right-28 sm:left-auto left-8">
      <FiMoreVertical className="cursor-pointer" size={25} />
    </div>
  ),
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
      strain?.shortDescription || `Description page for ${strain?.name}`,
  };
}

const getStrainBySlug = async (slug: string, userId?: string) => {
  try {
    const filter = userId
      ? {
          comments: {
            include: {
              likes: {
                where: {
                  userId: userId,
                },
              },
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
        }
      : {
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
        };
    const strain = await prisma.strain.findUnique({
      where: {
        slug: slug,
      },

      include: {
        ...filter,
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

const Strain = async (props: Props) => {
  const user = await useServerUser();

  const strain = (await getStrainBySlug(
    props.params.slug,
    user?.id
  )) as unknown as StrainExtended;

  if (!strain)
    return (
      <div className="absolute top-0 flex flex-col items-center justify-center w-screen h-screen">
        <MdError size={80} className="text-green-700" />
        <h1 className="mt-5 text-3xl font-semibold text-gray-700 dark:text-gray-400">
          Strain not found!
        </h1>
        <p className="mt-5 text-lg text-gray-700 dark:text-gray-400">
          We couldn&apos;t find the requested strain in our database.
        </p>
        <Link
          href="/strains?filter=re"
          className="mt-5 text-lg font-medium text-green-700 hover:text-green-800 dark:text-green-700 dark:hover:text-green-600"
        >
          Return to Strains
        </Link>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center px-4 md:px-1/4">
      <NavBreadcrumbs
        urls={[
          { name: 'Home', url: '/' },
          { name: 'Strains', url: '/strains' },
          { name: strain.name, url: `/strains/${strain.slug}` },
        ]}
      />
      <div
        id="card"
        className="relative flex flex-col items-center justify-center pb-8 border rounded shadow md:w-4/5 border-zinc-300 dark:border-transparent dark:bg-zinc-900"
      >
        {user && (
          <div className="absolute transform top-6 right-5 md:right-10">
            <StrainPageLikeButton id={strain.id} />
          </div>
        )}
        {user && <MixersButton strain={strain} />}
        <div
          id="header"
          className="flex flex-col items-center justify-center w-full gap-8 px-5 pt-8 md:flex-row md:px-8"
        >
          <div
            id="vertical-1"
            className="flex items-center justify-center md:w-1/3 h-52"
          >
            <Image
              className="rounded"
              src={strain.nugImage ? strain.nugImage : defaultImage}
              alt={strain?.slug}
              width={200}
              height={200}
            />
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
                  CBD: {strain && strain?.cannabinoids?.cbd?.percentile50}%
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
          {user && <CommentLoader strain={strain} user={user} />}
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Strain;
