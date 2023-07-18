'use client';

import { StrainExtended } from '@/types/interfaces';
import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import StarRating from '../StarRating/StarRating';
import Link from 'next/link';
import Modal from '../Modal/Modal';
import { FiMoreVertical } from 'react-icons/fi';

type Props = { strain: StrainExtended };

interface Recommendation {
  name: string;
  recommendation: string;
  slug: string;
  nugImage: string;
  averageRating: number;
  category: string;
}

const fetchRecommendedStrainsData = async (
  strainName: string,
  strainId: string
) => {
  const res = await fetch(`/api/strains/mixers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      strainName: strainName,
      strainId: strainId,
    }),
  });
  const data = await res.json();

  return data.mixers;
};

const MixersButton = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const strainName = props.strain.name;
  const strainId = props.strain.id;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    data: recommendedStrainsData,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['recommended-strains', props.strain.name],
    queryFn: () => fetchRecommendedStrainsData(strainName, strainId),
    enabled: isModalOpen,
  });

  return (
    <>
      <div className="absolute text-gray-400 top-8 sm:right-28 sm:left-auto left-8">
        <FiMoreVertical
          className="cursor-pointer"
          size={25}
          onClick={() => setIsModalOpen(!isModalOpen)}
        />
      </div>
      <div className="relative">
        <Modal
          title="Recommended Strains"
          containerClasses="h-4/7 md:h-4/7 xl:w-2/5 md:w-2/3"
          open={isModalOpen}
          close={() => setIsModalOpen(!isModalOpen)}
        >
          {!isLoading &&
          !isFetching &&
          !error &&
          recommendedStrainsData.length > 0 ? (
            recommendedStrainsData.map((recommendation: Recommendation) => {
              return (
                <Link
                  href={`/strains/${recommendation.slug}`}
                  key={recommendation.name}
                  className="flex flex-row w-full p-3 mb-3 border rounded shadow dark:border-zinc-700"
                >
                  <Image
                    width={144}
                    height={144}
                    className="object-cover p-2 bg-white rounded w-28 md:w-36 md:h-36"
                    src={recommendation.nugImage}
                    alt={recommendation.name}
                  />
                  <div className="flex flex-col items-start justify-center w-2/3 py-2 ml-5">
                    <div className="flex flex-row gap-3">
                      <p className="px-1 font-medium">{recommendation.name}</p>
                      <div className="inline-block px-2 py-1 text-xs font-medium bg-gray-200 rounded dark:shadow dark:bg-zinc-700">
                        {recommendation.category}
                      </div>
                    </div>

                    <div className="px-1 my-2 text-sm font-normal text-gray-500 h-14 line-clamp-3">
                      {recommendation.recommendation}
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <p className="px-1 mt-1 text-sm font-medium dark:text-zinc-200">
                        {recommendation.averageRating.toFixed(1)}
                      </p>
                      <StarRating rating={recommendation.averageRating} />
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <>
              <div className="flex flex-row w-full p-3 mb-3 border rounded shadow dark:border-zinc-700">
                <div className="rounded w-36 h-36 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                <div className="flex flex-col items-start justify-center w-2/3 py-2 ml-5">
                  <div className="w-16 h-4 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                  <div className="flex flex-col gap-1 my-2">
                    <div className="w-48 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                    <div className="w-48 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                    <div className="w-48 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <div className="w-10 h-4 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                    <div className="flex flex-row">
                      <div className="w-4 h-4 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                      <div className="w-4 h-4 ml-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                      <div className="w-4 h-4 ml-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                      <div className="w-4 h-4 ml-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                      <div className="w-4 h-4 ml-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row w-full p-3 mb-3 border rounded shadow dark:border-zinc-700">
                <div className="rounded w-36 h-36 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                <div className="flex flex-col items-start justify-center w-2/3 py-2 ml-5">
                  <div className="w-16 h-4 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                  <div className="flex flex-col gap-1 my-2">
                    <div className="w-48 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                    <div className="w-48 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                    <div className="w-48 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <div className="w-10 h-4 mt-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                    <div className="flex flex-row">
                      <div className="w-4 h-4 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                      <div className="w-4 h-4 ml-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                      <div className="w-4 h-4 ml-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                      <div className="w-4 h-4 ml-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                      <div className="w-4 h-4 ml-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row w-full p-3 mb-3 border rounded shadow dark:border-zinc-700">
                <div className="rounded w-36 h-36 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                <div className="flex flex-col items-start justify-center w-2/3 py-2 ml-5">
                  <div className="w-16 h-4 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                  <div className="flex flex-col gap-1 my-2">
                    <div className="w-48 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                    <div className="w-48 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                    <div className="w-48 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                  </div>
                  <div className="flex flex-row items-center justify-center gap-2">
                    <div className="w-10 h-4 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                    <div className="flex flex-row">
                      <div className="w-4 h-4 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                      <div className="w-4 h-4 ml-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                      <div className="w-4 h-4 ml-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                      <div className="w-4 h-4 ml-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                      <div className="w-4 h-4 ml-1 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Modal>
      </div>
    </>
  );
};

export default MixersButton;
