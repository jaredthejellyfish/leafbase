import Image from 'next/image';
import Link from 'next/link';

import type { Strain } from '@/lib/types';
import { cn } from '@/lib/utils/cn';

import defaultImage from '@/public/strain.png';

import StarRating from './StarRating';
import StrainCardLikeButton from './StrainCardLikeButton';

import React from 'react';

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
  Unknown: '#778899',
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
  Unknown: '#778899',
};

const StrainCard = ({
  strain,
  priority,
  liked,
  className,
  id,
}: {
  strain: Strain;
  priority?: boolean;
  liked?: boolean;
  className?: string;
  id?: string;
}) => {
  return (
    <Link
      id={id}
      href={`/strains/${strain.slug}`} // <- /strain
      className={cn(
        'hover:scale-101 relative z-10 mt-4 flex max-h-[250px] min-h-[250px] w-full min-w-[240px] flex-nowrap gap-5 rounded-xl border border-zinc-100 p-5 shadow transition-transform md:max-h-fit md:min-h-[440px] md:max-w-xs md:flex-wrap dark:border-transparent dark:bg-zinc-900 ',
        className,
      )}
    >
      {typeof liked !== 'undefined' && (
        <StrainCardLikeButton liked={liked} id={strain.id} />
      )}
      {strain.nugImage && strain.name && (
        <div className="flex w-1/2 items-center justify-center rounded-lg border border-zinc-200 dark:border-transparent md:w-full">
          <Image
            style={{ maxHeight: '250px' }}
            className="aspect-square h-full w-full rounded-lg border border-white bg-zinc-300/10 object-contain p-4 dark:border-zinc-800 dark:bg-zinc-950/30 dark:opacity-90"
            src={strain.nugImage ? strain.nugImage : defaultImage}
            alt={strain.name}
            width={300}
            height={300}
            priority={priority}
          />
        </div>
      )}
      <div className="w-1/2 md:w-full">
        <div className="flex w-14 items-center justify-center rounded bg-gray-200 px-2 py-1 text-xs font-medium dark:bg-zinc-700 dark:shadow">
          {strain.phenotype || 'N/A'}
        </div>
        <p className="mt-1 px-1 font-medium">{strain.name}</p>
        <p className="line-clamp-3 h-14 px-1 text-sm font-normal text-gray-500">
          {strain.subtitle
            ? strain.subtitle
            : `No description found for ${strain.name}`}
        </p>
        <div className="mt-2 flex flex-row items-center gap-1 p-1 text-sm">
          <span className="flex h-4 w-6 items-center justify-center">
            {strain.averageRating
              ? (Math.round(strain.averageRating * 10) / 10).toFixed(1)
              : '0.0'}
          </span>
          {<StarRating rating={strain.averageRating || 0} />}
        </div>
        <div className="flex flex-row gap-4 px-1 text-xs text-zinc-500 dark:text-zinc-300">
          <span className="">THC: {strain.thcPercent || '?'}%</span>

          {strain.cannabinoids && strain.cannabinoids.cbd.percentile50 ? (
            <span className="">
              CBD: {strain.cannabinoids.cbd.percentile50}%
            </span>
          ) : null}
        </div>
        <div className="mt-2 flex flex-col px-1 text-xs font-medium capitalize md:flex-row md:items-center md:gap-3">
          {strain.topEffect && (
            <span className="flex flex-row items-center gap-1">
              <div
                style={{
                  backgroundColor: effects[strain.topEffect || 'Unknown'],
                }}
                className="h-2.5 w-2.5 rounded-full"
              ></div>
              <p className="p-0">{strain.topEffect}</p>
            </span>
          )}
          {strain.topTerpene && (
            <span className="flex flex-row items-center gap-1">
              <div
                style={{
                  backgroundColor: terpenes[strain.topTerpene || 'Unknown'],
                }}
                className="h-2.5 w-2.5 rounded-full"
              ></div>
              <p className="p-0">{strain.topTerpene}</p>
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default StrainCard;
