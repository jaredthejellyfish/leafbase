import Image from 'next/image';
import Link from 'next/link';
import { type RefObject, forwardRef } from 'react';

import LikeButton from '@c/LikeButton';
import StarRating from '@c/StarRating';

import type { Strain } from '@l/types';

import { cn } from '@/lib/utils/cn';

type Props = {
  strain: Strain;
  ref?: RefObject<HTMLAnchorElement>;
  liked?: boolean;
  className?: string;
};

type Colors = Record<string, string>;

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

const StrainCard = forwardRef<HTMLAnchorElement, Props>(
  ({ strain, liked, className }: Props, ref) => {
    return (
      <Link
        ref={ref}
        className={cn(
          'h-[220px] md:min-h-[460px] w-full rounded-xl p-3 shadow-md dark:bg-zinc-900 bg-white dark:shadow-none md:max-w-[280px] min-w-[250px] relative border',
          className,
        )}
        href={`/strains/${strain.slug}`}
      >
        {typeof liked !== 'undefined' && (
          <div className="absolute md:right-2 md:top-2 right-3 top-3 z-10">
            <LikeButton liked={liked} strain_id={strain.id} iconSize={18} />
          </div>
        )}
        <div className="flex flex-row md:flex-col z-0">
          <div
            className="mr-3 flex max-h-[280px] w-1/2 max-w-[280px] items-center justify-center rounded-lg border border-zinc-200 bg-zinc-300/10 dark:border-transparent dark:border-zinc-800 dark:bg-zinc-950/30 sm:mb-1 sm:mr-0 sm:w-full"
            id="image"
          >
            <Image
              className="md:h-[390px] md:max-h-[250px] md:w-full size-[190px] md:max-w-[250px] rounded-lg object-contain p-4 dark:opacity-90"
              width={250}
              height={250}
              alt={`${strain.name} nug shot`}
              src={strain.nugImage ?? '/static/placeholder.jpg'}
            />
          </div>

          <div className="w-1/2 scale-[93%] md:w-full">
            <div className="mb-1 flex w-14 items-center justify-center rounded bg-gray-200 px-2 py-1 text-xs font-medium dark:bg-zinc-700 dark:shadow">
              {strain.phenotype ?? 'N/A'}
            </div>

            <span className="mt-1 px-1 font-medium">{strain.name}</span>
            <span className="line-clamp-3 h-14 px-1 text-xs font-normal text-gray-500 sm:text-sm">
              {strain.subtitle
                ? strain.subtitle
                : `No description found for ${strain.name}`}
            </span>
            <div className="mt-2 flex flex-row items-center gap-1 p-1 text-sm">
              <span className="flex h-4 w-6 items-center justify-center">
                {strain.averageRating
                  ? (Math.round(strain.averageRating * 10) / 10).toFixed(1)
                  : '0.0'}
              </span>
              {<StarRating rating={strain.averageRating ?? 0} />}
            </div>
            <div className="flex flex-row gap-4 px-1 text-xs text-zinc-500 dark:text-zinc-300">
              <span className="">THC: {strain.thcPercent ?? '?'}%</span>

              {strain.cannabinoids?.cbd?.percentile50 ? (
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
        </div>
      </Link>
    );
  },
);

StrainCard.displayName = 'StrainCard';

export default StrainCard;
