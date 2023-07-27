import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import StarRating from '@/components/StarRating/StarRating';
import { Strain } from '@prisma/client';
import { Cannabinoids } from '@/types/interfaces';

type Props = {
  strain: Strain;
  price?: Price;
};

type Colors = {
  [key: string]: string;
};

interface Price {
  strainId: string;
  price: number;
}

const effectColors: Colors = {
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

const MenuStrainCard = (props: Props) => {
  const { strain } = props;

  const price = props.price as unknown as Price;
  const cannabinoids = strain.cannabinoids as unknown as Cannabinoids;

  return (
    <Link
      href={`/strains/${strain.slug}`}
      className="relative z-10 flex w-full gap-3 p-5 transition-transform border shadow md:flex-wrap md:w-56 rounded-xl dark:bg-zinc-900 dark:border-opacity-0 border-zinc-100 hover:scale-101"
    >
      {price && (
        <div
          aria-label="Like Strain"
          className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 border bg-white dark:bg-zinc-800 text-zinc-500 rounded-full p-1.5 dark:text-zinc-200 dark:border-zinc-700"
        >
          <p className="px-1 text-sm">{price?.price}€ / g</p>
        </div>
      )}

      {strain.nugImage && strain.name && (
        <div className="flex items-center justify-center w-1/2 border rounded-lg md:w-full dark:border-opacity-0 border-zinc-200">
          <Image
            className="object-contain w-full bg-white border border-white rounded-lg aspect-square"
            src={strain.nugImage}
            alt={strain.name}
            width={100}
            height={100}
          />
        </div>
      )}
      <div className="flex flex-col justify-center w-full gap-1 sm:gap-0">
        <p className="px-1 mt-1 text-lg font-medium truncate">{strain.name}</p>
        <div className="flex flex-row items-center gap-1 p-1 text-sm">
          <span className="flex items-center justify-center w-6 h-4">
            {strain.averageRating && Math.round(strain.averageRating * 10) / 10}
          </span>
          {<StarRating rating={strain.averageRating || 0} />}
        </div>
        <div className="flex flex-row gap-4 px-1 text-xs text-zinc-500 dark:text-zinc-300">
          <span className="">
            THC {strain.thcPercent && strain.thcPercent}%
          </span>
          <span className="">
            CBD:
            {cannabinoids ? cannabinoids.cbd.percentile50 : 'unknown'}%
          </span>
        </div>
        <div className="flex flex-col px-1 mt-2 text-xs font-medium capitalize">
          <span className="flex flex-row items-center gap-1">
            <div
              style={{
                backgroundColor: effectColors[strain.topEffect || 'null'],
              }}
              className="rounded-full w-2.5 h-2.5"
            ></div>
            <p className="p-0">{strain.topEffect}</p>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default MenuStrainCard;
