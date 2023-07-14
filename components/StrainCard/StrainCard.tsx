import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import StarRating from '@/components/StarRating/StarRating';
import dynamic from 'next/dynamic';
import StrainCardLikeButtonLoading from './StrainCardLikeButtonLoading';

const StrainCardLikeButton = dynamic(() => import('./StrainCardLikeButton'), {
  ssr: false,
  loading: () => <StrainCardLikeButtonLoading />,
});

type Props = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: string;
  phenotype: string;
  averageRating: number;
  shortDescription: string;
  nugImage: string;
  flowerImageSvg: string;
  topTerpene: string;
  thcPercent: number;
  topEffect: string;
  cannabinoids: any;
  effects: any;
  terps: any;
  liked: boolean;
  priority: boolean;
};

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

const StrainCard = (props: Props) => {
  return (
    <Link
      href={`/strains/${props.slug}`}
      className="relative z-10 flex gap-5 p-5 mt-4 transition-transform border shadow rounded-xl dark:bg-zinc-900 md:flex-wrap flex-nowrap md:max-w-xs dark:border-opacity-0 border-zinc-100 hover:scale-101"
    >
      <StrainCardLikeButton liked={props.liked} id={props.id} />
      {props.nugImage && props.name && (
        <div className="flex items-center justify-center w-1/2 border rounded-lg md:w-full dark:border-opacity-0 border-zinc-200">
          <Image
            style={{ maxHeight: '250px' }}
            className="object-contain w-full h-full bg-white border border-white rounded-lg aspect-square"
            src={props.nugImage}
            alt={props.name}
            width={300}
            height={300}
            priority={props.priority}
          />
        </div>
      )}
      <div className="w-1/2 md:w-full">
        <div className="inline-block px-2 py-1 text-xs font-medium bg-gray-200 rounded dark:shadow dark:bg-zinc-700">
          {props.phenotype}
        </div>
        <p className="px-1 mt-1 font-medium">{props.name}</p>
        <p className="px-1 text-sm font-normal text-gray-500 h-14 line-clamp-3">
          {props.subtitle
            ? props.subtitle
            : `No description found for ${props.name}`}
        </p>
        <div className="flex flex-row items-center gap-1 p-1 mt-2 text-sm">
          <span className="flex items-center justify-center w-6 h-4">
            {props.averageRating && Math.round(props.averageRating * 10) / 10}
          </span>
          {<StarRating rating={props.averageRating} />}
        </div>
        <div className="flex flex-row gap-4 px-1 text-xs text-zinc-500 dark:text-zinc-300">
          <span className="">THC {props.thcPercent && props.thcPercent}%</span>
          <span className="">
            CBD: {props.cannabinoids && props.cannabinoids.cbd.percentile50}%
          </span>
        </div>
        <div className="flex flex-col px-1 mt-2 text-xs font-medium capitalize md:flex-row md:gap-3 md:items-center">
          <span className="flex flex-row items-center gap-1">
            <div
              style={{ backgroundColor: effects[props.topEffect] }}
              className="rounded-full w-2.5 h-2.5"
            ></div>
            <p className="p-0">{props.topEffect}</p>
          </span>
          <span className="flex flex-row items-center gap-1">
            <div
              style={{ backgroundColor: terpenes[props.topTerpene] }}
              className="rounded-full w-2.5 h-2.5"
            ></div>
            <p className="p-0">{props.topTerpene}</p>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default StrainCard;
