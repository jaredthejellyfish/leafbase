import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React from 'react';

import StrainCardLikeButton from '@/components/StrainCard/StrainCardLikeButton';
import { getServerLikedStrains } from '@/lib/utils/getServerLikedStrains';
import StarRating from '@/components/StrainCard/StarRating';
import NavBreadcrumbs from '@/components/NavBreadcrumbs';
import PairingsButton from '@/components/PairingsButton';
import type { StrainWithComments } from '@/lib/types';
import StrainSoma from '@/components/StrainSoma';
import defaultImage from '@/public/default.webp';
import type { Database } from '@/lib/database';
import { isLiked } from '@/lib/utils';

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

const StrainSlugPage = async (props: Props) => {
  const { slug } = props.params;

  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  const { data: strainLikes } = await getServerLikedStrains();
  const likes = strainLikes?.map((strainLike) => strainLike.strain_id.id);

  const { data: strain, error } = await supabase
    .from('strains')
    .select('*, strain_comments ( *, profile:profiles ( displayName, image ) )')
    .eq('slug', slug)
    .returns<StrainWithComments[]>()
    .maybeSingle();

  if (!strain) {
    return <pre>{JSON.stringify(error, null, 2)}</pre>;
  }

  return (
    <main className="justify-center px-5 md:px-16 py-3">
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
        className="relative flex flex-col items-center justify-center pb-8 border rounded shadow border-zinc-300 dark:border-transparent dark:bg-zinc-900"
      >
        {typeof likes !== 'undefined' ? (
          <div className="absolute top-5 right-5 z-0 flex items-center justify-center gap-4 dark:text-zinc-400 text-zinc-700">
            <PairingsButton slug={strain.slug} id={strain.id} />
            <StrainCardLikeButton
              id={strain.id}
              liked={isLiked(strain.id, likes)}
              className="block static z-0"
              width={25}
              height={25}
            />
          </div>
        ) : null}
        <div
          id="header"
          className="flex flex-col items-center justify-center w-full gap-8 px-5 pt-8 md:flex-row md:px-8"
        >
          <div
            id="vertical-1"
            className="flex items-center justify-center md:w-1/3 h-52 md:border rounded-sm md:dark:bg-zinc-950/10 md:dark:shadow md:shadow-sm"
          >
            <Image
              className="rounded"
              src={strain.nugImage ? strain.nugImage : defaultImage}
              alt={strain?.slug}
              width={200}
              priority
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
            <StrainSoma strain={strain as unknown as StrainWithComments} />
          </div>
          <div className="px-0.5 md:w-2/3">{strain.description}</div>
        </div>
      </div>
      <div className="mt-5">
        {strain.strain_comments.length > 0 && (
          <CommentSection comments={strain.strain_comments} />
        )}
      </div>
    </main>
  );
};

export default StrainSlugPage;
