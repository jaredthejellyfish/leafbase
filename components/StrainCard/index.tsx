import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import StrainCardLikeButton from './StrainCardLikeButton';
import defaultImage from '@/public/strain.png';
import type { Strain } from '@/lib/types';
import StarRating from './StarRating';
import { cn } from '@/lib/utils/cn';

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
}: {
  strain: Strain;
  priority?: boolean;
  liked?: boolean;
  className?: string;
}) => {
  return (
    <Link
      href={`/strain/${strain.slug}`}
      className={cn(
        'relative z-10 flex gap-5 p-5 mt-4 transition-transform border shadow rounded-xl dark:bg-zinc-900 md:flex-wrap flex-nowrap w-full md:max-w-xs dark:border-opacity-0 border-zinc-100 hover:scale-101',
        className
      )}
    >
      {typeof liked !== 'undefined' && (
        <StrainCardLikeButton liked={liked} id={strain.id} />
      )}
      {strain.nugImage && strain.name && (
        <div className="flex items-center justify-center w-1/2 border rounded-lg md:w-full dark:border-opacity-0 border-zinc-200">
          <Image
            style={{ maxHeight: '250px' }}
            className="bg-zinc-300/10 dark:opacity-90 dark:bg-zinc-950/30 object-contain w-full h-full border border-white dark:border-zinc-800 rounded-lg aspect-square p-4"
            src={strain.nugImage ? strain.nugImage : defaultImage}
            alt={strain.name}
            width={300}
            height={300}
            priority={priority}
          />
        </div>
      )}
      <div className="w-1/2 md:w-full">
        <div className="inline-block w-14 flex items-center justify-center px-2 py-1 text-xs font-medium bg-gray-200 rounded dark:shadow dark:bg-zinc-700">
          {strain.phenotype || 'N/A'}
        </div>
        <p className="px-1 mt-1 font-medium">{strain.name}</p>
        <p className="px-1 text-sm font-normal text-gray-500 h-14 line-clamp-3">
          {strain.subtitle
            ? strain.subtitle
            : `No description found for ${strain.name}`}
        </p>
        <div className="flex flex-row items-center gap-1 p-1 mt-2 text-sm">
          <span className="flex items-center justify-center w-6 h-4">
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
        <div className="flex flex-col px-1 mt-2 text-xs font-medium capitalize md:flex-row md:gap-3 md:items-center">
          {strain.topEffect && (
            <span className="flex flex-row items-center gap-1">
              <div
                style={{
                  backgroundColor: effects[strain.topEffect || 'Unknown'],
                }}
                className="rounded-full w-2.5 h-2.5"
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
                className="rounded-full w-2.5 h-2.5"
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
