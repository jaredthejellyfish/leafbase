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
  const { strains, isLoading } = useLikedStrains();
  return (
    <div>
      <span className="text-xl font-bold ">
        Liked Strains ({strains?.length})
      </span>
      {isLoading && (
        <div className="flex flex-row flex-wrap items-center justify-center mt-3 md:justify-start gap-y-3">
          <div className="flex flex-col gap-2 p-2 mr-3 border rounded shadow dark:border-zinc-600">
            <div
              style={{ maxHeight: "90px", maxWidth: "90px" }}
              className="flex items-center justify-center w-24 bg-white rounded-md aspect-square bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"
            ></div>
            <h1 className="text-sm text-semi">
              <div className="w-20 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            </h1>
          </div>
          <div className="flex flex-col gap-2 p-2 mr-3 border rounded shadow dark:border-zinc-600">
            <div
              style={{ maxHeight: "90px", maxWidth: "90px" }}
              className="flex items-center justify-center w-24 bg-white rounded-md aspect-square bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"
            ></div>
            <h1 className="text-sm text-semi">
              <div className="w-20 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            </h1>
          </div>
          <div className="flex flex-col gap-2 p-2 mr-3 border rounded shadow dark:border-zinc-600">
            <div
              style={{ maxHeight: "90px", maxWidth: "90px" }}
              className="flex items-center justify-center w-24 bg-white rounded-md aspect-square bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"
            ></div>
            <h1 className="text-sm text-semi">
              <div className="w-20 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            </h1>
          </div>
          <div className="flex flex-col gap-2 p-2 mr-3 border rounded shadow dark:border-zinc-600">
            <div
              style={{ maxHeight: "90px", maxWidth: "90px" }}
              className="flex items-center justify-center w-24 bg-white rounded-md aspect-square bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"
            ></div>
            <h1 className="text-sm text-semi">
              <div className="w-20 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            </h1>
          </div>
          <div className="flex flex-col gap-2 p-2 mr-3 border rounded shadow dark:border-zinc-600">
            <div
              style={{ maxHeight: "90px", maxWidth: "90px" }}
              className="flex items-center justify-center w-24 bg-white rounded-md aspect-square bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"
            ></div>
            <h1 className="text-sm text-semi">
              <div className="w-20 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            </h1>
          </div>
          <div className="flex flex-col gap-2 p-2 mr-3 border rounded shadow dark:border-zinc-600">
            <div
              style={{ maxHeight: "90px", maxWidth: "90px" }}
              className="flex items-center justify-center w-24 bg-white rounded-md aspect-square bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"
            ></div>
            <h1 className="text-sm text-semi">
              <div className="w-20 h-3 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
            </h1>
          </div>
        </div>
      )}
      {!isLoading && strains && strains.length === 0 ? (
        <div className="mt-6 text-sm text-semi text-zinc-400">
          You haven&apos;t liked any strains yet!
        </div>
      ) : (
        <div className="flex flex-row flex-wrap items-center justify-center mt-3 md:justify-start gap-y-3">
          {strains &&
            strains.map((strain: Strain) => (
              <Link
                key={strain.id}
                className="flex flex-col gap-2 p-2 mr-3 border rounded shadow dark:border-zinc-600"
                href={`/strains/${strain.slug}`}
              >
                <div
                  style={{ maxHeight: "90px", maxWidth: "90px" }}
                  className="flex items-center justify-center bg-white rounded-md aspect-square"
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
                <h1 className="w-20 text-sm truncate text-semi">
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
