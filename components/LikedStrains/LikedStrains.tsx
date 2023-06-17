"use client";

import React, { useEffect, useState } from "react";
import useLikedStrains from "@/hooks/useLikedStrains";
import Image from "next/image";
import Link from "next/link";

type Props = {};

type Strain = {
  id: string;
  slug: string;
  nugImage: string;
  name: string;
};

const LikedStrains = (props: Props) => {
  const { strains, isLoading, isFetching, error } = useLikedStrains();
  return (
    <div>
      <span className="text-xl font-bold ">Liked Strains </span>
      {isLoading && (
        <div className="flex flex-row flex-wrap items-center justify-center md:justify-start mt-3 gap-y-3">
          <div className="mr-3 border p-2 flex flex-col gap-2 rounded shadow dark:border-zinc-600">
            <div className="aspect-square bg-white flex items-center justify-center rounded-md w-24"></div>
            <h1 className="text-semi text-sm">
              <div className="h-3 w-20 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
            </h1>
          </div>
          <div className="mr-3 border p-2 flex flex-col gap-2 rounded shadow dark:border-zinc-600">
            <div className="aspect-square bg-white flex items-center justify-center rounded-md w-24"></div>
            <h1 className="text-semi text-sm">
              <div className="h-3 w-20 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
            </h1>
          </div>
          <div className="mr-3 border p-2 flex flex-col gap-2 rounded shadow dark:border-zinc-600">
            <div className="aspect-square bg-white flex items-center justify-center rounded-md w-24"></div>
            <h1 className="text-semi text-sm">
              <div className="h-3 w-20 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
            </h1>
          </div>
          <div className="mr-3 border p-2 flex flex-col gap-2 rounded shadow dark:border-zinc-600">
            <div className="aspect-square bg-white flex items-center justify-center rounded-md w-24"></div>
            <h1 className="text-semi text-sm">
              <div className="h-3 w-20 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
            </h1>
          </div>
          <div className="mr-3 border p-2 flex flex-col gap-2 rounded shadow dark:border-zinc-600">
            <div className="aspect-square bg-white flex items-center justify-center rounded-md w-24"></div>
            <h1 className="text-semi text-sm">
              <div className="h-3 w-20 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-md"></div>
            </h1>
          </div>
        </div>
      )}
      {!isLoading && strains && strains.length === 0 ? (
        "You haven't liked any strains yet!"
      ) : (
        <div className="flex flex-row flex-wrap items-center justify-center md:justify-start mt-3 gap-y-3">
          {strains &&
            strains.map((strain: Strain) => (
              <Link
                key={strain.id}
                className="mr-3 border p-2 flex flex-col gap-2 rounded shadow dark:border-zinc-600"
                href={`/strains/${strain.slug}`}
              >
                <div
                  style={{ maxHeight: "90px", maxWidth: "90px" }}
                  className="aspect-square bg-white flex items-center justify-center rounded-md"
                >
                  <Image
                    src={strain.nugImage}
                    className="rounded-md"
                    alt={strain.name}
                    width={90}
                    height={90}
                    priority={true}
                  />
                </div>
                <h1 className="text-semi text-sm truncate w-20">
                  {strain.name}
                </h1>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
};

export default LikedStrains;
