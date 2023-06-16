import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  id: string | undefined;
  slug: string | undefined;
  name: string | undefined;
  subtitle: string | undefined;
  category: string | undefined;
  phenotype: string | undefined;
  averageRating: number | undefined;
  shortDescription: string | undefined;
  nugImage: string | undefined;
  flowerImageSvg: string | undefined;
  topTerpene: string | undefined;
  thcPercent: number | undefined;
  topEffect: string | undefined;
  cannabinoids: any | undefined;
  effects: any | undefined;
  terps: any | undefined;
  liked: boolean | undefined;
  priority: boolean | undefined;
};

const StarRating = (props: { rating: number }) => {
  const rating = props.rating;
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(
        <span className="h-4 w-4 flex justify-center items-center" key={i}>
          ★
        </span>
      );
    } else {
      stars.push(
        <span className="h-4 w-4 flex justify-center items-center" key={i}>
          ☆
        </span>
      );
    }
  }
  return (
    <div className="flex flex-row gap-1 text-black dark:text-zinc-400 dark:tex-white">
      {stars}
    </div>
  );
};

const StrainCard = (props: Props) => {
  return (
    <div className="mt-4 p-5 rounded-xl shadow dark:bg-zinc-900 flex md:flex-wrap flex-nowrap gap-5 md:max-w-xs dark:border-opacity-0 border border-zinc-100">
      {props.nugImage && props.name && (
        <div className=" w-1/2 flex rounded-lg items-center justify-center md:w-full dark:border-opacity-0 border border-zinc-100">
          <Image
            style={{ maxHeight: "250px" }}
            className="rounded-lg w-full h-full object-cover bg-white aspect-square py-5"
            src={props.nugImage}
            alt={props.name}
            width={350}
            height={350}
            priority={props.priority}
          />
        </div>
      )}
      <div className="md:w-full w-1/2">
        <div className="bg-gray-200 dark:shadow rounded px-2 py-1 text-xs font-medium dark:bg-zinc-700 inline-block">
          {props.phenotype}
        </div>
        <p className="px-1 font-medium mt-1">{props.name}</p>
        <p className="px-1 text-sm font-normal text-gray-500 h-14 line-clamp-3">
          {props.subtitle
            ? props.subtitle
            : `No description found for ${props.name}`}
        </p>
        <div className="flex flex-row text-sm items-center p-1 gap-1 mt-2">
          <span className="h-4 w-6 flex justify-center items-center">
            {props.averageRating && Math.round(props.averageRating * 10) / 10}
          </span>
          {<StarRating rating={3.2} />}
        </div>
        <div className="flex flex-row text-zinc-500 dark:text-zinc-300 text-xs px-1 gap-4">
          <span className="">THC {props.thcPercent && props.thcPercent}%</span>
          <span className="">
            CBD: {props.cannabinoids && props.cannabinoids.cbd.percentile50}%
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:gap-3 px-1 font-medium mt-2 text-xs capitalize md:items-center">
          <span>O {props.topEffect}</span>
          <span>O {props.topTerpene}</span>
        </div>
        <div className="w-full text-sm py-2 mt-3 border rounded border-green-700 text-green-700 dark:border-zinc-500 dark:text-zinc-500">
          <Link
            className="flex items-center justify-center"
            href={`/strains/${props.slug}`}
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StrainCard;
