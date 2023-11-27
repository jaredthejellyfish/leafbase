import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React from 'react';

import StrainCardLikeButton from '@/components/StrainCard/StrainCardLikeButton';
import StrainSuggestionsButton from '@/components/StrainSuggestionsButton';
import { getServerLikedStrains } from '@/lib/utils/getServerLikedStrains';
import StarRating from '@/components/StrainCard/StarRating';
import NavBreadcrumbs from '@/components/NavBreadcrumbs';
import type { StrainWithComments } from '@/lib/types';
import StrainSoma from '@/components/StrainSoma';
import defaultImage from '@/public/default.webp';
import type { Database } from '@/lib/database';
import { isLiked } from '@/lib/utils';
import { notFound } from 'next/navigation';

const CommentSection = dynamic(() => import('@/components/CommentSection'));

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

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = props.params;

  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  const { data: strain } = await supabase
    .from('strains')
    .select('name, shortDescription')
    .eq('slug', slug)
    .returns<StrainWithComments[]>()
    .maybeSingle();

  return {
    title: `${strain?.name} - Leafbase` || 'Strain',
    description:
      strain?.shortDescription || `Description page for ${strain?.name}`,
  };
}

export default async function StrainSlug(props: Props) {
  const { slug } = props.params;

  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  const { data: strainLikes } = await getServerLikedStrains();
  const likes = strainLikes?.map((strainLike) => strainLike.strain_id.id);

  const { data: strain } = await supabase
    .from('strains')
    .select('*, strain_comments ( *, profile:profiles ( displayName, image ) )')
    .eq('slug', slug)
    .returns<StrainWithComments[]>()
    .maybeSingle();

  if (!strain) {
    return notFound();
  }

  return (
    <main className="justify-center px-5 py-3 md:px-16">
      <NavBreadcrumbs
        urls={[
          { name: 'Strains', url: '/strains' },
          {
            name: strain.name as string,
            url: `/strain/${strain.slug}`,
          },
        ]}
      />
      <div
        id="card"
        className="relative flex flex-col items-center justify-center rounded border border-zinc-300 pb-8 shadow dark:border-transparent dark:bg-zinc-900"
      >
        {typeof likes !== 'undefined' ? (
          <div
            id="strain-options"
            className="absolute right-5 top-5 z-0 flex items-center justify-center gap-4 text-zinc-700 dark:text-zinc-400"
          >
            <StrainSuggestionsButton
              slug={strain.slug}
              id={strain.id}
              image={strain.nugImage || ''}
            />
            <StrainCardLikeButton
              id={strain.id}
              liked={isLiked(strain.id, likes)}
              className="static z-0 block"
              width={25}
              height={25}
            />
          </div>
        ) : null}
        <div
          id="header"
          className="flex w-full flex-col items-center justify-center gap-8 px-5 pt-8 md:flex-row md:px-8"
        >
          <div
            id="vertical-1"
            className="flex h-52 items-center justify-center rounded-sm md:w-1/3 md:border md:shadow-sm md:dark:bg-zinc-950/10 md:dark:shadow"
          >
            <Image
              className="rounded"
              src={strain.nugImage ? strain.nugImage : defaultImage}
              alt={strain?.slug}
              width={200}
              priority
              id="strain-image"
              height={200}
            />
          </div>
          <div id="vertical-2" className="w-full md:w-2/3">
            <div className="mb-2 flex flex-row items-center gap-3">
              {strain.phenotype && (
                <div className="inline-block rounded bg-gray-200 px-2 py-1 text-xs font-medium dark:bg-zinc-700 dark:shadow">
                  {strain.phenotype}
                </div>
              )}
              <div className="flex flex-row gap-4 px-1 text-xs text-zinc-500 dark:text-zinc-300">
                {strain.thcPercent ? (
                  <span className="">
                    THC {strain.thcPercent && strain.thcPercent}%
                  </span>
                ) : null}
                {strain.cannabinoids?.cbd?.percentile50 ? (
                  <span className="">
                    CBD: {strain && strain?.cannabinoids?.cbd?.percentile50}%
                  </span>
                ) : null}
              </div>
            </div>
            <h1 className="mb-0.5 text-2xl font-bold">{strain.name}</h1>
            <h2 className="font-semi min-h-10 text-zinc-400 md:w-2/3">
              {strain.subtitle}
            </h2>
            <span className="mt-1 flex w-48 items-center justify-start gap-3 text-zinc-800 dark:text-zinc-200">
              {strain.averageRating &&
                Math.round(strain.averageRating * 10) / 10}
              <StarRating rating={strain.averageRating || 0} />
            </span>
            <div className="mt-1 flex flex-row gap-3 text-sm font-medium capitalize">
              <span className="flex flex-row items-center gap-1">
                <div
                  style={{
                    backgroundColor:
                      effects[strain.topEffect || 'rgb(70, 130, 180)'],
                  }}
                  className="h-2.5 w-2.5 rounded-full"
                ></div>
                <p className="p-0">{strain.topEffect}</p>
              </span>
              <span className="flex flex-row items-center gap-1">
                <div
                  style={{
                    backgroundColor:
                      terpenes[strain.topTerpene || 'rgb(70, 130, 180)'],
                  }}
                  className="h-2.5 w-2.5 rounded-full"
                ></div>
                <p className="p-0">{strain.topTerpene}</p>
              </span>
            </div>
          </div>
        </div>
        <div
          id="body"
          className="flex w-full flex-col justify-center gap-5 px-5 md:flex-row md:px-8"
        >
          <div className="mt-3 md:w-1/3">
            <StrainSoma strain={strain as unknown as StrainWithComments} />
          </div>
          <div className="px-0.5 md:w-2/3" id="strain-description">
            {strain.description}
          </div>
        </div>
      </div>
      <div className="mt-5">
        {strain.strain_comments.length > 0 && (
          <CommentSection
            strainName={strain.name}
            comments={strain.strain_comments}
          />
        )}
      </div>
    </main>
  );
}
