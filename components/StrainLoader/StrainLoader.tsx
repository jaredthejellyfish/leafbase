"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useState, useRef, useEffect } from "react";
import StrainCard from "@/components/StrainCard/StrainCard";
import { useInView } from "react-intersection-observer";
import useUser from "@/hooks/useUser";

type Props = {};

const fetchStrains = async ({ pageParam = 2 }) => {
  const res = await fetch("http://localhost:3000/api/strains", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      take: 9,
      page: pageParam,
    }),
  });
  const data = await res.json();
  return data;
};

const StrainLoader = (props: Props) => {
  const { ref, inView, entry } = useInView();
  const user = useUser();

  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["strains"],
      queryFn: fetchStrains,
      enabled: !!user?.user?.id,
      getNextPageParam: (lastPage, _pages) => {
        const totalPages = lastPage.totalPages;
        const lastPageNumber = lastPage.page;

        if (lastPageNumber < totalPages) {
          return lastPageNumber + 1;
        } else {
          return undefined;
        }
      },
    });

  useEffect(() => {
    const loadMoreCallback = () => {
      fetchNextPage();
    };
    if (inView) {
      loadMoreCallback();
    }
  }, [inView, fetchNextPage]);

  if (!user?.user?.id) {
    return null;
  }

  return (
    <>
      {data &&
        data.pages
          .flatMap((page) => page.strains)
          .map((strain) =>
            strain?.slug ? (
              <StrainCard
                key={strain.slug}
                id={strain.id}
                slug={strain.slug}
                name={strain.name || undefined}
                subtitle={strain.subtitle || undefined}
                category={strain.category || undefined}
                phenotype={strain.phenotype || undefined}
                averageRating={strain.averageRating || undefined}
                shortDescription={strain.shortDescription || undefined}
                nugImage={strain.nugImage || undefined}
                flowerImageSvg={strain.flowerImageSvg || undefined}
                topTerpene={strain.topTerpene || undefined}
                thcPercent={strain.thcPercent || undefined}
                topEffect={strain.topEffect || undefined}
                cannabinoids={strain.cannabinoids || undefined}
                effects={strain.effects || undefined}
                terps={strain.terps || undefined}
                liked={strain.likes.length > 0}
                priority={false}
              />
            ) : null
          )}

      <div className="flex w-full h-10 rounded items-center justify-center mt-2 text-white"></div>
      <div
        ref={ref}
        className="flex w-full h-10 bg-green-700 rounded items-center justify-center mt-10 mb-4 text-white"
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load more"
          : "Nothing more to load"}
      </div>
    </>
  );
};

export default StrainLoader;
