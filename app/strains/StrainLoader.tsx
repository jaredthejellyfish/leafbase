"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useState, useRef, useEffect } from "react";
import StrainCard from "@/components/StrainCard/StrainCard";
import { useInView } from "react-intersection-observer";

type Props = {};

const fetchStrains = async ({ pageParam = 1 }) => {
  console.log("fetching strains");
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
  console.log("fetched strains");
  return data;
};

const StrainLoader = (props: Props) => {
  const { ref, inView, entry } = useInView();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["strains"],
    queryFn: fetchStrains,
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

  const loadMoreCallback = () => {
    fetchNextPage();
  };

  useEffect(() => {
    if (inView) {
      console.log("in view");
      loadMoreCallback();
    }
  }, [inView]);

  return (
    <>
      {data &&
        data.pages
          .flatMap((page) => page.strains)
          .map((strain) => (
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
              liked={true}
            />
          ))}
      <div ref={ref} className="flex w-full h-10 bg-green-700 rounded items-center justify-center m-5 text-white">
        {isFetchingNextPage ? "Loading more..." : hasNextPage ? "Load more" : "Nothing more to load"}
      </div>
    </>
  );
};

export default StrainLoader;
