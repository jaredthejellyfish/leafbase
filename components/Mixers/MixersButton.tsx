"use client";

import { StrainExtended } from "@/types/interfaces";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import StarRating from "../StarRating/StarRating";
import Link from "next/link";

type Props = { strain: StrainExtended };

interface Recommendation {
  name: string;
  recommendation: string;
  slug: string;
  nugImage: string;
  averageRating: number;
  category: string;
}

const fetchRecommendedStrainsData = async (strainName: string) => {
  const res = await fetch(
    `/api/recommendations/find-matches`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: strainName,
      }),
    }
  );
  const data = await res.json();

  return data.recommendedStrainsData;
};

const MixersButton = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const strainName = props.strain.name;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    data: recommendedStrainsData,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["recommended-strains", props.strain.name],
    queryFn: () => fetchRecommendedStrainsData(strainName),
    enabled: isModalOpen,
  });

  return (
    <div className="relative">
      <button
        className="px-2 py-1 text-sm text-green-700 transition border border-green-700 rounded-lg w-30 dark:text-zinc-300 hover:bg-green-700 hover:text-white dark:hover:text-white hover:dark:bg-zinc-500 dark:border-zinc-300"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        Matches
      </button>
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            ref={dropdownRef}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.2,
              },
            }}
            className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black/60"
          >
            <div className="relative flex flex-col w-full px-8 py-4 mx-3 bg-white sm:px-10 h-4/7 md:h-4/7 xl:w-2/5 md:w-2/3 rounded-xl dark:bg-zinc-900">
              <div className="flex flex-row items-center justify-between mb-4 text-xl font-bold">
                <h1 className="text-xl">Recommended Strains</h1>
                <button
                  onClick={() => setIsModalOpen(!isModalOpen)}
                  className="p-1 transition-all rounded-full dark:text-white hover:bg-zinc-400 dark:hover:bg-zinc-600 focus:outline-none"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="flex flex-col items-center justify-center h-full">
                {!isLoading && !isFetching && !error ? (
                  recommendedStrainsData.map(
                    (recommendation: Recommendation) => {
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
                              <p className="px-1 font-medium">
                                {recommendation.name}
                              </p>
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
                              <StarRating
                                rating={recommendation.averageRating}
                              />
                            </div>
                          </div>
                        </Link>
                      );
                    }
                  )
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
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MixersButton;
